/* Base styles and variables */
:root {
    /* Primary colors */
    --primary-color: #6c5ce7;
    --primary-light: #a29bfe;
    --primary-dark: #4834d4;
    
    /* Secondary colors */
    --secondary-color: #00cec9;
    --secondary-light: #81ecec;
    --secondary-dark: #00b894;
    
    /* Accent colors */
    --accent-color: #fd79a8;
    --accent-light: #fab1a0;
    --accent-dark: #e84393;
    
    /* Neutral colors */
    --background: #f9f9f9;
    --surface: #ffffff;
    --text-primary: #2d3436;
    --text-secondary: #636e72;
    --text-tertiary: #b2bec3;
    
    /* Dark mode colors */
    --dark-background: #1e1e2e;
    --dark-surface: #2d2d3f;
    --dark-text-primary: #f1f1f2;
    --dark-text-secondary: #c9d1d6;
    --dark-text-tertiary: #8b949e;
    
    /* Sizes and spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-xxl: 3rem;
    
    /* Border radius */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 16px;
    --radius-xl: 24px;
    --radius-full: 9999px;
    
    /* Animation timing */
    --transition-fast: 0.2s;
    --transition-medium: 0.3s;
    --transition-slow: 0.5s;
    
    /* Shadows */
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 16px 32px rgba(0, 0, 0, 0.1);
}

/* Reset and global styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    font-size: 16px;
    scroll-behavior: smooth;
    scroll-snap-type: y proximity;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: var(--text-primary);
    background-color: var(--background);
    line-height: 1.6;
    overflow-x: hidden;
}

a {
    text-decoration: none;
    color: inherit;
}

button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
}

h1 {
    font-size: 2.5rem;
}

h2 {
    font-size: 2rem;
}

h3 {
    font-size: 1.5rem;
}

/* Container */
.app-container {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
}

/* Particles background */
#particles-js {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.6;
}

/* Navigation */
.nav-container {
    position: fixed;
    bottom: var(--spacing-lg);
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.nav-toggle {
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: var(--radius-full);
    background: var(--primary-color);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: var(--shadow-lg);
    z-index: 1001;
    cursor: pointer;
    transition: transform var(--transition-medium) ease, background-color var(--transition-medium) ease;
}

.nav-toggle:hover {
    transform: scale(1.05);
}

.nav-toggle.active {
    background-color: var(--accent-color);
}

.nav-icon {
    position: relative;
    width: 24px;
    height: 2px;
    background-color: transparent;
    transition: all var(--transition-medium) ease;
}

.nav-icon::before,
.nav-icon::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background-color: white;
    transition: all var(--transition-medium) ease;
}

.nav-icon::before {
    transform: translateY(-8px);
}

.nav-icon::after {
    transform: translateY(8px);
}

.nav-toggle.active .nav-icon::before {
    transform: rotate(45deg);
}

.nav-toggle.active .nav-icon::after {
    transform: rotate(-45deg);
}

.nav-menu {
    position: absolute;
    bottom: 70px;
    background-color: var(--surface);
    padding: var(--spacing-md);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    opacity: 0;
    transform: translateY(20px);
    pointer-events: none;
    transition: opacity var(--transition-medium) ease, transform var(--transition-medium) ease;
}

.nav-menu.active {
    opacity: 1;
    transform: translateY(0);
    pointer-events: all;
}

.nav-item {
    padding: var(--spacing-sm) var(--spacing-lg);
    border-radius: var(--radius-md);
    font-weight: 500;
    color: var(--text-secondary);
    transition: all var(--transition-fast) ease;
    position: relative;
    white-space: nowrap;
}

.nav-item:hover {
    color: var(--primary-color);
    background-color: rgba(108, 92, 231, 0.1);
}

.nav-item.active {
    color: var(--primary-color);
    background-color: rgba(108, 92, 231, 0.1);
}

.nav-item.active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 16px;
    background-color: var(--primary-color);
    border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
}

/* Sections common styles */
.section {
    scroll-snap-align: start;
    min-height: 100vh;
    padding: var(--spacing-xxl) var(--spacing-lg);
    display: flex;
    flex-direction: column;
    justify-content: center;
    scroll-margin-top: 0;
}

