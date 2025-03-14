import { gsap } from 'gsap';
import { loadComingSoonScreen } from './comingSoon.js';

export function loadModuleSelection() {
    const moduleSelectionScreen = document.getElementById('module-selection');
    const { getState, setState } = window.appAPI;
    
    // Fetch modules data from the user progress
    const userProgress = getState().progress;
    const modules = userProgress.getModuleData();
    
    // Get overall progress for the vertical progress bar
    const overallProgress = userProgress.getOverallProgress();
    
    // Create module selection content
    let moduleSelectionContent = `
        <div class="module-selection-container">
            <div class="overall-progress-bar">
                <div class="overall-progress-fill" style="height: ${overallProgress}%"></div>
            </div>
            <div class="modules-content">
                <h2>Choose a Module</h2>
                <p>Select a module to begin or continue your learning journey (or <a href="#" class="highlight-link" id="coming-soon-link">Click Here</a> to see future content).</p>
                
                <div class="modules-grid">
    `;
    
    // Add each module as a card
    modules.forEach(module => {
        let statusClass = '';
        let statusText = '';
        
        if (module.completed) {
            statusClass = 'completed';
            statusText = 'Completed';
        } else if (module.started) {
            statusClass = 'in-progress';
            statusText = 'In Progress';
        } else {
            statusClass = 'not-started';
            statusText = 'Not Started';
        }
        
        moduleSelectionContent += `
            <div class="module-card ${statusClass}" data-module-id="${module.id}">
                <h3>${module.title}</h3>
                <p>${module.description}</p>
                <div class="module-card-status ${statusClass}">
                    <div class="status-indicator">
                        <div class="status-dot"></div>
                        <span>${statusText}</span>
                    </div>
                    <div class="progress-indicator">
                        ${module.progress}% complete
                    </div>
                </div>
                ${module.completed ? '<div class="completion-badge">✓</div>' : ''}
            </div>
        `;
    });
    
    moduleSelectionContent += `
            </div>
            <div class="reset-progress-container">
                <button id="reset-progress-btn">Reset All Progress</button>
            </div>
        </div>
    `;
    
    moduleSelectionScreen.innerHTML = moduleSelectionContent;
    
    // Add reset progress functionality
    const resetButton = moduleSelectionScreen.querySelector('#reset-progress-btn');
    resetButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
            userProgress.resetAllProgress();
            // Reload module selection screen to reflect changes
            loadModuleSelection();
            
            // Show a toast notification
            const toast = document.createElement('div');
            toast.className = 'toast-notification';
            toast.textContent = 'Progress successfully reset!';
            document.body.appendChild(toast);
            
            gsap.fromTo(toast, 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
            );
            
            setTimeout(() => {
                gsap.to(toast, {
                    opacity: 0,
                    y: -20,
                    duration: 0.5,
                    onComplete: () => toast.remove()
                });
            }, 3000);
        }
    });
    
    // Add event listener for the Coming Soon link
    const comingSoonLink = moduleSelectionScreen.querySelector('#coming-soon-link');
    if (comingSoonLink) {
        comingSoonLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.appAPI.switchScreen('moduleSelection', 'comingSoon');
            loadComingSoonScreen();
        });
    }
    
    // Add event listeners to module cards
    const moduleCards = moduleSelectionScreen.querySelectorAll('.module-card');
    moduleCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const moduleId = card.dataset.moduleId;
            const module = modules.find(m => m.id === moduleId);
            
            // Update app state
            setState({
                currentModule: moduleId,
                currentSection: userProgress.getFirstSection(moduleId)
            });
            
            // Mark module as started in progress tracking
            userProgress.startModule(moduleId);
            
            // Animate the selection with a more dynamic effect
            gsap.timeline()
                .to(card, {
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                    duration: 0.3
                })
                .to(card, {
                    scale: 0.95,
                    rotation: 0,
                    duration: 0.2,
                    delay: 0.1
                })
                .to(".module-card:not([data-module-id='" + moduleId + "'])", {
                    opacity: 0.5,
                    scale: 0.9,
                    stagger: 0.05,
                    duration: 0.3
                }, "<")
                .to(card, {
                    y: -50,
                    opacity: 0,
                    duration: 0.5,
                    delay: 0.2,
                    onComplete: () => {
                        // Navigate to module content
                        document.getElementById('next-btn').click();
                    }
                });
        });
        
        // Add hover animations with slight rotation for playfulness
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { 
                y: -8, 
                rotation: Math.random() < 0.5 ? 1 : -1,
                duration: 0.4, 
                ease: "power2.out" 
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { 
                y: 0, 
                rotation: 0,
                duration: 0.4, 
                ease: "power2.out" 
            });
        });
        
        // Add staggered entrance animation with bounce
        gsap.fromTo(card, 
            { 
                opacity: 0, 
                y: 50,
                rotation: Math.random() < 0.5 ? 2 : -2
            },
            { 
                opacity: 1, 
                y: 0, 
                rotation: 0,
                duration: 0.6,
                delay: 0.1 * index,
                ease: "back.out(1.7)"
            }
        );
    });
    
    // Force completion of all animations and ensure all cards are visible
    gsap.set(".module-card", { clearProps: true, opacity: 1, delay: 1 });
}