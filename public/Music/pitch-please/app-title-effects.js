import { gsap } from 'gsap';

export class AppTitleEffects {
    constructor() {
        this.appTitle = document.querySelector('.app-header h1');
        this.init();
    }
    
    init() {
        if (!this.appTitle) return;
        
        this.stylizeTitle();
        this.addHoverEffects();
        this.addClickEffects();
        this.initialAnimation();
    }
    
    stylizeTitle() {
        const title = this.appTitle.textContent;
        let newHTML = '';
        
        // Split the title into parts and add spans
        const parts = title.split(' ');
        parts.forEach((part, index) => {
            newHTML += `<span class="title-part title-part-${index + 1}">${this.wrapLetters(part)}</span>`;
            if (index < parts.length - 1) newHTML += ' ';
        });
        
        this.appTitle.innerHTML = newHTML;
        
        // Add the music note icon
        const noteIcon = document.createElement('span');
        noteIcon.className = 'music-note-icon';
        noteIcon.innerHTML = `
            <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
        `;
        this.appTitle.appendChild(noteIcon);
        
        // Add CSS for the styled title
        const styleEl = document.createElement('style');
        styleEl.textContent = `
            .app-header h1 {
                display: flex;
                align-items: center;
                font-weight: 800;
                position: relative;
            }
            
            .title-part {
                display: inline-block;
            }
            
            .title-part-1 {
                background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
                font-weight: 800;
            }
            
            .title-letter {
                display: inline-block;
                transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            
            .music-note-icon {
                display: inline-flex;
                margin-left: 6px;
                transform: rotate(0deg);
                transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            
            .music-note-icon svg {
                fill: var(--primary-color);
                filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
            }
            
            .app-header h1:hover .music-note-icon {
                transform: rotate(15deg) scale(1.2);
            }
        `;
        document.head.appendChild(styleEl);
    }
    
    wrapLetters(word) {
        return word.split('').map(letter => 
            `<span class="title-letter">${letter}</span>`
        ).join('');
    }
    
    addHoverEffects() {
        const letters = this.appTitle.querySelectorAll('.title-letter');
        
        this.appTitle.addEventListener('mouseenter', () => {
            letters.forEach((letter, index) => {
                gsap.to(letter, {
                    y: -5,
                    scale: 1.1,
                    delay: index * 0.03,
                    duration: 0.3,
                    ease: "back.out(2)"
                });
            });
        });
        
        this.appTitle.addEventListener('mouseleave', () => {
            letters.forEach((letter, index) => {
                gsap.to(letter, {
                    y: 0,
                    scale: 1,
                    delay: index * 0.02,
                    duration: 0.2,
                    ease: "power3.out"
                });
            });
        });
    }
    
    addClickEffects() {
        this.appTitle.addEventListener('click', () => {
            const musicNote = this.appTitle.querySelector('.music-note-icon');
            
            gsap.to(musicNote, {
                rotation: "+=360",
                duration: 0.8,
                ease: "back.out(1.7)"
            });
            
            const letters = this.appTitle.querySelectorAll('.title-letter');
            letters.forEach((letter, index) => {
                gsap.fromTo(letter,
                    { scale: 1, y: 0 },
                    { 
                        scale: [1, 1.2, 1],
                        y: [0, -10, 0],
                        duration: 0.5,
                        delay: index * 0.03,
                        ease: "back.out(3)"
                    }
                );
            });
        });
    }
    
    initialAnimation() {
        const titleParts = this.appTitle.querySelectorAll('.title-part');
        const musicNote = this.appTitle.querySelector('.music-note-icon');
        
        gsap.set([...titleParts, musicNote], { opacity: 0, y: -20 });
        
        gsap.to(titleParts, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "back.out(1.7)",
            delay: 0.2
        });
        
        gsap.to(musicNote, {
            opacity: 1,
            y: 0,
            rotation: 720,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: 0.5
        });
    }
}