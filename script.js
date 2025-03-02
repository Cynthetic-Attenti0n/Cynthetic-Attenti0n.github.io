document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    initParticles();
    
    // Initialize dark mode
    initDarkMode();
    
    // Navigation functionality
    initNavigation();
    
    // Initialize project filters
    initProjectFilters();
    
    // Projects data and rendering
    populateProjects();
    
    // Modal functionality
    initModal();
    
    // Button click events
    initButtonEvents();
    
    // Intersection Observer for scroll animations
    initScrollObserver();
});

// Initialize particles background
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#6c5ce7'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#a29bfe',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
}

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Toggle navigation menu
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = navToggle.contains(event.target) || navMenu.contains(event.target);
        
        if (!isClickInside && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Handle navigation item clicks
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all nav items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Close the menu
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Update active nav item based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.pageYOffset;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.id;
            }
        });
        
        // Update active nav item
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    });
}

// Project data
const projectsData = [
    {
        id: 1,
        title: 'TummyTime',
        description: 'A postpartum recovery companion offering gentle exercises to rebuild core strength and emotional well-being.',
        tags: ['Python', 'Svelte', 'TypeScript', 'HTML', 'CSS', 'JS'],
        categories: ['Wellness & Health'],
        audience: ['Family', 'Personal'],
        date: '2023-05-15',
        image: 'tummy-time',
        icon: 'fa-heart-pulse',
        link: 'AJ/TummyTime/'
    },
    {
        id: 2,
        title: 'Adventures of Python',
        description: 'A children\'s storybook weaving coding concepts into playful animal characters—perfect for inspiring future tech explorers.',
        tags: ['Python', 'HTML', 'CSS', 'JS'],
        categories: ['Education & Learning'],
        audience: ['Family', 'Friends'],
        date: '2023-02-10',
        image: 'adventures-python',
        icon: 'fa-book',
        link: 'AJ/Adventures%20of%20Python/'
    },
    {
        id: 3,
        title: 'ThinkMate',
        description: 'A modern "second brain" that unifies notes, tasks, and projects in one sleek, locally-stored workspace.',
        tags: ['Svelte', 'TypeScript', 'HTML', 'CSS', 'LocalStorage'],
        categories: ['Productivity & Growth'],
        audience: ['Personal', 'Public'],
        date: '2023-08-22',
        image: 'think-mate',
        icon: 'fa-brain',
        link: '#'
    },
    {
        id: 4,
        title: 'Mneme',
        description: 'A life hub that gamifies daily living—track habits, finances, fitness, and mood, all with data stored locally for privacy.',
        tags: ['Python', 'Svelte', 'TypeScript', 'HTML', 'CSS', 'JS'],
        categories: ['Productivity & Growth'],
        audience: ['Personal', 'Public'],
        date: '2022-11-05',
        image: 'mneme',
        icon: 'fa-gamepad',
        link: '#'
    },
    {
        id: 5,
        title: 'Enov-1',
        description: 'A self-improvement app that captures and analyzes personal metrics, turning daily data into actionable insights.',
        tags: ['Python', 'Svelte', 'TypeScript', 'LocalStorage'],
        categories: ['Productivity & Growth'],
        audience: ['Personal', 'Public'],
        date: '2023-06-18',
        image: 'enov-1',
        icon: 'fa-chart-line',
        link: '#'
    },
    {
        id: 6,
        title: 'Chasm Beyond Time',
        description: 'An epic RPG teaching CBT and DBT techniques through a fun, immersive quest—empowering teens to grow emotionally.',
        tags: ['Unreal Engine', 'Python', 'HTML'],
        categories: ['Gaming & Personal Development'],
        audience: ['Family', 'Public'],
        date: '2022-12-30',
        image: 'chasm-beyond',
        icon: 'fa-dragon',
        link: '#'
    },
    {
        id: 7,
        title: 'Mind Over Matter',
        description: 'A 2D Pokémon-style game where real-life tasks replace microtransactions, helping kids with ADHD or Autism stay organized.',
        tags: ['Godot', 'TypeScript', 'JS', 'LocalStorage'],
        categories: ['Gaming & Personal Development'],
        audience: ['Family', 'Public'],
        date: '2023-01-15',
        image: 'mind-over-matter',
        icon: 'fa-puzzle-piece',
        link: '#'
    },
    {
        id: 8,
        title: 'InnerPiece',
        description: 'A calming meditation app guiding adults to discover their "inner piece" through mindfulness and relaxation exercises.',
        tags: ['Python', 'Svelte', 'TypeScript', 'HTML', 'CSS', 'JS'],
        categories: ['Wellness & Health'],
        audience: ['Personal', 'Public'],
        date: '2023-03-20',
        image: 'inner-piece',
        icon: 'fa-spa',
        link: '#'
    },
    {
        id: 9,
        title: 'minDCare',
        description: 'A pocket-sized self-care toolkit offering daily check-ins and gentle reminders to nurture mental well-being.',
        tags: ['Python', 'Svelte', 'TypeScript', 'HTML', 'CSS'],
        categories: ['Wellness & Health'],
        audience: ['Personal'],
        date: '2023-04-10',
        image: 'mindcare',
        icon: 'fa-hand-holding-heart',
        link: '#'
    },
    {
        id: 10,
        title: 'Enov-1 (Enhanced)',
        description: 'An upgraded Enov-1 with AI-driven analytics, perfect for those serious about quantifying every aspect of life.',
        tags: ['Python', 'Svelte', 'TypeScript', 'LocalStorage', 'AI'],
        categories: ['Productivity & Growth'],
        audience: ['Personal', 'Public'],
        date: '2023-07-05',
        image: 'enov-enhanced',
        icon: 'fa-robot',
        link: '#'
    },
    {
        id: 11,
        title: 'ThriveMind',
        description: 'A community-driven platform merging collective wisdom and personal growth—think of it as a hive mind for self-improvement.',
        tags: ['Python', 'TypeScript', 'HTML', 'CSS', 'JS'],
        categories: ['Community & Collaboration'],
        audience: ['Friends', 'Public'],
        date: '2023-08-15',
        image: 'thrive-mind',
        icon: 'fa-people-group',
        link: '#'
    },
    {
        id: 12,
        title: 'Psypher',
        description: 'A unified psychology assessment tool consolidating multiple best-practice evaluations for powerful cross-analysis.',
        tags: ['Python', 'Svelte', 'TypeScript', 'HTML', 'CSS', 'JS'],
        categories: ['Wellness & Health'],
        audience: ['Personal', 'Public'],
        date: '2023-09-01',
        image: 'psypher',
        icon: 'fa-brain',
        link: '#'
    },
    {
        id: 13,
        title: 'Insightful.ly',
        description: 'An automated analytics dashboard that transforms messy startup data into actionable insights in real time.',
        tags: ['Python', 'Svelte', 'TypeScript', 'HTML', 'CSS', 'JS', 'API'],
        categories: ['Data & AI'],
        audience: ['Friends', 'Public'],
        date: '2023-10-10',
        image: 'insightfully',
        icon: 'fa-chart-pie',
        link: '#'
    },
    {
        id: 14,
        title: 'KAI',
        description: 'A dynamic multimodal chat app that picks the best language models and data sources on the fly to solve user queries.',
        tags: ['Python', 'TypeScript', 'Svelte', 'HTML', 'CSS', 'JS', 'Langchain'],
        categories: ['Data & AI'],
        audience: ['Personal', 'Public'],
        date: '2023-11-05',
        image: 'kai',
        icon: 'fa-comments',
        link: '#'
    },
    {
        id: 15,
        title: '愛 Workout (AI = \'love\')',
        description: 'An adaptive workout planner for back rehab or general fitness—offering real-time AI guidance and personalized adjustments.',
        tags: ['Python', 'TypeScript', 'Svelte', 'HTML', 'CSS', 'JS', 'AI'],
        categories: ['Wellness & Health'],
        audience: ['Personal', 'Public'],
        date: '2023-12-01',
        image: 'ai-workout',
        icon: 'fa-dumbbell',
        link: '#'
    }
];

