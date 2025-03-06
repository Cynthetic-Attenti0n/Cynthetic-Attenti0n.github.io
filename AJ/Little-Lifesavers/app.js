import { gsap } from 'gsap';
import { ScrollTrigger } from 'ScrollTrigger';
import * as lottie from 'lottie';
import { moduleData } from './module-data.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initAnimations();
    
    // Setup mobile menu toggle
    setupMobileMenu();
    
    // Add module card click listeners
    setupModuleCards();
    
    // Back button functionality
    document.getElementById('back-btn').addEventListener('click', closeModuleView);
    
    // Smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Setup theme toggle
    setupThemeToggle();
});

function initAnimations() {
    // Hero animation
    loadHeroAnimation();
    
    // Animate section titles and content on scroll
    animateOnScroll();
    
    // Animate logo
    animateLogo();
}

function loadHeroAnimation() {
    const heroAnimationContainer = document.getElementById('hero-animation');
    
    // Create an SVG animation for the hero section
    const heroSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    heroSvg.setAttribute('viewBox', '0 0 500 400');
    heroSvg.setAttribute('class', 'hero-svg');
    
    // Create the animation elements
    heroSvg.innerHTML = `
        <defs>
            <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ff6b6b" stop-opacity="0.1"/>
                <stop offset="100%" stop-color="#4FC3F7" stop-opacity="0.1"/>
            </linearGradient>
        </defs>
        <rect x="0" y="0" width="500" height="400" fill="url(#bg-gradient)" rx="20" ry="20"/>
        
        <!-- Adult figure -->
        <g class="adult-figure">
            <circle cx="200" cy="150" r="40" fill="#FF6B6B"/>
            <rect x="180" y="190" width="40" height="100" rx="10" fill="#FF6B6B"/>
            <rect x="160" y="220" width="80" height="30" rx="10" fill="#FF6B6B"/>
            <rect x="180" y="290" width="15" height="60" rx="5" fill="#FF6B6B"/>
            <rect x="205" y="290" width="15" height="60" rx="5" fill="#FF6B6B"/>
        </g>
        
        <!-- Child figure -->
        <g class="child-figure">
            <circle cx="300" cy="180" r="25" fill="#4FC3F7"/>
            <rect x="290" y="205" width="20" height="60" rx="8" fill="#4FC3F7"/>
            <rect x="275" y="225" width="50" height="20" rx="8" fill="#4FC3F7"/>
            <rect x="290" y="265" width="8" height="35" rx="4" fill="#4FC3F7"/>
            <rect x="302" y="265" width="8" height="35" rx="4" fill="#4FC3F7"/>
        </g>
        
        <!-- Hearts -->
        <path class="heart heart1" d="M250 100c-5-5-13-5-18 0-5-5-5-13 0-18l18 18 18-18c5-5 5-13 0-18z" fill="#FF6B6B"/>
        <path class="heart heart2" d="M350 120c-3-3-8-3-11 0-3-3-8-3-11 0-3 3-3 8 0 11l11 11 11-11c3-3 3-8 0-11z" fill="#FF6B6B"/>
        <path class="heart heart3" d="M150 120c-3-3-8-3-11 0-3-3-8-3-11 0-3 3-3 8 0 11l11 11 11-11c3-3 3-8 0-11z" fill="#FF6B6B"/>
        
        <!-- Safety icons -->
        <circle class="safety-icon icon1" cx="150" cy="300" r="20" fill="#FFD54F"/>
        <circle class="safety-icon icon2" cx="350" cy="300" r="20" fill="#81C784"/>
        <circle class="safety-icon icon3" cx="250" cy="340" r="20" fill="#9575CD"/>
        
        <!-- Plus symbols -->
        <g class="plus plus1">
            <rect x="145" y="295" width="10" height="10" rx="2" fill="white"/>
            <rect x="140" y="300" width="20" height="0" rx="0" fill="white"/>
            <rect x="150" y="290" width="0" height="20" rx="0" fill="white"/>
        </g>
        <g class="plus plus2">
            <rect x="345" y="295" width="10" height="10" rx="2" fill="white"/>
            <rect x="340" y="300" width="20" height="0" rx="0" fill="white"/>
            <rect x="350" y="290" width="0" height="20" rx="0" fill="white"/>
        </g>
        <g class="plus plus3">
            <rect x="245" y="335" width="10" height="10" rx="2" fill="white"/>
            <rect x="240" y="340" width="20" height="0" rx="0" fill="white"/>
            <rect x="250" y="330" width="0" height="20" rx="0" fill="white"/>
        </g>
    `;
    
    heroAnimationContainer.appendChild(heroSvg);
    
    // Animate hero elements with GSAP
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    
    // Adult and child figures
    tl.to('.adult-figure', { y: -10, duration: 2, ease: 'power1.inOut' }, 0);
    tl.to('.child-figure', { y: -5, duration: 2, ease: 'power1.inOut' }, 0.3);
    
    // Hearts
    tl.to('.heart1', { scale: 1.2, duration: 1, ease: 'power1.inOut', repeat: -1, yoyo: true }, 0);
    tl.to('.heart2', { scale: 1.3, duration: 1.3, ease: 'power1.inOut', repeat: -1, yoyo: true }, 0.2);
    tl.to('.heart3', { scale: 1.2, duration: 1.5, ease: 'power1.inOut', repeat: -1, yoyo: true }, 0.4);
    
    // Safety icons
    tl.to('.safety-icon', { y: -8, duration: 2, stagger: 0.2, ease: 'power1.inOut', repeat: -1, yoyo: true }, 0.5);
    
    // Plus symbols
    gsap.set('.plus1 rect:nth-child(2)', { width: 20 });
    gsap.set('.plus1 rect:nth-child(3)', { height: 20 });
    gsap.set('.plus2 rect:nth-child(2)', { width: 20 });
    gsap.set('.plus2 rect:nth-child(3)', { height: 20 });
    gsap.set('.plus3 rect:nth-child(2)', { width: 20 });
    gsap.set('.plus3 rect:nth-child(3)', { height: 20 });
    
    tl.to('.plus', { rotation: 45, transformOrigin: 'center', duration: 2, stagger: 0.3, ease: 'power1.inOut', repeat: -1, yoyo: true }, 0.7);
}

