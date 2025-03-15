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
            <div class="search-container">
                <div class="search-input-wrapper">
                    <input type="text" class="search-input" placeholder="Search upcoming content...">
                    <div class="search-icon">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" stroke-width="2"></circle>
                            <path d="M21,21 L16.65,16.65" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                        </svg>
                    </div>
                    <button class="search-clear" style="display: none;">×</button>
                </div>
                <div class="search-metrics">
                    <span class="results-count"></span>
                    <div class="search-tags-container"></div>
                </div>
            </div>
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
    
    // Setup search functionality
    setupSearch();
    
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
                <div class="content-block-item content-block-${block.type}" data-content="${block.text.toLowerCase()}">
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
            <div class="coming-soon-lesson" data-lesson-id="${lesson.lesson_id}">
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
            
            <div class="modal-search-container">
                <div class="modal-search-input-wrapper">
                    <input type="text" class="modal-search-input" placeholder="Search within this module...">
                    <div class="modal-search-icon">
                        <svg viewBox="0 0 24 24" width="20" height="20">
                            <circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" stroke-width="2"></circle>
                            <path d="M21,21 L16.65,16.65" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                        </svg>
                    </div>
                    <button class="modal-search-clear" style="display: none;">×</button>
                </div>
                <div class="modal-search-metrics">
                    <span class="modal-results-count"></span>
                </div>
            </div>
            
            <div class="coming-soon-lessons">
                ${lessonsHTML}
            </div>
            <div class="no-modal-results" style="display: none;">
                <svg viewBox="0 0 24 24" width="48" height="48" style="margin-bottom: 1rem;">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="#ccc" stroke-width="2" />
                    <line x1="8" y1="8" x2="16" y2="16" stroke="#ccc" stroke-width="2" />
                    <line x1="16" y1="8" x2="8" y2="16" stroke="#ccc" stroke-width="2" />
                </svg>
                <p>No content matches your search query.</p>
                <p>Try different keywords or browse all content.</p>
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
    
    // Setup modal search functionality
    setupModalSearch(modalEl, moduleData);
    
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
    
    // Animate search bar entrance
    gsap.fromTo(modalEl.querySelector('.modal-search-container'),
        { opacity: 0, y: -15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: 0.3, ease: "back.out(1.7)" }
    );
}

