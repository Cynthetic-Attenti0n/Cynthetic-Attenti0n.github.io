import { gsap } from 'gsap';
import { comingSoonModules } from '../../ComingSoonData.js';

export function loadComingSoonScreen() {
    const comingSoonScreen = document.getElementById('coming-soon-screen');
    
    const comingSoonContent = `
        <div class="coming-soon-container">
            <h2>Coming Soon</h2>
            <div class="coming-soon-illustration">
                <svg viewBox="0 0 400 300" width="100%" height="auto">
                    <circle cx="200" cy="150" r="100" fill="#FFD8E3" class="construction-circle" />
                    <g class="construction-icons">
                        <path d="M150,120 L250,120 L250,180 L150,180 Z" fill="#FF9FB2" stroke="#FF6384" stroke-width="4" class="blueprint" />
                        <path d="M150,120 L200,90 L250,120" fill="none" stroke="#FF6384" stroke-width="4" class="blueprint-roof" />
                        <circle cx="170" cy="150" r="10" fill="#36A2EB" class="blueprint-window" />
                        <circle cx="230" cy="150" r="10" fill="#36A2EB" class="blueprint-window" />
                        <rect x="190" y="150" width="20" height="30" fill="#36A2EB" class="blueprint-door" />
                    </g>
                    <g class="construction-tools">
                        <path d="M130,220 L150,200 L270,200 L290,220 Z" fill="#FFCE56" class="ruler" />
                        <path d="M140,200 L140,210 M160,200 L160,215 M180,200 L180,210 M200,200 L200,215 M220,200 L220,210 M240,200 L240,215 M260,200 L260,210" stroke="#333" stroke-width="2" />
                        <path d="M100,130 L120,110 L130,120 L110,140 Z" fill="#9AD0F5" class="pencil" />
                        <path d="M120,110 L125,105 L135,115 L130,120 Z" fill="#FF6384" class="pencil-eraser" />
                        <path d="M110,140 L105,145" fill="none" stroke="#333" stroke-width="1" class="pencil-tip" />
                        <path d="M280,150 C290,140 300,140 310,150 C320,160 320,170 310,180 C300,190 290,190 280,180 Z" fill="#FF9FB2" class="paint-palette" />
                        <circle cx="290" cy="155" r="5" fill="#36A2EB" />
                        <circle cx="300" cy="165" r="5" fill="#FFCE56" />
                        <circle cx="290" cy="175" r="5" fill="#4CAF50" />
                    </g>
                </svg>
            </div>
            <p class="coming-soon-description">
                We're working on exciting new modules to enhance your learning experience.
                Check back soon for these upcoming topics:
            </p>
            
            <div class="modules-grid">
                ${generateComingSoonModules()}
            </div>
            
            <button class="back-to-modules-btn">
                Back to Modules
            </button>
        </div>
    `;
    
    comingSoonScreen.innerHTML = comingSoonContent;
    
    // Add event listener to back button
    const backButton = comingSoonScreen.querySelector('.back-to-modules-btn');
    backButton.addEventListener('click', () => {
        window.appAPI.switchScreen('comingSoon', 'moduleSelection');
    });
    
    // Add module detail view handlers
    setupModuleDetailViewHandlers();
    
    // Style the module cards for unreleased content
    addComingSoonStyles();
    
    // Animations
    animateComingSoonScreen();
}

function generateComingSoonModules() {
    let modulesHTML = '';
    
    comingSoonModules.forEach(module => {
        const lessonCount = module.lessons.length;
        
        modulesHTML += `
            <div class="module-card module-card-tbc" data-module-id="${module.module_id}">
                <h3>${module.module_title}</h3>
                <p>${module.lessons[0].content_blocks.find(block => block.type === "introduction")?.text || 
                    "Coming soon to enhance your learning journey."}</p>
                <div class="module-card-status not-started">
                    <div class="status-indicator">
                        <div class="status-dot"></div>
                        <span>Coming Soon</span>
                    </div>
                    <div class="lessons-count">
                        ${lessonCount} lesson${lessonCount !== 1 ? 's' : ''}
                    </div>
                </div>
                <div class="module-details-btn" data-module-id="${module.module_id}">
                    View Details
                </div>
            </div>
        `;
    });
    
    return modulesHTML;
}

function setupModuleDetailViewHandlers() {
    const detailButtons = document.querySelectorAll('.module-details-btn');
    
    detailButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const moduleId = button.getAttribute('data-module-id');
            showModuleDetails(moduleId);
        });
    });
}