function animateOnScroll() {
    // Section titles with improved animation
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
            onComplete: () => {
                // Add a subtle highlight animation after the title appears
                gsap.to(title, {
                    boxShadow: '0 0 10px rgba(255,107,107,0.3), 0 0 20px rgba(255,107,107,0.2), 0 0 30px rgba(255,107,107,0.1)',
                    duration: 1,
                    repeat: 1,
                    yoyo: true
                });
            }
        });
    });
    
    // Module cards
    gsap.utils.toArray('.module-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power2.out'
        });
    });
    
    // About cards
    gsap.utils.toArray('.about-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.15,
            ease: 'power2.out'
        });
    });
}

function animateLogo() {
    // Logo animation
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to('.logo-path', { fill: '#ff5252', duration: 2, ease: 'power1.inOut' });
    tl.to('.logo-path', { fill: '#FF6B6B', duration: 2, ease: 'power1.inOut' });
}

function setupMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.menu');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        menu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            menu.classList.remove('active');
        });
    });
}

function setupModuleCards() {
    const moduleCards = document.querySelectorAll('.module-card');
    const moduleContainer = document.getElementById('module-container');
    const moduleTitle = document.getElementById('module-title');
    const moduleContent = document.getElementById('module-content');
    const moduleProgress = document.getElementById('module-progress');
    
    moduleCards.forEach(card => {
        card.addEventListener('click', () => {
            const moduleId = card.getAttribute('data-module');
            const moduleName = card.querySelector('h3').textContent;
            
            // Set module title
            moduleTitle.textContent = moduleName;
            
            // Reset progress
            moduleProgress.style.width = '0%';
            
            // Load module content 
            loadModuleContent(moduleId, moduleContent);
            
            // Show module container
            document.body.style.overflow = 'hidden';
            moduleContainer.style.display = 'flex';
            
            // Set initial progress
            moduleProgress.style.width = '0%';
        });
    });
}