// Initialize dark mode
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Toggle theme
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// Initialize project filters and sorting
function initProjectFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const audienceFilter = document.getElementById('audience-filter');
    const sortSelect = document.getElementById('sort-select');
    const filterButtons = document.querySelectorAll('.filter-button');
    const sortButton = document.querySelector('.sort-button');
    const filterMenus = document.querySelectorAll('.filter-menu');
    const sortMenu = document.querySelector('.sort-menu');
    
    // Get unique categories and audiences
    const categories = [...new Set(projectsData.flatMap(project => project.categories))].sort();
    const audiences = [...new Set(projectsData.flatMap(project => project.audience))].sort();
    
    // Populate category filter
    categories.forEach(category => {
        const option = document.createElement('div');
        option.className = 'filter-option';
        option.dataset.value = category;
        option.innerHTML = `<i class="fas fa-circle"></i> ${category}`;
        categoryFilter.appendChild(option);
    });
    
    // Populate audience filter
    audiences.forEach(audience => {
        const option = document.createElement('div');
        option.className = 'filter-option';
        option.dataset.value = audience;
        option.innerHTML = `<i class="fas fa-circle"></i> ${audience}`;
        audienceFilter.appendChild(option);
    });
    
    // Toggle filter menus
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetMenu = document.getElementById(targetId);
            
            // Close other menus
            filterMenus.forEach(menu => {
                if (menu.id !== targetId) {
                    menu.classList.remove('active');
                }
            });
            sortMenu.classList.remove('active');
            
            // Toggle target menu
            targetMenu.classList.toggle('active');
        });
    });
    
    // Toggle sort menu
    sortButton.addEventListener('click', function() {
        sortMenu.classList.toggle('active');
        
        // Close filter menus
        filterMenus.forEach(menu => {
            menu.classList.remove('active');
        });
    });
    
    // Close menus when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.filter-container') && !event.target.closest('.sort-container')) {
            filterMenus.forEach(menu => {
                menu.classList.remove('active');
            });
            sortMenu.classList.remove('active');
        }
    });
    
    // Handle filter option clicks
    const filterOptions = document.querySelectorAll('.filter-option');
    filterOptions.forEach(option => {
        option.addEventListener('click', function() {
            const filterType = this.closest('.filter-menu').id;
            const value = this.dataset.value;
            
            // Add subtle animation when clicking
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Toggle active state
            this.classList.toggle('active');
            
            // Update filter button text
            updateFilterButtonText(filterType);
            
            // Apply filters
            applyFilters();
            
            // Close menu
            this.closest('.filter-menu').classList.remove('active');
        });
    });
    
    // Handle sort option clicks
    const sortOptions = document.querySelectorAll('.sort-option');
    sortOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active from all sort options
            sortOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active to clicked option
            this.classList.add('active');
            
            // Update sort button text
            const sortText = this.textContent;
            document.querySelector('.sort-button span').textContent = sortText;
            
            // Apply sorting
            applyFilters();
            
            // Close menu
            sortMenu.classList.remove('active');
        });
    });
}

