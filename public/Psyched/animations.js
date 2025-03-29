// animations.js - Handles GSAP animations

import { gsap } from "gsap";
import config from './config.js';

export function animateSectionTransition(previousSection, sectionToShow, direction) {
    if (!sectionToShow) return;

    // Prepare target section for animation
    sectionToShow.classList.remove('hidden');
    sectionToShow.classList.add('visible');
    gsap.set(sectionToShow, {
        opacity: 0,
        x: direction === 'forward' ? '100%' : '-100%',
        position: 'absolute', // Keep absolute during transition
        width: '100%',
        top: 0,
        left: 0,
        visibility: 'visible' // Make visible before animating
     });

    const tl = gsap.timeline({
        defaults: { duration: config.transitionSpeed, ease: 'power3.inOut' },
        onComplete: () => {
            // Clean up previous section after animation
            if (previousSection) {
                previousSection.classList.add('hidden');
                previousSection.classList.remove('visible');
                gsap.set(previousSection, { clearProps: "all" }); // Reset GSAP props + remove inline styles
                previousSection.removeAttribute('style'); // Ensure no inline styles remain
            }
            // Make the new section relative AFTER animation
            gsap.set(sectionToShow, { position: 'relative', width: 'auto', clearProps: "x,top,left,position,width,visibility" });
             sectionToShow.removeAttribute('style'); // Ensure no inline styles remain
        }
    });

    if (previousSection) {
        // Animate previous section out
        tl.to(previousSection, {
            opacity: 0,
            x: direction === 'forward' ? '-100%' : '100%',
             // Ensure it remains absolute during its own transition out
             // position: 'absolute' // Should already be set if it wasn't the initial section
        }, 0);
    }

    // Animate new section in
    tl.to(sectionToShow, {
        opacity: 1,
        x: '0%',
    }, 0); // Start simultaneously
}

export function animateHeaderFooterIn() {
    gsap.to('header', { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power2.out' });
    gsap.to('footer', { opacity: 1, duration: 0.8, delay: 0.6, ease: 'power2.out' });
}

// Fades in elements with a slight vertical rise
export function fadeInElements(elements, delay = 0, stagger = 0.1, duration = 0.4) {
    gsap.fromTo(elements,
        { opacity: 0, y: 15 }, // Start invisible and slightly down
        {
            opacity: 1,
            y: 0, // End at original position
            duration: duration,
            stagger: stagger,
            delay: delay,
            ease: 'power2.out',
            clearProps: "opacity,y,visibility" // Clean up props after animation
        }
    );
}

// Specific animation for results content
export function animateResultsIn(elements) {
     gsap.from(elements, {
         opacity: 0,
         y: 20,
         duration: 0.5,
         stagger: 0.15, // Slightly more stagger for results
         delay: 0.2,
         ease: 'power3.out',
         clearProps: "opacity,y,visibility"
     });
}

// Quick shake animation
export function shakeElement(element) {
     gsap.fromTo(element,
        { x: -6 },
        { x: 6, duration: 0.08, repeat: 3, yoyo: true, clearProps: "x", ease:'power1.inOut' }
     );
}

// Modal animations
export function animateModalOpen(modalElement, modalContentElement) {
    gsap.to(modalElement, { opacity: 1, duration: 0.3 });
    gsap.fromTo(modalContentElement,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
    );
}

export function animateModalClose(modalElement, modalContentElement, onCompleteCallback) {
    gsap.to(modalContentElement, { scale: 0.85, opacity: 0, duration: 0.3, ease: 'back.in(1.7)' });
    gsap.to(modalElement, { opacity: 0, duration: 0.3, delay: 0.1, onComplete: onCompleteCallback });
}

// Reset progress bar animation
export function animateProgressBarReset() {
    // Ensure progress bar element exists
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
         gsap.to(progressBar, { width: '0%', duration: 0.4, ease: 'power2.out' });
    } else {
        console.warn("Progress bar element not found for reset animation.");
    }
}