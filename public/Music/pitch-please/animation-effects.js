// New file for animation effects to avoid overloading app.js
import { gsap } from 'gsap';

export class AnimationEffects {
    constructor() {
        this.initialized = false;
    }
    
    init() {
        if (this.initialized) return;
        this.initialized = true;
        
        this.setupPageTransitionEffects();
        this.setupControlButtonEffects();
        this.setupTrackItemEffects();
        this.setupAlbumArtEffects();
    }
    
    setupPageTransitionEffects() {
        const controls = document.querySelector('.controls');
        const trackInfo = document.querySelector('.track-info');
        const progressContainer = document.querySelector('.progress-container');
        const albumArt = document.querySelector('.album-art-container');
        
        gsap.set([controls, trackInfo, progressContainer], { opacity: 0, y: 20 });
        
        gsap.to(albumArt, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        });
        
        gsap.to(trackInfo, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.2,
            ease: "power3.out"
        });
        
        gsap.to(progressContainer, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.3,
            ease: "power3.out"
        });
        
        gsap.to(controls, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.4,
            ease: "power3.out"
        });
    }
    
    setupControlButtonEffects() {
        const controlButtons = document.querySelectorAll('.control-btn');
        
        controlButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    scale: 1.1,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            });
            
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power3.out"
                });
            });
        });
    }
    
    setupTrackItemEffects() {
        const trackList = document.querySelector('.track-list');
        
        if (trackList) {
            // Create observer for items
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        gsap.to(entry.target, {
                            opacity: 1,
                            y: 0,
                            duration: 0.5,
                            ease: "power3.out"
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            // Add new items to animation queue when created
            const observeNewItems = () => {
                const items = trackList.querySelectorAll('.track-item');
                items.forEach(item => {
                    gsap.set(item, { opacity: 0, y: 20 });
                    observer.observe(item);
                });
            };
            
            // Create mutation observer for playlist changes
            const mutationObserver = new MutationObserver(observeNewItems);
            mutationObserver.observe(trackList, { childList: true });
            
            // Initial setup
            observeNewItems();
        }
    }
    
    setupAlbumArtEffects() {
        const albumArt = document.querySelector('.album-art');
        
        if (albumArt) {
            albumArt.addEventListener('mouseenter', () => {
                if (!albumArt.classList.contains('spin')) {
                    gsap.to(albumArt, {
                        rotation: 10,
                        scale: 1.05,
                        boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
                        duration: 0.5,
                        ease: "power3.out"
                    });
                }
            });
            
            albumArt.addEventListener('mouseleave', () => {
                if (!albumArt.classList.contains('spin')) {
                    gsap.to(albumArt, {
                        rotation: 0,
                        scale: 1,
                        boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
                        duration: 0.5,
                        ease: "power3.out"
                    });
                }
            });
        }
    }
    
    // Method to animate track change
    animateTrackChange() {
        const albumArt = document.querySelector('.album-art');
        const trackTitle = document.querySelector('.track-title');
        const artistName = document.querySelector('.artist-name');
        
        // Album art flip animation
        gsap.to(albumArt, {
            rotationY: 180,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => {
                gsap.set(albumArt, { rotationY: 0 });
            }
        });
        
        // Track info animation
        gsap.to([trackTitle, artistName], {
            opacity: 0,
            y: -20,
            duration: 0.3,
            stagger: 0.1,
            onComplete: () => {
                gsap.to([trackTitle, artistName], {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "power3.out"
                });
            }
        });
    }
    
    // Method to animate view changes
    animateViewChange(toPlaylist) {
        const nowPlayingView = document.querySelector('.now-playing-view');
        const playlistView = document.querySelector('.playlist-view');
        
        if (toPlaylist) {
            gsap.to(nowPlayingView, {
                x: '-100%',
                opacity: 0,
                duration: 0.6,
                ease: "power3.inOut"
            });
            
            gsap.fromTo(playlistView, 
                { x: '100%', opacity: 0 },
                { x: '0%', opacity: 1, duration: 0.6, ease: "power3.inOut", delay: 0.1 }
            );
        } else {
            gsap.to(playlistView, {
                x: '100%',
                opacity: 0,
                duration: 0.6,
                ease: "power3.inOut"
            });
            
            gsap.fromTo(nowPlayingView, 
                { x: '-100%', opacity: 0 },
                { x: '0%', opacity: 1, duration: 0.6, ease: "power3.inOut", delay: 0.1 }
            );
        }
    }
}