import { gsap } from 'gsap';

export function loadWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcome-screen');
    
    // Create welcome content
    const welcomeContent = `
        <div class="welcome-container">
            <div class="welcome-background-animation"></div>
            <div class="welcome-image-container" style="margin-top: 0.5rem; margin-bottom: 0.5rem;">
                <svg viewBox="0 0 400 300" width="100%" height="auto" class="baby-illustration">
                    <!-- Baby face -->
                    <circle cx="200" cy="120" r="80" fill="#FFD8E3" class="baby-face" />
                    
                    <!-- Eyes - bigger, more doe-like eyes -->
                    <g class="baby-eyes">
                        <circle cx="170" cy="105" r="16" fill="white" class="eye-white left" />
                        <circle cx="230" cy="105" r="16" fill="white" class="eye-white right" />
                        <circle cx="170" cy="105" r="8" fill="#5D4037" class="eye-pupil left" />
                        <circle cx="230" cy="105" r="8" fill="#5D4037" class="eye-pupil right" />
                        <!-- Add shine to eyes -->
                        <circle cx="174" cy="102" r="3" fill="white" class="eye-shine left" />
                        <circle cx="234" cy="102" r="3" fill="white" class="eye-shine right" />
                        <path d="M164,94 Q170,90 176,94" stroke="#5D4037" stroke-width="2" fill="none" class="eye-brow left" />
                        <path d="M224,94 Q230,90 236,94" stroke="#5D4037" stroke-width="2" fill="none" class="eye-brow right" />
                        <!-- Add eyelashes -->
                        <path d="M160,101 L155,98" stroke="#5D4037" stroke-width="1.5" class="eyelash" />
                        <path d="M165,96 L162,92" stroke="#5D4037" stroke-width="1.5" class="eyelash" />
                        <path d="M175,96 L178,92" stroke="#5D4037" stroke-width="1.5" class="eyelash" />
                        <path d="M240,101 L245,98" stroke="#5D4037" stroke-width="1.5" class="eyelash" />
                        <path d="M235,96 L238,92" stroke="#5D4037" stroke-width="1.5" class="eyelash" />
                        <path d="M225,96 L222,92" stroke="#5D4037" stroke-width="1.5" class="eyelash" />
                    </g>
                    
                    <!-- Rosy cheeks -->
                    <circle cx="160" cy="130" r="18" fill="#FFB6C1" opacity="0.6" class="baby-cheek left" />
                    <circle cx="240" cy="130" r="18" fill="#FFB6C1" opacity="0.6" class="baby-cheek right" />
                    
                    <!-- Mouth -->
                    <path d="M175,140 Q200,160 225,140" stroke="#FF6384" stroke-width="4" fill="none" class="baby-mouth" />
                    
                    <!-- Hair - exactly three strands sharing a common origin point but higher up and scattered -->
                    <g class="baby-hair">
                        <path d="M200,45 C185,25 175,15 165,5" fill="none" stroke="#8D6E63" stroke-width="8" stroke-linecap="round" class="baby-hair-strand left" />
                        <path d="M200,45 C200,25 200,15 200,0" fill="none" stroke="#8D6E63" stroke-width="8" stroke-linecap="round" class="baby-hair-strand center" />
                        <path d="M200,45 C215,25 225,15 235,5" fill="none" stroke="#8D6E63" stroke-width="8" stroke-linecap="round" class="baby-hair-strand right" />
                    </g>
                    
                    <!-- Bib -->
                    <path d="M150,180 L250,180 L270,250 L130,250 Z" fill="#9AD0F5" class="baby-bib" />
                    <circle cx="200" cy="210" r="20" fill="white" class="bib-circle" />
                    <path d="M190,210 L198,218 L210,206" stroke="#FF6384" stroke-width="3" fill="none" class="bib-checkmark" />
                    
                    <!-- Baby Bottle with animated milk -->
                    <g class="baby-bottle">
                        <path d="M300,160 L320,160 L320,220 Q320,240 300,240 Q280,240 280,220 L280,160 Z" fill="#E3F2FD" class="bottle-body" />
                        <path d="M290,160 L310,160 L310,140 A10,10 0 0 0 290,140 Z" fill="#BBDEFB" class="bottle-neck" />
                        <ellipse cx="300" cy="140" rx="10" ry="5" fill="#90CAF9" class="bottle-top" />
                        <path d="M300,140 L300,120" stroke="#90CAF9" stroke-width="10" stroke-linecap="round" class="bottle-nipple" />
                        
                        <!-- Animated milk with bubbles and wave pattern -->
                        <clipPath id="milk-clip">
                            <path d="M283,165 L317,165 L317,220 Q317,235 300,235 Q283,235 283,220 Z" />
                        </clipPath>
                        <rect x="283" y="165" width="34" height="70" fill="white" opacity="0.9" class="bottle-milk-base" />
                        <path d="M283,175 C289,177 293,173 300,175 C307,177 311,173 317,175 L317,220 Q317,235 300,235 Q283,235 283,220 Z" fill="white" opacity="0.5" class="bottle-milk-wave" clip-path="url(#milk-clip)" />
                        <circle cx="290" cy="190" r="3" fill="white" class="milk-bubble" />
                        <circle cx="300" cy="200" r="2" fill="white" class="milk-bubble" />
                        <circle cx="310" cy="185" r="2.5" fill="white" class="milk-bubble" />
                        <circle cx="295" cy="210" r="1.5" fill="white" class="milk-bubble" />
                        <circle cx="305" cy="195" r="2" fill="white" class="milk-bubble" />
                        
                        <path d="M283,195 L317,195" stroke="#E3F2FD" stroke-width="2" stroke-dasharray="3,2" class="bottle-measure" />
                        <path d="M283,175 L317,175" stroke="#E3F2FD" stroke-width="2" stroke-dasharray="3,2" class="bottle-measure" />
                        <path d="M283,215 L317,215" stroke="#E3F2FD" stroke-width="2" stroke-dasharray="3,2" class="bottle-measure" />
                        
                        <!-- Milk drip from nipple -->
                        <path d="M300,120 L300,115" stroke="white" stroke-width="3" stroke-linecap="round" class="milk-drip" />
                    </g>
                    
                    <!-- Maraca in hand with more dynamic look -->
                    <g class="baby-maraca">
                        <ellipse cx="120" cy="170" rx="18" ry="15" fill="#FF9B6E" class="maraca-head" />
                        <path d="M120,185 L130,210" stroke="#8D6E63" stroke-width="6" stroke-linecap="round" class="maraca-handle" />
                        <path d="M130,210 Q145,205 150,190" stroke="#FFD8E3" stroke-width="12" stroke-linecap="round" fill="none" class="baby-hand" />
                        <circle cx="114" cy="165" r="3" fill="white" opacity="0.6" class="maraca-dot" />
                        <circle cx="126" cy="165" r="3" fill="white" opacity="0.6" class="maraca-dot" />
                        <circle cx="120" cy="175" r="3" fill="white" opacity="0.6" class="maraca-dot" />
                        <circle cx="112" cy="172" r="2.5" fill="white" opacity="0.6" class="maraca-dot" />
                        <circle cx="128" cy="172" r="2.5" fill="white" opacity="0.6" class="maraca-dot" />
                    </g>
                    
                    <!-- Right hand reaching for bottle with wiggly fingers -->
                    <path d="M240,170 Q260,160 270,180" stroke="#FFD8E3" stroke-width="12" stroke-linecap="round" fill="none" class="baby-hand-right" />
                    <path d="M268,178 L272,174" stroke="#FFD8E3" stroke-width="4" stroke-linecap="round" class="baby-finger" />
                    <path d="M265,183 L269,180" stroke="#FFD8E3" stroke-width="4" stroke-linecap="round" class="baby-finger" />
                    
                    <!-- Food elements -->
                    <g class="food-elements">
                        <circle cx="120" cy="200" r="15" fill="#FFD54F" class="food-item" />
                        <circle cx="100" cy="220" r="12" fill="#AED581" class="food-item" />
                        <path d="M100,220 Q120,250 140,220" fill="#FF7043" class="food-item" />
                        <path d="M90,240 Q110,260 120,230" fill="#7E57C2" class="food-item" />
                    </g>
                    
                    <!-- Bubbles -->
                    <g class="bubbles">
                        <circle cx="150" cy="70" r="8" fill="white" opacity="0.8" class="bubble" />
                        <circle cx="260" cy="80" r="6" fill="white" opacity="0.8" class="bubble" />
                        <circle cx="130" cy="100" r="5" fill="white" opacity="0.8" class="bubble" />
                        <circle cx="270" cy="110" r="7" fill="white" opacity="0.8" class="bubble" />
                        <circle cx="310" cy="150" r="5" fill="white" opacity="0.8" class="bubble" />
                        <circle cx="330" cy="180" r="4" fill="white" opacity="0.8" class="bubble" />
                    </g>
                </svg>
            </div>
            
            <div class="welcome-content">
                <p class="welcome-description">
                    Welcome to <span class="highlight">Boob and Tucker</span>, your comprehensive guide 
                    to feeding your baby. Based on current Australian guidelines, this 
                    course will guide you through introducing solid foods, nutrition basics, 
                    and feeding your child from 6 months to 2 years of age.
                </p>
                
                <button class="welcome-start-btn">
                    <span>Start Your Journey</span>
                    <svg viewBox="0 0 24 24" width="24" height="24" class="btn-arrow">
                        <path d="M12,4 L20,12 L12,20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                        <path d="M4,12 L20,12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                    </svg>
                </button>
            </div>
        </div>
    `;
    
    welcomeScreen.innerHTML = welcomeContent;
    
    // Initialize GSAP animations
    initWelcomeAnimations();
    
    // Add event listener to start button
    const startButton = welcomeScreen.querySelector('.welcome-start-btn');
    startButton.addEventListener('click', () => {
        // Use the next button to navigate to module selection
        gsap.to(".welcome-container", {
            opacity: 0,
            y: -30,
            duration: 0.6,
            onComplete: () => {
                document.getElementById('next-btn').click();
            }
        });
    });
    
    // Add background animation
    initBackgroundAnimation();
}

