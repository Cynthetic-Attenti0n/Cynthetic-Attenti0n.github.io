// Module data structure
const moduleData = {
    modules: [
        {
            id: 'introducing-solids',
            title: 'Introducing Solid Foods',
            description: 'Learn when and how to introduce solid foods to your baby.',
            sections: [
                {
                    id: 'when-to-start',
                    title: 'When to Start Solids',
                    content: 'when-to-start'
                },
                {
                    id: 'first-foods',
                    title: 'First Foods to Offer',
                    content: 'first-foods'
                },
                {
                    id: 'how-to-introduce',
                    title: 'How to Introduce Solids',
                    content: 'how-to-introduce'
                }
            ]
        },
        {
            id: 'nutrition-basics',
            title: 'Nutrition Basics',
            description: 'Essential nutritional guidelines for your growing baby.',
            sections: [
                {
                    id: 'nutritional-needs',
                    title: 'Nutritional Needs',
                    content: 'nutritional-needs'
                },
                {
                    id: 'food-groups',
                    title: 'Food Groups for Babies',
                    content: 'food-groups'
                },
                {
                    id: 'meal-planning',
                    title: 'Meal Planning',
                    content: 'meal-planning'
                }
            ]
        },
        {
            id: 'feeding-stages',
            title: 'Feeding Stages',
            description: 'Progress through the different stages of baby feeding.',
            sections: [
                {
                    id: 'six-to-eight-months',
                    title: '6-8 Months',
                    content: 'six-to-eight-months'
                },
                {
                    id: 'nine-to-twelve-months',
                    title: '9-12 Months',
                    content: 'nine-to-twelve-months'
                },
                {
                    id: 'one-to-two-years',
                    title: '1-2 Years',
                    content: 'one-to-two-years'
                }
            ]
        },
        {
            id: 'food-safety',
            title: 'Food Safety & Allergies',
            description: 'Guidelines for safely preparing food and managing allergies.',
            sections: [
                {
                    id: 'safe-preparation',
                    title: 'Safe Food Preparation',
                    content: 'safe-preparation'
                },
                {
                    id: 'allergen-introduction',
                    title: 'Introducing Allergens',
                    content: 'allergen-introduction'
                },
                {
                    id: 'choking-hazards',
                    title: 'Choking Hazards',
                    content: 'choking-hazards'
                }
            ]
        }
    ]
};

// User Progress class
export class UserProgress {
    constructor() {
        this.loadProgress();
    }
    
    loadProgress() {
        const savedProgress = localStorage.getItem('boobAndTuckerProgress');
        
        if (savedProgress) {
            this.progress = JSON.parse(savedProgress);
        } else {
            // Initialize progress data structure
            this.progress = {
                modules: moduleData.modules.map(module => ({
                    id: module.id,
                    started: false,
                    completed: false,
                    sections: module.sections.map(section => ({
                        id: section.id,
                        started: false,
                        completed: false,
                        quizCompleted: false,
                        quizScore: 0
                    }))
                }))
            };
            this.saveProgress();
        }
    }
    
    saveProgress() {
        localStorage.setItem('boobAndTuckerProgress', JSON.stringify(this.progress));
    }
    
    getModuleData() {
        return moduleData.modules.map((module, index) => {
            const progressModule = this.progress.modules[index];
            return {
                ...module,
                started: progressModule.started,
                completed: progressModule.completed,
                progress: this.getModuleProgress(module.id)
            };
        });
    }
    
    getModuleById(moduleId) {
        return moduleData.modules.find(m => m.id === moduleId);
    }
    
    getSectionById(moduleId, sectionId) {
        const module = this.getModuleById(moduleId);
        return module ? module.sections.find(s => s.id === sectionId) : null;
    }
    
    startModule(moduleId) {
        const moduleIndex = this.progress.modules.findIndex(m => m.id === moduleId);
        if (moduleIndex !== -1) {
            this.progress.modules[moduleIndex].started = true;
            // Start first section automatically
            if (this.progress.modules[moduleIndex].sections.length > 0) {
                this.progress.modules[moduleIndex].sections[0].started = true;
            }
            this.saveProgress();
        }
    }
    
    completeModule(moduleId) {
        const moduleIndex = this.progress.modules.findIndex(m => m.id === moduleId);
        if (moduleIndex !== -1) {
            this.progress.modules[moduleIndex].completed = true;
            this.saveProgress();
        }
    }
    
    startSection(moduleId, sectionId) {
        const moduleIndex = this.progress.modules.findIndex(m => m.id === moduleId);
        if (moduleIndex !== -1) {
            const sectionIndex = this.progress.modules[moduleIndex].sections.findIndex(s => s.id === sectionId);
            if (sectionIndex !== -1) {
                this.progress.modules[moduleIndex].started = true;
                this.progress.modules[moduleIndex].sections[sectionIndex].started = true;
                this.saveProgress();
            }
        }
    }
    
    completeSection(moduleId, sectionId) {
        const moduleIndex = this.progress.modules.findIndex(m => m.id === moduleId);
        if (moduleIndex !== -1) {
            const sectionIndex = this.progress.modules[moduleIndex].sections.findIndex(s => s.id === sectionId);
            if (sectionIndex !== -1) {
                this.progress.modules[moduleIndex].sections[sectionIndex].completed = true;
                
                // Check if all sections in the module are completed
                const allSectionsCompleted = this.progress.modules[moduleIndex].sections.every(s => s.completed);
                if (allSectionsCompleted) {
                    this.progress.modules[moduleIndex].completed = true;
                }
                
                this.saveProgress();
                return allSectionsCompleted;
            }
        }
        return false;
    }
    
