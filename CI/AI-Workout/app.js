// DOM Elements
const dashboardBtn = document.getElementById('dashboard-btn');
const exercisesBtn = document.getElementById('exercises-btn');
const workoutsBtn = document.getElementById('workouts-btn');
const settingsBtn = document.getElementById('settings-btn');
const dashboardView = document.getElementById('dashboard-view');
const exercisesView = document.getElementById('exercises-view');
const workoutsView = document.getElementById('workouts-view');
const settingsView = document.getElementById('settings-view');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const animationsToggle = document.getElementById('animations-toggle');
const weightUnitSelect = document.getElementById('weight-unit');
const distanceUnitSelect = document.getElementById('distance-unit');
const dateDisplay = document.querySelector('.date-display');
const startWorkoutCard = document.getElementById('start-workout-card');
const workoutModal = document.getElementById('workout-modal');
const exerciseDetailModal = document.getElementById('exercise-detail-modal');
const closeModalBtns = document.querySelectorAll('.close-modal-btn');

// App State
const appState = {
    currentView: 'dashboard',
    darkMode: false,
    animations: true,
    weightUnit: 'kg',
    distanceUnit: 'km',
    currentWorkout: null,
    currentExercise: 0,
    currentSet: 1,
    timer: {
        minutes: 0,
        seconds: 0,
        isRunning: false,
        interval: null
    },
    repTimer: {
        isEnabled: true,
        concentric: 2, // seconds for lifting/pushing phase
        hold: 1, // seconds for holding
        eccentric: 4, // seconds for lowering phase
        currentPhase: 'rest', // 'rest', 'concentric', 'hold', 'eccentric'
        timeLeft: 0,
        interval: null
    },
    voiceGuidance: 'basic', // 'none', 'basic', 'full'
    userData: {
        username: 'User',
        age: 30,
        weight: 70,
        fitnessLevel: 'intermediate',
        goals: 'strength'
    },
    workoutHistory: []
};

// Initialize App
function initApp() {
    // Set date in dashboard
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplay.textContent = now.toLocaleDateString('en-US', options);

    // Initialize Chart
    initProgressChart();

    // Load saved preferences from localStorage if available
    loadPreferences();

    // Set up event listeners
    setupEventListeners();

    // Initial rendering
    renderExerciseLibrary();
    renderWorkoutPrograms();
}

