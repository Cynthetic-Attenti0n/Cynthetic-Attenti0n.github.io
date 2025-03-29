// ui.js - Handles DOM manipulation, rendering, and UI updates

import { gsap } from "gsap";
import { getAssessments, getCurrentAssessment, getCurrentQuestionIndex, getUserAnswers, getActiveSectionElement, setActiveSectionElement, getUserAnswerForCurrentQuestion } from './state.js';
import { animateSectionTransition, fadeInElements, animateResultsIn, animateModalOpen, animateModalClose } from './animations.js'; // Assuming animations.js handles GSAP animations

// --- DOM Elements ---
// Declare the main object first
export const domElements = {
    app: document.getElementById('app'),
    loginSection: document.getElementById('login'),
    usernameInput: document.getElementById('username'),
    passwordInput: document.getElementById('password'),
    loginButton: document.getElementById('loginButton'),
    loginError: document.getElementById('loginError'),
    introSection: document.getElementById('intro'),
    assessmentsSection: document.getElementById('assessments'),
    assessmentViewSection: document.getElementById('assessmentView'),
    resultsSection: document.getElementById('results'),
    startButton: document.getElementById('startButton'),
    backToIntroButton: document.getElementById('backToIntroButton'),
    assessmentListContainer: document.getElementById('assessmentListContainer'),
    assessmentTitle: document.getElementById('assessmentTitle'), // In assessment view section header
    assessmentProgressContainer: document.getElementById('assessmentProgressContainer'), // Container for progress bar
    progressBar: document.getElementById('progressBar'),
    assessmentContent: document.getElementById('assessmentContent'), // Where question text/options go
    navigationButtons: document.querySelector('#assessmentView .navigation-buttons'), // Container for nav buttons
    nextButton: document.getElementById('nextButton'),
    backButton: document.getElementById('backButton'),
    resultsContent: document.getElementById('resultsContent'),
    restartButton: document.getElementById('restartButton'),
    header: document.querySelector('header'),
    footer: document.querySelector('footer'),
    themeToggle: document.getElementById('themeToggle'),
    modal: document.getElementById('modal'),
    modalTitle: document.getElementById('modalTitle'),
    modalMessage: document.getElementById('modalMessage'),
    // closeModalButton will be added below
};

// Add elements that depend on others after the initial declaration
if (domElements.modal) {
  domElements.closeModalButton = domElements.modal.querySelector('.close-button');
} else {
  console.error("Modal element not found, cannot assign closeModalButton.");
  domElements.closeModalButton = null; // Assign null or handle the error appropriately
}


// --- UI Rendering Functions ---

// ... rest of the file remains the same ...

export function renderAssessmentList(onCardClick, onPlaceholderClick) {
    const container = domElements.assessmentListContainer;
    container.innerHTML = ''; // Clear previous list
    const assessments = getAssessments(); // Now gets loaded data
    const activeAssessments = assessments.filter(a => !a.isPlaceholder);
    const placeholderAssessments = assessments.filter(a => a.isPlaceholder);

    // Render active assessments first
    activeAssessments.forEach((assessment, index) => {
        const card = createAssessmentCard(assessment);
        card.addEventListener('click', () => onCardClick(assessment.id));
        container.appendChild(card);
        gsap.from(card, { opacity: 0, y: 20, duration: 0.5, delay: index * 0.08, ease: 'power3.out' });
    });

    // Render placeholder assessments
    placeholderAssessments.forEach((assessment, index) => {
        const card = createAssessmentCard(assessment);
        card.classList.add('placeholder');
        card.addEventListener('click', () => onPlaceholderClick(assessment.title));
        container.appendChild(card);
        gsap.from(card, { opacity: 0, y: 20, duration: 0.5, delay: (activeAssessments.length + index) * 0.08, ease: 'power3.out' });
    });
}

function createAssessmentCard(assessment) {
    const card = document.createElement('div');
    card.className = 'assessment-card';
    card.dataset.assessmentId = assessment.id;

    const title = document.createElement('h3');
    title.textContent = assessment.title;

    const description = document.createElement('p');
    description.textContent = assessment.description;

    card.appendChild(title);
    card.appendChild(description);
    return card;
}

