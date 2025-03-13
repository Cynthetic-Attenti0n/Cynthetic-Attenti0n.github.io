import { gsap } from 'gsap';
import { contentData } from '../models/ContentData.js';

export function loadModuleContent(moduleId, sectionId) {
    const moduleContentScreen = document.getElementById('module-content');
    const { getState, setState } = window.appAPI;
    const appState = getState();
    
    // Get section content
    if (!sectionId) {
        const firstSection = appState.progress.getFirstSection(moduleId);
        sectionId = firstSection;
        setState({ currentSection: firstSection });
    }
    
    // Get section data
    const sectionContent = contentData[sectionId];
    if (!sectionContent) {
        console.error(`Content not found for section ${sectionId}`);
        return;
    }
    
    // Get module and all its sections
    const module = appState.progress.getModuleById(moduleId);
    
    // Create navigation tabs for sections
    let sectionTabsHTML = `<div class="section-tabs">`;
    module.sections.forEach(section => {
        const isActive = section.id === sectionId;
        sectionTabsHTML += `
            <div class="section-tab ${isActive ? 'active' : ''}" data-section-id="${section.id}">
                ${section.title}
            </div>
        `;
    });
    sectionTabsHTML += `</div>`;
    
    // Create full content HTML
    const contentHTML = `
        <div class="module-content-container">
            <h2 class="module-title">${module.title}</h2>
            ${sectionTabsHTML}
            
            <div class="section-content">
                <h3 class="section-title">${sectionContent.title}</h3>
                ${sectionContent.content}
            </div>
        </div>
    `;
    
    moduleContentScreen.innerHTML = contentHTML;
    
    // Add event listeners to section tabs
    const sectionTabs = moduleContentScreen.querySelectorAll('.section-tab');
    sectionTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const newSectionId = tab.dataset.sectionId;
            if (newSectionId !== sectionId) {
                setState({ currentSection: newSectionId });
                
                // Animate content transition
                gsap.to(".section-content", {
                    opacity: 0,
                    y: -20,
                    duration: 0.3,
                    onComplete: () => {
                        loadModuleContent(moduleId, newSectionId);
                        
                        // Scroll to the top of the content
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                });
                
                // Animate tab transition
                gsap.to(".section-tab.active", {
                    fontWeight: 400,
                    color: "var(--dark-gray)",
                    duration: 0.3
                });
                
                gsap.to(tab, {
                    fontWeight: 600,
                    color: "var(--primary-color)",
                    duration: 0.3
                });
            }
        });
        
        // Add hover effect to tabs
        tab.addEventListener('mouseenter', () => {
            if (!tab.classList.contains('active')) {
                gsap.to(tab, {
                    color: "var(--primary-color)",
                    duration: 0.2
                });
            }
        });
        
        tab.addEventListener('mouseleave', () => {
            if (!tab.classList.contains('active')) {
                gsap.to(tab, {
                    color: "var(--dark-gray)",
                    duration: 0.2
                });
            }
        });
    });
    
    // Mark section as started
    appState.progress.startSection(moduleId, sectionId);
    
    // Enhanced content entrance animation
    gsap.fromTo(".section-content", 
        { opacity: 0, y: 30 }, 
        { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            ease: "power3.out" 
        }
    );
    
    // Animate content elements
    gsap.fromTo(".section-content h2, .section-content h3", 
        { opacity: 0, x: -20 }, 
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, delay: 0.2 }
    );
    
    gsap.fromTo(".section-content p, .section-content ul", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.4 }
    );
    
    gsap.fromTo(".highlight-box, .tip-box", 
        { opacity: 0, scale: 0.95 }, 
        { 
            opacity: 1, 
            scale: 1, 
            duration: 0.5, 
            stagger: 0.2, 
            delay: 0.6,
            ease: "back.out(1.2)"
        }
    );
    
    // Apply styles to section tabs
    const style = document.createElement('style');
    style.textContent = `
        .section-tabs {
            display: flex;
            overflow-x: auto;
            margin-bottom: 1.5rem;
            border-bottom: 1px solid var(--medium-gray);
            scrollbar-width: none;
            padding-bottom: 5px;
            position: sticky;
            top: 0;
            background-color: var(--white);
            z-index: 10;
        }
        
        .section-tabs::-webkit-scrollbar {
            display: none;
        }
        
        .section-tab {
            padding: 0.75rem 1.5rem;
            cursor: pointer;
            white-space: nowrap;
            position: relative;
            color: var(--dark-gray);
            transition: color 0.3s, background-color 0.3s;
            border-radius: 8px 8px 0 0;
            margin-right: 4px;
        }
        
        .section-tab.active {
            color: var(--primary-color);
            font-weight: 600;
            background-color: rgba(255, 99, 132, 0.1);
        }
        
        .section-tab.active::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 3px;
            background-color: var(--primary-color);
            border-radius: 3px 3px 0 0;
        }
        
        .section-tab:hover:not(.active) {
            color: var(--primary-light);
            background-color: rgba(255, 99, 132, 0.05);
        }
        
        .module-title {
            color: var(--secondary-color);
            margin-bottom: 1.5rem;
        }
    `;
    document.head.appendChild(style);
}