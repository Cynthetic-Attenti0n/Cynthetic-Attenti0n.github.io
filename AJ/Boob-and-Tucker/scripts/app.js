import { gsap } from 'gsap';
import { loadWelcomeScreen } from './screens/welcome.js';
import { loadModuleSelection } from './screens/moduleSelection.js';
import { loadModuleContent } from './screens/moduleContent.js';
import { loadQuiz } from './screens/quiz.js';
import { UserProgress } from './models/UserProgress.js';
import { showAchievement } from './components/achievements.js';
import { showCompletionModal } from './components/completionModal.js';

// App State
const appState = {
    currentScreen: 'welcome',
    currentModule: null,
    currentSection: null,
    isQuizActive: false,
    quizCompleted: false,
    progress: new UserProgress()
};

// DOM Elements
const screens = {
    welcome: document.getElementById('welcome-screen'),
    moduleSelection: document.getElementById('module-selection'),
    moduleContent: document.getElementById('module-content'),
    quiz: document.getElementById('quiz-screen')
};

const navigationElements = {
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    progressBar: document.querySelector('.progress-fill'),
    progressText: document.getElementById('progress-percentage')
};

// Navigation Controls
function updateNavigation() {
    const { currentScreen, currentModule, currentSection, quizCompleted } = appState;
    
    // Hide/show footer progress bar based on screen
    const progressContainer = document.querySelector('.progress-container');
    const navigationButtons = document.querySelector('.navigation-buttons');
    
    if (currentScreen === 'welcome' || (currentScreen === 'moduleSelection' && !currentModule)) {
        progressContainer.style.display = 'none';
        if (currentScreen === 'welcome') {
            navigationButtons.style.display = 'none';
        } else {
            navigationButtons.style.display = 'block';
        }
    } else {
        progressContainer.style.display = 'block';
        navigationButtons.style.display = 'block';
        
        // Update progress percentage based on current module
        if (currentModule) {
            const moduleProgress = appState.progress.getModuleProgress(currentModule);
            
            // Animate progress bar with GSAP for smoother transition
            gsap.to(navigationElements.progressBar, {
                width: `${moduleProgress}%`,
                duration: 0.8,
                ease: "power2.out",
                onUpdate: function() {
                    // Update milestones
                    const milestones = document.querySelectorAll('.milestone');
                    const labels = document.querySelectorAll('.progress-label');
                    
                    milestones.forEach(milestone => {
                        const percent = parseInt(milestone.getAttribute('data-percent'));
                        if (moduleProgress >= percent) {
                            milestone.classList.add('active');
                        } else {
                            milestone.classList.remove('active');
                        }
                    });
                    
                    labels.forEach(label => {
                        const percent = parseInt(label.textContent);
                        if (moduleProgress >= percent) {
                            label.classList.add('active');
                        } else {
                            label.classList.remove('active');
                        }
                    });
                }
            });
            
            // Update text with a counting animation
            const currentValue = parseInt(navigationElements.progressText.textContent);
            gsap.to({ value: currentValue }, {
                value: moduleProgress,
                duration: 0.8,
                onUpdate: function() {
                    navigationElements.progressText.textContent = `${Math.round(this.targets()[0].value)}%`;
                },
                ease: "power2.out",
                onComplete: function() {
                    // Add particle burst on completion
                    if (moduleProgress % 25 === 0 && moduleProgress > 0) {
                        createProgressParticles(moduleProgress);
                    }
                }
            });
        }
    }
    
    // Update prev button
    if (currentScreen === 'welcome' || 
        (currentScreen === 'moduleSelection' && !currentModule)) {
        navigationElements.prevBtn.disabled = true;
        navigationElements.prevBtn.style.opacity = '0.5';
    } else {
        navigationElements.prevBtn.disabled = false;
        navigationElements.prevBtn.style.opacity = '1';
    }
    
    // Hide navigation buttons on module selection screen
    if (currentScreen === 'moduleSelection' && !currentModule) {
        navigationElements.prevBtn.style.display = 'none';
        navigationElements.nextBtn.style.display = 'none';
    } else {
        navigationElements.prevBtn.style.display = 'block';
        navigationElements.nextBtn.style.display = 'block';
    }
    
    // Ensure buttons are properly displayed as a horizontal row
    navigationElements.prevBtn.style.marginRight = 'auto';
    navigationElements.nextBtn.style.marginLeft = 'auto';
    navigationElements.nextBtn.style.marginTop = '0'; // Reset any top margin that might be causing misalignment
    
    // Update next button
    if (currentScreen === 'welcome') {
        navigationElements.nextBtn.textContent = 'Get Started';
    } else if (currentScreen === 'moduleContent') {
        navigationElements.nextBtn.textContent = 'Next';
        navigationElements.nextBtn.disabled = false;
    } else if (currentScreen === 'quiz') {
        navigationElements.nextBtn.textContent = 'Next';
        navigationElements.nextBtn.disabled = !quizCompleted;
    } else if (currentScreen === 'moduleSelection' && !currentModule) {
        navigationElements.nextBtn.disabled = true;
    } else {
        navigationElements.nextBtn.textContent = 'Next';
        navigationElements.nextBtn.disabled = false;
    }
    
    // Update progress
    const progressPercentage = appState.progress.getOverallProgress();
}


