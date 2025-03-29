// data.js - Handles loading and processing of assessment data

// Initial assessments structure (excluding PID-5 initially)
let assessments = [
    {
        id: 'big-five',
        title: 'Big Five Personality Traits',
        description: 'Understand your personality based on the five-factor model.',
        questions: [
            { type: 'likert', text: 'I see myself as someone who is talkative.' }, // Extraversion
            { type: 'likert', text: 'I see myself as someone who tends to find fault with others.' }, // Agreeableness (reversed)
            { type: 'likert', text: 'I see myself as someone who does a thorough job.' }, // Conscientiousness
            { type: 'likert', text: 'I see myself as someone who is depressed, blue.' }, // Neuroticism
            { type: 'likert', text: 'I see myself as someone who is original, comes up with new ideas.' }, // Openness
            { type: 'likert', text: 'I see myself as someone who is reserved.' }, // Extraversion (reversed)
            { type: 'likert', text: 'I see myself as someone who is helpful and unselfish with others.' }, // Agreeableness
             { type: 'likert', text: 'I see myself as someone who can be somewhat careless.' }, // Conscientiousness (reversed)
             { type: 'likert', text: 'I see myself as someone who is relaxed, handles stress well.' }, // Neuroticism (reversed)
             { type: 'likert', text: 'I see myself as someone who is curious about many different things.' }, // Openness
        ],
        isPlaceholder: false
    },
    // PID-5 will be loaded asynchronously
    { id: 'career-interest', title: 'Career Interest Inventory', description: 'Explore potential career paths aligned with your interests.', questions: [], isPlaceholder: true },
    { id: 'emotional-iq', title: 'Emotional Intelligence (EQ)', description: 'Assess your ability to perceive, use, understand, and manage emotions.', questions: [], isPlaceholder: true },
    { id: 'stress-level', title: 'Stress & Resilience Assessment', description: 'Understand your current stress levels and coping mechanisms.', questions: [], isPlaceholder: true },
    { id: 'learning-styles', title: 'Learning Styles Questionnaire', description: 'Discover your preferred methods of learning.', questions: [], isPlaceholder: true },
];

// Function to parse CSV data (simple implementation)
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim()); // Assuming first line is header
    const questions = [];
    for (let i = 1; i < lines.length; i++) {
        // Simple parsing, assumes no commas within quotes for question text
        const values = lines[i].split(',');
        if (values.length > 0 && values[0].trim()) {
            questions.push(values[0].trim()); // Assuming the first column is the question text
        }
    }
    return questions;
}

// Function to fetch and process the PID-5 data
async function loadPid5Questions() {
    try {
        const response = await fetch('/extracted_questions.csv');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        const questionTexts = parseCSV(csvText);

        // Define the specific Likert labels for PID-5
        const pid5LikertLabels = [
            'Very False or Often False',
            'Sometimes or Somewhat False',
            'Sometimes or Somewhat True',
            'Very True or Often True'
        ];

        // Map parsed text to the required question structure
        const pid5Questions = questionTexts.map(text => ({
            type: 'likert', // All PID-5 questions are likert type
            text: text,
            // Add the custom labels directly to the question object for easier access in UI
            options: pid5LikertLabels
        }));

        return {
            id: 'pid-5',
            title: 'Personality Inventory (PID-5)',
            description: 'Assess maladaptive personality traits based on the DSM-5 model.',
            questions: pid5Questions,
            isPlaceholder: false
        };

    } catch (error) {
        console.error("Error loading or parsing PID-5 CSV:", error);
        // Return a placeholder or null if loading fails
        return {
            id: 'pid-5',
            title: 'Personality Inventory (PID-5) - Error',
            description: 'Could not load questions. Please try again later.',
            questions: [],
            isPlaceholder: true // Mark as placeholder due to error
        };
    }
}

// Main function to load all assessment data
let dataLoaded = false;
export async function loadAssessmentsData() {
    if (dataLoaded) return assessments; // Return cached data if already loaded

    const pid5Assessment = await loadPid5Questions();

    // Insert the loaded PID-5 assessment into the array (e.g., after Big Five)
    const bigFiveIndex = assessments.findIndex(a => a.id === 'big-five');
    if (bigFiveIndex !== -1) {
        assessments.splice(bigFiveIndex + 1, 0, pid5Assessment);
    } else {
        assessments.unshift(pid5Assessment); // Add to beginning if Big Five not found
    }

    dataLoaded = true;
    console.log("All assessment data loaded, including PID-5:", assessments);
    return assessments;
}

// Getter for assessments (assumes loadAssessmentsData has been called)
export function getLoadedAssessments() {
    if (!dataLoaded) {
        console.warn("Attempting to get assessments before data is loaded.");
    }
    return assessments;
}