    submitQuiz(moduleId, sectionId) {
        const moduleIndex = this.progress.modules.findIndex(m => m.id === moduleId);
        if (moduleIndex !== -1) {
            const sectionIndex = this.progress.modules[moduleIndex].sections.findIndex(s => s.id === sectionId);
            if (sectionIndex !== -1) {
                this.progress.modules[moduleIndex].sections[sectionIndex].quizCompleted = true;
                this.progress.modules[moduleIndex].sections[sectionIndex].completed = true;
                
                // Check if all sections in the module are completed
                const allSectionsCompleted = this.progress.modules[moduleIndex].sections.every(s => s.completed);
                if (allSectionsCompleted) {
                    this.progress.modules[moduleIndex].completed = true;
                }
                
                this.saveProgress();
                return { completed: true, allSectionsCompleted };
            }
        }
        return { completed: false, allSectionsCompleted: false };
    }
    
    getFirstSection(moduleId) {
        const module = this.getModuleById(moduleId);
        return module && module.sections.length > 0 ? module.sections[0].id : null;
    }
    
    hasNextSection(moduleId, currentSectionId) {
        const module = this.getModuleById(moduleId);
        if (module) {
            const currentIndex = module.sections.findIndex(s => s.id === currentSectionId);
            return currentIndex < module.sections.length - 1;
        }
        return false;
    }
    
    hasPreviousSection(moduleId, currentSectionId) {
        const module = this.getModuleById(moduleId);
        if (module) {
            const currentIndex = module.sections.findIndex(s => s.id === currentSectionId);
            return currentIndex > 0;
        }
        return false;
    }
    
    getNextSection(moduleId, currentSectionId) {
        const module = this.getModuleById(moduleId);
        if (module) {
            const currentIndex = module.sections.findIndex(s => s.id === currentSectionId);
            if (currentIndex < module.sections.length - 1) {
                return module.sections[currentIndex + 1].id;
            }
        }
        return null;
    }
    
    getPreviousSection(moduleId, currentSectionId) {
        const module = this.getModuleById(moduleId);
        if (module) {
            const currentIndex = module.sections.findIndex(s => s.id === currentSectionId);
            if (currentIndex > 0) {
                return module.sections[currentIndex - 1].id;
            }
        }
        return null;
    }
    
    isModuleCompleted(moduleId) {
        const moduleIndex = this.progress.modules.findIndex(m => m.id === moduleId);
        return moduleIndex !== -1 ? this.progress.modules[moduleIndex].completed : false;
    }
    
    isSectionCompleted(moduleId, sectionId) {
        const moduleIndex = this.progress.modules.findIndex(m => m.id === moduleId);
        if (moduleIndex !== -1) {
            const sectionIndex = this.progress.modules[moduleIndex].sections.findIndex(s => s.id === sectionId);
            return sectionIndex !== -1 ? this.progress.modules[moduleIndex].sections[sectionIndex].completed : false;
        }
        return false;
    }
    
    getModuleProgress(moduleId) {
        const moduleIndex = this.progress.modules.findIndex(m => m.id === moduleId);
        if (moduleIndex !== -1) {
            const sectionsCount = this.progress.modules[moduleIndex].sections.length;
            const completedSections = this.progress.modules[moduleIndex].sections.filter(s => s.completed).length;
            return Math.round((completedSections / sectionsCount) * 100);
        }
        return 0;
    }
    
    getOverallProgress() {
        const totalSections = this.progress.modules.reduce((total, module) => total + module.sections.length, 0);
        const completedSections = this.progress.modules.reduce((total, module) => 
            total + module.sections.filter(s => s.completed).length, 0);
        
        return totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0;
    }
    
    checkForAchievements(moduleId, sectionId) {
        const achievements = [];
        
        // Check if this is the first completed section
        const completedSectionsCount = this.progress.modules.reduce((total, module) => 
            total + module.sections.filter(s => s.completed).length, 0);
            
        if (completedSectionsCount === 1) {
            achievements.push({
                title: 'First Steps',
                message: 'You completed your first section!',
                icon: '🌟'
            });
        }
        
        // Check for module completion
        if (this.isModuleCompleted(moduleId)) {
            const moduleTitle = this.getModuleById(moduleId).title;
            achievements.push({
                title: 'Module Master',
                message: `You completed the ${moduleTitle} module!`,
                icon: '🏆'
            });
            
            // Check if all modules are completed
            const allModulesCompleted = this.progress.modules.every(m => m.completed);
            if (allModulesCompleted) {
                achievements.push({
                    title: 'Course Champion',
                    message: 'You completed all modules in the course!',
                    icon: '👑'
                });
            }
        }
        
        return achievements;
    }
    
    resetAllProgress() {
        // Reset progress for all modules and sections
        this.progress.modules.forEach(module => {
            module.started = false;
            module.completed = false;
            module.sections.forEach(section => {
                section.started = false;
                section.completed = false;
                section.quizCompleted = false;
                section.quizScore = 0;
            });
        });
        
        this.saveProgress();
    }
}