// Setup the modal search functionality
function setupModalSearch(modalEl, moduleData) {
    const searchInput = modalEl.querySelector('.modal-search-input');
    const searchClear = modalEl.querySelector('.modal-search-clear');
    const resultsCount = modalEl.querySelector('.modal-results-count');
    const contentBlocks = modalEl.querySelectorAll('.content-block-item');
    const lessonContainers = modalEl.querySelectorAll('.coming-soon-lesson');
    const noResults = modalEl.querySelector('.no-modal-results');
    
    searchInput.addEventListener('input', (e) => {
        const value = e.target.value.trim().toLowerCase();
        searchClear.style.display = value ? 'block' : 'none';
        
        if (value) {
            performModalSearch(value);
        } else {
            resetModalSearch();
        }
    });
    
    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchClear.style.display = 'none';
        resetModalSearch();
        searchInput.focus();
        
        // Add a playful animation to the search icon
        const searchIcon = modalEl.querySelector('.modal-search-icon');
        gsap.fromTo(searchIcon, 
            { rotate: 0 },
            { rotate: 360, duration: 0.6, ease: "back.out(1.7)" }
        );
    });
    
    function performModalSearch(query) {
        const searchTerms = query.split(' ').filter(term => term.length > 0);
        let matchCount = 0;
        let visibleLessons = new Set();
        
        // Reset previous search highlights
        contentBlocks.forEach(block => {
            const blockText = block.querySelector('p');
            blockText.innerHTML = blockText.textContent; // Remove any existing highlights
            block.classList.remove('highlight-match', 'hidden-block');
        });
        
        lessonContainers.forEach(lesson => {
            lesson.classList.remove('hidden-lesson');
        });
        
        if (searchTerms.length === 0) {
            resetModalSearch();
            return;
        }
        
        // Search and highlight content blocks
        contentBlocks.forEach(block => {
            const blockContent = block.getAttribute('data-content') || '';
            const parentLesson = block.closest('.coming-soon-lesson');
            const lessonId = parentLesson ? parentLesson.getAttribute('data-lesson-id') : null;
            
            let matches = false;
            
            searchTerms.forEach(term => {
                if (blockContent.includes(term)) {
                    matches = true;
                    const blockText = block.querySelector('p');
                    blockText.innerHTML = highlightMatchesInModal(blockText.textContent, term);
                }
            });
            
            if (matches) {
                matchCount++;
                block.classList.add('highlight-match');
                
                // Add scale pulse animation
                gsap.fromTo(block, 
                    { scale: 1 },
                    { scale: 1.02, duration: 0.3, yoyo: true, repeat: 1, ease: "power1.inOut" }
                );
                
                if (lessonId) {
                    visibleLessons.add(lessonId);
                }
            } else {
                block.classList.add('hidden-block');
                
                // Fade out animation
                gsap.to(block, {
                    opacity: 0.4,
                    duration: 0.3
                });
            }
        });
        
        // Hide lessons with no matching content
        lessonContainers.forEach(lesson => {
            const lessonId = lesson.getAttribute('data-lesson-id');
            if (!visibleLessons.has(lessonId)) {
                lesson.classList.add('hidden-lesson');
                
                // Collapse animation
                gsap.to(lesson, {
                    height: 0,
                    opacity: 0,
                    padding: 0,
                    marginBottom: 0,
                    duration: 0.4,
                    ease: "power2.inOut"
                });
            } else {
                // Make sure the lesson is visible
                gsap.to(lesson, {
                    height: "auto",
                    opacity: 1,
                    padding: "",
                    marginBottom: "",
                    duration: 0.4,
                    ease: "power2.out"
                });
            }
        });
        
        // Update results count
        resultsCount.textContent = matchCount > 0 
            ? `Found ${matchCount} matching content block${matchCount !== 1 ? 's' : ''}`
            : '';
        
        // Show or hide no results message
        if (matchCount === 0) {
            noResults.style.display = 'block';
            
            // Animate no results entrance
            gsap.fromTo(noResults, 
                { opacity: 0, y: 20, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.4)" }
            );
        } else {
            noResults.style.display = 'none';
        }
        
        // Scroll to first result with a smooth animation
        if (matchCount > 0) {
            const firstMatch = modalEl.querySelector('.highlight-match');
            if (firstMatch) {
                const modalContent = modalEl.querySelector('.coming-soon-modal-content');
                const firstMatchTop = firstMatch.getBoundingClientRect().top;
                const modalTop = modalContent.getBoundingClientRect().top;
                const scrollTop = firstMatchTop - modalTop - 20;
                
                gsap.to(modalContent, {
                    scrollTop: scrollTop,
                    duration: 0.6,
                    ease: "power2.out"
                });
            }
        }
    }
    
    function resetModalSearch() {
        resultsCount.textContent = '';
        noResults.style.display = 'none';
        
        contentBlocks.forEach(block => {
            block.classList.remove('highlight-match', 'hidden-block');
            const blockText = block.querySelector('p');
            blockText.innerHTML = blockText.textContent; // Remove highlights
            
            // Restore full opacity
            gsap.to(block, {
                opacity: 1,
                duration: 0.3
            });
        });
        
        lessonContainers.forEach(lesson => {
            lesson.classList.remove('hidden-lesson');
            
            // Restore visibility with animation
            gsap.to(lesson, {
                height: "auto",
                opacity: 1,
                padding: "",
                marginBottom: "",
                duration: 0.4,
                ease: "power2.out",
                clearProps: "all"
            });
        });
    }
    
    // Apply initial focus with a delay
    setTimeout(() => {
        // Add pulsing animation to search input to draw attention
        gsap.fromTo(searchInput, 
            { boxShadow: '0 0 0 rgba(54, 162, 235, 0)' },
            { 
                boxShadow: '0 0 10px rgba(54, 162, 235, 0.5)', 
                duration: 1,
                repeat: 3,
                yoyo: true,
                ease: "sine.inOut",
                onComplete: () => searchInput.focus()
            }
        );
    }, 1000);
}