function loadModuleContent(moduleId, container) {
    // Clear previous content
    container.innerHTML = '';
    
    // Get module data from imported module-data.js
    const module = moduleData[moduleId];
    
    if (!module) {
        container.innerHTML = '<div class="error-message">Module not found</div>';
        return;
    }
    
    // Create card carousel container
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'module-cards-container';
    
    // Create navigation controls
    const navControls = document.createElement('div');
    navControls.className = 'module-nav-controls';
    navControls.innerHTML = `
        <button class="nav-btn prev-btn" disabled>
            <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
            </svg>
        </button>
        <div class="nav-indicators"></div>
        <button class="nav-btn next-btn">
            <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor"/>
            </svg>
        </button>
    `;
    
    // Create and append cards for each section
    module.sections.forEach((section, index) => {
        // Create card
        const card = document.createElement('div');
        card.className = 'module-card-item';
        card.id = `card-${section.id}`;
        card.dataset.index = index;
        
        if (index > 0) {
            card.classList.add('hidden');
        } else {
            card.classList.add('active');
        }
        
        // Card header
        const cardHeader = document.createElement('div');
        cardHeader.className = 'card-header';
        cardHeader.innerHTML = `<h3>${section.title}</h3>`;
        
        // Card content
        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';
        cardContent.innerHTML = section.content;
        
        // Append elements to card
        card.appendChild(cardHeader);
        card.appendChild(cardContent);
        
        // Append card to container
        cardsContainer.appendChild(card);
        
        // Add indicator
        const indicator = document.createElement('div');
        indicator.className = 'nav-indicator';
        if (index === 0) indicator.classList.add('active');
        navControls.querySelector('.nav-indicators').appendChild(indicator);
    });
    
    // Append cards and navigation to container
    container.appendChild(cardsContainer);
    container.appendChild(navControls);
    
    // Setup navigation
    setupCardNavigation(container, module.sections.length);
    
    // Setup any interactive elements (quizzes, etc.)
    if (module.sections.some(section => section.id === 'assessment')) {
        setupQuiz(container, module.answers);
    }
    
    // Initialize progress
    const updateProgress = () => {
        const cardCount = module.sections.length;
        const progress = ((0 + 1) / cardCount) * 100;
        
        // Animate progress bar
        gsap.to('#module-progress', {
            width: `${progress}%`,
            duration: 0.8,
            ease: "power3.out",
            onStart: function() {
                gsap.to('#module-progress', {
                    backgroundColor: 0 === cardCount - 1 
                        ? '#81C784' 
                        : 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))',
                    duration: 0.8
                });
            }
        });
    };
    updateProgress();
    
    // Add entrance animation to header
    animateModuleHeader();
}

function animateModuleHeader() {
    const moduleHeader = document.querySelector('.module-header');
    const moduleTitle = document.getElementById('module-title');
    const backBtn = document.querySelector('.back-btn');
    const progressContainer = document.querySelector('.progress-container');
    const progressBar = document.getElementById('module-progress');
    
    gsap.fromTo(moduleHeader, 
        { y: -50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.7)" }
    );
    
    gsap.fromTo(moduleTitle, 
        { x: -20, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: "back.out(1.7)" }
    );
    
    gsap.fromTo(backBtn, 
        { x: -20, opacity: 0, rotation: -90 }, 
        { x: 0, opacity: 1, rotation: 0, duration: 0.5, delay: 0.1, ease: "back.out(1.7)" }
    );
    
    gsap.fromTo(progressContainer, 
        { x: 20, opacity: 0, width: '50%' }, 
        { x: 0, opacity: 1, width: 'calc(100% - 300px)', duration: 0.6, delay: 0.3, ease: "back.out(1.7)" }
    );
    
    gsap.fromTo(progressBar,
        { width: '0%', opacity: 0.5 },
        { width: '0%', opacity: 1, duration: 0.4, delay: 0.6 }
    );
}