.section-header {
    margin-bottom: var(--spacing-xl);
    text-align: center;
}

.section-divider {
    height: 4px;
    width: 60px;
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
    margin: var(--spacing-sm) auto 0;
    border-radius: var(--radius-full);
}

/* Hero section */
.hero-section {
    position: relative;
    overflow: hidden;
    padding-top: 120px;
}

.hero-content {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
    z-index: 1;
    animation: fadeInUp 1s ease;
}

.logo-container {
    display: flex;
    justify-content: center;
    margin-bottom: var(--spacing-lg);
}

.logo {
    width: 80px;
    height: 80px;
    border-radius: var(--radius-full);
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: 700;
    font-size: 1.8rem;
    box-shadow: var(--shadow-lg);
    position: relative;
    overflow: hidden;
}

.logo::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(transparent, rgba(255, 255, 255, 0.2), transparent);
    transform: rotate(45deg);
    animation: shimmer 3s infinite;
}

.hero-title {
    font-size: 3rem;
    margin-bottom: var(--spacing-md);
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color), var(--accent-color));
    -webkit-background-clip: text;
    color: transparent;
    display: inline-block;
}

.hero-tagline {
    font-size: 1.2rem;
    color: var(--text-secondary);
    margin-bottom: var(--spacing-xl);
    min-height: 1.5rem;
    position: relative;
}

.hero-tagline::after {
    content: '|';
    position: absolute;
    right: -4px;
    animation: blink 0.8s infinite;
}

.hero-tagline.typing-complete::after {
    display: inline-block;
    animation: blink 0.8s infinite;
}

.hero-cta {
    margin-top: var(--spacing-lg);
}

/* About section */
.about-section {
    position: relative;
    overflow: hidden;
    perspective: 1000px;
    background-color: rgba(249, 249, 249, 0.7);
    scroll-snap-align: start;
}

.about-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-lg);
    transition: transform 0.5s ease-out;
}

.about-avatar {
    margin-bottom: var(--spacing-md);
    transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.avatar-container {
    width: 150px;
    height: 150px;
    border-radius: var(--radius-full);
    background: linear-gradient(135deg, var(--primary-light), var(--secondary-light));
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: var(--shadow-lg);
    position: relative;
    overflow: hidden;
    transition: all 0.6s ease;
    transform-style: preserve-3d;
}

.avatar-container:hover {
    transform: rotateY(10deg) scale(1.05);
    box-shadow: 0 15px 30px rgba(108, 92, 231, 0.3);
}

.avatar-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 3.5rem;
    position: relative;
    z-index: 1;
    transition: all 0.5s ease;
}

.avatar-placeholder i {
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2));
    transition: transform 0.5s ease;
}

.avatar-container:hover .avatar-placeholder i {
    transform: scale(1.2) rotate(10deg);
}

.avatar-container::after {
    content: '';
    position: absolute;
    width: 150%;
    height: 150%;
    background: linear-gradient(transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: rotate(45deg) translateX(-100%);
    animation: avatarShine 6s infinite;
}

@keyframes avatarShine {
    0% { transform: rotate(45deg) translateX(-100%); }
    50% { transform: rotate(45deg) translateX(100%); }
    100% { transform: rotate(45deg) translateX(100%); }
}

.about-text {
    text-align: center;
    max-width: 700px;
    position: relative;
    overflow: hidden;
    padding: var(--spacing-lg);
    border-radius: var(--radius-lg);
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.5s ease;
    margin-bottom: var(--spacing-lg);
}

body.dark-mode .about-text {
    background: rgba(30, 30, 46, 0.3);
    border: 1px solid rgba(70, 70, 90, 0.2);
}

.about-text:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(108, 92, 231, 0.1);
}

.about-text p {
    margin-bottom: var(--spacing-md);
    line-height: 1.8;
    opacity: 0;
    animation: fadeInUp 0.6s forwards;
    animation-delay: calc(var(--index) * 0.3s);
}

.typing-text {
    position: relative;
    opacity: 1;
    min-height: 1.8em;
}

.typing-text.active {
    opacity: 1;
}

.typing-text.active::after {
    content: '|';
    position: absolute;
    right: -8px;
    animation: blink 0.8s infinite;
}

.typing-text::after {
    display: none;
}