// Update filter button text based on selected options
function updateFilterButtonText(filterType) {
    const filterMenu = document.getElementById(filterType);
    const filterButton = document.querySelector(`[data-target="${filterType}"]`).querySelector('span');
    const selectedOptions = filterMenu.querySelectorAll('.filter-option.active');
    
    if (selectedOptions.length === 0) {
        filterButton.textContent = filterType === 'category-filter' ? 'Category: All' : 'Audience: All';
    } else if (selectedOptions.length === 1) {
        filterButton.textContent = filterType === 'category-filter' ? 
            `Category: ${selectedOptions[0].dataset.value}` : 
            `Audience: ${selectedOptions[0].dataset.value}`;
    } else {
        filterButton.textContent = filterType === 'category-filter' ? 
            `Category: ${selectedOptions.length} selected` : 
            `Audience: ${selectedOptions.length} selected`;
    }
}

// Apply filters and sorting to projects
function applyFilters() {
    const projectsGrid = document.querySelector('.projects-grid');
    const noResultsMsg = document.querySelector('.no-results');
    
    // Get selected categories
    const selectedCategories = Array.from(document.querySelectorAll('#category-filter .filter-option.active'))
        .map(option => option.dataset.value);
    
    // Get selected audiences
    const selectedAudiences = Array.from(document.querySelectorAll('#audience-filter .filter-option.active'))
        .map(option => option.dataset.value);
    
    // Get sort option
    const sortOption = document.querySelector('.sort-option.active').dataset.value;
    
    // Filter projects
    let filteredProjects = [...projectsData];
    
    if (selectedCategories.length > 0) {
        filteredProjects = filteredProjects.filter(project => 
            project.categories.some(category => selectedCategories.includes(category))
        );
    }
    
    if (selectedAudiences.length > 0) {
        filteredProjects = filteredProjects.filter(project => 
            project.audience.some(audience => selectedAudiences.includes(audience))
        );
    }
    
    // Sort projects
    switch (sortOption) {
        case 'alphabetical':
            filteredProjects.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'date-new':
            filteredProjects.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'date-old':
            filteredProjects.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        default:
            // Default sorting (by id)
            filteredProjects.sort((a, b) => a.id - b.id);
    }
    
    // Clear projects grid
    projectsGrid.innerHTML = '';
    
    // Show no results message if no projects match filters
    if (filteredProjects.length === 0) {
        noResultsMsg.classList.add('active');
    } else {
        noResultsMsg.classList.remove('active');
        
        // Populate grid with filtered projects
        filteredProjects.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.style.animationDelay = `${index * 0.1}s`;
            
            projectCard.innerHTML = `
                <div class="project-image ${project.image}">
                    <div class="project-image-placeholder">
                        <i class="fas ${project.icon}"></i>
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <button class="project-view-btn" data-project-id="${project.id}">
                        View Details
                    </button>
                </div>
            `;
            
            projectsGrid.appendChild(projectCard);
        });
        
        // Add click event to view buttons - call the dedicated function
        addProjectButtonListeners();
    }
}