// Updated renderQuestion to handle PID-5 specific Likert scale
export function renderQuestion() {
    const assessment = getCurrentAssessment();
    const index = getCurrentQuestionIndex();
    if (!assessment || index < 0 || index >= assessment.questions.length) {
        console.error("Invalid state for rendering question:", assessment, index);
        return;
    }
    const question = assessment.questions[index];
    const totalQuestions = assessment.questions.length;
    const userAnswer = getUserAnswerForCurrentQuestion();

    const progress = ((index + 1) / totalQuestions) * 100;
    gsap.to(domElements.progressBar, { width: `${progress}%`, duration: 0.4, ease: 'power2.out' });

    domElements.assessmentTitle.textContent = assessment.title;

    gsap.to(domElements.assessmentContent.children, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        stagger: 0.05,
        onComplete: () => {
            domElements.assessmentContent.innerHTML = '';

            const questionNumber = document.createElement('p');
            questionNumber.className = 'question-number';
            questionNumber.textContent = `Question ${index + 1} of ${totalQuestions}`;
            domElements.assessmentContent.appendChild(questionNumber);

            const questionText = document.createElement('p');
            questionText.className = 'question-text';
            questionText.textContent = question.text;
            domElements.assessmentContent.appendChild(questionText);

            let optionsContainer;
            let elementsToFadeIn = [questionNumber, questionText];

            // === LIKERT SCALE LOGIC ===
            if (question.type === 'likert') {
                optionsContainer = document.createElement('div');
                optionsContainer.className = 'likert-scale';

                let labels;
                let values;

                // Check if this is the PID-5 assessment or uses custom options
                if (assessment.id === 'pid-5' && question.options && question.options.length === 4) {
                    labels = question.options; // Use labels defined in data.js
                    values = [0, 1, 2, 3];     // Use 0-3 scale
                } else {
                    // Default 5-point Likert scale (1-5)
                    labels = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
                    values = [1, 2, 3, 4, 5];
                }

                labels.forEach((label, i) => {
                    const value = values[i]; // Get the corresponding value
                    const radioLabel = document.createElement('label');
                    radioLabel.className = 'likert-option';
                    const radioInput = document.createElement('input');
                    radioInput.type = 'radio';
                    radioInput.name = `q${index}`; // Unique name per question
                    radioInput.value = value;      // Use defined value (0-3 for PID-5, 1-5 otherwise)

                    if (userAnswer === value) { // Compare with the correct value type
                        radioInput.checked = true;
                        handleAnswerSelectionUIUpdate(radioInput);
                    }

                    radioLabel.appendChild(radioInput);
                    const labelText = document.createElement('span');
                    labelText.textContent = label;
                    radioLabel.appendChild(labelText);
                    optionsContainer.appendChild(radioLabel);
                });
            }
            // === END LIKERT SCALE LOGIC ===
            else if (question.type === 'multiple-choice') {
                optionsContainer = document.createElement('div');
                optionsContainer.className = 'multiple-choice-options';
                question.options.forEach(option => {
                    const button = document.createElement('button');
                    button.textContent = option;
                    button.className = 'option-button';
                    if (userAnswer === option) {
                        handleAnswerSelectionUIUpdate(button);
                    }
                    optionsContainer.appendChild(button);
                });
            }

            if (optionsContainer) {
                domElements.assessmentContent.appendChild(optionsContainer);
                elementsToFadeIn.push(optionsContainer);
            }

            fadeInElements(elementsToFadeIn, 0.1);
            updateNavigationButtons();
        }
    });
}