.about-cta {
    display: flex;
    justify-content: center;
    margin-top: var(--spacing-xl);
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s ease;
}

.about-cta.visible {
    opacity: 1;
    transform: translateY(0);
}

.skills-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--spacing-sm);
    margin-top: var(--spacing-lg);
    perspective: 1000px;
}

.skill-tag {
    padding: var(--spacing-sm) var(--spacing-md);
    background: linear-gradient(135deg, rgba(108, 92, 231, 0.1), rgba(0, 206, 201, 0.1));
    color: var(--primary-color);
    border-radius: var(--radius-full);
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 3px 10px rgba(108, 92, 231, 0.1);
    border: 1px solid rgba(108, 92, 231, 0.1);
    transform-style: preserve-3d;
}

body.dark-mode .skill-tag {
    background: linear-gradient(135deg, rgba(162, 155, 254, 0.1), rgba(129, 236, 236, 0.1));
    color: var(--primary-light);
    border: 1px solid rgba(162, 155, 254, 0.2);
    box-shadow: 0 3px 10px rgba(162, 155, 254, 0.1);
}

.skill-tag:hover {
    background: linear-gradient(135deg, rgba(108, 92, 231, 0.2), rgba(0, 206, 201, 0.2));
    transform: translateY(-5px) rotateY(10deg);
    box-shadow: 0 8px 20px rgba(108, 92, 231, 0.2);
}

body.dark-mode .skill-tag:hover {
    background: linear-gradient(135deg, rgba(162, 155, 254, 0.2), rgba(129, 236, 236, 0.2));
    box-shadow: 0 8px 20px rgba(162, 155, 254, 0.3);
}

/* Projects section */
.projects-section {
    background-color: rgba(255, 255, 255, 0.7);
    position: relative;
    overflow: hidden;
}

.projects-controls {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-xl);
    justify-content: center;
    animation: fadeIn 0.8s ease-out;
}

.filter-container,
.sort-container {
    position: relative;
}

.filter-button,
.sort-button {
    padding: var(--spacing-sm) var(--spacing-lg);
    border-radius: var(--radius-full);
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    color: var(--text-secondary);
    font-weight: 500;
    box-shadow: var(--shadow-sm);
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    transition: all var(--transition-fast) ease;
    border: 1px solid rgba(108, 92, 231, 0.15);
}

body.dark-mode .filter-button,
body.dark-mode .sort-button {
    background: rgba(45, 45, 63, 0.7);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    color: var(--dark-text-secondary);
    border: 1px solid rgba(162, 155, 254, 0.2);
}

.filter-button:hover,
.sort-button:hover {
    box-shadow: var(--shadow-md);
    color: var(--primary-color);
    transform: translateY(-2px);
}

body.dark-mode .filter-button:hover,
body.dark-mode .sort-button:hover {
    color: var(--primary-light);
    box-shadow: 0 6px 16px rgba(108, 92, 231, 0.2);
}

.filter-menu,
.sort-menu {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: var(--spacing-xs);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    padding: var(--spacing-sm);
    min-width: 220px;
    z-index: 100;
    display: none;
    flex-direction: column;
    gap: var(--spacing-xs);
    transform: translateY(10px);
    opacity: 0;
    transition: all var(--transition-medium) ease-out;
    border: 1px solid rgba(108, 92, 231, 0.1);
}

body.dark-mode .filter-menu,
body.dark-mode .sort-menu {
    background: rgba(45, 45, 63, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(108, 92, 231, 0.2);
}

.filter-menu.active,
.sort-menu.active {
    display: flex;
    opacity: 1;
    transform: translateY(0);
    animation: fadeInUp 0.3s ease-out;
}

.filter-option,
.sort-option {
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--radius-sm);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    color: var(--text-secondary);
    transition: all var(--transition-fast) ease;
}

body.dark-mode .filter-option,
body.dark-mode .sort-option {
    color: var(--dark-text-secondary);
}

.filter-option:hover,
.sort-option:hover {
    background-color: rgba(108, 92, 231, 0.1);
    color: var(--primary-color);
    transform: translateX(4px);
}

body.dark-mode .filter-option:hover,
body.dark-mode .sort-option:hover {
    background-color: rgba(162, 155, 254, 0.1);
    color: var(--primary-light);
}

