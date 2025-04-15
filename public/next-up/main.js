import Alpine from 'https://unpkg.com/alpinejs@3.12.0/dist/module.esm.js';
import gsap from 'https://esm.sh/gsap@3.12.2';

async function loadTasks() {
    try {
        const response = await fetch('game_tasks.json');
        const data = await response.json();
        
        if (!data || !data.tasks) {
            console.error('Invalid tasks data structure');
            return [];
        }

        return data.tasks.map(task => ({
            id: task.id,
            title: task.name,
            description: task.path.join(' > '),
            path: task.path,
            energy: task.compatible_answers?.energy?.[0] || 'medium',
            focus: task.compatible_answers?.mood?.[0] || 'decent',
            creativity: task.compatible_answers?.engagement?.[0] || 'moderate',
            completed: false,
            tags: task.compatible_answers || {}
        }));
    } catch (error) {
        console.error('Error loading tasks:', error);
        return [];
    }
}

async function loadQuestions() {
    try {
        const response = await fetch('questions_task_decision_tree.json');
        const data = await response.json();
        return data.questions || [];
    } catch (error) {
        console.error('Error loading questions:', error);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Alpine.js
    window.Alpine = Alpine;
    Alpine.start();
});

document.addEventListener('alpine:init', () => {
    Alpine.data('nextUpApp', () => ({
        // State initialization 
        taskListLoaded: false,
        activeCard: null,
        tasks: [],
        questions: [],
        currentQuestionIndex: 0,
        userAnswers: {},
        showingResults: false,
        menuOpen: false,
        expandedGroups: new Set(),
        currentQuestion: null,
        showAddTaskForm: false,
        editingTask: null,
        taskForm: {
            id: null,
            title: "",
            description: "",
            energy: "medium",
            focus: "decent",
            creativity: "moderate",
            completed: false
        },
        startedQuestions: false,
        // Compass specific state
        compassQuestionStarted: false,
        compassQuestion: 1,
        compassResultsReady: false,
        compassChoices: {
            need: null,
            time: null
        },
        compassMessage: "",
        compassTasks: [], 

        // Initialize tasks and questions when component loads
        async init() {
            // Load data first
            [this.tasks, this.questions] = await Promise.all([
                loadTasks(),
                loadQuestions()
            ]);

            // Initialize current question after questions are loaded
            if (this.questions && this.questions.length > 0) {
                this.currentQuestion = this.questions[0];
            }

            // Initialize background animations
            this.initAnimations();
            this.startedQuestions = false;
        },

        resetQuestions() {
            this.currentQuestionIndex = 0;
            this.userAnswers = {};
            this.showingResults = false;
            if (this.questions && this.questions.length > 0) {
                this.currentQuestion = this.questions[0];
            }
            this.startedQuestions = false;
        },

        selectOption(questionId, value) {
            if (!questionId || !value) return;
            
            this.userAnswers[questionId] = value;
            
            if (this.currentQuestionIndex < this.questions.length - 1) {
                this.currentQuestionIndex++;
                this.currentQuestion = this.questions[this.currentQuestionIndex];
            } else {
                this.showingResults = true;
            }
        },

        // Compass methods
        resetCompass() {
            this.compassQuestionStarted = false;
            this.compassQuestion = 1;
            this.compassResultsReady = false;
            this.compassChoices = {
                need: null,
                time: null
            };
            this.compassMessage = "";
            this.compassTasks = []; 
        },
        
        startCompassQuestions() {
            this.compassQuestionStarted = true;
        },
        
        answerCompassQuestion(category, value) {
            this.compassChoices[category] = value;
            
            if (this.compassQuestion < 2) {
                this.compassQuestion++;
            } else {
                this.generateCompassResults();
            }
        },
        
        generateCompassResults() {
            // Generate message based on user choices
            const { need, time } = this.compassChoices;
            
            // Create personalized messages
            const needMessages = {
                accomplishment: "You seek the satisfaction of completing something meaningful.",
                progress: "Moving forward on important matters will energize you.",
                clarity: "Taking time to gain perspective will serve you well.",
                rest: "Your spirit calls for gentler activities to restore balance."
            };
            
            const timeMessages = {
                quick: "With just moments to spare, focus on small victories.",
                short: "A brief but focused session awaits.",
                medium: "You have space to dive into something substantial.",
                long: "The path ahead is clear for deeper endeavors."
            };
            
            this.compassMessage = `${needMessages[need]} ${timeMessages[time]}`;
            
            // Filter suitable tasks based on choices
            let suitableTasks = [...this.tasks];
            
            // Apply filters based on need
            if (need === 'accomplishment') {
                suitableTasks = suitableTasks.filter(t => !t.completed && t.description.length < 100);
            } else if (need === 'progress') {
                suitableTasks = suitableTasks.filter(t => !t.completed);
            } else if (need === 'clarity') {
                suitableTasks = suitableTasks.filter(t => t.focus === 'sharp' || t.focus === 'decent');
            } else if (need === 'rest') {
                suitableTasks = suitableTasks.filter(t => t.energy === 'low');
            }
            
            // Apply filters based on time
            if (time === 'quick') {
                suitableTasks = suitableTasks.filter(t => t.energy === 'low' || t.focus === 'scattered');
            } else if (time === 'short') {
                suitableTasks = suitableTasks.filter(t => t.energy !== 'high' || t.focus !== 'sharp');
            } else if (time === 'medium') {
                // No additional filters for medium time
            } else if (time === 'long') {
                suitableTasks = suitableTasks.filter(t => t.energy === 'high' || t.focus === 'sharp');
            }
            
            // Get random tasks, up to 3
            this.compassTasks = this.getRandomItems(suitableTasks, 3);
            
            // If no tasks match, give some defaults based on choices
            if (this.compassTasks.length === 0) {
                this.compassTasks = this.generateDefaultTasks();
            }
            
            this.compassResultsReady = true;
            
            // Animate compass needle
            this.$nextTick(() => {
                 const needle = document.querySelector('.compass-needle');
                 if (needle) {
                     gsap.to(needle, {
                         rotation: this.getRandomRotation(),
                         duration: 2,
                         ease: "elastic.out(1, 0.3)"
                     });
                 }
            });
        },
        
        getRandomItems(array, count) {
            const shuffled = [...array].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        },
        
        getRandomRotation() {
            return Math.floor(Math.random() * 360);
        },
        
        generateDefaultTasks() {
            const { need, time } = this.compassChoices;
            
            // Generate default tasks based on user selections
            const defaultTasks = [
                {
                    id: 'default-1',
                    title: need === 'rest' ? "Take a short mindfulness break" : "Review your priorities",
                    description: "Step back and realign with what matters most right now",
                    energy: "low",
                    focus: "decent",
                    creativity: "moderate",
                    completed: false
                },
                {
                    id: 'default-2',
                    title: time === 'quick' ? "Clear your workspace" : "Plan your next big move",
                    description: "Create space for clearer thinking and action",
                    energy: "medium",
                    focus: "decent",
                    creativity: "moderate",
                    completed: false
                }
            ];
            
            return defaultTasks;
        },
        
        // Task management methods
        toggleTaskComplete(task) {
            const taskIndex = this.tasks.findIndex(t => t.id === task.id);
            if (taskIndex !== -1) {
                this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
                this.saveTasks();
            }
        },
        
        deleteTask(taskId) {
            this.tasks = this.tasks.filter(task => task.id !== taskId);
            this.saveTasks();
        },
        
        selectTaskForEdit(task) {
            this.editingTask = task;
            this.taskForm = { ...task };
            this.showAddTaskForm = true;
        },
        
        saveTask() {
            if (this.editingTask) {
                // Update existing task
                const taskIndex = this.tasks.findIndex(t => t.id === this.editingTask.id);
                if (taskIndex !== -1) {
                    this.tasks[taskIndex] = { ...this.taskForm };
                }
            } else {
                // Add new task
                const newTask = {
                    ...this.taskForm,
                    id: Date.now()
                };
                this.tasks.push(newTask);
            }
            
            this.saveTasks();
            this.resetTaskForm();
        },
        
        resetTaskForm() {
            this.taskForm = {
                id: null,
                title: "",
                description: "",
                energy: "medium",
                focus: "decent",
                creativity: "moderate",
                completed: false
            };
            this.editingTask = null;
            this.showAddTaskForm = false;
        },
        
        saveTasks() {
            localStorage.setItem('nextUpTasks', JSON.stringify(this.tasks));
        },
        
        toggleMenu() {
            this.menuOpen = !this.menuOpen;
            const overlay = document.getElementById('menuOverlay');
            const panel = document.querySelector('.menu-panel');
            
            if (this.menuOpen) {
                overlay.classList.add('active');
                panel.classList.add('active');
            } else {
                overlay.classList.remove('active');
                panel.classList.remove('active');
            }
        },
        
        toggleGroup(groupName) {
            if (this.expandedGroups.has(groupName)) {
                this.expandedGroups.delete(groupName);
            } else {
                this.expandedGroups.add(groupName);
            }
        },
        
        isGroupExpanded(groupName) {
            return this.expandedGroups.has(groupName);
        },
        
        get currentQuestionData() {
            return this.currentQuestion || null;
        },

        get filteredTasks() {
            if (!this.tasks || !this.tasks.length) return [];
            if (!this.userAnswers || Object.keys(this.userAnswers).length === 0) return this.tasks;

            return this.tasks.filter(task => {
                return Object.entries(this.userAnswers).every(([category, value]) => {
                    const compatibleAnswers = task.tags[category];
                    return !compatibleAnswers || compatibleAnswers.includes(value);
                });
            });
        },

        get groupedTasks() {
            const groups = {};
            if (!this.tasks || !this.tasks.length) return groups;
            
            this.tasks.forEach(task => {
                let currentLevel = groups;
                task.path.forEach((pathSegment, index) => {
                    if (!currentLevel[pathSegment]) {
                        currentLevel[pathSegment] = {
                            tasks: [],
                            subgroups: {}
                        };
                    }
                    
                    if (index === task.path.length - 1) {
                        currentLevel[pathSegment].tasks.push(task);
                    } else {
                        currentLevel = currentLevel[pathSegment].subgroups;
                    }
                });
            });
            
            return groups;
        },

        // Animation methods
        initAnimations() {
            // Initialize background animations
            const container = document.getElementById('backgroundAnimation');
            
            // Add moving lines
            for (let i = 0; i < 10; i++) {
                const line = document.createElement('div');
                line.className = 'bg-line';
                line.style.left = `${Math.random() * 100}%`;
                line.style.animationDelay = `${Math.random() * -15}s`;
                container.appendChild(line);
            }
            
            // Add expanding circles
            const createCircle = () => {
                const circle = document.createElement('div');
                circle.className = 'bg-circle';
                circle.style.left = `${Math.random() * 100}%`;
                circle.style.top = `${Math.random() * 100}%`;
                container.appendChild(circle);
                
                // Remove circle after animation
                circle.addEventListener('animationend', () => {
                    circle.remove();
                });
            };
            
            // Create initial circles
            for (let i = 0; i < 3; i++) {
                createCircle();
            }
            
            // Create new circles periodically
            setInterval(createCircle, 5000);
        },
        
        animateCardEntrance() {
            setTimeout(() => {
                gsap.fromTo(".card", 
                    { y: 30, opacity: 0 },
                    { 
                        y: 0, 
                        opacity: 1, 
                        duration: 0.6, 
                        stagger: 0.1, 
                        ease: "back.out(1.7)"
                    }
                );
            }, 100);
        },

        startAdventure() {
            this.taskListLoaded = true;
            this.$nextTick(() => this.animateCardEntrance());
        },
        
        selectCard(card) {
            this.activeCard = card;
            
            if (card === 'compass') {
                this.resetCompass();
            }
        },
        
        goBack() {
            this.activeCard = null;
            this.$nextTick(() => this.animateCardEntrance());
        },
        
        removeFilter(key) {
            delete this.userAnswers[key];
            if (Object.keys(this.userAnswers).length === 0) {
                this.resetQuestions();
            }
        },
        
        getOptionEmoji(value) {
            const emojiMap = {
                // Engagement
                'learn': '📚',
                'think': '💭',
                'do': '⚡',
                
                // Work Area
                'design': '🎨',
                'tools': '🛠️',
                'build': '🏗️',
                
                // Time
                'short': '⚡',
                'medium': '⏲️',
                'long': '🕰️',
                
                // Mood
                'focused': '🎯',
                'creative': '✨',
                'foggy': '🌫️',
                'productive': '⚙️',
                
                // Impact
                'improve': '📈',
                'innovate': '💡',
                'solve': '🔧',
                
                // Energy
                'low': '🌱',
                'moderate': '🌿',
                'high': '🌳',
                
                // Familiarity
                'known': '👣',
                'improve': '🔄',
                'new': '🌟',
                
                // Structure
                'structured': '📋',
                'open': '🎨',
                
                // Outcome
                'creativity': '✨',
                'efficiency': '⚡',
                'technical': '💻',
                
                // Setting
                'quiet': '🧘',
                'dynamic': '🌊',
                
                // Chunk Size
                'small': '🔹',
                'big': '💠',
                'quick': '⚡',
                'accomplishment': '🏆',
                'progress': '🔄',
                'clarity': '🔍',
                'rest': '😴'
            };
            return emojiMap[value] || '📍';
        }
    }));
});