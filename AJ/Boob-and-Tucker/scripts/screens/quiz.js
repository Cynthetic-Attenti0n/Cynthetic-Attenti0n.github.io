import { gsap } from 'gsap';
import { contentData } from '../models/ContentData.js';
import { showCompletionModal } from '../components/completionModal.js';
import { showAchievement } from '../components/achievements.js';

export function loadQuiz(moduleId, sectionId) {
    const quizScreen = document.getElementById('quiz-screen');
    const { getState, setState } = window.appAPI;
    const appState = getState();
    
    // Scroll to top of quiz page when loading
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Get section quiz data
    const sectionContent = contentData[sectionId];
    if (!sectionContent || !sectionContent.quiz) {
        console.error(`Quiz not found for section ${sectionId}`);
        return;
    }
    
    const quiz = sectionContent.quiz;
    
    // Create quiz HTML
    let quizHTML = `
        <div class="quiz-container">
            <h2>Quick Quiz: ${sectionContent.title}</h2>
            <p>Test your knowledge with these questions:</p>
    `;
    
    // Add each question
    quiz.forEach((question, questionIndex) => {
        quizHTML += `
            <div class="quiz-question" data-question="${questionIndex}">
                <h3>Question ${questionIndex + 1}</h3>
                <p>${question.question}</p>
                <ul class="quiz-options">
        `;
        
        // Add options
        question.options.forEach((option, optionIndex) => {
            quizHTML += `
                <li class="quiz-option" data-option="${optionIndex}">
                    ${option}
                </li>
            `;
        });
        
        quizHTML += `
                </ul>
                <div class="quiz-feedback"></div>
            </div>
        `;
    });
    
    quizHTML += `
            <div class="quiz-summary" style="display: none;">
                <h3>Quiz Complete!</h3>
                <p>You've completed the quiz. Click Next to continue.</p>
            </div>
        </div>
    `;
    
    quizScreen.innerHTML = quizHTML;
    
    // Add event listeners to quiz options
    const quizOptions = quizScreen.querySelectorAll('.quiz-option');
    quizOptions.forEach(option => {
        option.addEventListener('click', () => {
            const questionContainer = option.closest('.quiz-question');
            const questionIndex = parseInt(questionContainer.dataset.question);
            const optionIndex = parseInt(option.dataset.option);
            const correctAnswer = quiz[questionIndex].correctAnswer;
            
            // Clear previous selections in this question
            questionContainer.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('selected', 'correct', 'incorrect');
            });
            
            // Mark selected option
            option.classList.add('selected');
            
            // Check if answer is correct
            const isCorrect = optionIndex === correctAnswer;
            const feedbackEl = questionContainer.querySelector('.quiz-feedback');
            
            // Mark selected option with enhanced animation
            if (isCorrect) {
                gsap.to(option, {
                    backgroundColor: "rgba(76, 175, 80, 0.2)",
                    border: "2px solid var(--success-color)",
                    scale: 1.03,
                    duration: 0.3
                });
                
                // Celebration micro-animation
                const confetti = document.createElement('div');
                confetti.className = 'option-confetti';
                option.appendChild(confetti);
                
                gsap.fromTo(confetti, 
                    { scale: 0 },
                    { 
                        scale: 1, 
                        opacity: 0,
                        duration: 0.5,
                        onComplete: () => confetti.remove()
                    }
                );
                
                feedbackEl.textContent = "Correct! Well done.";
                feedbackEl.className = "quiz-feedback success";
                
                // Auto scroll to next question after 1 second if there is one
                const nextQuestion = questionContainer.nextElementSibling;
                if (nextQuestion && nextQuestion.classList.contains('quiz-question')) {
                    setTimeout(() => {
                        nextQuestion.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 600);
                }
            } else {
                gsap.to(option, {
                    backgroundColor: "rgba(244, 67, 54, 0.2)",
                    border: "2px solid var(--error-color)",
                    duration: 0.3
                });
                
                const correctOption = questionContainer.querySelector(`.quiz-option[data-option="${correctAnswer}"]`);
                gsap.to(correctOption, {
                    backgroundColor: "rgba(76, 175, 80, 0.2)",
                    border: "2px solid var(--success-color)",
                    scale: 1.03,
                    delay: 0.3,
                    duration: 0.3
                });
                
                feedbackEl.textContent = "Not quite. The correct answer is highlighted.";
                feedbackEl.className = "quiz-feedback error";
            }
            
            // Animate feedback with a more dynamic effect
            gsap.fromTo(feedbackEl, 
                { opacity: 0, y: 10, scale: 0.9 }, 
                { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.5)" }
            );
            
            // Check if all questions have been answered
            const allAnswered = Array.from(quizScreen.querySelectorAll('.quiz-question')).every(q => 
                q.querySelector('.quiz-option.selected')
            );
            
            // Check if all answers are correct
            const allCorrect = Array.from(quizScreen.querySelectorAll('.quiz-question')).every(q => {
                const selectedOption = q.querySelector('.quiz-option.selected');
                const questionIndex = parseInt(q.dataset.question);
                const optionIndex = selectedOption ? parseInt(selectedOption.dataset.option) : -1;
                return optionIndex === quiz[questionIndex].correctAnswer;
            });
            
            if (allAnswered) {
                // Show quiz summary with a celebratory animation
                const summary = quizScreen.querySelector('.quiz-summary');
                summary.style.display = 'block';
                
                gsap.fromTo(summary, 
                    { opacity: 0, y: 20, scale: 0.9 }, 
                    { 
                        opacity: 1, 
                        y: 0, 
                        scale: 1, 
                        duration: 0.8,
                        ease: "elastic.out(1, 0.75}"
                    }
                );
                
                // Enable next button and update state only if all answers are correct
                if (allCorrect) {
                    setState({ quizCompleted: true });
                    window.appAPI.updateNavigation();
                    
                    // Submit quiz to update progress
                    const quizResult = appState.progress.submitQuiz(
                        appState.currentModule,
                        appState.currentSection
                    );
                    
                    if (quizResult.completed) {
                        // Ensure progress is saved and reflected in UI
                        window.appAPI.updateNavigation();
                        
                        // Check for achievements
                        const achievements = appState.progress.checkForAchievements(
                            appState.currentModule,
                            appState.currentSection
                        );
                        
                        if (achievements.length > 0) {
                            // Show achievements one by one
                            achievements.forEach((achievement, index) => {
                                setTimeout(() => {
                                    showAchievement(achievement);
                                }, index * 2000);
                            });
                        }
                        
                        // Check if this was the last section of the module
                        const hasNextSection = appState.progress.hasNextSection(appState.currentModule, appState.currentSection);
                        const allSectionsCompleted = appState.progress.isModuleCompleted(appState.currentModule);
                        
                        // Show the appropriate completion modal
                        if (allSectionsCompleted) {
                            // All sections completed - show module completion
                            showCompletionModal('module', sectionContent.title);
                        } else {
                            // Not all sections completed - show section completion
                            showCompletionModal('section', sectionContent.title);
                        }
                    }
                } else {
                    // Update summary text if answers are incorrect
                    summary.innerHTML = `
                        <h3>Review Your Answers</h3>
                        <p>Some of your answers are incorrect. Please review and correct them before proceeding.</p>
                    `;
                }
            }
        });
    });
    
    // Enhance quiz entrance animation
    gsap.fromTo(".quiz-container", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
    
    gsap.fromTo(".quiz-question", 
        { opacity: 0, x: -30, stagger: 0.15 }, 
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: "back.out(1.4)" }
    );
    
    gsap.fromTo(".quiz-option", 
        { opacity: 0, x: 30, stagger: 0.05 }, 
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, delay: 0.3, ease: "power2.out" }
    );
}