function highlightMatchesInModal(text, term) {
    if (!term) return text;
    
    const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
    return text.replace(regex, '<span class="modal-highlight-text">$1</span>');
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
        
        .search-container {
            margin: 1rem auto 2rem;
            max-width: 600px;
            position: relative;
        }
        
        .search-input-wrapper {
            position: relative;
            display: flex;
            align-items: center;
            border-radius: 30px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            background-color: var(--white);
            overflow: hidden;
            transition: all 0.3s ease;
        }
        
        .search-input-wrapper:focus-within {
            box-shadow: 0 6px 20px rgba(54, 162, 235, 0.2);
            transform: translateY(-2px);
        }
        
        .search-input {
            flex: 1;
            padding: 1rem 1.5rem;
            border: none;
            font-size: 1.1rem;
            color: var(--text-color);
            outline: none;
            font-family: inherit;
            background: transparent;
        }
        
        .search-icon {
            padding: 0 1rem;
            color: var(--secondary-color);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .search-clear {
            background: none;
            border: none;
            color: var(--dark-gray);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0 1rem;
            display: none;
            transition: color 0.2s ease;
        }
        
        .search-clear:hover {
            color: var(--primary-color);
        }
        
        .search-metrics {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 0.5rem;
            margin-top: 0.8rem;
            min-height: 30px;
        }
        
        .results-count {
            font-size: 0.9rem;
            color: var(--dark-gray);
            font-style: italic;
        }
        
        .search-tags-container {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        
        .search-tag {
            background-color: rgba(54, 162, 235, 0.1);
            border-radius: 20px;
            padding: 0.3rem 0.8rem;
            font-size: 0.9rem;
            color: var(--secondary-color);
            display: flex;
            align-items: center;
            gap: 0.3rem;
        }
        
        .tag-remove {
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background-color: var(--secondary-color);
            color: white;
            font-size: 0.7rem;
        }
        
        .module-card-tbc.highlight {
            box-shadow: 0 10px 25px rgba(54, 162, 235, 0.25);
            transform: translateY(-5px) scale(1.02);
            z-index: 1;
            opacity: 1;
            border-left: 5px solid var(--primary-color);
        }
        
        .module-card-tbc.hidden {
            display: none;
        }
        
        .highlight-text {
            background-color: rgba(255, 220, 100, 0.4);
            border-radius: 3px;
            padding: 0 3px;
        }
        
        .no-results {
            text-align: center;
            padding: 2rem;
            color: var(--dark-gray);
            font-style: italic;
        }
        
        .module-card-tbc.search-animate {
            animation: searchPulse 1s ease-in-out;
        }
        
        @keyframes searchPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.03); }
            100% { transform: scale(1); }
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
        
        .modal-search-container {
            margin: 1rem 0;
            position: relative;
        }
        
        .modal-search-input-wrapper {
            position: relative;
            display: flex;
            align-items: center;
            border-radius: 20px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
            background-color: var(--light-gray);
            overflow: hidden;
            transition: all 0.3s ease;
        }
        
        .modal-search-input-wrapper:focus-within {
            box-shadow: 0 5px 15px rgba(54, 162, 235, 0.2);
            transform: translateY(-2px);
            background-color: var(--white);
        }
        
        .modal-search-input {
            flex: 1;
            padding: 0.8rem 1rem;
            border: none;
            font-size: 1rem;
            color: var(--text-color);
            outline: none;
            font-family: inherit;
            background: transparent;
        }
        
        .modal-search-icon {
            padding: 0 0.8rem;
            color: var(--secondary-color);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .modal-search-clear {
            background: none;
            border: none;
            color: var(--dark-gray);
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0 0.8rem;
            display: none;
            transition: color 0.2s ease;
        }
        
        .modal-search-clear:hover {
            color: var(--primary-color);
        }
        
        .modal-search-metrics {
            margin-top: 0.5rem;
            min-height: 20px;
        }
        
        .modal-results-count {
            font-size: 0.85rem;
            color: var(--dark-gray);
            font-style: italic;
        }
        
        .highlight-match {
            border: 2px solid var(--primary-color);
            animation: pulse-border 2s infinite;
        }
        
        @keyframes pulse-border {
            0% { border-color: var(--primary-light); }
            50% { border-color: var(--primary-color); }
            100% { border-color: var(--primary-light); }
        }
        
        .hidden-block {
            /* Keep the space but reduce visibility */
            opacity: 0.4;
        }
        
        .hidden-lesson {
            display: none;
        }
        
        .modal-highlight-text {
            background-color: rgba(255, 220, 100, 0.4);
            border-radius: 3px;
            padding: 0 3px;
            position: relative;
            animation: highlight-pulse 2s infinite;
        }
        
        @keyframes highlight-pulse {
            0% { background-color: rgba(255, 220, 100, 0.2); }
            50% { background-color: rgba(255, 220, 100, 0.6); }
            100% { background-color: rgba(255, 220, 100, 0.2); }
        }
        
        .no-modal-results {
            text-align: center;
            padding: 2rem;
            color: var(--dark-gray);
            font-style: italic;
            background-color: rgba(0, 0, 0, 0.03);
            border-radius: var(--border-radius);
            margin: 1rem 0;
        }
        
        /* Enhance the coming soon modal scrolling */
        .coming-soon-modal-content {
            scrollbar-width: thin;
            scrollbar-color: var(--primary-light) var(--light-gray);
        }
        
        .coming-soon-modal-content::-webkit-scrollbar {
            width: 8px;
        }
        
        .coming-soon-modal-content::-webkit-scrollbar-track {
            background: var(--light-gray);
            border-radius: 10px;
        }
        
        .coming-soon-modal-content::-webkit-scrollbar-thumb {
            background-color: var(--primary-light);
            border-radius: 10px;
        }
    `;
    document.head.appendChild(style);
}

function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchClear = document.querySelector('.search-clear');
    const resultsCount = document.querySelector('.results-count');
    const tagsContainer = document.querySelector('.search-tags-container');
    const moduleCards = document.querySelectorAll('.module-card-tbc');
    
    let searchTerms = [];
    
    searchInput.addEventListener('input', (e) => {
        const value = e.target.value.trim();
        searchClear.style.display = value ? 'block' : 'none';
        
        if (value) {
            performSearch(value);
        } else {
            resetSearch();
        }
    });
    
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            addSearchTag(e.target.value.trim());
            e.target.value = '';
            searchClear.style.display = 'none';
        }
    });
    
    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchClear.style.display = 'none';
        resetSearch();
        searchInput.focus();
    });
    
    function performSearch(query) {
        const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
        let matchCount = 0;
        
        moduleCards.forEach(card => {
            card.classList.remove('highlight', 'hidden');
            
            card.querySelectorAll('.highlight-text').forEach(el => {
                el.outerHTML = el.textContent;
            });
        });
        
        if (searchTerms.length === 0) {
            resetSearch();
            return;
        }
        
        moduleCards.forEach(card => {
            const moduleId = card.dataset.moduleId;
            const moduleData = comingSoonModules.find(m => m.module_id === moduleId);
            
            if (!moduleData) return;
            
            let matches = false;
            let score = 0;
            
            const titleEl = card.querySelector('h3');
            const title = titleEl.textContent;
            
            const descEl = card.querySelector('p');
            const desc = descEl ? descEl.textContent : '';
            
            searchTerms.forEach(term => {
                if (title.toLowerCase().includes(term)) {
                    matches = true;
                    score += 10; // Title matches are worth more
                    
                    titleEl.innerHTML = highlightMatches(title, term);
                }
                
                if (desc.toLowerCase().includes(term)) {
                    matches = true;
                    score += 5;
                    
                    if (descEl) {
                        descEl.innerHTML = highlightMatches(desc, term);
                    }
                }
                
                moduleData.lessons.forEach(lesson => {
                    if (lesson.lesson_title.toLowerCase().includes(term)) {
                        matches = true;
                        score += 3;
                    }
                    
                    lesson.content_blocks.forEach(block => {
                        if (block.text.toLowerCase().includes(term)) {
                            matches = true;
                            score += 2;
                        }
                    });
                });
            });
            
            if (matches) {
                matchCount++;
                card.classList.add('highlight');
                
                card.classList.remove('search-animate');
                void card.offsetWidth; // Force reflow
                card.classList.add('search-animate');
                
                card.style.order = -score;
            } else {
                card.classList.add('hidden');
                card.style.order = 0;
            }
        });
        
        resultsCount.textContent = matchCount > 0 
            ? `Found ${matchCount} matching module${matchCount !== 1 ? 's' : ''}`
            : 'No matching modules found';
        
        const modulesGrid = document.querySelector('.modules-grid');
        const existingNoResults = modulesGrid.querySelector('.no-results');
        
        if (matchCount === 0 && !existingNoResults) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <svg viewBox="0 0 24 24" width="48" height="48" style="margin-bottom: 1rem;">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="#ccc" stroke-width="2" />
                    <line x1="8" y1="8" x2="16" y2="16" stroke="#ccc" stroke-width="2" />
                    <line x1="16" y1="8" x2="8" y2="16" stroke="#ccc" stroke-width="2" />
                </svg>
                <p>No modules match your search query.</p>
                <p>Try different keywords or check back later for more content!</p>
            `;
            modulesGrid.appendChild(noResults);
            
            gsap.fromTo(noResults, 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.4)" }
            );
        } else if (matchCount > 0 && existingNoResults) {
            existingNoResults.remove();
        }
    }
    
    function addSearchTag(term) {
        if (!term || searchTerms.includes(term)) return;
        
        searchTerms.push(term);
        
        const tag = document.createElement('div');
        tag.className = 'search-tag';
        tag.innerHTML = `
            <span>${term}</span>
            <span class="tag-remove">×</span>
        `;
        
        tagsContainer.appendChild(tag);
        
        gsap.fromTo(tag, 
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
        );
        
        tag.querySelector('.tag-remove').addEventListener('click', () => {
            gsap.to(tag, {
                scale: 0,
                opacity: 0,
                duration: 0.2,
                onComplete: () => {
                    tag.remove();
                    
                    const index = searchTerms.indexOf(term);
                    if (index !== -1) {
                        searchTerms.splice(index, 1);
                    }
                    
                    if (searchTerms.length > 0) {
                        performSearch(searchTerms.join(' '));
                    } else {
                        resetSearch();
                    }
                }
            });
        });
        
        performSearch(searchTerms.join(' '));
    }
    
    function resetSearch() {
        searchTerms = [];
        tagsContainer.innerHTML = '';
        resultsCount.textContent = '';
        
        moduleCards.forEach(card => {
            card.classList.remove('highlight', 'hidden', 'search-animate');
            card.style.order = '';
            
            card.querySelectorAll('.highlight-text').forEach(el => {
                el.outerHTML = el.textContent;
            });
        });
        
        const modulesGrid = document.querySelector('.modules-grid');
        const existingNoResults = modulesGrid.querySelector('.no-results');
        if (existingNoResults) {
            existingNoResults.remove();
        }
    }
    
    function highlightMatches(text, term) {
        if (!term) return text;
        
        const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
        return text.replace(regex, '<span class="highlight-text">$1</span>');
    }
    
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}

function animateComingSoonScreen() {
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
    
    gsap.from('.coming-soon-container h2', {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    gsap.from('.search-container', {
        y: -20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
    });
    
    gsap.from('.coming-soon-description', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'power2.out'
    });
    
    gsap.from('.module-card-tbc', {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.6,
        ease: 'back.out(1.5)'
    });
    
    gsap.from('.back-to-modules-btn', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        delay: 1.2,
        ease: 'back.out(1.5)'
    });
    
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
    
    gsap.to('.search-input-wrapper', {
        boxShadow: '0 6px 20px rgba(54, 162, 235, 0.15)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
}