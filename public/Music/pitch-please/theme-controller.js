// New file for theme control functionality
import { gsap } from 'gsap';

export class ThemeController {
    constructor() {
        this.themeToggle = document.querySelector('.theme-toggle');
        this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        this.init();
    }
    
    init() {
        this.updateTheme();
        this.setupEventListeners();
        this.addRippleEffect();
    }
    
    setupEventListeners() {
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            this.isDarkMode = e.matches;
            this.updateTheme();
        });
    }
    
    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        this.updateTheme();
        this.animateToggle();
    }
    
    updateTheme() {
        document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
        
        // Update icons based on theme
        const moonIcon = this.themeToggle.querySelector('.toggle-moon');
        const sunIcon = this.themeToggle.querySelector('.toggle-sun');
        
        if (this.isDarkMode) {
            moonIcon.innerHTML = `
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M12.3 3.9c.4-.2.6-.7.5-1.1s-.6-.8-1.1-.8C6.8 2.1 2.6 6 2 11.1c-.4 3.8.9 7.3 3.6 9.9 2.7 2.6 6.3 3.8 9.9 3.4h.8c.4-.1.7-.4.8-.8.1-.4 0-.8-.3-1.1-.2-.2-.4-.3-.7-.4-3-.3-5.7-2-7.1-4.5-1.3-2.5-1.3-5.4-.1-8 1.2-2.5 3.6-4.3 6.4-4.7zM8.3 14.2c-.5.9-.2 2.1.7 2.6.9.5 2.1.2 2.6-.7.5-.9.2-2.1-.7-2.6s-2.1-.2-2.6.7z"/>
                </svg>`;
        } else {
            sunIcon.innerHTML = `
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M12 7c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zM2 13h2c.6 0 1-.4 1-1s-.4-1-1-1H2c-.6 0-1 .4-1 1s.4 1 1 1zM20 13h2c.6 0 1-.4 1-1s-.4-1-1-1h-2c-.6 0-1 .4-1 1s.4 1 1 1zM11 2v2c0 .6.4 1 1 1s1-.4 1-1V2c0-.6-.4-1-1-1s-1 .4-1 1zM11 20v2c0 .6.4 1 1 1s1-.4 1-1v-2c0-.6-.4-1-1-1s-1 .4-1 1zM5.6 7.6l-1.4-1.4c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.4 1.4c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4zM19.8 19.8l-1.4-1.4c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.4 1.4c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4zM19.8 5.6c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-1.4 1.4c-.4.4-.4 1 0 1.4.2.2.5.3.7.3s.5-.1.7-.3l1.4-1.4zM5.6 19.8l1.4-1.4c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-1.4 1.4c-.4.4-.4 1 0 1.4.2.2.5.3.7.3s.5-.1.7-.3z"/>
                </svg>`;
        }
    }
    
    animateToggle() {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        this.themeToggle.appendChild(ripple);
        
        // Get icons
        const moonIcon = this.themeToggle.querySelector('.toggle-moon');
        const sunIcon = this.themeToggle.querySelector('.toggle-sun');
        
        // Animate transition
        if (this.isDarkMode) {
            // Animate sun out, moon in
            gsap.to(sunIcon, {
                opacity: 0,
                y: -20,
                rotation: -45,
                scale: 0.5,
                duration: 0.3,
                ease: "power2.in"
            });
            
            gsap.fromTo(moonIcon, 
                { opacity: 0, y: 20, rotation: 45, scale: 0.5 },
                { opacity: 1, y: 0, rotation: 0, scale: 1, duration: 0.5, delay: 0.1, ease: "back.out(1.7)" }
            );
        } else {
            // Animate moon out, sun in
            gsap.to(moonIcon, {
                opacity: 0,
                y: -20,
                rotation: 45,
                scale: 0.5,
                duration: 0.3,
                ease: "power2.in"
            });
            
            gsap.fromTo(sunIcon, 
                { opacity: 0, y: 20, rotation: -45, scale: 0.5 },
                { opacity: 1, y: 0, rotation: 0, scale: 1, duration: 0.5, delay: 0.1, ease: "back.out(1.7)" }
            );
        }
        
        // Remove ripple after animation completes
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    addRippleEffect() {
        // Add CSS for ripple effect
        const style = document.createElement('style');
        style.textContent = `
            .theme-toggle {
                position: relative;
            }
            
            .ripple-effect {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 5px;
                height: 5px;
                background: var(--primary-color);
                opacity: 0.4;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: ripple 0.6s ease-out;
            }
            
            @keyframes ripple {
                to {
                    width: 80px;
                    height: 80px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}