.filter-option.active,
.sort-option.active {
    background-color: rgba(108, 92, 231, 0.2);
    color: var(--primary-color);
    font-weight: 600;
}

body.dark-mode .filter-option.active,
body.dark-mode .sort-option.active {
    background-color: rgba(162, 155, 254, 0.2);
    color: var(--primary-light);
}

.filter-option i,
.sort-option i {
    font-size: 0.8rem;
    transition: all var(--transition-fast) ease;
}

.filter-option:hover i,
.sort-option:hover i {
    transform: scale(1.2);
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--spacing-xl);
    margin-top: var(--spacing-xl);
    perspective: 1000px;
}

.project-card {
    background-color: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-md);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transform-style: preserve-3d;
}

body.dark-mode .project-card {
    background-color: rgba(45, 45, 63, 0.75);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(70, 70, 90, 0.4);
}

.project-card:hover {
    transform: translateY(-12px) rotateX(5deg);
    box-shadow: 0 20px 30px rgba(108, 92, 231, 0.2);
}

body.dark-mode .project-card:hover {
    box-shadow: 0 20px 30px rgba(108, 92, 231, 0.3);
}

.project-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0));
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    border-radius: var(--radius-lg);
}

.project-card:hover::before {
    opacity: 1;
}

.project-image {
    width: 100%;
    height: 180px;
    position: relative;
    overflow: hidden;
    transition: all 0.4s ease;
}

.project-card:hover .project-image {
    height: 200px;
}

.project-image-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 3rem;
    transition: transform 0.5s ease;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.project-card:hover .project-image-placeholder {
    transform: scale(1.1);
}

.project-content {
    padding: var(--spacing-lg);
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 2;
}

.project-title {
    font-size: 1.3rem;
    margin-bottom: var(--spacing-sm);
    color: var(--text-primary);
    font-weight: 700;
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    transition: all 0.3s ease;
}

body.dark-mode .project-title {
    background: linear-gradient(to right, var(--primary-light), var(--secondary-light));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.project-card:hover .project-title {
    transform: translateX(5px);
}

.project-description {
    color: var(--text-secondary);
    font-size: 0.95rem;
    margin-bottom: var(--spacing-md);
    flex: 1;
    line-height: 1.5;
}

.project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
    margin-bottom: var(--spacing-md);
}

.project-tag {
    font-size: 0.8rem;
    padding: 3px 10px;
    background-color: rgba(108, 92, 231, 0.1);
    color: var(--primary-color);
    border-radius: var(--radius-sm);
    transition: all 0.3s ease;
    border: 1px solid rgba(108, 92, 231, 0.1);
}

body.dark-mode .project-tag {
    background-color: rgba(162, 155, 254, 0.1);
    color: var(--primary-light);
    border: 1px solid rgba(162, 155, 254, 0.15);
}

.project-tag:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(108, 92, 231, 0.2);
    background-color: rgba(108, 92, 231, 0.2);
}

body.dark-mode .project-tag:hover {
    background-color: rgba(162, 155, 254, 0.2);
    box-shadow: 0 4px 8px rgba(162, 155, 254, 0.3);
}

.project-view-btn {
    align-self: flex-end;
    padding: var(--spacing-sm) var(--spacing-lg);
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
    color: white;
    border-radius: var(--radius-full);
    font-weight: 600;
    box-shadow: 0 4px 10px rgba(108, 92, 231, 0.3);
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    overflow: hidden;
    position: relative;
    overflow: hidden;
    z-index: 1;
    border: none;
}

.project-view-btn:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 6px 15px rgba(108, 92, 231, 0.4);
}

.project-view-btn::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, var(--primary-light), var(--secondary-light));
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.project-view-btn:hover::after {
    opacity: 1;
}

/* Modal */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--transition-medium) ease;
}

.modal.active {
    opacity: 1;
    pointer-events: all;
    animation: modalFadeIn 0.4s ease-out;
}

