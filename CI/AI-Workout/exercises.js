// Exercise Library Data
const exerciseLibrary = [
    {
        id: 1,
        name: 'Bench Press',
        category: 'upper',
        musclesTargeted: ['Chest', 'Triceps', 'Shoulders'],
        instructions: 'Lie on a flat bench, grip the bar slightly wider than shoulder-width apart, lower the bar to your chest, then push it back up.',
        benefits: 'Builds upper body strength, particularly in the chest, and improves pushing power.',
        commonMistakes: [
            'Arching back excessively',
            'Bouncing the bar off the chest',
            'Not keeping wrists straight',
            'Uneven bar path'
        ]
    },
    {
        id: 2,
        name: 'Squat',
        category: 'lower',
        musclesTargeted: ['Quadriceps', 'Hamstrings', 'Glutes', 'Core'],
        instructions: 'Stand with feet shoulder-width apart, lower your body as if sitting in a chair, keeping chest up and knees tracking over toes, then return to standing position.',
        benefits: 'Builds lower body strength, improves mobility, and engages the entire posterior chain.',
        commonMistakes: [
            'Knees caving inward',
            'Not reaching proper depth',
            'Leaning too far forward',
            'Heels lifting off the ground'
        ]
    },
    {
        id: 3,
        name: 'Deadlift',
        category: 'lower',
        musclesTargeted: ['Hamstrings', 'Glutes', 'Lower Back', 'Traps'],
        instructions: 'Stand with feet hip-width apart, hinge at the hips to grip the bar, keep back flat, then drive through heels to stand up straight, pulling the bar up along your legs.',
        benefits: 'Strengthens the entire posterior chain and improves overall strength and power.',
        commonMistakes: [
            'Rounding the back',
            'Starting with the bar too far from the body',
            'Jerking the weight off the floor',
            'Not engaging the lats'
        ]
    },
    {
        id: 4,
        name: 'Shoulder Press',
        category: 'upper',
        musclesTargeted: ['Shoulders', 'Triceps', 'Upper Chest'],
        instructions: 'Sit or stand with the bar at shoulder height, press the weight overhead until arms are fully extended, then lower back to the starting position.',
        benefits: 'Builds shoulder strength and stability, and improves overhead pressing power.',
        commonMistakes: [
            'Arching the lower back',
            'Flaring the elbows out too much',
            'Not fully extending at the top',
            'Pushing the head forward'
        ]
    },
    {
        id: 5,
        name: 'Pull-Up',
        category: 'upper',
        musclesTargeted: ['Lats', 'Biceps', 'Shoulders', 'Upper Back'],
        instructions: 'Hang from a bar with hands slightly wider than shoulder-width apart, pull yourself up until your chin is over the bar, then lower back to the starting position.',
        benefits: 'Develops upper body pulling strength, builds a strong back, and improves grip strength.',
        commonMistakes: [
            'Using too much momentum/kipping',
            'Not going through full range of motion',
            'Shrugging the shoulders',
            'Improper grip width'
        ]
    },
    {
        id: 6,
        name: 'Plank',
        category: 'core',
        musclesTargeted: ['Abs', 'Lower Back', 'Shoulders'],
        instructions: 'Get into a push-up position with forearms on the ground, maintain a straight line from head to heels, and hold the position.',
        benefits: 'Strengthens the core and improves stability throughout the entire body.',
        commonMistakes: [
            'Sagging hips',
            'Raising hips too high',
            'Not maintaining neutral spine',
            'Holding breath'
        ]
    },
    {
        id: 7,
        name: 'Lat Pulldown',
        category: 'upper',
        musclesTargeted: ['Lats', 'Biceps', 'Middle Back'],
        instructions: 'Sit at a lat pulldown machine, grasp the bar with a wide grip, pull the bar down to chest level, then slowly return to the starting position.',
        benefits: 'Strengthens the back muscles, particularly the latissimus dorsi, and improves posture.',
        commonMistakes: [
            'Leaning back too far',
            'Using too much momentum',
            'Pulling the bar behind the neck',
            'Not engaging the lats properly'
        ]
    },
    {
        id: 8,
        name: 'Lunges',
        category: 'lower',
        musclesTargeted: ['Quadriceps', 'Hamstrings', 'Glutes', 'Calves'],
        instructions: 'Stand upright, step forward with one leg, lowering your hips until both knees are bent at about a 90-degree angle, then return to starting position.',
        benefits: 'Improves lower body strength, balance, and coordination, while also targeting muscles unilaterally.',
        commonMistakes: [
            'Front knee extending past the toe',
            'Torso leaning too far forward',
            'Rear knee not lowering enough',
            'Poor balance and stability'
        ]
    },
    {
        id: 9,
        name: 'Bicep Curls',
        category: 'upper',
        musclesTargeted: ['Biceps', 'Forearms'],
        instructions: 'Stand with feet shoulder-width apart, hold weights at your sides with palms facing forward, bend at the elbows to lift the weights toward your shoulders, then lower back down.',
        benefits: 'Isolates and strengthens the biceps and improves elbow flexion strength.',
        commonMistakes: [
            'Using momentum/swinging',
            'Moving the elbows from their position',
            'Not fully extending arms',
            'Curling too fast'
        ]
    },
    {
        id: 10,
        name: 'Tricep Extensions',
        category: 'upper',
        musclesTargeted: ['Triceps'],
        instructions: 'Hold a weight above your head with both hands, lower the weight behind your head by bending at the elbows, then extend your arms to return to the starting position.',
        benefits: 'Isolates and strengthens the triceps, improving arm definition and pushing strength.',
        commonMistakes: [
            'Moving the elbows from their position',
            'Using too much weight',
            'Flaring elbows out',
            'Not controlling the movement'
        ]
    },
    {
        id: 11,
        name: 'Crunches',
        category: 'core',
        musclesTargeted: ['Abs', 'Obliques'],
        instructions: 'Lie on your back with knees bent, feet flat on the floor, hands behind your head, lift your shoulders and upper back off the floor, then return to the starting position.',
        benefits: 'Strengthens the abdominal muscles and improves core stability.',
        commonMistakes: [
            'Pulling on the neck',
            'Using hip flexors instead of abs',
            'Lifting too high off the ground',
            'Holding breath'
        ]
    },
    {
        id: 12,
        name: 'Running',
        category: 'cardio',
        musclesTargeted: ['Quadriceps', 'Hamstrings', 'Calves', 'Core'],
        instructions: 'Start with a proper warm-up, maintain good posture with slight forward lean, land midfoot, and keep a consistent pace.',
        benefits: 'Improves cardiovascular health, endurance, and burns calories effectively.',
        commonMistakes: [
            'Overstriding',
            'Poor upper body posture',
            'Heel striking too hard',
            'Incorrect breathing technique'
        ]
    },
    {
        id: 13,
        name: 'Chest Flies',
        category: 'upper',
        musclesTargeted: ['Chest', 'Shoulders'],
        instructions: 'Lie on a flat bench, hold weights above your chest with a slight bend in elbows, lower arms out to sides in an arc motion, then bring weights back together.',
        benefits: 'Isolates the chest muscles, improves chest definition, and enhances mobility.',
        commonMistakes: [
            'Straightening arms completely',
            'Lowering weights too far',
            'Insufficient range of motion',
            'Using too much weight'
        ]
    },
    {
        id: 14,
        name: 'Leg Press',
        category: 'lower',
        musclesTargeted: ['Quadriceps', 'Hamstrings', 'Glutes'],
        instructions: 'Sit in the leg press machine, place feet shoulder-width apart on the platform, lower the weight by bending knees, then push the platform away by extending legs.',
        benefits: 'Builds lower body strength without loading the spine and allows for heavy weight training.',
        commonMistakes: [
            'Locking knees at the top',
            'Bringing knees too close to chest',
            'Lifting hips off the seat',
            'Using too narrow foot placement'
        ]
    },
    {
        id: 15,
        name: 'Burpees',
        category: 'cardio',
        musclesTargeted: ['Full Body'],
        instructions: 'Start standing, drop into a squat position, kick feet back into a plank, perform a push-up, jump feet back to squat position, then jump up with arms overhead.',
        benefits: 'Provides full-body workout, improves cardiovascular fitness, and builds strength and endurance.',
        commonMistakes: [
            'Poor form during push-up portion',
            'Not fully extending during jump',
            'Rushing through the movement',
            'Not maintaining core tension'
        ]
    }
];

