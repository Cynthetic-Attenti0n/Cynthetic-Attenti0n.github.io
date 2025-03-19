import { config } from './config.js';
import { GoogleGenerativeAI } from "@google/generative-ai";

// DOM Elements
const apiKeyInput = document.getElementById('api-key');
const saveApiKeyBtn = document.getElementById('save-api-key');
const modelSelector = document.getElementById('model-selector');
const modeToggle = document.getElementById('mode-toggle');
const imageBtn = document.getElementById('image-mode-btn');
const textBtn = document.getElementById('text-mode-btn');
const mediaSection = document.getElementById('media-section');
const cameraBtn = document.getElementById('camera-btn');
const uploadBtn = document.getElementById('upload-btn');
const fileInput = document.getElementById('file-input');
const videoPreview = document.getElementById('video-preview');
const photoCanvas = document.getElementById('photo-canvas');
const previewImage = document.getElementById('preview-image');
const promptInput = document.getElementById('prompt-input');
const submitBtn = document.getElementById('submit-btn');
const responseContent = document.getElementById('response-content');
const loadingIndicator = document.getElementById('loading-indicator');
const mediaPreviewContainer = document.getElementById('media-preview-container');

// State variables
let apiKey = localStorage.getItem('geminivision_api_key') || '';
let selectedModel = localStorage.getItem('gemini_selected_model') || config.DEFAULT_MODEL;
let stream = null;
let imageData = null;
let currentMode = localStorage.getItem('gemini_mode') || 'image'; // 'image' or 'text'

// Initialize API key from localStorage
if (apiKey) {
  apiKeyInput.value = '********';
}

// Initialize model selector
function populateModelSelector() {
  config.AVAILABLE_MODELS.forEach(model => {
    const option = document.createElement('option');
    option.value = model.value;
    option.textContent = model.display;
    modelSelector.appendChild(option);
  });
  
  // Set the selected model
  modelSelector.value = selectedModel;
}

// Add placeholder to media preview container with enhanced animation
function addPlaceholder() {
  if (!imageData) {
    mediaPreviewContainer.innerHTML = `
      <div class="placeholder-text">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" style="opacity: 0.7; margin-bottom: 15px;">
          <path d="M21 19V5c0-1.1-.9-2-1-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
        </svg>
        <p>Capture or upload an image for AI vision</p>
      </div>`;
  }
}

// Toggle between image and text modes
function toggleMode(mode) {
  currentMode = mode;
  localStorage.setItem('gemini_mode', mode);
  
  // Update UI based on mode
  if (mode === 'image') {
    imageBtn.classList.add('active');
    textBtn.classList.remove('active');
    mediaSection.style.display = 'block';
    promptInput.placeholder = 'Ask about the image...';
  } else {
    textBtn.classList.add('active');
    imageBtn.classList.remove('active');
    mediaSection.style.display = 'none';
    promptInput.placeholder = 'Ask a nerd question...';
  }
  
  updateSubmitButtonState();
}

// Event Listeners
saveApiKeyBtn.addEventListener('click', saveApiKey);
modelSelector.addEventListener('change', saveSelectedModel);
imageBtn.addEventListener('click', () => toggleMode('image'));
textBtn.addEventListener('click', () => toggleMode('text'));
cameraBtn.addEventListener('click', toggleCamera);
uploadBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFileUpload);
submitBtn.addEventListener('click', generateResponse);
promptInput.addEventListener('input', updateSubmitButtonState);

// Initialize the app
function init() {
  populateModelSelector();
  toggleMode(currentMode);
  updateSubmitButtonState();
  addPlaceholder();
}

