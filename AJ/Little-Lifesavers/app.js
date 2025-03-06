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
    // Section titles
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
            ease: 'power2.out'
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
            
            // Animate progress (for demo)
            gsap.to(moduleProgress, {
                width: '100%',
                duration: 30,
                ease: 'none'
            });
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
}

function setupCardNavigation(container, cardCount) {
    const prevBtn = container.querySelector('.prev-btn');
    const nextBtn = container.querySelector('.next-btn');
    const cards = container.querySelectorAll('.module-card-item');
    const indicators = container.querySelectorAll('.nav-indicator');
    let currentCardIndex = 0;
    
    // Update progress bar
    const updateProgress = () => {
        const progress = ((currentCardIndex + 1) / cardCount) * 100;
        document.getElementById('module-progress').style.width = `${progress}%`;
    };
    
    // Navigate to specific card
    const navigateToCard = (index) => {
        // Hide all cards and deactivate indicators
        cards.forEach(card => card.classList.remove('active', 'hidden', 'previous'));
        indicators.forEach(ind => ind.classList.remove('active'));
        
        // Show the current card
        cards.forEach((card, i) => {
            if (i < index) {
                card.classList.add('previous');
            } else if (i > index) {
                card.classList.add('hidden');
            } else {
                card.classList.add('active');
            }
        });
        
        // Update indicator
        indicators[index].classList.add('active');
        
        // Update button states
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === cardCount - 1;
        
        // Update progress
        currentCardIndex = index;
        updateProgress();
    };
    
    // Add click event to prev/next buttons
    prevBtn.addEventListener('click', () => {
        if (currentCardIndex > 0) {
            navigateToCard(currentCardIndex - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentCardIndex < cardCount - 1) {
            navigateToCard(currentCardIndex + 1);
        }
    });
    
    // Add click events to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            navigateToCard(index);
        });
    });
    
    // Add swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;
    const handleSwipe = () => {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold && currentCardIndex < cardCount - 1) {
            // Swipe left - go to next
            navigateToCard(currentCardIndex + 1);
        } else if (touchEndX - touchStartX > swipeThreshold && currentCardIndex > 0) {
            // Swipe right - go to previous
            navigateToCard(currentCardIndex - 1);
        }
    };
    
    const cardsContainer = container.querySelector('.module-cards-container');
    cardsContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    cardsContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    // Initialize progress
    updateProgress();
}

function setupQuiz(container, answers) {
    const quizSubmitBtn = container.querySelector('.quiz-submit');
    if (quizSubmitBtn) {
        quizSubmitBtn.addEventListener('click', () => {
            const quizQuestions = container.querySelectorAll('.quiz-question');
            let correctAnswers = 0;
            
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
                    }
                } else {
                    feedbackContainer.innerHTML = '<div class="feedback warning">Please select an answer.</div>';
                }
            });
            
            // Show overall score
            if (correctAnswers === quizQuestions.length) {
                container.appendChild(createCompletionMessage('Great job! You\'ve completed this module.'));
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
            returnBtn.addEventListener('click', closeModuleView);
        }
    }, 100);
    
    return completionEl;
}

function closeModuleView() {
    const moduleContainer = document.getElementById('module-container');
    moduleContainer.style.display = 'none';
    document.body.style.overflow = 'auto';
    
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