function initBackgroundAnimation() {
    const container = document.querySelector('.welcome-background-animation');
    
    // Create floating shapes
    for (let i = 0; i < 15; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        
        // Random properties
        const size = 10 + Math.random() * 30;
        const colors = ['#FFD8E3', '#9AD0F5', '#FFD54F', '#AED581', '#FF9FB2'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const opacity = 0.1 + Math.random() * 0.15;
        
        // Set shape style
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.backgroundColor = color;
        shape.style.opacity = opacity;
        shape.style.borderRadius = Math.random() > 0.5 ? '50%' : `${Math.floor(Math.random() * 5) + 3}px`;
        
        // Position randomly
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.top = `${Math.random() * 100}%`;
        
        container.appendChild(shape);
        
        // Animate with GSAP
        gsap.to(shape, {
            x: -100 + Math.random() * 200,
            y: -100 + Math.random() * 200,
            rotation: Math.random() * 360,
            duration: 15 + Math.random() * 20,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
}

function initWelcomeAnimations() {
    // Baby face initial settings
    gsap.set(".baby-eyes .eye-pupil", { scale: 0.8 });
    gsap.set(".baby-eyes .eye-shine", { scale: 0, opacity: 0 });
    gsap.set(".eyelash", { scale: 0, opacity: 0 });
    gsap.set(".baby-mouth", { drawSVG: "0%" });
    gsap.set(".baby-hair-strand", { drawSVG: "0%" });
    gsap.set(".baby-cheek", { scale: 0.5, opacity: 0 });
    gsap.set(".food-elements > *", { y: 50, opacity: 0, rotation: -15 });
    gsap.set(".bubbles .bubble", { scale: 0, transformOrigin: "center" });
    gsap.set(".baby-face", { scale: 0.5, transformOrigin: "center" });
    gsap.set(".bib-checkmark", { drawSVG: "0%" });
    gsap.set(".baby-bottle", { rotation: -10, transformOrigin: "top center", x: 20, y: 10 });
    gsap.set(".bottle-milk-base", { y: 20, opacity: 0 });
    gsap.set(".bottle-milk-wave", { y: 15, opacity: 0 });
    gsap.set(".milk-bubble", { y: 10, opacity: 0, scale: 0 });
    gsap.set(".milk-drip", { scaleY: 0, transformOrigin: "top" });
    gsap.set(".baby-hand-right", { drawSVG: "0%" });
    gsap.set(".baby-finger", { scale: 0, opacity: 0 });
    gsap.set(".baby-maraca", { opacity: 0, rotation: -5, transformOrigin: "bottom center" });
    gsap.set(".maraca-dot", { scale: 0, transformOrigin: "center" });
    
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }});
    
    tl.to(".welcome-title", { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" })
      .to(".welcome-subtitle", { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.6")
      .to(".baby-face", { scale: 1, duration: 1.2, ease: "elastic.out(1, 0.6)" }, "-=0.4")
      .to(".welcome-image-container", { opacity: 1, scale: 1, duration: 0.8 }, "-=1")
      .to(".baby-hair-strand", { 
          drawSVG: "100%", 
          duration: 1.2, 
          stagger: 0.2,
          ease: "elastic.out(1, 0.7)"
      }, "-=0.6")
      .to(".baby-eyes .eye-pupil", { scale: 1, duration: 0.5 }, "-=0.4")
      .to(".baby-eyes .eye-shine", { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1 }, "-=0.3")
      .to(".eyelash", { scale: 1, opacity: 1, duration: 0.5, stagger: 0.05 }, "-=0.3")
      .to(".baby-mouth", { drawSVG: "100%", duration: 0.6 }, "-=0.4")
      .to(".baby-cheek", { scale: 1, opacity: 0.6, duration: 0.8, stagger: 0.1 }, "-=0.5")
      .to(".baby-bottle", { 
          rotation: 0, 
          x: 0, 
          y: 0, 
          duration: 0.8, 
          ease: "elastic.out(1, 0.5)" 
      }, "-=0.5")
      .to(".bottle-milk-base", { 
          y: 0, 
          opacity: 0.9, 
          duration: 0.5 
      })
      .to(".bottle-milk-wave", { 
          y: 0, 
          opacity: 0.5, 
          duration: 0.5 
      })
      .to(".milk-bubble", {
          y: 0,
          opacity: 0.8,
          scale: 1,
          stagger: 0.1,
          duration: 0.4
      }, "-=0.2")
      .to(".milk-drip", {
          scaleY: 1,
          duration: 0.3
      }, "-=0.2")
      .to(".baby-hand-right", { 
          drawSVG: "100%", 
          duration: 0.8, 
          ease: "power2.out" 
      }, "-=0.3")
      .to(".baby-finger", {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.3
      }, "-=0.5")
      .to(".baby-maraca", {
          opacity: 1,
          duration: 0.5
      }, "-=0.8")
      .to(".maraca-dot", {
          scale: 1,
          stagger: 0.1,
          duration: 0.3,
          ease: "back.out(2)"
      }, "-=0.3");

    // Create blinking animation
    gsap.timeline({ repeat: -1, repeatDelay: 3 })
        .to(".baby-eyes .eye-pupil, .baby-eyes .eye-shine, .eyelash", {
            scaleY: 0.1,
            duration: 0.1,
            transformOrigin: "center"
        })
        .to(".baby-eyes .eye-pupil, .baby-eyes .eye-shine, .eyelash", {
            scaleY: 1,
            duration: 0.1
        });
        
    // Animate the milk in the bottle with new wave effect
    gsap.timeline({ repeat: -1 })
        .to(".bottle-milk-wave", {
            y: -10,
            duration: 1.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });
        
    gsap.timeline({ repeat: -1 })
        .to(".bottle-milk-base", {
            y: 5,
            duration: 1,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });
        
    // Milk bubbles with improved random movement
    gsap.timeline({ repeat: -1 })
        .to(".milk-bubble", {
            y: "-=20",
            x: "random(-5, 5)",
            duration: 2,
            stagger: {
                each: 0.3,
                repeat: -1,
                yoyo: true
            },
            ease: "power1.inOut"
        });
        
    // Enhanced milk drip animation
    gsap.timeline({ repeat: -1, repeatDelay: 1 })
        .to(".milk-drip", {
            scaleY: 0,
            y: 5,
            duration: 0.5,
            transformOrigin: "top"
        })
        .to(".milk-drip", {
            y: 0,
            duration: 0.1
        })
        .to(".milk-drip", {
            scaleY: 1,
            duration: 0.3
        });

    // Baby bottle shaking animation
    gsap.timeline({ repeat: -1, repeatDelay: 2 })
        .to(".baby-bottle", {
            rotation: 5,
            x: -5,
            duration: 0.2,
            ease: "power1.inOut"
        })
        .to(".baby-bottle", {
            rotation: -5,
            x: 5,
            duration: 0.2,
            ease: "power1.inOut",
            repeat: 8,
            yoyo: true
        })
        .to(".baby-bottle", {
            rotation: 0,
            x: 0,
            duration: 0.4,
            ease: "power1.out"
        });
        
    // Improved hair bouncing animation - more playful for the three strands from a common origin
    gsap.timeline({ repeat: -1, repeatDelay: 2 })
        .to(".baby-hair-strand.left", {
            scaleY: 1.2,
            rotation: -5,
            transformOrigin: "bottom",
            duration: 0.8,
            ease: "elastic.out(1, 0.3)"
        })
        .to(".baby-hair-strand.center", {
            scaleY: 1.3,
            transformOrigin: "bottom",
            duration: 0.8,
            ease: "elastic.out(1, 0.3)"
        }, "-=0.6")
        .to(".baby-hair-strand.right", {
            scaleY: 1.2,
            rotation: 5,
            transformOrigin: "bottom",
            duration: 0.8,
            ease: "elastic.out(1, 0.3)"
        }, "-=0.7")
        .to(".baby-hair-strand", {
            scaleY: 1,
            rotation: 0,
            duration: 0.5,
            stagger: 0.1
        });
    
    // Enhanced maraca shaking animation 
    gsap.timeline({ repeat: -1, repeatDelay: 1 })
        .to(".baby-maraca", {
            rotation: 10,
            duration: 0.1,
            ease: "power1.inOut"
        })
        .to(".baby-maraca", {
            rotation: -10,
            duration: 0.1,
            ease: "power1.inOut",
            repeat: 12,
            yoyo: true
        })
        .to(".maraca-dot", {
            x: "random(-4, 4)",
            y: "random(-4, 4)",
            duration: 0.05,
            repeat: 24,
            yoyo: true,
            ease: "none"
        }, "-=1.2")
        .to(".baby-maraca", {
            rotation: 0,
            duration: 0.2
        });

    // Add bubbles floating animation
    gsap.timeline({ repeat: -1, repeatDelay: 0.5 })
        .to(".bubbles .bubble", {
            y: "-=30",
            x: "random(-10, 10)",
            scale: 1,
            opacity: 0.8,
            stagger: 0.2,
            duration: 2,
            ease: "power1.inOut"
        })
        .to(".bubbles .bubble", {
            opacity: 0,
            scale: 1.5,
            stagger: 0.2,
            duration: 1,
            ease: "power1.in"
        }, "-=1.5");

    // Add gentle face bobbing animation
    gsap.to(".baby-face", {
        y: 5,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut"
    });
}