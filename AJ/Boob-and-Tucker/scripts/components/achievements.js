import { gsap } from 'gsap';

export function showAchievement(achievementData) {
    // Create achievement popup element
    const achievementEl = document.createElement('div');
    achievementEl.className = 'achievement-popup';
    
    achievementEl.innerHTML = `
        <div class="achievement-icon">${achievementData.icon}</div>
        <div class="achievement-content">
            <h3>${achievementData.title}</h3>
            <p>${achievementData.message}</p>
        </div>
        <button class="achievement-close">×</button>
    `;
    
    // Append to body
    document.body.appendChild(achievementEl);
    
    // Add event listener to close button
    const closeBtn = achievementEl.querySelector('.achievement-close');
    closeBtn.addEventListener('click', () => {
        dismissAchievement(achievementEl);
    });
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        dismissAchievement(achievementEl);
    }, 5000);
    
    // Animate in
    gsap.fromTo(achievementEl, 
        { opacity: 0, y: 50, scale: 0.8 },
        { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 0.5, 
            ease: "back.out(1.7)"
        }
    );
    
    // Add confetti effect
    createConfetti();
}

function dismissAchievement(element) {
    gsap.to(element, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => element.remove()
    });
}

function createConfetti() {
    const confettiCount = 100;
    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetto = document.createElement('div');
        confetto.className = 'confetti';
        confetto.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetto.style.left = `${Math.random() * 100}vw`;
        
        document.body.appendChild(confetto);
        
        gsap.to(confetto, {
            y: `${100 + Math.random() * 100}vh`,
            x: `${(Math.random() - 0.5) * 50}vw`,
            rotation: Math.random() * 360,
            duration: 1 + Math.random() * 2,
            ease: "power1.out",
            onComplete: () => confetto.remove()
        });
    }
}