// Screen Transitions
function switchScreen(fromScreen, toScreen) {
    if (screens[fromScreen].classList.contains('active')) {
        screens[fromScreen].classList.remove('active');
        
        // Use GSAP for smoother transitions
        gsap.to(screens[fromScreen], {
            opacity: 0,
            y: 20,
            duration: 0.3,
            onComplete: () => {
                screens[fromScreen].style.display = 'none';
                screens[toScreen].style.display = 'block';
                
                gsap.fromTo(screens[toScreen], 
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.3,
                      onComplete: () => screens[toScreen].classList.add('active') 
                    }
                );
            }
        });
        
        appState.currentScreen = toScreen;
        updateNavigation();
    }
}

// Navigation Event Handlers
function handleNext() {
    const { currentScreen, isQuizActive } = appState;
    
    switch (currentScreen) {
        case 'welcome':
            loadModuleSelection();
            switchScreen('welcome', 'moduleSelection');
            break;
            
        case 'moduleSelection':
            if (appState.currentModule) {
                loadModuleContent(appState.currentModule);
                switchScreen('moduleSelection', 'moduleContent');
            }
            break;
            
        case 'moduleContent':
            // Start quiz for current section
            appState.isQuizActive = true;
            loadQuiz(appState.currentModule, appState.currentSection);
            switchScreen('moduleContent', 'quiz');
            break;
            
        case 'quiz':
            // Return to module content after quiz
            appState.isQuizActive = false;
            if (appState.progress.hasNextSection(appState.currentModule, appState.currentSection)) {
                appState.currentSection = appState.progress.getNextSection(
                    appState.currentModule, 
                    appState.currentSection
                );
                loadModuleContent(appState.currentModule, appState.currentSection);
                switchScreen('quiz', 'moduleContent');
            } else {
                // Module completed - ensure we've fully loaded the module selection screen
                appState.currentModule = null;
                appState.currentSection = null;
                loadModuleSelection(); // Load module selection before switching screens
                switchScreen('quiz', 'moduleSelection');
            }
            break;
    }
    
    updateNavigation();
}

function handlePrevious() {
    const { currentScreen, isQuizActive } = appState;
    
    switch (currentScreen) {
        case 'moduleSelection':
            loadWelcomeScreen();
            switchScreen('moduleSelection', 'welcome');
            break;
            
        case 'moduleContent':
            if (appState.progress.hasPreviousSection(appState.currentModule, appState.currentSection)) {
                appState.currentSection = appState.progress.getPreviousSection(
                    appState.currentModule,
                    appState.currentSection
                );
                loadModuleContent(appState.currentModule, appState.currentSection);
            } else {
                appState.currentModule = null;
                appState.currentSection = null;
                loadModuleSelection();
                switchScreen('moduleContent', 'moduleSelection');
            }
            break;
            
        case 'quiz':
            appState.isQuizActive = false;
            loadModuleContent(appState.currentModule, appState.currentSection);
            switchScreen('quiz', 'moduleContent');
            break;
    }
    
    updateNavigation();
}