.modal-content {
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-radius: var(--radius-lg);
    width: 90%;
    max-width: 550px;
    max-height: 90vh;
    overflow-y: auto;
    transform: scale(0.9) translateY(20px);
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

body.dark-mode .modal-content {
    background-color: rgba(45, 45, 63, 0.95);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(70, 70, 90, 0.4);
}

.modal.active .modal-content {
    transform: scale(1) translateY(0);
    opacity: 1;
}

.modal-header {
    padding: var(--spacing-lg);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(178, 190, 195, 0.2);
    position: relative;
}

body.dark-mode .modal-header {
    border-bottom: 1px solid rgba(139, 148, 158, 0.2);
}

.modal-header::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--primary-color), transparent);
    opacity: 0.5;
}

#modal-title {
    font-size: 1.6rem;
    font-weight: 700;
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color), var(--accent-color));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

body.dark-mode #modal-title {
    background: linear-gradient(to right, var(--primary-light), var(--secondary-light), var(--accent-light));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.modal-close {
    font-size: 1.2rem;
    color: var(--text-secondary);
    transition: all var(--transition-fast) ease;
    width: 40px;
    height: 40px;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(108, 92, 231, 0.1);
}

body.dark-mode .modal-close {
    color: var(--dark-text-secondary);
    background: rgba(162, 155, 254, 0.1);
}

.modal-close:hover {
    color: var(--accent-color);
    background: rgba(108, 92, 231, 0.2);
    transform: rotate(90deg);
}

body.dark-mode .modal-close:hover {
    background: rgba(162, 155, 254, 0.2);
}

.modal-body {
    padding: var(--spacing-lg);
}

.modal-image {
    width: 100%;
    height: 260px;
    border-radius: var(--radius-lg);
    margin-bottom: var(--spacing-lg);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 4rem;
    position: relative;
    overflow: hidden;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.modal-image::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(0,0,0,0.2), transparent);
    z-index: 1;
}

.project-image-placeholder i {
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}

.modal-description {
    margin-bottom: var(--spacing-lg);
    color: var(--text-secondary);
    font-size: 1.05rem;
    line-height: 1.6;
    padding: 0 var(--spacing-sm);
}

body.dark-mode .modal-description {
    color: var(--dark-text-secondary);
}

.modal-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-lg);
}

.modal-tag {
    font-size: 0.9rem;
    padding: 5px 12px;
    background-color: rgba(108, 92, 231, 0.1);
    color: var(--primary-color);
    border-radius: var(--radius-sm);
    transition: all 0.3s ease;
    border: 1px solid rgba(108, 92, 231, 0.1);
}

body.dark-mode .modal-tag {
    background-color: rgba(162, 155, 254, 0.1);
    color: var(--primary-light);
    border: 1px solid rgba(162, 155, 254, 0.15);
}

.modal-tag:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(108, 92, 231, 0.2);
    background-color: rgba(108, 92, 231, 0.2);
}

body.dark-mode .modal-tag:hover {
    background-color: rgba(162, 155, 254, 0.2);
    box-shadow: 0 4px 8px rgba(162, 155, 254, 0.3);
}

.modal-footer {
    padding: var(--spacing-lg);
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid rgba(178, 190, 195, 0.2);
    position: relative;
}

body.dark-mode .modal-footer {
    border-top: 1px solid rgba(139, 148, 158, 0.2);
}

.modal-footer::before {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--primary-color), transparent);
    opacity: 0.5;
}

#modal-link {
    padding: var(--spacing-sm) var(--spacing-xl);
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
    color: white;
    border-radius: var(--radius-full);
    font-weight: 600;
    box-shadow: 0 4px 15px rgba(108, 92, 231, 0.4);
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    position: relative;
    overflow: hidden;
    z-index: 1;
}

#modal-link:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 25px rgba(108, 92, 231, 0.5);
}

#modal-link::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, var(--primary-light), var(--secondary-light));
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
}

#modal-link:hover::after {
    opacity: 1;
}

#modal-link i {
    transition: transform 0.3s ease;
}

#modal-link:hover i {
    transform: translateX(4px);
}

/* No results message */
.no-results {
    text-align: center;
    padding: var(--spacing-xl);
    color: var(--text-secondary);
    display: none;
    border: 2px dashed rgba(108, 92, 231, 0.2);
    border-radius: var(--radius-lg);
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    max-width: 600px;
    margin: 0 auto;
}

body.dark-mode .no-results {
    color: var(--dark-text-secondary);
    background-color: rgba(45, 45, 63, 0.6);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 2px dashed rgba(162, 155, 254, 0.2);
}