// Function to render exercise library in the UI
function renderExerciseLibrary() {
    const exercisesContainer = document.getElementById('exercises-container');
    exercisesContainer.innerHTML = '';
    
    exerciseLibrary.forEach(exercise => {
        const exerciseCard = document.createElement('div');
        exerciseCard.className = 'exercise-card';
        exerciseCard.dataset.category = exercise.category;
        
        exerciseCard.innerHTML = `
            <div class="exercise-image">
                ${generateExerciseSVG(exercise.name)}
            </div>
            <div class="exercise-details">
                <h3>${exercise.name}</h3>
                <div class="muscle-tags">
                    ${exercise.musclesTargeted.map(muscle => `<span class="muscle-tag">${muscle}</span>`).join('')}
                </div>
                <button class="view-details-btn" data-id="${exercise.id}">View Details</button>
            </div>
        `;
        
        exercisesContainer.appendChild(exerciseCard);
    });
    
    // Add event listeners for detail buttons
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const exerciseId = parseInt(this.dataset.id);
            showExerciseDetails(exerciseId);
        });
    });
}

// Function to filter exercises by category
function filterExercises(category) {
    const exerciseCards = document.querySelectorAll('.exercise-card');
    
    exerciseCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Function to search exercises by name
function searchExercises(query) {
    const exerciseCards = document.querySelectorAll('.exercise-card');
    const searchTerm = query.toLowerCase();
    
    exerciseCards.forEach(card => {
        const exerciseName = card.querySelector('h3').textContent.toLowerCase();
        
        if (exerciseName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Function to show exercise details in modal
function showExerciseDetails(exerciseId) {
    const exercise = exerciseLibrary.find(ex => ex.id === exerciseId);
    
    if (!exercise) return;
    
    // Populate modal with exercise details
    document.getElementById('detail-exercise-name').textContent = exercise.name;
    document.getElementById('detail-instructions').textContent = exercise.instructions;
    document.getElementById('detail-benefits').textContent = exercise.benefits;
    
    const musclesEl = document.getElementById('detail-muscles');
    musclesEl.innerHTML = '';
    exercise.musclesTargeted.forEach(muscle => {
        const muscleTag = document.createElement('span');
        muscleTag.className = 'muscle-tag';
        muscleTag.textContent = muscle;
        musclesEl.appendChild(muscleTag);
    });
    
    const mistakesEl = document.getElementById('detail-mistakes');
    mistakesEl.innerHTML = '';
    exercise.commonMistakes.forEach(mistake => {
        const mistakeItem = document.createElement('li');
        mistakeItem.textContent = mistake;
        mistakesEl.appendChild(mistakeItem);
    });
    
    // Set exercise illustration
    document.getElementById('detail-exercise-illustration').innerHTML = generateExerciseSVG(exercise.name, true);
    
    // Show the modal
    document.getElementById('exercise-detail-modal').classList.add('active');
}

// Function to generate SVG illustrations for exercises
function generateExerciseSVG(exerciseName, isDetailed = false) {
    const size = isDetailed ? '80%' : '60%';
    const name = exerciseName.toLowerCase();
    
    if (name.includes('bench press')) {
        return createBenchPressSVG(size);
    } else if (name.includes('squat')) {
        return createSquatSVG(size);
    } else if (name.includes('deadlift')) {
        return createDeadliftSVG(size);
    } else if (name.includes('shoulder press')) {
        return createShoulderPressSVG(size);
    } else if (name.includes('pull-up')) {
        return createPullUpSVG(size);
    } else if (name.includes('plank')) {
        return createPlankSVG(size);
    } else if (name.includes('lat pulldown')) {
        return createLatPulldownSVG(size);
    } else if (name.includes('lunge')) {
        return createLungeSVG(size);
    } else if (name.includes('bicep curl')) {
        return createBicepCurlsSVG(size);
    } else if (name.includes('tricep')) {
        return createTricepExtensionsSVG(size);
    } else if (name.includes('crunch')) {
        return createCrunchesSVG(size);
    } else if (name.includes('running')) {
        return createRunningSVG(size);
    } else if (name.includes('chest fl')) {
        return createChestFliesSVG(size);
    } else if (name.includes('leg press')) {
        return createLegPressSVG(size);
    } else if (name.includes('burpee')) {
        return createBurpeesSVG(size);
    } else {
        // Generic exercise icon
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}">
            <circle cx="50" cy="30" r="10" fill="#5E60CE" />
            <line x1="50" y1="40" x2="50" y2="70" stroke="#5E60CE" stroke-width="4" />
            <line x1="50" y1="50" x2="30" y2="40" stroke="#5E60CE" stroke-width="4" />
            <line x1="50" y1="50" x2="70" y2="40" stroke="#5E60CE" stroke-width="4" />
            <line x1="50" y1="70" x2="30" y2="90" stroke="#5E60CE" stroke-width="4" />
            <line x1="50" y1="70" x2="70" y2="90" stroke="#5E60CE" stroke-width="4" />
        </svg>`;
    }
}

function createBenchPressSVG(size) {
    return `<svg viewBox="0 0 100 100" width="${size}" height="${size}">
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

function createSquatSVG(size) {
    return `<svg viewBox="0 0 100 100" width="${size}" height="${size}">
        <style>
            @keyframes squat {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(10px) scaleY(0.9); }
            }
            .person { animation: squat 2s infinite ease-in-out; transform-origin: 50% 100%; }
        </style>
        
        <!-- Person -->
        <g class="person">
            <circle cx="50" cy="30" r="8" fill="#5E60CE" />
            <line x1="50" y1="38" x2="50" y2="60" stroke="#5E60CE" stroke-width="3" />
            <line x1="50" y1="60" x2="35" y2="75" stroke="#5E60CE" stroke-width="3" />
            <line x1="50" y1="60" x2="65" y2="75" stroke="#5E60CE" stroke-width="3" />
            <line x1="35" y1="75" x2="35" y2="85" stroke="#5E60CE" stroke-width="3" />
            <line x1="65" y1="75" x2="65" y2="85" stroke="#5E60CE" stroke-width="3" />
            
            <!-- Bar on shoulders -->
            <rect x="30" y="38" width="40" height="2" fill="#343a40" />
            <circle cx="30" cy="39" r="4" fill="#6c757d" />
            <circle cx="70" cy="39" r="4" fill="#6c757d" />
        </g>
    </svg>`;
}

function createDeadliftSVG(size) {
    return `<svg viewBox="0 0 100 100" width="${size}" height="${size}">
        <style>
            @keyframes deadlift {
                0%, 100% { transform: rotate(0deg); }
                50% { transform: rotate(-20deg); }
            }
            .person { animation: deadlift 2s infinite ease-in-out; transform-origin: 50% 70%; }
        </style>
        
        <!-- Person -->
        <g class="person">
            <circle cx="50" cy="30" r="8" fill="#5E60CE" />
            <line x1="50" y1="38" x2="50" y2="60" stroke="#5E60CE" stroke-width="3" />
            <line x1="50" y1="60" x2="35" y2="70" stroke="#5E60CE" stroke-width="3" />
            <line x1="50" y1="60" x2="65" y2="70" stroke="#5E60CE" stroke-width="3" />
            <line x1="35" y1="70" x2="35" y2="80" stroke="#5E60CE" stroke-width="3" />
            <line x1="65" y1="70" x2="65" y2="80" stroke="#5E60CE" stroke-width="3" />
            
            <!-- Bar -->
            <rect x="30" y="70" width="40" height="2" fill="#343a40" />
            <circle cx="30" cy="71" r="5" fill="#6c757d" />
            <circle cx="70" cy="71" r="5" fill="#6c757d" />
        </g>
    </svg>`;
}

function createShoulderPressSVG(size) {
    return `<svg viewBox="0 0 100 100" width="${size}" height="${size}">
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

function createPullUpSVG(size) {
    return `<svg viewBox="0 0 100 100" width="${size}" height="${size}">
        <style>
            @keyframes pullUp {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-15px); }
            }
            .person { animation: pullUp 2s infinite ease-in-out; }
        </style>
        
        <!-- Bar -->
        <rect x="30" y="20" width="40" height="3" fill="#6c757d" />
        <rect x="28" y="20" width="4" height="10" fill="#6c757d" />
        <rect x="68" y="20" width="4" height="10" fill="#6c757d" />
        
        <!-- Person -->
        <g class="person">
            <circle cx="50" cy="45" r="8" fill="#5E60CE" />
            <line x1="50" y1="53" x2="50" y2="75" stroke="#5E60CE" stroke-width="3" />
            <line x1="50" y1="53" x2="35" y2="40" stroke="#5E60CE" stroke-width="3" />
            <line x1="50" y1="53" x2="65" y2="40" stroke="#5E60CE" stroke-width="3" />
            <line x1="50" y1="75" x2="40" y2="90" stroke="#5E60CE" stroke-width="3" />
            <line x1="50" y1="75" x2="60" y2="90" stroke="#5E60CE" stroke-width="3" />
            <line x1="35" y1="40" x2="35" y2="23" stroke="#5E60CE" stroke-width="2" />
            <line x1="65" y1="40" x2="65" y2="23" stroke="#5E60CE" stroke-width="2" />
        </g>
    </svg>`;
}

function createPlankSVG(size) {
    return `<svg viewBox="0 0 100 100" width="${size}" height="${size}">
        <style>
            @keyframes plankShake {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(1px); }
            }
            .person { animation: plankShake 1s infinite ease-in-out; }
        </style>
        
        <!-- Person -->
        <g class="person">
            <circle cx="30" cy="60" r="6" fill="#5E60CE" />
            <line x1="30" y1="66" x2="50" y2="66" stroke="#5E60CE" stroke-width="3" />
            <line x1="50" y1="66" x2="70" y2="66" stroke="#5E60CE" stroke-width="3" />
            <line x1="30" y1="66" x2="30" y2="75" stroke="#5E60CE" stroke-width="3" />
            <line x1="70" y1="66" x2="70" y2="75" stroke="#5E60CE" stroke-width="3" />
        </g>
    </svg>`;
}

function createLatPulldownSVG(size) {
    return `<svg viewBox="0 0 100 100" width="${size}" height="${size}">
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

function createLungeSVG(size) {
    return `<svg viewBox="0 0 100 100" width="${size}" height="${size}">
        <style>
            @keyframes lunge {
                0%, 100% { transform: translateX(0); }
                50% { transform: translateX(-5px); }
            }
            .person { animation: lunge 2s infinite ease-in-out; }
        </style>
        
        <!-- Person -->
        <g class="person">
            <circle cx="40" cy="30" r="8" fill="#5E60CE" />
            <line x1="40" y1="38" x2="40" y2="55" stroke="#5E60CE" stroke-width="3" />
            <line x1="40" y1="55" x2="25" y2="70" stroke="#5E60CE" stroke-width="3" />
            <line x1="40" y1="55" x2="60" y2="65" stroke="#5E60CE" stroke-width="3" />
            <line x1="25" y1="70" x2="25" y2="80" stroke="#5E60CE" stroke-width="3" />
            <line x1="60" y1="65" x2="70" y2="75" stroke="#5E60CE" stroke-width="3" />
            
            <!-- Weights -->
            <circle cx="25" cy="38" r="4" fill="#6c757d" />
            <circle cx="55" cy="38" r="4" fill="#6c757d" />
        </g>
    </svg>`;
}

function createBicepCurlsSVG(size) {
    return `<svg viewBox="0 0 100 100" width="${size}" height="${size}">
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

function createTricepExtensionsSVG(size) {
    return `<svg viewBox="0 0 100 100" width="${size}" height="${size}">
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

function createCrunchesSVG(size) {
    return `<svg viewBox="0 0 100 100" width="${size}" height="${size}">
        <style>
            @keyframes crunch {
                0%, 100% { transform: rotate(0deg); }
                50% { transform: rotate(-15deg); }
            }
            .upper-body { animation: crunch 2s infinite ease-in-out; transform-origin: 50px 70px; }
        </style>
        
        <!-- Person -->
        <line x1="30" y1="80" x2="70" y2="80" stroke="#5E60CE" stroke-width="3" />
        <line x1="35" y1="70" x2="65" y2="70" stroke="#5E60CE" stroke-width="3" />
        <g class="upper-body">
            <circle cx="50" cy="50" r="8" fill="#5E60CE" />
            <line x1="50" y1="58" x2="50" y2="70" stroke="#5E60CE" stroke-width="3" />
            <line x1="50" y1="60" x2="40" y2="65" stroke="#5E60CE" stroke-width="3" />
            <line x1="50" y1="60" x2="60" y2="65" stroke="#5E60CE" stroke-width="3" />
        </g>
    </svg>`;
}

function createRunningSVG(size) {
    return `<svg viewBox="0 0 100 100" width="${size}" height="${size}">
        <style>
            @keyframes run {
                0%, 100% { transform: rotate(-15deg); }
                50% { transform: rotate(15deg); }
            }
            .leg-left { animation: run 0.5s infinite ease-in-out; transform-origin: 50px 60px; }
            .leg-right { animation: run 0.5s infinite ease-in-out reverse; transform-origin: 50px 60px; }
            .arm-left { animation: run 0.5s infinite ease-in-out; transform-origin: 50px 40px; }
            .arm-right { animation: run 0.5s infinite ease-in-out reverse; transform-origin: 50px 40px; }
        </style>
        
        <!-- Person -->
        <circle cx="50" cy="30" r="8" fill="#5E60CE" />
        <line x1="50" y1="38" x2="50" y2="60" stroke="#5E60CE" stroke-width="3" />
        
        <g class="arm-left">
            <line x1="50" y1="45" x2="35" y2="35" stroke="#5E60CE" stroke-width="3" />
        </g>
        <g class="arm-right">
            <line x1="50" y1="45" x2="65" y2="35" stroke="#5E60CE" stroke-width="3" />
        </g>
        
        <g class="leg-left">
            <line x1="50" y1="60" x2="35" y2="80" stroke="#5E60CE" stroke-width="3" />
        </g>
        <g class="leg-right">
            <line x1="50" y1="60" x2="65" y2="80" stroke="#5E60CE" stroke-width="3" />
        </g>
    </svg>`;
}

function createChestFliesSVG(size) {
    return `<svg viewBox="0 0 100 100" width="${size}" height="${size}">
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

function createLegPressSVG(size) {
    return `<svg viewBox="0 0 100 100" width="${size}" height="${size}">
        <style>
            @keyframes legPress {
                0%, 100% { transform: scaleX(1); }
                50% { transform: scaleX(0.8); }
            }
            .machine { animation: legPress 2s infinite ease-in-out; transform-origin: center; }
        </style>
        
        <!-- Machine -->
        <rect x="30" y="50" width="40" height="5" fill="#6c757d" />
        <g class="machine">
            <rect x="25" y="55" width="50" height="20" fill="#6c757d" rx="5" />
            <rect x="35" y="75" width="30" height="10" fill="#adb5bd" />
        </g>
        
        <!-- Person -->
        <circle cx="50" cy="40" r="7" fill="#5E60CE" />
        <line x1="50" y1="47" x2="50" y2="55" stroke="#5E60CE" stroke-width="3" />
        <line x1="50" y1="50" x2="40" y2="55" stroke="#5E60CE" stroke-width="3" />
        <line x1="50" y1="50" x2="60" y2="55" stroke="#5E60CE" stroke-width="3" />
    </svg>`;
}

function createBurpeesSVG(size) {
    return `<svg viewBox="0 0 100 100" width="${size}" height="${size}">
        <style>
            @keyframes burpee {
                0%, 100% { transform: translateY(0) scaleY(1); }
                25% { transform: translateY(20px) scaleY(0.7); }
                50% { transform: translateY(30px) scaleY(0.4); }
                75% { transform: translateY(20px) scaleY(0.7); }
            }
            .person { animation: burpee 2s infinite ease-in-out; transform-origin: 50% 100%; }
        </style>
        
        <!-- Person -->
        <g class="person">
            <circle cx="50" cy="30" r="8" fill="#5E60CE" />
            <line x1="50" y1="38" x2="50" y2="55" stroke="#5E60CE" stroke-width="3" />
            <line x1="50" y1="55" x2="35" y2="45" stroke="#5E60CE" stroke-width="3" />
            <line x1="50" y1="55" x2="65" y2="45" stroke="#5E60CE" stroke-width="3" />
            <line x1="50" y1="55" x2="35" y2="65" stroke="#5E60CE" stroke-width="3" />
            <line x1="50" y1="55" x2="65" y2="65" stroke="#5E60CE" stroke-width="3" />
        </g>
    </svg>`;
}

