// state.js - Holds application state and data

// --- Import assessment data loading function ---
import { getLoadedAssessments } from './data.js'; // Import the getter

// --- State Variables ---
let currentAssessment = null;
let currentQuestionIndex = 0;
let userAnswers = []; // Stores answers for the currentAssessment
let activeSectionElement = null; // Track the currently visible section *element*

// --- State Accessors and Mutators ---
// Now uses the data loaded from data.js
export function getAssessments() {
    return getLoadedAssessments();
}

export function getAssessmentById(id) {
    // Ensure assessments are loaded before trying to find one
    return getLoadedAssessments().find(a => a.id === id);
}

export function getCurrentAssessment() {
    return currentAssessment;
}

export function setCurrentAssessment(assessment) {
    currentAssessment = assessment;
    if (assessment && assessment.questions) {
        // Initialize userAnswers array with undefined for the new assessment
        userAnswers = new Array(assessment.questions.length).fill(undefined);
        currentQuestionIndex = 0; // Reset index to the start
    } else {
        // Clear answers and index if assessment is null or has no questions
        userAnswers = [];
        currentQuestionIndex = 0;
    }
    console.log("Set current assessment:", currentAssessment ? currentAssessment.id : null, "User answers initialized:", userAnswers);
}

export function getCurrentQuestionIndex() {
    return currentQuestionIndex;
}

export function setCurrentQuestionIndex(index) {
    if (currentAssessment && index >= 0 && index < currentAssessment.questions.length) {
        currentQuestionIndex = index;
    } else {
        console.warn("Attempted to set invalid question index:", index);
    }
}

export function incrementQuestionIndex() {
    if (currentAssessment && currentQuestionIndex < currentAssessment.questions.length - 1) {
        currentQuestionIndex++;
    }
    return currentQuestionIndex;
}

export function decrementQuestionIndex() {
     if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
    }
    return currentQuestionIndex;
}

export function getUserAnswers() {
    return userAnswers;
}

// Get the stored answer for the currently active question index
export function getUserAnswerForCurrentQuestion() {
    if (userAnswers && currentQuestionIndex >= 0 && currentQuestionIndex < userAnswers.length) {
        return userAnswers[currentQuestionIndex];
    }
    return undefined; // Return undefined if index is out of bounds or not initialized
}

// Set the answer for the currently active question index
export function setUserAnswerForCurrentQuestion(answer) {
    if (userAnswers && currentQuestionIndex >= 0 && currentQuestionIndex < userAnswers.length) {
        userAnswers[currentQuestionIndex] = answer;
        console.log(`Set answer for Q${currentQuestionIndex}:`, answer); // Added logging
    } else {
        console.error("Cannot set user answer: Invalid state.", { currentQuestionIndex, userAnswersLength: userAnswers?.length });
    }
}

export function getActiveSectionElement() {
    return activeSectionElement;
}

export function setActiveSectionElement(sectionElement) {
    activeSectionElement = sectionElement;
}