.no-results.active {
    display: block;
    animation: fadeIn 0.5s ease-out;
}

/* Contact section */
.contact-section {
    background-color: rgba(249, 249, 249, 0.7);
}

.contact-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xl);
}

.social-links {
    display: flex;
    gap: var(--spacing-lg);
}

.social-link {
    width: 60px;
    height: 60px;
    border-radius: var(--radius-full);
    background-color: var(--surface);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--primary-color);
    font-size: 1.5rem;
    box-shadow: var(--shadow-md);
    transition: all var(--transition-medium) ease;
    position: relative;
    overflow: hidden;
}

.social-link::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    border-radius: var(--radius-full);
    top: 100%;
    left: 0;
    transition: top var(--transition-medium) ease;
    z-index: -1;
}

.social-link:hover {
    color: white;
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
}

.social-link:hover::before {
    top: 0;
}

/* Buttons */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-md) var(--spacing-xl);
    border-radius: var(--radius-full);
    font-weight: 600;
    text-align: center;
    transition: all var(--transition-medium) ease;
    position: relative;
    overflow: hidden;
    gap: var(--spacing-sm);
}

.btn::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.5s, height 0.5s;
}

.btn:hover::after {
    width: 300px;
    height: 300px;
}

.btn:active::after {
    width: 300px;
    height: 300px;
}

.primary-btn {
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
    color: white;
    box-shadow: 0 5px 15px rgba(108, 92, 231, 0.4);
}

.primary-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(108, 92, 231, 0.6);
}

.secondary-btn {
    background-color: white;
    color: var(--primary-color);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.secondary-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    background-color: rgba(108, 92, 231, 0.1);
}

/* Dark Mode Styles */
body.dark-mode {
    color: var(--dark-text-primary);
    background-color: var(--dark-background);
}

body.dark-mode .project-card,
body.dark-mode .modal-content,
body.dark-mode .nav-menu,
body.dark-mode .social-link {
    background-color: var(--dark-surface);
}

body.dark-mode .project-title,
body.dark-mode .modal-title {
    color: var(--dark-text-primary);
}

body.dark-mode .project-description,
body.dark-mode .modal-description {
    color: var(--dark-text-secondary);
}

body.dark-mode .about-section,
body.dark-mode .contact-section {
    background-color: rgba(30, 30, 46, 0.7);
}

body.dark-mode .projects-section {
    background-color: rgba(45, 45, 63, 0.7);
}

body.dark-mode .nav-item {
    color: var(--dark-text-secondary);
}

body.dark-mode .nav-item:hover,
body.dark-mode .nav-item.active {
    color: var(--primary-light);
    background-color: rgba(162, 155, 254, 0.1);
}

/* Dark mode toggle */
.theme-toggle {
    position: fixed;
    top: var(--spacing-lg);
    right: var(--spacing-lg);
    z-index: 1000;
    width: 50px;
    height: 50px;
    border-radius: var(--radius-full);
    background: var(--surface);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: var(--shadow-md);
    cursor: pointer;
    transition: background-color var(--transition-medium) ease;
    color: var(--primary-color);
}

body.dark-mode .theme-toggle {
    background: var(--dark-surface);
    color: var(--primary-light);
}

/* Project filters and sorting */
.filter-container,
.sort-container {
    position: relative;
}

.filter-button,
.sort-button {
    padding: var(--spacing-sm) var(--spacing-lg);
    border-radius: var(--radius-full);
    background-color: var(--surface);
    color: var(--text-secondary);
    font-weight: 500;
    box-shadow: var(--shadow-sm);
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    transition: all var(--transition-fast) ease;
}

body.dark-mode .filter-button,
body.dark-mode .sort-button {
    background-color: var(--dark-surface);
    color: var(--dark-text-secondary);
}

.filter-button:hover,
.sort-button:hover {
    box-shadow: var(--shadow-md);
    color: var(--primary-color);
}

.filter-menu,
.sort-menu {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: var(--spacing-xs);
    background-color: var(--surface);
    padding: var(--spacing-sm);
    min-width: 200px;
    z-index: 100;
    display: none;
    flex-direction: column;
    gap: var(--spacing-xs);
}