// handleAnswerSelectionUIUpdate - Checks question type for correct logic
export function handleAnswerSelectionUIUpdate(selectedElement) {
    const assessment = getCurrentAssessment();
    if (!assessment) return;
    const question = assessment.questions[getCurrentQuestionIndex()];

    if (question.type === 'multiple-choice' && selectedElement.matches('.option-button')) {
        // ... (multiple choice logic remains the same) ...
        const optionsContainer = selectedElement.closest('.multiple-choice-options');
        if (optionsContainer) {
            optionsContainer.querySelectorAll('.option-button').forEach(btn => {
                btn.classList.remove('selected');
                gsap.set(btn, { clearProps: "scale" });
            });
        }
        selectedElement.classList.add('selected');
        gsap.fromTo(selectedElement, { scale: 1 }, { scale: 1.03, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.out' });

    } else if (question.type === 'likert' && selectedElement.type === 'radio') {
        // ... (likert logic remains the same, applies to both 4 and 5 point scales) ...
        const scaleContainer = selectedElement.closest('.likert-scale');
        if (scaleContainer) {
            scaleContainer.querySelectorAll('.likert-option').forEach(lbl => {
                 lbl.classList.remove('selected');
                 lbl.style.fontWeight = 'normal';
             });
        }
         const parentLabel = selectedElement.closest('.likert-option');
         if (parentLabel) {
             parentLabel.classList.add('selected');
             parentLabel.style.fontWeight = 'bold';
         }
    }
}

// ... updateNavigationButtons remains the same ...
export function updateNavigationButtons() {
    const index = getCurrentQuestionIndex();
    const assessment = getCurrentAssessment();
    if (!assessment || !domElements.backButton || !domElements.nextButton) return;

    domElements.backButton.style.display = index > 0 ? 'inline-block' : 'none';
    gsap.set(domElements.backButton, { opacity: index > 0 ? 1 : 0, pointerEvents: index > 0 ? 'auto' : 'none' });

    domElements.nextButton.textContent = index === assessment.questions.length - 1 ? 'Finish' : 'Next';
    domElements.nextButton.disabled = getUserAnswerForCurrentQuestion() === undefined;
    domElements.nextButton.classList.toggle('disabled', domElements.nextButton.disabled);
}

// ... renderResults remains the same for now ...
// (Could add PID-5 specific result interpretation later)
export function renderResults() {
    const assessment = getCurrentAssessment();
    const userAnswers = getUserAnswers();
    if (!assessment) return;

    const resultsTitleElement = domElements.resultsSection.querySelector('h2');
    if (resultsTitleElement) {
         resultsTitleElement.textContent = `${assessment.title} - Results`;
    } else {
        console.warn("Could not find h2 element within #results section");
    }

    let resultsHTML = `<p>Thank you for completing the <strong>${assessment.title}</strong> assessment!</p>`;

    if (assessment.id === 'big-five') {
        resultsHTML += `<p>Your Big Five personality insights are being calculated. This feature is under development.</p>`;
    } else if (assessment.id === 'pid-5') { // Added placeholder for PID-5 results
         resultsHTML += `<p>Your PID-5 results are being analyzed. Detailed feedback is coming soon.</p>`;
         // Optional: Show raw scores for now (0-3)
         // resultsHTML += '<h3>Your Responses:</h3><ol style="font-size: 0.8em; max-height: 200px; overflow-y: auto;">';
         // userAnswers.forEach((answer, i) => {
         //     resultsHTML += `<li>Q${i+1}: ${answer !== undefined ? answer : 'Not answered'}</li>`;
         // });
         // resultsHTML += '</ol>';
    } else {
         resultsHTML += `<p>Your results are ready. Detailed analysis for this assessment type is coming soon.</p>`;
    }

    domElements.resultsContent.innerHTML = resultsHTML;
    animateResultsIn(domElements.resultsContent.children);
}

// --- Navigation & Visibility ---
// ... showSection remains the same ...
export function showSection(sectionToShow, direction = 'forward') {
    const previousSection = getActiveSectionElement();
    if (previousSection === sectionToShow) return;

    setActiveSectionElement(sectionToShow);
    animateSectionTransition(previousSection, sectionToShow, direction);
}

// --- Login UI ---
// ... showLoginError, hideLoginError remain the same ...
export function showLoginError() {
    domElements.loginError.classList.remove('hidden');
    domElements.passwordInput.value = '';
    domElements.passwordInput.focus();
}

export function hideLoginError() {
     domElements.loginError.classList.add('hidden');
}

// --- Dark Mode ---
// ... setDarkMode, initializeTheme remain the same ...
export function setDarkMode(isDark) {
    const body = document.body;
    if (isDark) {
        body.classList.add('dark-mode');
        localStorage.setItem('psychedTheme', 'dark');
        body.style.setProperty('--primary-color-rgb', getComputedStyle(body).getPropertyValue('--primary-color-dark-rgb') || '155, 89, 182');
        body.style.setProperty('--secondary-color-rgb', getComputedStyle(body).getPropertyValue('--secondary-color-dark-rgb') || '52, 152, 219');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('psychedTheme', 'light');
        body.style.setProperty('--primary-color-rgb', getComputedStyle(body).getPropertyValue('--primary-color-light-rgb') || '106, 17, 203');
        body.style.setProperty('--secondary-color-rgb', getComputedStyle(body).getPropertyValue('--secondary-color-light-rgb') || '37, 117, 252');
    }
}

export function initializeTheme() {
    const preferredTheme = localStorage.getItem('psychedTheme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = preferredTheme === 'dark' || (preferredTheme === null && prefersDark);
    domElements.themeToggle.checked = initialDark;
    setDarkMode(initialDark);
}

// --- Modal ---
// ... showModal, hideModal remain the same ...
export function showModal(title, message) {
    if (!domElements.modal) return; // Prevent error if modal not found
    domElements.modalTitle.textContent = title;
    domElements.modalMessage.innerHTML = message;
    domElements.modal.classList.remove('hidden');
    animateModalOpen(domElements.modal, domElements.modal.querySelector('.modal-content'));
}

export function hideModal() {
    if (!domElements.modal) return; // Prevent error if modal not found
     animateModalClose(domElements.modal, domElements.modal.querySelector('.modal-content'), () => {
        domElements.modal.classList.add('hidden');
     });
}

// --- Initial UI Setup ---
// ... initializeUIState remains the same ...
export function initializeUIState() {
    [domElements.introSection, domElements.assessmentsSection, domElements.assessmentViewSection, domElements.resultsSection].forEach(s => {
        if (!s) return;
        s.classList.add('hidden');
        s.classList.remove('visible');
        gsap.set(s, { opacity: 0, position: 'absolute', visibility: 'hidden', pointerEvents: 'none', width: '100%', x: '100%' });
    });

    if (domElements.loginSection) {
        domElements.loginSection.classList.remove('hidden');
        domElements.loginSection.classList.add('visible');
        gsap.set(domElements.loginSection, { opacity: 1, position: 'relative', visibility: 'visible', pointerEvents: 'auto', width: 'auto', x: '0%' });
        setActiveSectionElement(domElements.loginSection);
    } else {
        console.error("Login section not found during initialization.");
    }

     if (domElements.header && domElements.footer) {
        gsap.set([domElements.header, domElements.footer], { opacity: 0, y: (el) => el === domElements.header ? -20 : 0 });
     } else {
         console.warn("Header or Footer element not found during initialization.");
     }
}