// Initialize App
function initApp() {
    // Load initial data
    loadWelcomeScreen();
    
    // Set up event listeners
    navigationElements.nextBtn.innerHTML = `
        <span>Next</span>
        <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M12,4 L20,12 L12,20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
            <path d="M4,12 L20,12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
        </svg>
    `;
    
    navigationElements.prevBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="24" height="24" style="transform: scaleX(-1);">
            <path d="M12,4 L20,12 L12,20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
            <path d="M4,12 L20,12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
        </svg>
        <span>Previous</span>
    `;
    
    navigationElements.nextBtn.addEventListener('click', handleNext);
    navigationElements.prevBtn.addEventListener('click', handlePrevious);
    
    // Add button hover/click animations
    setButtonAnimations();
    
    // Add progress bar milestones
    createProgressMilestones();
    
    // Initialize navigation controls
    updateNavigation();
    
    // Add button ripple effect
    addRippleEffect();
    
    // Expose public API for other modules
    window.appAPI = {
        switchScreen,
        updateNavigation,
        getState: () => ({ ...appState }),
        setState: (updates) => {
            Object.assign(appState, updates);
            updateNavigation();
        }
    };
}

// Add button animations function
function setButtonAnimations() {
    // Next button animations
    navigationElements.nextBtn.addEventListener('mouseenter', () => {
        gsap.to(navigationElements.nextBtn, {
            scale: 1.05,
            boxShadow: "0 12px 25px rgba(255, 99, 132, 0.3)",
            duration: 0.3,
            y: -5
        });
    });
    
    navigationElements.nextBtn.addEventListener('mouseleave', () => {
        gsap.to(navigationElements.nextBtn, {
            scale: 1,
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            duration: 0.3,
            y: 0
        });
    });
    
    navigationElements.nextBtn.addEventListener('mousedown', () => {
        gsap.to(navigationElements.nextBtn, {
            scale: 0.98,
            duration: 0.1
        });
    });
    
    navigationElements.nextBtn.addEventListener('mouseup', () => {
        gsap.to(navigationElements.nextBtn, {
            scale: 1.05,
            duration: 0.1
        });
    });
    
    // Previous button animations
    navigationElements.prevBtn.addEventListener('mouseenter', () => {
        gsap.to(navigationElements.prevBtn, {
            scale: 1.05,
            boxShadow: "0 12px 25px rgba(54, 162, 235, 0.3)",
            duration: 0.3,
            y: -5
        });
    });
    
    navigationElements.prevBtn.addEventListener('mouseleave', () => {
        gsap.to(navigationElements.prevBtn, {
            scale: 1,
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            duration: 0.3,
            y: 0
        });
    });
    
    navigationElements.prevBtn.addEventListener('mousedown', () => {
        gsap.to(navigationElements.prevBtn, {
            scale: 0.98,
            duration: 0.1
        });
    });
    
    navigationElements.prevBtn.addEventListener('mouseup', () => {
        gsap.to(navigationElements.prevBtn, {
            scale: 1.05,
            duration: 0.1
        });
    });
    
    // Add progress bar animation
    const progressBar = document.querySelector('.progress-bar');
    gsap.set(progressBar, { scale: 1 });
    
    gsap.to(progressBar, {
        scale: 1.02, 
        duration: 2, 
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    
    // Add percentage counter animation with floating particles
    gsap.to("#progress-percentage", {
        y: -2,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

function createProgressMilestones() {
    const progressBar = document.querySelector('.progress-bar');
    const milestonesContainer = document.createElement('div');
    milestonesContainer.className = 'progress-milestones';
    
    // Create 5 milestone markers
    for (let i = 0; i <= 4; i++) {
        const milestone = document.createElement('div');
        milestone.className = 'milestone';
        milestone.setAttribute('data-percent', (i * 25));
        milestonesContainer.appendChild(milestone);
    }
    
    progressBar.appendChild(milestonesContainer);
}

function createProgressParticles(percent) {
    const progressPercentage = document.getElementById('progress-percentage');
    const rect = progressPercentage.getBoundingClientRect();
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = i % 2 === 0 ? 'var(--primary-color)' : 'var(--accent-color)';
        particle.style.top = `${rect.top + rect.height/2}px`;
        particle.style.left = `${rect.left + rect.width/2}px`;
        particle.style.zIndex = '1000';
        document.body.appendChild(particle);
        
        gsap.to(particle, {
            x: (Math.random() - 0.5) * 80,
            y: (Math.random() - 0.5) * 80,
            opacity: 0,
            scale: 0,
            duration: 1 + Math.random(),
            ease: "power2.out",
            onComplete: () => particle.remove()
        });
    }
}

function addRippleEffect() {
    const buttons = document.querySelectorAll('.nav-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'btn-ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.appendChild(ripple);
            
            gsap.to(ripple, {
                width: '300px',
                height: '300px',
                opacity: 0,
                x: '-50%',
                y: '-50%',
                duration: 0.8,
                ease: "power1.out",
                onComplete: () => ripple.remove()
            });
        });
    });
}

// Add a shimmer animation to the progress bar
gsap.to(".progress-fill", {
    backgroundPosition: "-200% 0",
    repeat: -1,
    duration: 3,
    ease: "linear"
});

// Start the app when everything is loaded
window.addEventListener('DOMContentLoaded', initApp);

export { appState };