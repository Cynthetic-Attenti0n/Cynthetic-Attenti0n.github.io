// Workout Programs Data
const workoutPrograms = [
    {
        id: 1,
        name: 'Upper Body Strength',
        type: 'strength',
        difficulty: 'intermediate',
        duration: 45,
        description: 'Focus on building upper body strength with compound and isolation exercises.',
        exercises: [
            { id: 1, name: 'Bench Press', sets: 3, reps: '8-10', rest: 90 },
            { id: 4, name: 'Shoulder Press', sets: 3, reps: '8-10', rest: 90 },
            { id: 7, name: 'Lat Pulldown', sets: 3, reps: '10-12', rest: 60 },
            { id: 9, name: 'Bicep Curls', sets: 3, reps: '12-15', rest: 60 },
            { id: 10, name: 'Tricep Extensions', sets: 3, reps: '12-15', rest: 60 },
            { id: 13, name: 'Chest Flies', sets: 3, reps: '12-15', rest: 60 }
        ]
    },
    {
        id: 2,
        name: 'Lower Body Power',
        type: 'strength',
        difficulty: 'intermediate',
        duration: 50,
        description: 'Build strength and power in your legs with these compound movements.',
        exercises: [
            { id: 2, name: 'Squat', sets: 4, reps: '6-8', rest: 120 },
            { id: 3, name: 'Deadlift', sets: 4, reps: '6-8', rest: 120 },
            { id: 8, name: 'Lunges', sets: 3, reps: '10 each leg', rest: 90 },
            { id: 14, name: 'Leg Press', sets: 3, reps: '10-12', rest: 90 }
        ]
    },
    {
        id: 3,
        name: 'Full Body HIIT',
        type: 'cardio',
        difficulty: 'advanced',
        duration: 30,
        description: 'High-intensity interval training to burn calories and improve cardiovascular fitness.',
        exercises: [
            { id: 15, name: 'Burpees', sets: 4, reps: '45 seconds', rest: 15 },
            { id: 12, name: 'Running', sets: 4, reps: '45 seconds', rest: 15 },
            { id: 2, name: 'Squat', sets: 4, reps: '45 seconds', rest: 15 },
            { id: 5, name: 'Pull-Up', sets: 4, reps: '45 seconds', rest: 15 },
            { id: 6, name: 'Plank', sets: 4, reps: '45 seconds', rest: 15 }
        ]
    },
    {
        id: 4,
        name: 'Core Crusher',
        type: 'strength',
        difficulty: 'beginner',
        duration: 25,
        description: 'Focus on strengthening your core with these targeted exercises.',
        exercises: [
            { id: 6, name: 'Plank', sets: 3, reps: '30-60 seconds', rest: 60 },
            { id: 11, name: 'Crunches', sets: 3, reps: '15-20', rest: 45 },
            { id: 6, name: 'Plank', sets: 3, reps: '30-60 seconds', rest: 60 },
            { id: 11, name: 'Crunches', sets: 3, reps: '15-20', rest: 45 }
        ]
    },
    {
        id: 5,
        name: 'Push-Pull-Legs Split',
        type: 'strength',
        difficulty: 'intermediate',
        duration: 60,
        description: 'Classic bodybuilding split focusing on pushing, pulling, and leg exercises.',
        exercises: [
            { id: 1, name: 'Bench Press', sets: 4, reps: '8-10', rest: 90 },
            { id: 7, name: 'Lat Pulldown', sets: 4, reps: '8-10', rest: 90 },
            { id: 2, name: 'Squat', sets: 4, reps: '8-10', rest: 90 },
            { id: 4, name: 'Shoulder Press', sets: 3, reps: '10-12', rest: 60 },
            { id: 5, name: 'Pull-Up', sets: 3, reps: '8-10', rest: 60 },
            { id: 8, name: 'Lunges', sets: 3, reps: '10 each leg', rest: 60 }
        ]
    },
    {
        id: 6,
        name: 'Beginner Full Body',
        type: 'strength',
        difficulty: 'beginner',
        duration: 40,
        description: 'Perfect for beginners to build a foundation of strength with full-body exercises.',
        exercises: [
            { id: 1, name: 'Bench Press', sets: 3, reps: '10-12', rest: 60 },
            { id: 2, name: 'Squat', sets: 3, reps: '10-12', rest: 60 },
            { id: 7, name: 'Lat Pulldown', sets: 3, reps: '10-12', rest: 60 },
            { id: 9, name: 'Bicep Curls', sets: 2, reps: '12-15', rest: 45 },
            { id: 10, name: 'Tricep Extensions', sets: 2, reps: '12-15', rest: 45 },
            { id: 6, name: 'Plank', sets: 2, reps: '30 seconds', rest: 30 }
        ]
    }
];

// Function to render workout programs in the UI
function renderWorkoutPrograms() {
    const workoutsContainer = document.getElementById('workouts-container');
    workoutsContainer.innerHTML = '';
    
    workoutPrograms.forEach(workout => {
        const workoutCard = document.createElement('div');
        workoutCard.className = 'workout-program-card';
        
        // Generate header background based on workout type
        const headerBg = workout.type === 'cardio' 
            ? 'linear-gradient(45deg, #64DFDF, #72EFDD)' 
            : 'linear-gradient(45deg, #5E60CE, #6930C3)';
        
        // Generate exercise list HTML
        const exerciseListHTML = workout.exercises.slice(0, 4).map(ex => 
            `<li>${ex.name} - ${ex.sets} sets × ${ex.reps}</li>`
        ).join('');
        
        // Add "+ X more" if there are more exercises
        const moreExercisesHTML = workout.exercises.length > 4 
            ? `<li>+ ${workout.exercises.length - 4} more exercises</li>` 
            : '';
        
        workoutCard.innerHTML = `
            <div class="workout-header" style="background: ${headerBg}">
                <h3>${workout.name}</h3>
                <p class="workout-meta">
                    <span>${workout.duration} min</span> • 
                    <span>${workout.difficulty}</span>
                </p>
            </div>
            <div class="workout-body">
                <p class="workout-description">${workout.description}</p>
                <div class="workout-exercises">
                    <h4>Exercises</h4>
                    <ul class="exercise-list">
                        ${exerciseListHTML}
                        ${moreExercisesHTML}
                    </ul>
                </div>
                <div class="workout-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="start-btn" data-id="${workout.id}">Start</button>
                </div>
            </div>
        `;
        
        workoutsContainer.appendChild(workoutCard);
    });
    
    // Add event listeners for start workout buttons
    document.querySelectorAll('.start-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const workoutId = parseInt(this.dataset.id);
            openWorkoutExecution(workoutId);
        });
    });
    
    // Add event listeners for edit workout buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // In a full app, this would open an edit interface
            alert('Edit functionality would be implemented in a complete app');
        });
    });
}

// Function to open workout execution modal with the selected workout
function openWorkoutExecution(workoutId) {
    const workout = workoutPrograms.find(w => w.id === workoutId);
    
    if (workout) {
        // Set the current workout in app state
        appState.currentWorkout = workout;
        
        // Update the modal title with workout name
        document.querySelector('#workout-modal .modal-header h2').textContent = workout.name;
        
        // Set total exercises count
        document.getElementById('total-exercises').textContent = workout.exercises.length;
        
        // Reset and show the workout modal
        resetWorkoutSession();
        updateWorkoutDisplay();
        workoutModal.classList.add('active');
    }
}

