import { gsap } from 'gsap';
import { loadModuleContent } from '../screens/moduleContent.js';
import { loadModuleSelection } from '../screens/moduleSelection.js';

export function showCompletionModal(type, title) {
    const { getState, setState, switchScreen } = window.appAPI;
    const appState = getState();
    
    // Create modal container
    const modalEl = document.createElement('div');
    modalEl.className = 'completion-modal';
    
    // Different content for section completion vs module completion
    let modalContent = '';
    
    if (type === 'section') {
        modalContent = `
            <div class="modal-content quiz-complete">
                <div class="modal-icon">
                    <svg viewBox="0 0 100 100" width="80" height="80">
                        <circle cx="50" cy="50" r="45" fill="#4CAF50" class="success-circle" />
                        <path d="M30,50 L45,65 L70,35" fill="none" stroke="#FFF" stroke-width="8" class="success-check" />
                    </svg>
                </div>
                <h2>Well Done!</h2>
                <p>You've completed the <strong>${title}</strong> section.</p>
                <p class="encouragement">Let's continue to the next section!</p>
                
                <button class="modal-next-btn">Continue to Next Section</button>
            </div>
        `;
    } else if (type === 'module') {
        // Get module title for the completion message
        const moduleTitle = appState.progress.getModuleById(appState.currentModule).title;
        
        modalContent = `
            <div class="modal-content module-complete">
                <div class="modal-icon">
                    <svg viewBox="0 0 100 100" width="80" height="80">
                        <circle cx="50" cy="50" r="45" fill="#FFCE56" class="trophy-circle" />
                        <path d="M35,35 L35,60 C35,70 50,75 50,75 C50,75 65,70 65,60 L65,35" fill="none" stroke="#FFF" stroke-width="4" class="trophy-cup" />
                        <rect x="30" y="30" width="40" height="10" rx="5" fill="#FFF" />
                        <rect x="45" y="75" width="10" height="10" fill="#FFF" />
                        <rect x="35" y="85" width="30" height="5" rx="2" fill="#FFF" />
                    </svg>
                </div>
                <h2>Module Complete!</h2>
                <p>Congratulations! You've completed the <strong>${moduleTitle}</strong> module.</p>
                <p class="encouragement">This is a significant step in your learning journey. You should be proud!</p>
                
                <button class="modal-next-btn">Back to Modules</button>
            </div>
        `;
    }
    
    modalEl.innerHTML = modalContent;
    document.body.appendChild(modalEl);
    
    // Handle button click
    const nextBtn = modalEl.querySelector('.modal-next-btn');
    nextBtn.addEventListener('click', () => {
        // Close modal with animation
        gsap.to(modalEl, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            onComplete: () => {
                modalEl.remove();
                
                // Navigate based on completion type
                if (type === 'module') {
                    // Return to module selection
                    setState({
                        currentModule: null,
                        currentSection: null
                    });
                    
                    // Force refresh the module selection screen 
                    // to ensure module cards display properly
                    switchScreen('quiz', 'moduleSelection');
                    loadModuleSelection();
                    
                    // Ensure all cards are fully visible
                    gsap.set(".module-card", { clearProps: "all", opacity: 1 });
                } else if (type === 'section' && appState.progress.hasNextSection(appState.currentModule, appState.currentSection)) {
                    // Go to next section
                    const nextSection = appState.progress.getNextSection(
                        appState.currentModule,
                        appState.currentSection
                    );
                    setState({ currentSection: nextSection });
                    loadModuleContent(appState.currentModule, nextSection);
                    switchScreen('quiz', 'moduleContent');
                    // Scroll to top of the page
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    
                    // Scroll section tabs to show active tab
                    setTimeout(() => {
                        const activeTab = document.querySelector('.section-tab.active');
                        if (activeTab) {
                            const tabsContainer = document.querySelector('.section-tabs');
                            const tabRect = activeTab.getBoundingClientRect();
                            const containerRect = tabsContainer.getBoundingClientRect();
                            
                            // Calculate center position for the active tab
                            const scrollLeft = activeTab.offsetLeft - (containerRect.width / 2) + (tabRect.width / 2);
                            
                            tabsContainer.scrollTo({
                                left: scrollLeft,
                                behavior: 'smooth'
                            });
                        }
                    }, 300);
                }
            }
        });
    });
    
    // Create floating particles for the background
    function createFloatingParticles(container) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            
            // Random size
            const size = 5 + Math.random() * 15;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random color
            const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Random shape
            const shapes = ["circle", "square", "triangle"];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            particle.classList.add(`shape-${shape}`);
            
            container.appendChild(particle);
            
            // Animate
            gsap.to(particle, {
                x: -100 + Math.random() * 200,
                y: -100 + Math.random() * 200,
                rotation: Math.random() * 360,
                duration: 5 + Math.random() * 10,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    }
    createFloatingParticles(modalEl);
    
    // Animate modal entrance
    gsap.fromTo(modalEl, 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
    );
    
    // Animate success check mark or trophy
    if (type === 'section') {
        gsap.set(".success-circle", { scale: 0 });
        gsap.set(".success-check", { drawSVG: "0%" });
        
        gsap.to(".success-circle", {
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.7)"
        });
        
        gsap.to(".success-check", {
            drawSVG: "100%",
            duration: 0.8,
            delay: 0.3,
            ease: "power2.out"
        });
    } else if (type === 'module') {
        gsap.set(".trophy-circle", { scale: 0 });
        gsap.set(".trophy-cup", { drawSVG: "0%" });
        
        gsap.to(".trophy-circle", {
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.7)"
        });
        
        gsap.to(".trophy-cup", {
            drawSVG: "100%",
            duration: 0.8,
            delay: 0.3,
            ease: "power2.out"
        });
        
        // Add sparkle effects around trophy
        const sparkleContainer = document.createElement('div');
        sparkleContainer.className = 'sparkle-container';
        modalEl.querySelector('.modal-icon').appendChild(sparkleContainer);
        
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.transform = `rotate(${i * 45}deg)`;
            sparkleContainer.appendChild(sparkle);
            
            gsap.fromTo(sparkle, 
                { opacity: 0, scale: 0 },
                { 
                    opacity: 1, 
                    scale: 1,
                    duration: 0.5,
                    delay: 0.6 + (i * 0.05),
                    repeat: -1,
                    repeatDelay: 1,
                    yoyo: true
                }
            );
        }
    }
    
    // Add text animations
    gsap.fromTo(modalEl.querySelectorAll('h2, p'), 
        { opacity: 0, y: 20 },
        { 
            opacity: 1, 
            y: 0, 
            duration: 0.6,
            stagger: 0.1,
            delay: 0.4
        }
    );
    
    // Button animation
    gsap.fromTo(nextBtn, 
        { opacity: 0, y: 20 },
        { 
            opacity: 1, 
            y: 0, 
            duration: 0.6,
            delay: 0.8,
            ease: "back.out(1.5)"
        }
    );
    
    // Add CSS styles
    const style = document.createElement('style');
    style.innerHTML = `
        .modal-next-btn {
            padding: 0.875rem 2rem;
            background-color: var(--secondary-color);
            color: var(--white);
            border: none;
            border-radius: var(--border-radius);
            font-weight: 600;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 10px rgba(54, 162, 235, 0.2);
        }

        .modal-next-btn:hover {
            background-color: var(--primary-color);
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(255, 99, 132, 0.3);
        }
    `;
    document.head.appendChild(style);
}