// Event Listeners Setup
function setupEventListeners() {
    // Navigation
    dashboardBtn.addEventListener('click', () => switchView('dashboard'));
    exercisesBtn.addEventListener('click', () => switchView('exercises'));
    workoutsBtn.addEventListener('click', () => switchView('workouts'));
    settingsBtn.addEventListener('click', () => switchView('settings'));

    // Settings toggles
    darkModeToggle.addEventListener('change', toggleDarkMode);
    animationsToggle.addEventListener('change', toggleAnimations);
    weightUnitSelect.addEventListener('change', e => {
        appState.weightUnit = e.target.value;
        savePreferences();
        updateWeightUnitDisplay();
    });
    distanceUnitSelect.addEventListener('change', e => {
        appState.distanceUnit = e.target.value;
        savePreferences();
    });

    // Start workout
    startWorkoutCard.addEventListener('click', openWorkoutModal);

    // Modal close buttons
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            workoutModal.classList.remove('active');
            exerciseDetailModal.classList.remove('active');
        });
    });

    // Workout modal controls
    document.getElementById('start-timer-btn').addEventListener('click', startTimer);
    document.getElementById('pause-timer-btn').addEventListener('click', pauseTimer);
    document.getElementById('reset-timer-btn').addEventListener('click', resetTimer);
    document.getElementById('decrease-reps-btn').addEventListener('click', () => adjustReps(-1));
    document.getElementById('increase-reps-btn').addEventListener('click', () => adjustReps(1));
    document.getElementById('complete-set-btn').addEventListener('click', completeSet);
    document.getElementById('previous-exercise-btn').addEventListener('click', previousExercise);
    document.getElementById('next-exercise-btn').addEventListener('click', nextExercise);
    document.getElementById('finish-workout-btn').addEventListener('click', finishWorkout);

    // Filter buttons in exercise library
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter;
            filterExercises(filter);
        });
    });

    // Exercise search
    document.getElementById('exercise-search').addEventListener('input', e => {
        searchExercises(e.target.value);
    });

    // Data management buttons
    document.getElementById('export-data-btn').addEventListener('click', exportUserData);

    document.getElementById('import-data-btn').addEventListener('click', function() {
        const fileInput = document.getElementById('import-file');
        fileInput.click();
    });

    document.getElementById('import-file').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                importUserData(event.target.result);
            };
            reader.readAsText(file);
        }
    });

    document.getElementById('clear-data-btn').addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
            localStorage.clear();
            alert('All data has been cleared. The app will now reload.');
            window.location.reload();
        }
    });

    // Rep timer settings
    document.getElementById('concentric-time').addEventListener('change', function(e) {
        appState.repTimer.concentric = parseInt(e.target.value);
        savePreferences();
    });

    document.getElementById('hold-time').addEventListener('change', function(e) {
        appState.repTimer.hold = parseInt(e.target.value);
        savePreferences();
    });

    document.getElementById('eccentric-time').addEventListener('change', function(e) {
        appState.repTimer.eccentric = parseInt(e.target.value);
        savePreferences();
    });

    // Voice guidance settings
    document.querySelectorAll('input[name="voice-guidance"]').forEach(radio => {
        radio.addEventListener('change', function() {
            appState.voiceGuidance = this.value;
            savePreferences();
        });
    });

    // User data form
    document.getElementById('user-data-form').addEventListener('submit', function(e) {
        e.preventDefault();

        appState.userData = {
            username: document.getElementById('username').value,
            age: parseInt(document.getElementById('age').value),
            weight: parseFloat(document.getElementById('user-weight-input').value),
            fitnessLevel: document.getElementById('fitness-level').value,
            goals: document.getElementById('fitness-goals').value
        };

        saveUserData();
        updateUserDataDisplay();

        alert('User data saved successfully!');
    });
}

// View Switching
function switchView(view) {
    // Update active view in state
    appState.currentView = view;

    // Remove active class from all views and nav buttons
    dashboardView.classList.remove('active');
    exercisesView.classList.remove('active');
    workoutsView.classList.remove('active');
    settingsView.classList.remove('active');
    dashboardBtn.classList.remove('active');
    exercisesBtn.classList.remove('active');
    workoutsBtn.classList.remove('active');
    settingsBtn.classList.remove('active');

    // Add active class to selected view and button
    switch(view) {
        case 'dashboard':
            dashboardView.classList.add('active');
            dashboardBtn.classList.add('active');
            break;
        case 'exercises':
            exercisesView.classList.add('active');
            exercisesBtn.classList.add('active');
            break;
        case 'workouts':
            workoutsView.classList.add('active');
            workoutsBtn.classList.add('active');
            break;
        case 'settings':
            settingsView.classList.add('active');
            settingsBtn.classList.add('active');
            break;
    }
}

