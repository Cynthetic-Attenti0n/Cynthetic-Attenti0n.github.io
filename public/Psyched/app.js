import { gsap } from "gsap";
import config from './config.js';
import { loadAssessmentsData } from './data.js';
import { getAssessments, getAssessmentById, getCurrentAssessment, setCurrentAssessment, getCurrentQuestionIndex, setCurrentQuestionIndex, incrementQuestionIndex, decrementQuestionIndex, setUserAnswerForCurrentQuestion, getUserAnswerForCurrentQuestion, setActiveSectionElement } from './state.js';
import { domElements, renderAssessmentList, renderQuestion, renderResults, showSection, showLoginError, hideLoginError, setDarkMode, initializeTheme, showModal, hideModal, initializeUIState, handleAnswerSelectionUIUpdate, updateNavigationButtons } from './ui.js';
import { animateHeaderFooterIn, shakeElement, animateProgressBarReset } from './animations.js';

// --- Initialization ---
async function initializeApp() {
    initializeTheme(); 
    initializeUIState(); 

    try {
        await loadAssessmentsData();
        console.log("Assessment data loaded successfully.");

        setupEventListeners();

    } catch (error) {
        console.error("Failed to initialize app due to data loading error:", error);
        showModal("Initialization Error", "Could not load assessment data. Please refresh the page or try again later.");
    }
}

// --- Event Listeners Setup ---
function setupEventListeners() {
    domElements.themeToggle.addEventListener('change', () => {
        setDarkMode(domElements.themeToggle.checked);
    });

    domElements.loginButton.addEventListener('click', handleLogin);
    domElements.passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });
    domElements.usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') domElements.passwordInput.focus();
    });

    domElements.startButton.addEventListener('click', () => {
        renderAssessmentList(handleAssessmentCardClick, handlePlaceholderClick);
        showSection(domElements.assessmentsSection, 'forward');
    });
    domElements.backToIntroButton.addEventListener('click', () => {
        showSection(domElements.introSection, 'backward');
    });

    domElements.nextButton.addEventListener('click', nextQuestion);
    domElements.backButton.addEventListener('click', previousQuestion);

    domElements.assessmentContent.addEventListener('change', (event) => {
        if (event.target.type === 'radio' && event.target.closest('.likert-scale')) {
            const value = parseInt(event.target.value, 10);
            if (!isNaN(value)) { 
                 handleAnswerSelection(value, event.target);
            } else {
                console.error("Could not parse radio button value:", event.target.value);
            }
        }
    });
    domElements.assessmentContent.addEventListener('click', (event) => {
        if (event.target.matches('.option-button')) {
            handleAnswerSelection(event.target.textContent, event.target);
        }
    });

    domElements.restartButton.addEventListener('click', restartApp);

    domElements.closeModalButton.addEventListener('click', hideModal);
    domElements.modal.addEventListener('click', (e) => {
        if (e.target === domElements.modal) hideModal();
    });
}

// --- Core Logic Functions ---
function handleLogin() {
    const username = domElements.usernameInput.value.trim();
    const password = domElements.passwordInput.value.trim();

    if (username === config.loginUsername && password === config.loginPassword) {
        hideLoginError();
        showSection(domElements.introSection, 'forward');
        animateHeaderFooterIn();
    } else {
        showLoginError();
        shakeElement(domElements.loginSection);
    }
}

function handlePlaceholderClick(assessmentTitle) {
    showModal(
        'Coming Soon!',
        `The "${assessmentTitle}" assessment is currently under development. Please check back later.`
    );
}

function handleAssessmentCardClick(assessmentId) {
    const assessment = getAssessmentById(assessmentId); 
    if (!assessment || assessment.isPlaceholder) return;

    setCurrentAssessment(assessment);
    renderQuestion();
    showSection(domElements.assessmentViewSection, 'forward');
}

function handleAnswerSelection(answer, selectedElement) {
    setUserAnswerForCurrentQuestion(answer); 
    handleAnswerSelectionUIUpdate(selectedElement);
    updateNavigationButtons();
}

function nextQuestion() {
    const assessment = getCurrentAssessment();
    if (!assessment) return;

    if (getUserAnswerForCurrentQuestion() === undefined) {
        shakeElement(domElements.nextButton); 
        console.warn("Please select an answer before proceeding.");
        return;
    }

    const currentIndex = getCurrentQuestionIndex();
    if (currentIndex < assessment.questions.length - 1) {
        incrementQuestionIndex();
        renderQuestion();
    } else {
        renderResults();
        showSection(domElements.resultsSection, 'forward');
    }
}

function previousQuestion() {
    const assessment = getCurrentAssessment();
    if (!assessment || getCurrentQuestionIndex() <= 0) return;

    decrementQuestionIndex();
    renderQuestion();
}

function restartApp() {
    setCurrentAssessment(null); 
    renderAssessmentList(handleAssessmentCardClick, handlePlaceholderClick); 
    showSection(domElements.assessmentsSection, 'backward'); 
    animateProgressBarReset(); 
}

// --- Start App ---
initializeApp();