function setupCardNavigation(container, cardCount) {
    const prevBtn = container.querySelector('.prev-btn');
    const nextBtn = container.querySelector('.next-btn');
    const cards = container.querySelectorAll('.module-card-item');
    const indicators = container.querySelectorAll('.nav-indicator');
    let currentCardIndex = 0;
    let startX = 0;
    let endX = 0;
    let isSwiping = false;
    
    // Update progress bar
    const updateProgress = () => {
        const progress = ((currentCardIndex + 1) / cardCount) * 100;
        
        // Animate progress bar
        gsap.to('#module-progress', {
            width: `${progress}%`,
            duration: 0.8,
            ease: "power3.out",
            onStart: function() {
                gsap.to('#module-progress', {
                    backgroundColor: currentCardIndex === cardCount - 1 
                        ? '#81C784' 
                        : 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))',
                    duration: 0.8
                });
            }
        });
    };
    
    // Navigate to specific card
    const navigateToCard = (index) => {
        if (isSwiping) return; // Prevent navigation during animation
        
        isSwiping = true;
        
        // Hide all cards and deactivate indicators
        cards.forEach(card => card.classList.remove('active', 'hidden', 'previous', 'next', 'sliding-left', 'sliding-right', 'sliding-in-left', 'sliding-in-right'));
        indicators.forEach(ind => ind.classList.remove('active'));
        
        // Show the current card
        cards.forEach((card, i) => {
            if (i < index) {
                card.classList.add('previous');
            } else if (i > index) {
                card.classList.add('next');
            } else {
                card.classList.add('active');
            }
        });
        
        // Play a satisfying sound effect on navigation
        playNavigationSound(currentCardIndex < index ? 'forward' : 'backward');
        
        // Create enhanced 3D transition effect
        if (currentCardIndex < index) {
            // Moving forward - current card slides out left, new card slides in right
            gsap.to(cards[currentCardIndex], {
                rotationY: -15,
                x: '-100%',
                opacity: 0,
                scale: 0.85,
                duration: 0.7,
                ease: "power2.inOut",
                transformOrigin: "left center"
            });
            
            gsap.fromTo(cards[index], 
                { rotationY: 15, x: '100%', opacity: 0, scale: 0.85 }, 
                { rotationY: 0, x: 0, opacity: 1, scale: 1, duration: 0.7, delay: 0.1, ease: "power2.out", transformOrigin: "right center" }
            );
            
            // Animate the next button
            gsap.fromTo(nextBtn, 
                { scale: 0.8 }, 
                { scale: 1.2, duration: 0.3, yoyo: true, repeat: 1, ease: "back.out(3)" }
            );
        } else if (currentCardIndex > index) {
            // Moving backward - current card slides out right, new card slides in left
            gsap.to(cards[currentCardIndex], {
                rotationY: 15,
                x: '100%',
                opacity: 0,
                scale: 0.85,
                duration: 0.7,
                ease: "power2.inOut",
                transformOrigin: "right center"
            });
            
            gsap.fromTo(cards[index], 
                { rotationY: -15, x: '-100%', opacity: 0, scale: 0.85 }, 
                { rotationY: 0, x: 0, opacity: 1, scale: 1, duration: 0.7, delay: 0.1, ease: "power2.out", transformOrigin: "left center" }
            );
            
            // Animate the prev button
            gsap.fromTo(prevBtn, 
                { scale: 0.8 }, 
                { scale: 1.2, duration: 0.3, yoyo: true, repeat: 1, ease: "back.out(3)" }
            );
        }
        
        // Update indicator with animation
        indicators[index].classList.add('active');
        gsap.fromTo(indicators[index], 
            { scale: 1 }, 
            { scale: 1.5, duration: 0.4, ease: "back.out(1.7)" }
        );
        
        // Update button states
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === cardCount - 1;
        
        // Update progress
        currentCardIndex = index;
        updateProgress();
        
        // Scroll to top of new card
        setTimeout(() => {
            container.scrollTop = 0;
            // Add scroll arrow to new card
            addScrollArrow(cards[index]);
        }, 300);
        
        // Reset swiping flag after animation completes
        setTimeout(() => {
            isSwiping = false;
        }, 800);
    };
    
    // Add scroll arrow to card
    const addScrollArrow = (card) => {
        // Remove any existing scroll arrows
        const existingArrows = document.querySelectorAll('.scroll-down-arrow');
        existingArrows.forEach(arrow => arrow.remove());
        
        // Create new scroll arrow
        const scrollArrow = document.createElement('div');
        scrollArrow.className = 'scroll-down-arrow';
        scrollArrow.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" fill="currentColor"/>
            </svg>
        `;
        
        card.appendChild(scrollArrow);
        
        // Check if scroll is needed
        updateScrollArrowVisibility(card, scrollArrow);
        
        // Add scroll event listener
        card.addEventListener('scroll', () => {
            updateScrollArrowVisibility(card, scrollArrow);
        });
        
        // Add click event to arrow
        scrollArrow.addEventListener('click', () => {
            card.scrollBy({ 
                top: 200, 
                behavior: 'smooth' 
            });
        });
    };
    
    // Update scroll arrow visibility
    const updateScrollArrowVisibility = (card, arrow) => {
        if (card.scrollHeight <= card.clientHeight) {
            // Content fits entirely in view - hide arrow
            arrow.classList.add('hidden');
        } else if (Math.abs(card.scrollHeight - card.clientHeight - card.scrollTop) < 10) {
            // Scrolled to bottom - hide arrow
            arrow.classList.add('hidden');
        } else {
            // More content to scroll to - show arrow
            arrow.classList.remove('hidden');
        }
    };
    
    function playNavigationSound(direction) {
        // Create audio context and play a subtle sound
        // This is just a placeholder for actual sound implementation
        // You would need to add sound files or use Web Audio API to generate sounds
        console.log(`Playing ${direction} navigation sound effect`);
    }
    
    // Add click event to prev/next buttons
    prevBtn.addEventListener('click', () => {
        if (currentCardIndex > 0 && !isSwiping) {
            navigateToCard(currentCardIndex - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentCardIndex < cardCount - 1 && !isSwiping) {
            navigateToCard(currentCardIndex + 1);
        }
    });
    
    // Add click events to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (!isSwiping && index !== currentCardIndex) {
                navigateToCard(index);
            }
        });
    });
    
    // Add swipe functionality with reduced sensitivity
    const handleSwipe = () => {
        if (isSwiping) return;
        
        const swipeThreshold = 120; // Threshold for swipe detection
        if (startX - endX > swipeThreshold && currentCardIndex < cardCount - 1) {
            // Swipe left - go to next
            navigateToCard(currentCardIndex + 1);
        } else if (endX - startX > swipeThreshold && currentCardIndex > 0) {
            // Swipe right - go to previous
            navigateToCard(currentCardIndex - 1);
        }
    };
    
    const cardsContainer = container.querySelector('.module-cards-container');
    cardsContainer.addEventListener('touchstart', e => {
        startX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    cardsContainer.addEventListener('touchend', e => {
        endX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    // Initialize progress
    updateProgress();
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (container.closest('.module-container').style.display === 'flex') {
            if (e.key === 'ArrowRight' && currentCardIndex < cardCount - 1 && !isSwiping) {
                navigateToCard(currentCardIndex + 1);
            } else if (e.key === 'ArrowLeft' && currentCardIndex > 0 && !isSwiping) {
                navigateToCard(currentCardIndex - 1);
            }
        }
    });
    
    // Add initial scroll arrow to the first card
    setTimeout(() => {
        addScrollArrow(cards[0]);
    }, 500);
}

function setupQuiz(container, answers) {
    const quizSubmitBtn = container.querySelector('.quiz-submit');
    if (quizSubmitBtn) {
        quizSubmitBtn.addEventListener('click', () => {
            const quizQuestions = container.querySelectorAll('.quiz-question');
            let correctAnswers = 0;
            let firstIncorrectIndex = -1;
            
            quizQuestions.forEach((question, index) => {
                const questionId = question.querySelector('input[type="radio"]').name;
                const selectedOption = question.querySelector(`input[name="${questionId}"]:checked`);
                const feedbackContainer = question.querySelector('.feedback-container');
                
                if (selectedOption) {
                    if (selectedOption.value === answers[questionId]) {
                        feedbackContainer.innerHTML = '<div class="feedback correct">Correct!</div>';
                        correctAnswers++;
                    } else {
                        feedbackContainer.innerHTML = '<div class="feedback incorrect">Incorrect. Please review the module content.</div>';
                        if (firstIncorrectIndex === -1) {
                            firstIncorrectIndex = index;
                        }
                    }
                } else {
                    feedbackContainer.innerHTML = '<div class="feedback warning">Please select an answer.</div>';
                    if (firstIncorrectIndex === -1) {
                        firstIncorrectIndex = index;
                    }
                }
            });
            
            // Scroll to the first incorrect answer if any
            if (firstIncorrectIndex !== -1) {
                const firstIncorrectQuestion = quizQuestions[firstIncorrectIndex];
                setTimeout(() => {
                    firstIncorrectQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 200);
            }
            
            // Show overall score as a modal if all answers are correct
            if (correctAnswers === quizQuestions.length) {
                const completionEl = createCompletionMessage('Great job! You\'ve completed this module.');
                document.body.appendChild(completionEl);
                
                // Add exciting completion animation
                gsap.from('.completion-message', {
                    scale: 0.5,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'back.out(1.7)'
                });
            }
        });
    }
}

function createCompletionMessage(message) {
    const completionEl = document.createElement('div');
    completionEl.className = 'module-completion';
    completionEl.innerHTML = `
        <div class="completion-message">
            <svg viewBox="0 0 24 24" width="48" height="48">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#4CAF50"/>
            </svg>
            <h3>${message}</h3>
            <button class="btn primary-btn" id="return-to-modules">Return to Modules</button>
        </div>
    `;
    
    // Add event listener
    setTimeout(() => {
        const returnBtn = completionEl.querySelector('#return-to-modules');
        if (returnBtn) {
            returnBtn.addEventListener('click', () => {
                document.body.removeChild(completionEl);
                closeModuleView();
            });
        }
    }, 100);
    
    return completionEl;
}

function closeModuleView() {
    const moduleContainer = document.getElementById('module-container');
    
    // Add exit animation
    gsap.to(moduleContainer, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
            moduleContainer.style.display = 'none';
            moduleContainer.style.opacity = 1;
            moduleContainer.style.y = 0;
            document.body.style.overflow = 'auto';
        }
    });
    
    // Reset progress animation
    gsap.killTweensOf('#module-progress');
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Update active state in menu
                document.querySelectorAll('.menu a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Set active state based on scroll position
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('.menu a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + section.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Initialize theme based on user preference or saved setting
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon('dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        updateThemeIcon('light');
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Animate the transition
        const tl = gsap.timeline();
        tl.to('body', { opacity: 0.8, duration: 0.2, ease: 'power2.out' })
          .call(() => {
              document.documentElement.setAttribute('data-theme', newTheme);
              localStorage.setItem('theme', newTheme);
              updateThemeIcon(newTheme);
          })
          .to('body', { opacity: 1, duration: 0.2, ease: 'power2.in' });
        
        // Create ripple effect
        createRipple(themeToggle);
    });
    
    // Listen for system preference changes
    prefersDarkScheme.addEventListener('change', (e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    if (theme === 'dark') {
        gsap.to(sunIcon, { opacity: 0, rotate: -180, duration: 0.5, ease: 'back.out' });
        gsap.to(moonIcon, { opacity: 1, rotate: 0, duration: 0.5, ease: 'back.out' });
    } else {
        gsap.to(sunIcon, { opacity: 1, rotate: 0, duration: 0.5, ease: 'back.out' });
        gsap.to(moonIcon, { opacity: 0, rotate: 180, duration: 0.5, ease: 'back.out' });
    }
}

function createRipple(button) {
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.position = 'absolute';
    circle.style.borderRadius = '50%';
    circle.style.transform = 'translate(-50%, -50%) scale(0)';
    circle.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
    
    const rect = button.getBoundingClientRect();
    circle.style.left = `${button.clientWidth / 2}px`;
    circle.style.top = `${button.clientHeight / 2}px`;
    
    button.appendChild(circle);
    
    gsap.to(circle, {
        scale: 3,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => {
            circle.remove();
        }
    });
}