// API Key Management
function saveApiKey() {
  const key = apiKeyInput.value.trim();
  if (key) {
    localStorage.setItem('geminivision_api_key', key);
    apiKey = key;
    apiKeyInput.value = '********';
    
    // Show success animation
    saveApiKeyBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
      </svg>
      Saved
    `;
    saveApiKeyBtn.style.backgroundColor = '#34a853';
    
    setTimeout(() => {
      saveApiKeyBtn.innerHTML = `Save Key`;
      saveApiKeyBtn.style.backgroundColor = '';
    }, 2000);
  } else {
    alert('Please enter a valid API key');
  }
}

// Save Selected Model
function saveSelectedModel() {
  selectedModel = modelSelector.value;
  localStorage.setItem('gemini_selected_model', selectedModel);
  
  // Add a fun animation when changing models
  modelSelector.style.transform = 'scale(1.05)';
  setTimeout(() => {
    modelSelector.style.transform = 'scale(1)';
  }, 300);
}

// Camera Functionality
async function toggleCamera() {
  if (stream) {
    // If camera is already on, turn it off and take a photo
    takePhoto();
    return;
  }

  try {
    // Start the camera
    stream = await navigator.mediaDevices.getUserMedia({ 
      video: { facingMode: 'environment' } 
    });
    
    videoPreview.srcObject = stream;
    videoPreview.style.display = 'block';
    previewImage.style.display = 'none';
    photoCanvas.style.display = 'none';
    
    // Change button text with animation
    cameraBtn.classList.add('active-camera');
    cameraBtn.innerHTML = `
      <span class="camera-icon-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8" fill="red"/>
        </svg>
      </span>
      Capture Photo
    `;
    
  } catch (error) {
    console.error('Error accessing camera:', error);
    alert('Could not access camera. Please check permissions or try uploading an image instead.');
  }
}

function takePhoto() {
  if (!stream) return;
  
  // Set canvas dimensions to match video
  const videoWidth = videoPreview.videoWidth;
  const videoHeight = videoPreview.videoHeight;
  photoCanvas.width = videoWidth;
  photoCanvas.height = videoHeight;
  
  // Draw video frame to canvas
  const context = photoCanvas.getContext('2d');
  context.drawImage(videoPreview, 0, 0, videoWidth, videoHeight);
  
  // Get image data and display it
  photoCanvas.style.display = 'block';
  videoPreview.style.display = 'none';
  
  // Convert canvas to blob
  photoCanvas.toBlob(async (blob) => {
    processImageBlob(blob);
  }, 'image/jpeg', config.IMAGE_COMPRESSION_QUALITY);
  
  // Stop the camera stream
  stream.getTracks().forEach(track => track.stop());
  stream = null;
  
  // Reset button text with animation
  cameraBtn.classList.remove('active-camera');
  cameraBtn.innerHTML = `
    <span class="camera-icon-container">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4z"/>
        <path d="M9 2L7.17 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3.17L15 2H9zm3 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/>
      </svg>
    </span>
    Take Photo
  `;
}

// Image Upload Functionality
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  if (file.size > config.MAX_IMAGE_SIZE) {
    alert(`Image size exceeds the ${config.MAX_IMAGE_SIZE / (1024 * 1024)}MB limit.`);
    return;
  }
  
  processImageBlob(file);
}

async function processImageBlob(blob) {
  // Remove placeholder if exists
  if (mediaPreviewContainer.querySelector('.placeholder-text')) {
    mediaPreviewContainer.innerHTML = '';
    mediaPreviewContainer.appendChild(videoPreview);
    mediaPreviewContainer.appendChild(photoCanvas);
    mediaPreviewContainer.appendChild(previewImage);
  }
  
  // Create an object URL for preview
  const objectUrl = URL.createObjectURL(blob);
  previewImage.src = objectUrl;
  previewImage.style.display = 'block';
  photoCanvas.style.display = 'none';
  videoPreview.style.display = 'none';
  
  // Add animation
  previewImage.style.opacity = '0';
  setTimeout(() => {
    previewImage.style.opacity = '1';
  }, 50);
  
  // Convert to base64 for API
  try {
    imageData = await readFileAsBase64(blob);
    updateSubmitButtonState();
  } catch (error) {
    console.error('Error processing image:', error);
    alert('Error processing image. Please try again.');
  }
}

function readFileAsBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Submit and Response Handling
function updateSubmitButtonState() {
  if (currentMode === 'image') {
    submitBtn.disabled = !imageData || (!promptInput.value.trim() && !config.DEFAULT_PROMPT);
  } else {
    submitBtn.disabled = !promptInput.value.trim() && !config.DEFAULT_TEXT_PROMPT;
  }
}

async function generateResponse() {
  if (!apiKey) {
    alert('Please set your API key first.');
    return;
  }
  
  if (currentMode === 'image' && !imageData) {
    alert('Please upload or capture an image first.');
    return;
  }
  
  // Show loading state with animation
  loadingIndicator.style.display = 'block';
  loadingIndicator.style.opacity = '0';
  setTimeout(() => {
    loadingIndicator.style.opacity = '1';
  }, 50);
  
  responseContent.textContent = '';
  submitBtn.disabled = true;
  
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: selectedModel });
    let result;
    
    if (currentMode === 'image') {
      const prompt = promptInput.value.trim() || config.DEFAULT_PROMPT;
      // Extract base64 data without the data URL prefix
      const base64ImageData = imageData.split(',')[1];
      
      result = await model.generateContent([
        prompt,
        { inlineData: { data: base64ImageData, mimeType: "image/jpeg" } }
      ]);
    } else {
      const prompt = promptInput.value.trim() || config.DEFAULT_TEXT_PROMPT;
      result = await model.generateContent(prompt);
    }
    
    const response = await result.response;
    const text = response.text();
    
    // Display the response with typing effect
    typeWriter(text, responseContent);
  } catch (error) {
    console.error('Error generating response:', error);
    responseContent.textContent = `Error: ${error.message || 'Failed to get response from Gemini API'}`;
  } finally {
    loadingIndicator.style.display = 'none';
    submitBtn.disabled = false;
  }
}

// Typing effect function with improved speed and smoothness
function typeWriter(text, element, index = 0, speed = 5) {
  if (index < text.length) {
    if (index % 5 === 0) { // Batch updates for performance
      element.textContent = text.substring(0, index + 1);
      // Add blinking cursor effect
      element.innerHTML = element.textContent + '<span style="border-right: 2px solid var(--primary-color); animation: blink 1s infinite;"></span>';
    }
    index++;
    
    // Variable speed based on punctuation
    const char = text.charAt(index);
    let thisSpeed = speed;
    if (['.', '!', '?'].includes(char)) thisSpeed = speed * 6;
    else if (['.', ','].includes(char)) thisSpeed = speed * 3;
    
    setTimeout(() => typeWriter(text, element, index, speed), thisSpeed);
  } else {
    // Remove cursor at the end
    element.innerHTML = text;
  }
}

// Add blinking cursor keyframes
document.head.insertAdjacentHTML('beforeend', `
  <style>
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
  </style>
`);

// Initialize the app
init();