// Dark Mode Toggle
function toggleDarkMode() {
    appState.darkMode = darkModeToggle.checked;
    if (appState.darkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    savePreferences();
    updateChartColors();
}

// Animation Toggle
function toggleAnimations() {
    appState.animations = animationsToggle.checked;
    savePreferences();
    // Toggle a class that controls animations
    if (appState.animations) {
        document.body.classList.remove('no-animations');
    } else {
        document.body.classList.add('no-animations');
    }
}

// Save User Preferences
function savePreferences() {
    const preferences = {
        darkMode: appState.darkMode,
        animations: appState.animations,
        weightUnit: appState.weightUnit,
        distanceUnit: appState.distanceUnit,
        repTimer: appState.repTimer,
        voiceGuidance: appState.voiceGuidance
    };
    localStorage.setItem('fitTrackPreferences', JSON.stringify(preferences));
}

// Save User Data
function saveUserData() {
    localStorage.setItem('fitTrackUserData', JSON.stringify(appState.userData));
}

// Save Workout History
function saveWorkoutHistory() {
    localStorage.setItem('fitTrackWorkoutHistory', JSON.stringify(appState.workoutHistory));
}

// Export User Data and History
function exportUserData() {
    const exportData = {
        userData: appState.userData,
        preferences: {
            darkMode: appState.darkMode,
            animations: appState.animations,
            weightUnit: appState.weightUnit,
            distanceUnit: appState.distanceUnit,
            repTimer: appState.repTimer,
            voiceGuidance: appState.voiceGuidance
        },
        workoutHistory: appState.workoutHistory
    };

    const dataStr = JSON.stringify(exportData);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = 'fittrack_data.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Import User Data and History
function importUserData(fileData) {
    try {
        const importedData = JSON.parse(fileData);

        if (importedData.userData) {
            appState.userData = importedData.userData;
            saveUserData();
            updateUserDataDisplay();
        }

        if (importedData.preferences) {
            appState.darkMode = importedData.preferences.darkMode;
            appState.animations = importedData.preferences.animations;
            appState.weightUnit = importedData.preferences.weightUnit;
            appState.distanceUnit = importedData.preferences.distanceUnit;
            appState.repTimer = importedData.preferences.repTimer || appState.repTimer;
            appState.voiceGuidance = importedData.preferences.voiceGuidance || appState.voiceGuidance;

            darkModeToggle.checked = appState.darkMode;
            animationsToggle.checked = appState.animations;
            weightUnitSelect.value = appState.weightUnit;
            distanceUnitSelect.value = appState.distanceUnit;

            if (appState.darkMode) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }

            if (!appState.animations) {
                document.body.classList.add('no-animations');
            } else {
                document.body.classList.remove('no-animations');
            }

            savePreferences();
            updateWeightUnitDisplay();
        }

        if (importedData.workoutHistory) {
            appState.workoutHistory = importedData.workoutHistory;
            saveWorkoutHistory();
            updateProgressChartWithHistory();
        }

        alert('Data imported successfully!');
    } catch (error) {
        console.error('Error importing data:', error);
        alert('Error importing data. Please check the file format.');
    }
}

// Update user data display
function updateUserDataDisplay() {
    // Update welcome message with username
    if (document.querySelector('.dashboard-header h2')) {
        document.querySelector('.dashboard-header h2').textContent = `Welcome Back, ${appState.userData.username}!`;
    }

    // Update any other UI elements that display user data
    if (document.getElementById('user-weight')) {
        document.getElementById('user-weight').textContent = `${appState.userData.weight} ${appState.weightUnit}`;
    }
}

// Load User Preferences
function loadPreferences() {
    const savedPreferences = localStorage.getItem('fitTrackPreferences');
    if (savedPreferences) {
        const preferences = JSON.parse(savedPreferences);

        // Apply saved preferences
        appState.darkMode = preferences.darkMode;
        darkModeToggle.checked = preferences.darkMode;
        if (preferences.darkMode) {
            document.body.classList.add('dark-mode');
        }

        appState.animations = preferences.animations;
        animationsToggle.checked = preferences.animations;
        if (!preferences.animations) {
            document.body.classList.add('no-animations');
        }

        appState.weightUnit = preferences.weightUnit;
        weightUnitSelect.value = preferences.weightUnit;

        appState.distanceUnit = preferences.distanceUnit;
        distanceUnitSelect.value = preferences.distanceUnit;

        // Load additional preferences
        if (preferences.repTimer) {
            appState.repTimer = preferences.repTimer;
        }

        if (preferences.voiceGuidance) {
            appState.voiceGuidance = preferences.voiceGuidance;
        }

        updateWeightUnitDisplay();
    }

    // Load user data if available
    const savedUserData = localStorage.getItem('fitTrackUserData');
    if (savedUserData) {
        appState.userData = JSON.parse(savedUserData);
        updateUserDataDisplay();
    }

    // Load workout history
    const savedWorkoutHistory = localStorage.getItem('fitTrackWorkoutHistory');
    if (savedWorkoutHistory) {
        appState.workoutHistory = JSON.parse(savedWorkoutHistory);
        updateProgressChartWithHistory();
    }
}

// Update weight unit display throughout the app
function updateWeightUnitDisplay() {
    document.querySelectorAll('.weight-unit').forEach(el => {
        el.textContent = appState.weightUnit;
    });
}

// Initialize Progress Chart
function initProgressChart() {
    const ctx = document.getElementById('progressChart').getContext('2d');

    // Sample data - in a real app, this would come from user's workout history
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const workoutData = [1, 0, 1, 1, 0, 1, 0];
    const weightData = [12000, 0, 12500, 13000, 0, 14000, 0];

    window.progressChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Workouts',
                    data: workoutData,
                    backgroundColor: 'rgba(94, 96, 206, 0.2)',
                    borderColor: 'rgba(94, 96, 206, 1)',
                    borderWidth: 2,
                    tension: 0.3,
                    yAxisID: 'y'
                },
                {
                    label: 'Weight Lifted (kg)',
                    data: weightData,
                    backgroundColor: 'rgba(100, 223, 223, 0.2)',
                    borderColor: 'rgba(100, 223, 223, 1)',
                    borderWidth: 2,
                    tension: 0.3,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 2,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Workouts'
                    }
                },
                y1: {
                    beginAtZero: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Weight (kg)'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Update chart colors based on theme
function updateChartColors() {
    if (!window.progressChart) return;

    const textColor = appState.darkMode ? '#f8f9fa' : '#212529';
    const gridColor = appState.darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    window.progressChart.options.scales.y.grid.color = gridColor;
    window.progressChart.options.scales.y1.grid.color = gridColor;
    window.progressChart.options.scales.x.grid.color = gridColor;
    window.progressChart.options.scales.y.ticks.color = textColor;
    window.progressChart.options.scales.y1.ticks.color = textColor;
    window.progressChart.options.scales.x.ticks.color = textColor;

    window.progressChart.update();
}

// Open workout modal
function openWorkoutModal() {
    workoutModal.classList.add('active');
    resetWorkoutSession();
    updateWorkoutDisplay();
}

// Timer Functions
function startTimer() {
    if (!appState.timer.isRunning) {
        appState.timer.isRunning = true;
        appState.timer.interval = setInterval(updateTimer, 1000);
    }
}

function pauseTimer() {
    appState.timer.isRunning = false;
    clearInterval(appState.timer.interval);
}

function resetTimer() {
    pauseTimer();
    appState.timer.minutes = 0;
    appState.timer.seconds = 0;
    updateTimerDisplay();
}

function updateTimer() {
    appState.timer.seconds++;
    if (appState.timer.seconds >= 60) {
        appState.timer.seconds = 0;
        appState.timer.minutes++;
    }
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');

    minutes.textContent = appState.timer.minutes.toString().padStart(2, '0');
    seconds.textContent = appState.timer.seconds.toString().padStart(2, '0');
}

// Rep Counter Functions
function adjustReps(amount) {
    const repCount = document.getElementById('rep-count');
    let currentReps = parseInt(repCount.textContent || '0');
    currentReps = Math.max(0, currentReps + amount);
    repCount.textContent = currentReps;
}

// Workout Execution Functions
function resetWorkoutSession() {
    appState.currentExercise = 0;
    appState.currentSet = 1;
    resetTimer();
    document.getElementById('rep-count').textContent = '0';
    document.getElementById('weight-amount').value = '60';

    // Reset progress bar
    document.getElementById('workout-progress-bar').style.width = '0%';
    document.getElementById('completed-exercises').textContent = '0';
}

function updateWorkoutDisplay() {
    // In a real app, you'd get this data from the workout object
    const exerciseNames = ['Bench Press', 'Shoulder Press', 'Lat Pulldown', 'Bicep Curls', 'Tricep Extensions', 'Chest Flies'];
    const totalExercises = exerciseNames.length;

    document.getElementById('current-exercise').textContent = exerciseNames[appState.currentExercise];
    document.getElementById('set-info').textContent = `Set ${appState.currentSet} of 3`;
    document.getElementById('total-exercises').textContent = totalExercises;

    // Update progress display
    document.getElementById('workout-progress-bar').style.width = `${(appState.currentExercise / totalExercises) * 100}%`;
    document.getElementById('completed-exercises').textContent = appState.currentExercise;

    // Update exercise animation
    updateExerciseAnimation(exerciseNames[appState.currentExercise]);
}

function updateExerciseAnimation(exerciseName) {
    const animationContainer = document.getElementById('exercise-animation');

    // For demo purposes, we'll use basic SVG animations
    // In a real app, you might have more complex animations or images
    let svgContent = '';

    switch(exerciseName.toLowerCase()) {
        case 'bench press':
            svgContent = createBenchPressSVG();
            break;
        case 'shoulder press':
            svgContent = createShoulderPressSVG();
            break;
        case 'lat pulldown':
            svgContent = createLatPulldownSVG();
            break;
        case 'bicep curls':
            svgContent = createBicepCurlsSVG();
            break;
        case 'tricep extensions':
            svgContent = createTricepExtensionsSVG();
            break;
        case 'chest flies':
            svgContent = createChestFliesSVG();
            break;
        default:
            svgContent = `<svg viewBox="0 0 100 100">
                <text x="50" y="50" text-anchor="middle" dominant-baseline="middle">
                    ${exerciseName}
                </text>
            </svg>`;
    }

    animationContainer.innerHTML = svgContent;
}

function createBenchPressSVG() {
    return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <style>
            @keyframes benchPress {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            .bar { animation: benchPress 2s infinite ease-in-out; }
        </style>

        <!-- Bench -->
        <rect x="35" y="65" width="30" height="10" fill="#6c757d" />

        <!-- Person -->
        <circle cx="50" cy="60" r="8" fill="#5E60CE" />
        <line x1="50" y1="68" x2="50" y2="80" stroke="#5E60CE" stroke-width="3" />
        <line x1="50" y1="70" x2="35" y2="75" stroke="#5E60CE" stroke-width="3" />
        <line x1="50" y1="70" x2="65" y2="75" stroke="#5E60CE" stroke-width="3" />
        <line x1="50" y1="80" x2="40" y2="90" stroke="#5E60CE" stroke-width="3" />
        <line x1="50" y1="80" x2="60" y2="90" stroke="#5E60CE" stroke-width="3" />

        <!-- Bar & Weights -->
        <g class="bar">
            <rect x="25" y="40" width="50" height="2" fill="#343a40" />
            <circle cx="30" cy="41" r="5" fill="#6c757d" />
            <circle cx="70" cy="41" r="5" fill="#6c757d" />
        </g>
    </svg>`;
}

function createShoulderPressSVG() {
    return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <style>
            @keyframes shoulderPress {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-15px); }
            }
            .bar { animation: shoulderPress 2s infinite ease-in-out; }
        </style>

        <!-- Person -->
        <circle cx="50" cy="60" r="8" fill="#5E60CE" />
        <line x1="50" y1="68" x2="50" y2="85" stroke="#5E60CE" stroke-width="3" />
        <line x1="50" y1="70" x2="35" y2="65" stroke="#5E60CE" stroke-width="3" />
        <line x1="50" y1="70" x2="65" y2="65" stroke="#5E60CE" stroke-width="3" />
        <line x1="50" y1="85" x2="40" y2="95" stroke="#5E60CE" stroke-width="3" />
        <line x1="50" y1="85" x2="60" y2="95" stroke="#5E60CE" stroke-width="3" />

        <!-- Bar & Weights -->
        <g class="bar">
            <rect x="25" y="45" width="50" height="2" fill="#343a40" />
            <circle cx="30" cy="46" r="5" fill="#6c757d" />
            <circle cx="70" cy="46" r="5" fill="#6c757d" />
        </g>
    </svg>`;
}

function createLatPulldownSVG() {
    return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <style>
            @keyframes latPulldown {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(15px); }
            }
            .bar { animation: latPulldown 2s infinite ease-in-out; }
        </style>

        <!-- Machine Frame -->
        <rect x="40" y="20" width="20" height="5" fill="#6c757d" />
        <rect x="30" y="25" width="40" height="3" fill="#6c757d" />

        <!-- Person -->
        <circle cx="50" cy="60" r="8" fill="#5E60CE" />
        <line x1="50" y1="68" x2="50" y2="85" stroke="#5E60CE" stroke-width="3" />
        <line x1="50" y1="70" x2="35" y2="60" stroke="#5E60CE" stroke-width="3" />
        <line x1="50" y1="70" x2="65" y2="60" stroke="#5E60CE" stroke-width="3" />
        <line x1="50" y1="85" x2="40" y2="95" stroke="#5E60CE" stroke-width="3" />
        <line x1="50" y1="85" x2="60" y2="95" stroke="#5E60CE" stroke-width="3" />

        <!-- Bar & Cables -->
        <line x1="50" y1="25" x2="50" y2="40" stroke="#343a40" stroke-width="1" />
        <g class="bar">
            <rect x="30" y="40" width="40" height="2" fill="#343a40" />
        </g>
    </svg>`;
}

function createBicepCurlsSVG() {
    return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <style>
            @keyframes bicepCurl {
                0%, 100% { transform: rotate(0deg); }
                50% { transform: rotate(-60deg); }
            }
            .arm { animation: bicepCurl 2s infinite ease-in-out; transform-origin: 50px 70px; }
        </style>

        <!-- Person -->
        <circle cx="50" cy="55" r="8" fill="#5E60CE" />
        <line x1="50" y1="63" x2="50" y2="85" stroke="#5E60CE" stroke-width="3" />
        <g class="arm">
            <line x1="50" y1="70" x2="65" y2="70" stroke="#5E60CE" stroke-width="3" />
            <circle cx="70" cy="70" r="5" fill="#6c757d" />
        </g>
        <line x1="50" y1="70" x2="35" y2="70" stroke="#5E60CE" stroke-width="3" />
        <line x1="50" y1="85" x2="40" y2="95" stroke="#5E60CE" stroke-width="3" />
        <line x1="50" y1="85" x2="60" y2="95" stroke="#5E60CE" stroke-width="3" />

        <!-- Weight -->
        <circle cx="35" cy="70" r="5" fill="#6c757d" />
    </svg>`;
}

function createTricepExtensionsSVG() {
    return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <style>
            @keyframes tricepExtension {
                0%, 100% { transform: rotate(0deg); }
                50% { transform: rotate(60deg); }
            }
            .arm { animation: tricepExtension 2s infinite ease-in-out; transform-origin: 50px 55px; }
        </style>

        <!-- Person -->
        <circle cx="50" cy="40" r="8" fill="#5E60CE" />
        <line x1="50" y1="48" x2="50" y2="55" stroke="#5E60CE" stroke-width="3" />
        <g class="arm">
            <line x1="50" y1="55" x2="50" y2="70" stroke="#5E60CE" stroke-width="3" />
            <circle cx="50" cy="75" r="5" fill="#6c757d" />
        </g>
        <line x1="50" y1="55" x2="40" y2="65" stroke="#5E60CE" stroke-width="3" />
        <line x1="50" y1="55" x2="60" y2="65" stroke="#5E60CE" stroke-width="3" />
    </svg>`;
}

function createChestFliesSVG() {
    return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <style>
            @keyframes chestFly {
                0%, 100% { transform: rotate(0deg); }
                50% { transform: rotate(-30deg); }
            }
            .left-arm { animation: chestFly 2s infinite ease-in-out; transform-origin: 50px 70px; }
            .right-arm { animation: chestFly 2s infinite ease-in-out; transform-origin: 50px 70px; transform: scaleX(-1); }
        </style>

        <!-- Bench -->
        <rect x="35" y="75" width="30" height="5" fill="#6c757d" />

        <!-- Person -->
        <circle cx="50" cy="60" r="8" fill="#5E60CE" />
        <line x1="50" y1="68" x2="50" y2="80" stroke="#5E60CE" stroke-width="3" />
        <g class="left-arm">
            <line x1="50" y1="70" x2="35" y2="65" stroke="#5E60CE" stroke-width="3" />
            <circle cx="30" cy="65" r="5" fill="#6c757d" />
        </g>
        <g class="right-arm">
            <line x1="50" y1="70" x2="65" y2="65" stroke="#5E60CE" stroke-width="3" />
            <circle cx="70" cy="65" r="5" fill="#6c757d" />
        </g>
        <line x1="50" y1="80" x2="40" y2="90" stroke="#5E60CE" stroke-width="3" />
        <line x1="50" y1="80" x2="60" y2="90" stroke="#5E60CE" stroke-width="3" />
    </svg>`;
}

function completeSet() {
    // In a real app, you'd save the set data
    const repCount = parseInt(document.getElementById('rep-count').textContent);
    const weight = parseFloat(document.getElementById('weight-amount').value);
    const rpe = parseInt(document.getElementById('rpe-value').value || '7');

    // Store set data
    if (!appState.currentWorkout.tracking) {
        appState.currentWorkout.tracking = {
            date: new Date().toISOString(),
            exercises: []
        };
    }

    // Find or create exercise tracking
    let exerciseTracking = appState.currentWorkout.tracking.exercises.find(
        ex => ex.name === appState.currentWorkout.exercises[appState.currentExercise].name
    );

    if (!exerciseTracking) {
        exerciseTracking = {
            name: appState.currentWorkout.exercises[appState.currentExercise].name,
            sets: []
        };
        appState.currentWorkout.tracking.exercises.push(exerciseTracking);
    }

    // Add set data
    exerciseTracking.sets.push({
        setNumber: appState.currentSet,
        reps: repCount,
        weight: weight,
        rpe: rpe
    });

    console.log(`Completed set ${appState.currentSet} with ${repCount} reps at ${weight} ${appState.weightUnit}, RPE: ${rpe}`);

    // Reset rep counter for next set
    document.getElementById('rep-count').textContent = '0';

    // Check if this was the last set
    if (appState.currentSet >= appState.currentWorkout.exercises[appState.currentExercise].sets) {
        // Move to next exercise
        appState.currentSet = 1;
        nextExercise();
    } else {
        // Increment set counter
        appState.currentSet++;
        updateWorkoutDisplay();
    }
}

function previousExercise() {
    if (appState.currentExercise > 0) {
        appState.currentExercise--;
        appState.currentSet = 1;
        updateWorkoutDisplay();
    }
}

function nextExercise() {
    const totalExercises = 6; // In a real app, this would come from the workout object

    if (appState.currentExercise < totalExercises - 1) {
        appState.currentExercise++;
        appState.currentSet = 1;
        updateWorkoutDisplay();
    } else {
        // Workout complete!
        finishWorkout();
    }
}

function finishWorkout() {
    // Save the current workout to history
    if (appState.currentWorkout && appState.currentWorkout.tracking) {
        appState.workoutHistory.push(appState.currentWorkout.tracking);
        saveWorkoutHistory();
        updateProgressChartWithHistory();
    }

    // In a real app, you'd save the workout data
    console.log('Workout finished!');

    // Close the modal
    workoutModal.classList.remove('active');

    // Show a success notification
    alert('Workout completed successfully!');
}

// Start Rep Timer 
function startRepTimer() {
    if (appState.repTimer.interval) {
        clearInterval(appState.repTimer.interval);
    }

    if (!appState.repTimer.isEnabled) return;

    // Set up the rep phases
    const phases = ['concentric', 'hold', 'eccentric', 'rest'];
    let currentPhaseIndex = phases.indexOf(appState.repTimer.currentPhase);
    if (currentPhaseIndex === -1) currentPhaseIndex = 3; // Default to rest

    // Get times for each phase
    const phaseTimes = {
        concentric: appState.repTimer.concentric,
        hold: appState.repTimer.hold,
        eccentric: appState.repTimer.eccentric,
        rest: 0 // Rest phase is handled separately
    };

    // Set initial timeLeft
    appState.repTimer.timeLeft = phaseTimes[phases[currentPhaseIndex]];

    // Start timer interval
    appState.repTimer.interval = setInterval(() => {
        if (appState.repTimer.timeLeft > 0) {
            appState.repTimer.timeLeft--;
            updateRepTimerDisplay();

            // Voice guidance
            if (appState.voiceGuidance !== 'none') {
                provideVoiceGuidance();
            }
        } else {
            // Move to next phase
            currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
            appState.repTimer.currentPhase = phases[currentPhaseIndex];

            // If we've gone through a complete cycle, increment rep count
            if (currentPhaseIndex === 0) {
                const repCount = document.getElementById('rep-count');
                let currentReps = parseInt(repCount.textContent || '0');
                repCount.textContent = ++currentReps;
            }

            // Set new time for the phase
            appState.repTimer.timeLeft = phaseTimes[phases[currentPhaseIndex]];

            updateRepTimerDisplay();
        }
    }, 1000);
}

// Update Rep Timer Display
function updateRepTimerDisplay() {
    const phaseElement = document.getElementById('rep-phase');
    const timeElement = document.getElementById('phase-time');

    if (phaseElement && timeElement) {
        phaseElement.textContent = appState.repTimer.currentPhase.charAt(0).toUpperCase() + appState.repTimer.currentPhase.slice(1);
        timeElement.textContent = appState.repTimer.timeLeft.toString();

        // Update phase indicator
        document.querySelectorAll('.phase-indicator').forEach(indicator => {
            indicator.classList.remove('active');
        });
        document.getElementById(`${appState.repTimer.currentPhase}-phase`).classList.add('active');
    }
}

// Voice Guidance
function provideVoiceGuidance() {
    if ('speechSynthesis' in window) {
        // Only speak on certain conditions
        let message = '';

        if (appState.voiceGuidance === 'full') {
            // Provide detailed guidance including counts
            if (appState.repTimer.currentPhase === 'concentric') {
                message = `Push ${appState.repTimer.timeLeft}`;
            } else if (appState.repTimer.currentPhase === 'hold') {
                message = `Hold ${appState.repTimer.timeLeft}`;
            } else if (appState.repTimer.currentPhase === 'eccentric') {
                message = `Lower ${appState.repTimer.timeLeft}`;
            }
        } else if (appState.voiceGuidance === 'basic') {
            // Provide basic guidance just for phase changes
            if (appState.repTimer.timeLeft === phaseTimes[appState.repTimer.currentPhase]) {
                if (appState.repTimer.currentPhase === 'concentric') {
                    message = 'Push';
                } else if (appState.repTimer.currentPhase === 'hold') {
                    message = 'Hold';
                } else if (appState.repTimer.currentPhase === 'eccentric') {
                    message = 'Lower';
                }
            }
        }

        if (message) {
            const speech = new SpeechSynthesisUtterance(message);
            speech.volume = 0.8;
            speech.rate = 0.9; // Slightly slower for clarity
            speech.pitch = 1.2; // Slightly higher for a more feminine voice

            // Try to find a female voice
            const voices = speechSynthesis.getVoices();
            const femaleVoice = voices.find(voice => 
                voice.name.includes('female') || 
                voice.name.includes('Samantha') || 
                voice.name.includes('Fiona')
            );

            if (femaleVoice) {
                speech.voice = femaleVoice;
            }

            window.speechSynthesis.speak(speech);
        }
    }
}

// Initialize Progress Chart with Workout History
function updateProgressChartWithHistory() {
    if (!window.progressChart) return;

    // Process workout history data for the chart
    const last7Days = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        last7Days.push(date.toISOString().split('T')[0]);
    }

    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const workoutData = Array(7).fill(0);
    const weightData = Array(7).fill(0);

    // Count workouts and weight lifted for each day
    appState.workoutHistory.forEach(workout => {
        const workoutDate = new Date(workout.date).toISOString().split('T')[0];
        const dayIndex = last7Days.indexOf(workoutDate);

        if (dayIndex !== -1) {
            workoutData[dayIndex]++;

            // Sum up total weight lifted in the workout
            let workoutWeight = 0;
            workout.exercises.forEach(exercise => {
                exercise.sets.forEach(set => {
                    workoutWeight += set.weight * set.reps;
                });
            });

            weightData[dayIndex] += workoutWeight;
        }
    });

    // Update chart data
    window.progressChart.data.labels = labels;
    window.progressChart.data.datasets[0].data = workoutData;
    window.progressChart.data.datasets[1].data = weightData;
    window.progressChart.update();
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);