body.dark-mode .filter-menu,
body.dark-mode .sort-menu {
    background-color: var(--dark-surface);
}

.filter-menu.active,
.sort-menu.active {
    display: flex;
}

.filter-option,
.sort-option {
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--radius-sm);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    color: var(--text-secondary);
    transition: all var(--transition-fast) ease;
}

body.dark-mode .filter-option,
body.dark-mode .sort-option {
    color: var(--dark-text-secondary);
}

.filter-option:hover,
.sort-option:hover {
    background-color: rgba(108, 92, 231, 0.1);
    color: var(--primary-color);
}

.filter-option.active,
.sort-option.active {
    background-color: rgba(108, 92, 231, 0.2);
    color: var(--primary-color);
    font-weight: 600;
}

/* No results message */
.no-results {
    text-align: center;
    padding: var(--spacing-xl);
    color: var(--text-secondary);
    display: none;
}

body.dark-mode .no-results {
    color: var(--dark-text-secondary);
}

.no-results.active {
    display: block;
}

/* Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes shimmer {
    0% {
        transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
        transform: translate(-50%, -50%) rotate(360deg);
    }
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}

/* Mobile optimizations */
@media screen and (max-width: 768px) {
    .hero-title {
        font-size: 2.5rem;
    }
    
    .hero-tagline {
        font-size: 1rem;
    }
    
    .section {
        padding: var(--spacing-xl) var(--spacing-md);
    }
    
    .projects-grid {
        grid-template-columns: 1fr;
    }
}

/* Project-specific styling for new apps */
.tummy-time {
    background: linear-gradient(135deg, #FF9A8B, #FF6A88);
}

.adventures-python {
    background: linear-gradient(135deg, #67B26F, #4ca2cd);
}

.think-mate {
    background: linear-gradient(135deg, #4e54c8, #8f94fb);
}

.mneme {
    background: linear-gradient(135deg, #C33764, #1D2671);
}

.enov-1 {
    background: linear-gradient(135deg, #00B4DB, #0083B0);
}

.chasm-beyond {
    background: linear-gradient(135deg, #834d9b, #d04ed6);
}

.mind-over-matter {
    background: linear-gradient(135deg, #42275a, #734b6d);
}

.inner-piece {
    background: linear-gradient(135deg, #06beb6, #48b1bf);
}

.mindcare {
    background: linear-gradient(135deg, #eb3349, #f45c43);
}

.enov-enhanced {
    background: linear-gradient(135deg, #8e2de2, #4a00e0);
}

.thrive-mind {
    background: linear-gradient(135deg, #11998e, #38ef7d);
}

.psypher {
    background: linear-gradient(135deg, #fc4a1a, #f7b733);
}

.insightfully {
    background: linear-gradient(135deg, #0F2027, #203A43, #2C5364);
}

.kai {
    background: linear-gradient(135deg, #ee0979, #ff6a00);
}

.ai-workout {
    background: linear-gradient(135deg, #dd3e54, #6be585);
}

/* Typing animation container */
.typing-animation-container {
    position: relative;
}

/* Typing animation decorator elements */
.typing-decorator {
    position: absolute;
    font-size: 1.5rem;
    color: var(--primary-color);
    opacity: 0.2;
    transform: rotate(15deg);
    top: -15px;
    left: 10px;
    animation: float 4s ease-in-out infinite;
}

.typing-decorator:nth-child(2) {
    right: 10px;
    left: auto;
    top: auto;
    bottom: -15px;
    transform: rotate(-15deg);
    animation-delay: 1s;
}

.kraken-container {
    position: absolute;
    bottom: -100px;
    right: -100px;
    width: 200px;
    height: 200px;
    opacity: 0;
    transform: translate(50px, 50px) rotate(15deg);
    transition: all 1.5s cubic-bezier(0.68, -0.6, 0.32, 1.6);
    z-index: 1;
    pointer-events: none;
}

.about-text:hover .kraken-container {
    opacity: 0.7;
    transform: translate(0, 0) rotate(0deg);
}

@keyframes float {
    0%, 100% { transform: translateY(0) rotate(15deg); }
    50% { transform: translateY(-10px) rotate(15deg); }
}

body.dark-mode .typing-decorator {
    color: var(--primary-light);
}