// Populate projects grid
function populateProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    // Initialize with all projects
    projectsData.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.style.animationDelay = `${index * 0.1}s`;
        
        projectCard.innerHTML = `
            <div class="project-image ${project.image}">
                <div class="project-image-placeholder">
                    <i class="fas ${project.icon}"></i>
                </div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <button class="project-view-btn" data-project-id="${project.id}">
                    View Details
                </button>
            </div>
        `;
        
        // Add hover effect with mouse movement
        projectCard.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            // Calculate rotation based on mouse position
            const rotateY = ((x / rect.width) - 0.5) * 5; // -2.5 to 2.5 degrees
            const rotateX = ((y / rect.height) - 0.5) * -5; // 2.5 to -2.5 degrees
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        projectCard.addEventListener('mouseleave', function() {
            this.style.transform = '';
            // Reset to CSS default transition
            setTimeout(() => {
                this.style.transition = '';
            }, 300);
        });
        
        projectsGrid.appendChild(projectCard);
    });
    
    // Add click event to view buttons with enhanced feedback
    addProjectButtonListeners();
}

// Separate function to add event listeners to project buttons
function addProjectButtonListeners() {
    const viewButtons = document.querySelectorAll('.project-view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Get project ID
            const projectId = this.getAttribute('data-project-id');
            
            // Find the project data
            const project = projectsData.find(p => p.id == projectId);
            
            
            // For all other projects, create ripple effect and show modal
            const circle = document.createElement('span');
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;
            
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
            circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
            circle.classList.add('ripple');
            
            const ripple = button.getElementsByClassName('ripple')[0];
            if (ripple) {
                ripple.remove();
            }
            
            button.appendChild(circle);
            
            // Show modal with slight delay for effect
            setTimeout(() => {
                openProjectModal(projectId);
            }, 300);
        });
    });
}

// Modal functionality
function initModal() {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close');
    
    // Close modal when clicking the close button
    closeBtn.addEventListener('click', function() {
        closeModal();
    });
    
    // Close modal when clicking outside of modal content
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal when pressing escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Enhanced open project modal function with explicit style setting
function openProjectModal(projectId) {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalTags = document.getElementById('modal-tags');
    const modalLink = document.getElementById('modal-link');
    
    // Find the project data
    const project = projectsData.find(p => p.id == projectId);
    
    if (project) {
        // Set modal content
        modalTitle.textContent = project.title;
        modalImage.className = 'modal-image';
        modalImage.classList.add(project.image);
        modalImage.innerHTML = `<div class="project-image-placeholder"><i class="fas ${project.icon}"></i></div>`;
        modalDescription.textContent = project.description;
        
        // Set tags with staggered animation
        modalTags.innerHTML = '';
        project.tags.forEach((tag, index) => {
            const tagElement = document.createElement('span');
            tagElement.className = 'modal-tag';
            tagElement.textContent = tag;
            tagElement.style.opacity = '0';
            tagElement.style.transform = 'translateY(10px)';
            modalTags.appendChild(tagElement);
            
            // Staggered animation for tags
            setTimeout(() => {
                tagElement.style.transition = 'all 0.3s ease';
                tagElement.style.opacity = '1';
                tagElement.style.transform = 'translateY(0)';
            }, 100 + (index * 50));
        });
        
        // Set link
        modalLink.href = project.link;
        
        // Get modal content and reset its styles explicitly before showing
        const modalContent = document.querySelector('.modal-content');
        modalContent.style.transition = 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)';
        modalContent.style.transform = 'scale(1) translateY(0)';
        modalContent.style.opacity = '1';
        
        // Show modal with animation
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

// Fixed close modal function with proper style reset
function closeModal() {
    const modal = document.getElementById('project-modal');
    const modalContent = document.querySelector('.modal-content');
    
    // Play exit animation
    modalContent.style.transform = 'scale(0.95) translateY(10px)';
    modalContent.style.opacity = '0';
    
    // Wait for animation to complete before hiding modal
    setTimeout(() => {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Remove all ripple effects that might have been added
        document.querySelectorAll('.ripple').forEach(ripple => ripple.remove());
        
        // Reset modalContent styles after hiding the modal
        // This is the important fix - we need to reset these styles
        setTimeout(() => {
            modalContent.style.transform = '';
            modalContent.style.opacity = '';
        }, 50);
    }, 300);
}



// Button click events
function initButtonEvents() {
    // Explore button scroll to projects
    const exploreBtn = document.getElementById('explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Contact button (can be modified to show a contact form)
    const contactBtn = document.getElementById('contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            // This could trigger a contact form modal or other action
            alert('Contact form would open here!');
        });
    }
    
    // Add ripple effect to all buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Intersection Observer for scroll animations
function initScrollObserver() {
    const sections = document.querySelectorAll('.section');
    
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, options);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add animation classes to projects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    });
    
    const projectsObserver = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
            projectCards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
            projectsObserver.unobserve(entries[0].target);
        }
    }, { threshold: 0.1 });
    
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        projectsObserver.observe(projectsSection);
    }
}