function showModuleDetails(moduleId) {
    const moduleData = comingSoonModules.find(module => module.module_id === moduleId);
    if (!moduleData) return;
    
    // Create modal for module details
    const modalEl = document.createElement('div');
    modalEl.className = 'coming-soon-modal';
    
    let lessonsHTML = '';
    moduleData.lessons.forEach(lesson => {
        // Generate content blocks HTML
        let contentBlocksHTML = '';
        lesson.content_blocks.forEach(block => {
            contentBlocksHTML += `
                <div class="content-block-item content-block-${block.type}">
                    <span class="content-block-label">${block.type.charAt(0).toUpperCase() + block.type.slice(1)}</span>
                    <p>${block.text}</p>
                </div>
            `;
        });
        
        // Generate media HTML if available
        let mediaHTML = '';
        if (lesson.media && lesson.media.length > 0) {
            mediaHTML = `
                <div class="media-list">
                    <h5>Media Resources</h5>
                    <ul>
                        ${lesson.media.map(item => `
                            <li>
                                <span class="media-type-icon">${item.type === 'image' ? '🖼️' : '🎥'}</span>
                                ${item.description}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        }
        
        lessonsHTML += `
            <div class="coming-soon-lesson">
                <h4>${lesson.lesson_title}</h4>
                <div class="content-blocks">
                    ${contentBlocksHTML}
                </div>
                ${mediaHTML}
                ${lesson.quiz_questions.length > 0 ? 
                    `<div class="quiz-preview">
                        <span class="quiz-icon">🧠</span> Includes ${lesson.quiz_questions.length} quiz question${lesson.quiz_questions.length !== 1 ? 's' : ''}
                        <button class="show-quiz-details-btn" data-lesson="${lesson.lesson_id}">View Quiz</button>
                    </div>` : ''}
            </div>
        `;
    });
    
    modalEl.innerHTML = `
        <div class="coming-soon-modal-content">
            <button class="modal-close-btn">×</button>
            <h3>${moduleData.module_title}</h3>
            <div class="coming-soon-lessons">
                ${lessonsHTML}
            </div>
            <p class="coming-soon-note">This module is currently in development. Check back soon!</p>
            <div class="newsletter-signup">
                <h4>Get notified when this module is available</h4>
                <div class="newsletter-form">
                    <input type="email" placeholder="Your email address" class="newsletter-input">
                    <button class="newsletter-btn">Notify Me</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalEl);
    
    // Add close button handler
    const closeBtn = modalEl.querySelector('.modal-close-btn');
    closeBtn.addEventListener('click', () => {
        gsap.to(modalEl, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            onComplete: () => modalEl.remove()
        });
    });
    
    // Add quiz details buttons handlers
    const quizButtons = modalEl.querySelectorAll('.show-quiz-details-btn');
    quizButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lessonId = button.getAttribute('data-lesson');
            const lesson = moduleData.lessons.find(l => l.lesson_id === lessonId);
            if (lesson) {
                showQuizDetails(lesson);
            }
        });
    });
    
    // Add newsletter signup handler
    const newsletterBtn = modalEl.querySelector('.newsletter-btn');
    newsletterBtn.addEventListener('click', () => {
        const input = modalEl.querySelector('.newsletter-input');
        if (input.value.trim() === '') {
            // Shake animation for empty input
            gsap.to(input, {
                x: [-10, 10, -10, 10, 0],
                duration: 0.5
            });
            return;
        }
        
        // Show success message
        const formEl = modalEl.querySelector('.newsletter-form');
        formEl.innerHTML = '<p class="success-message">Thanks! We\'ll notify you when this module is available.</p>';
        
        // Success animation
        gsap.fromTo('.success-message', 
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5 }
        );
    });
    
    // Animate modal entrance
    gsap.fromTo(modalEl, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4 }
    );
    
    // Animate content elements
    gsap.fromTo(modalEl.querySelectorAll('h3, .coming-soon-lesson, .newsletter-signup'), 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, delay: 0.2 }
    );
}

function showQuizDetails(lesson) {
    // Create quiz modal
    const quizModalEl = document.createElement('div');
    quizModalEl.className = 'quiz-details-modal';
    
    // Generate quiz questions HTML
    let questionsHTML = '';
    lesson.quiz_questions.forEach((question, index) => {
        let optionsHTML = '';
        question.options.forEach((option, optIndex) => {
            const isCorrect = option === question.correct_answer;
            optionsHTML += `
                <div class="quiz-option ${isCorrect ? 'correct-answer' : ''}">
                    <span class="option-letter">${String.fromCharCode(65 + optIndex)}</span>
                    <span class="option-text">${option}</span>
                    ${isCorrect ? '<span class="correct-indicator">✓</span>' : ''}
                </div>
            `;
        });
        
        questionsHTML += `
            <div class="quiz-question-preview">
                <h5>Question ${index + 1}</h5>
                <p class="question-text">${question.question}</p>
                <div class="quiz-options-list">
                    ${optionsHTML}
                </div>
            </div>
        `;
    });
    
    quizModalEl.innerHTML = `
        <div class="quiz-modal-content">
            <button class="modal-close-btn">×</button>
            <h4>${lesson.lesson_title} - Quiz Preview</h4>
            <div class="quiz-questions-container">
                ${questionsHTML}
            </div>
            <p class="quiz-note">This quiz will be available when the module is released.</p>
        </div>
    `;
    
    document.body.appendChild(quizModalEl);
    
    // Add close button handler
    const closeBtn = quizModalEl.querySelector('.modal-close-btn');
    closeBtn.addEventListener('click', () => {
        gsap.to(quizModalEl, {
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
            onComplete: () => quizModalEl.remove()
        });
    });
    
    // Animate modal entrance
    gsap.fromTo(quizModalEl, 
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" }
    );
    
    // Animate content elements
    gsap.fromTo(quizModalEl.querySelectorAll('h4, .quiz-question-preview'), 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.5 }
    );
    
    // Highlight correct answers with a subtle animation
    gsap.fromTo('.correct-answer', 
        { backgroundColor: 'rgba(76, 175, 80, 0)' },
        { 
            backgroundColor: 'rgba(76, 175, 80, 0.15)', 
            duration: 1,
            delay: 0.8,
            repeat: 1,
            yoyo: true
        }
    );
}

function addComingSoonStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .module-card-tbc {
            border-left: 5px solid var(--dark-gray);
            opacity: 0.9;
            background: linear-gradient(to right, rgba(200, 200, 200, 0.1), rgba(255, 255, 255, 1) 20%);
            position: relative;
            overflow: hidden;
        }
        
        .module-card-tbc h3 {
            color: var(--dark-gray);
        }
        
        .module-card-tbc:hover {
            transform: translateY(-5px);
            box-shadow: var(--box-shadow);
        }
        
        .modules-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .module-details-btn {
            display: inline-block;
            margin-top: 1rem;
            padding: 0.5rem 1rem;
            background-color: var(--secondary-color);
            color: white;
            border-radius: 20px;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .module-details-btn:hover {
            background-color: var(--primary-color);
            transform: translateY(-2px);
        }
        
        .coming-soon-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
            backdrop-filter: blur(5px);
        }
        
        .coming-soon-modal-content {
            background-color: var(--white);
            border-radius: var(--border-radius);
            padding: 2rem;
            width: 100%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }
        
        .modal-close-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--dark-gray);
        }
        
        .coming-soon-lesson {
            margin-bottom: 1.5rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid var(--medium-gray);
        }
        
        .coming-soon-lesson:last-child {
            border-bottom: none;
        }
        
        .content-blocks {
            margin-top: 1rem;
        }
        
        .content-block-item {
            margin-bottom: 1rem;
            padding: 0.8rem;
            border-radius: var(--border-radius);
            background-color: var(--light-gray);
        }
        
        .content-block-introduction {
            background-color: rgba(255, 99, 132, 0.1);
        }
        
        .content-block-content {
            background-color: rgba(54, 162, 235, 0.1);
        }
        
        .content-block-summary {
            background-color: rgba(255, 206, 86, 0.1);
        }
        
        .content-block-label {
            display: inline-block;
            padding: 0.2rem 0.6rem;
            background-color: var(--primary-color);
            color: white;
            border-radius: 12px;
            font-size: 0.8rem;
            margin-bottom: 0.5rem;
        }
        
        .content-block-content .content-block-label {
            background-color: var(--secondary-color);
        }
        
        .content-block-summary .content-block-label {
            background-color: var(--accent-color);
            color: var(--text-color);
        }
        
        .media-list {
            margin-top: 1rem;
            padding: 0.8rem;
            background-color: rgba(76, 175, 80, 0.1);
            border-radius: var(--border-radius);
        }
        
        .media-list ul {
            list-style: none;
            padding: 0;
            margin: 0.5rem 0 0;
        }
        
        .media-list li {
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
        }
        
        .media-type-icon {
            margin-right: 0.5rem;
            font-size: 1.2rem;
        }
        
        .quiz-preview {
            display: inline-block;
            padding: 0.5rem 1rem;
            background-color: rgba(255, 206, 86, 0.2);
            border-radius: 20px;
            font-size: 0.9rem;
            margin-top: 0.8rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .quiz-icon {
            font-size: 1.2rem;
        }
        
        .show-quiz-details-btn {
            margin-left: auto;
            padding: 0.3rem 0.8rem;
            background-color: var(--secondary-color);
            color: white;
            border: none;
            border-radius: 15px;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .show-quiz-details-btn:hover {
            background-color: var(--primary-color);
            transform: translateY(-2px);
        }
        
        .coming-soon-note {
            font-style: italic;
            color: var(--dark-gray);
            margin: 1.5rem 0;
            padding: 1rem;
            background-color: var(--light-gray);
            border-radius: var(--border-radius);
            text-align: center;
        }
        
        .newsletter-signup {
            background-color: rgba(54, 162, 235, 0.1);
            padding: 1.5rem;
            border-radius: var(--border-radius);
            text-align: center;
        }
        
        .newsletter-form {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
        }
        
        .newsletter-input {
            flex: 1;
            padding: 0.8rem;
            border: 1px solid var(--medium-gray);
            border-radius: 20px;
            font-family: inherit;
        }
        
        .newsletter-btn {
            padding: 0.8rem 1.2rem;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .newsletter-btn:hover {
            background-color: var(--secondary-color);
        }
        
        .success-message {
            color: var(--success-color);
            font-weight: 600;
        }
        
        .lessons-count {
            font-size: 0.9rem;
            color: var(--dark-gray);
        }
        
        .quiz-details-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1100;
            padding: 20px;
        }
        
        .quiz-modal-content {
            background-color: var(--white);
            border-radius: var(--border-radius);
            padding: 2rem;
            width: 100%;
            max-width: 550px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }
        
        .quiz-question-preview {
            margin-bottom: 1.5rem;
            padding: 1rem;
            background-color: var(--light-gray);
            border-radius: var(--border-radius);
        }
        
        .question-text {
            font-weight: 600;
            margin-bottom: 1rem;
        }
        
        .quiz-options-list {
            display: flex;
            flex-direction: column;
            gap: 0.7rem;
        }
        
        .quiz-option {
            padding: 0.8rem;
            background-color: white;
            border-radius: var(--border-radius);
            border: 1px solid var(--medium-gray);
            display: flex;
            align-items: center;
            position: relative;
        }
        
        .correct-answer {
            border-color: var(--success-color);
        }
        
        .option-letter {
            width: 25px;
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--secondary-color);
            color: white;
            border-radius: 50%;
            margin-right: 10px;
            font-size: 0.9rem;
            font-weight: 600;
        }
        
        .correct-answer .option-letter {
            background-color: var(--success-color);
        }
        
        .option-text {
            flex: 1;
        }
        
        .correct-indicator {
            position: absolute;
            right: 15px;
            color: var(--success-color);
            font-size: 1.2rem;
            font-weight: bold;
        }
        
        .quiz-note {
            text-align: center;
            margin-top: 1.5rem;
            padding: 1rem;
            background-color: rgba(255, 206, 86, 0.2);
            border-radius: var(--border-radius);
            font-style: italic;
        }
        
        @media (max-width: 768px) {
            .newsletter-form {
                flex-direction: column;
            }
            
            .newsletter-input, .newsletter-btn {
                width: 100%;
            }
            
            .quiz-preview {
                flex-direction: column;
                align-items: flex-start;
                gap: 0.5rem;
                padding: 0.8rem;
            }
            
            .show-quiz-details-btn {
                margin-left: 0;
                width: 100%;
            }
        }
    `;
    document.head.appendChild(style);
}

function animateComingSoonScreen() {
    // Animate the construction illustration
    gsap.from('.construction-circle', {
        scale: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.5)'
    });
    
    gsap.from('.construction-icons', {
        y: -50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'back.out(1.7)'
    });
    
    gsap.from('.construction-tools > *', {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.6,
        transformOrigin: 'center',
        ease: 'back.out(1.5)'
    });
    
    // Animate the text content
    gsap.from('.coming-soon-container h2', {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    gsap.from('.coming-soon-description', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'power2.out'
    });
    
    gsap.from('.back-to-modules-btn', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        delay: 1.2,
        ease: 'back.out(1.5)'
    });
    
    // Add continuous animations
    gsap.to('.blueprint', {
        y: -5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
    
    gsap.to('.construction-tools', {
        rotate: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        transformOrigin: 'center',
        ease: 'sine.inOut'
    });
}