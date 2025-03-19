export const config = {
  // Your Gemini API configuration
  DEFAULT_MODEL: 'gemini-pro-vision',
  AVAILABLE_MODELS: [
    { value: 'gemini-1.5-flash-8b', display: 'Smol Brain Energy' },
    { value: 'gemini-1.5-flash', display: 'Flash Gordon' },
    { value: 'gemini-2.0-flash-lite', display: 'Diet Coke Energy' },
    { value: 'gemini-2.0-flash', display: 'Speedy Gonzales' },
    { value: 'gemini-2.0-flash-exp', display: 'Experimental Rabbit Hole' },
    { value: 'gemini-2.0-flash-thinking-exp-01-21', display: 'Big Brain Time' },
    { value: 'gemini-1.5-pro', display: 'Professional Meme Lord' },
    { value: 'gemini-2.0-pro-exp', display: 'Galaxy Brain Explorer' },
    { value: 'gemini-2.0-pro-exp-02-05', display: 'Time Traveler Pro' },
    { value: 'gemini-pro-vision', display: 'Eye of Sauron' }
  ],
  API_ENDPOINT: 'https://generativelanguage.googleapis.com/v1beta/models/',
  
  // Default prompts
  DEFAULT_PROMPT: "What's in this image? Describe it in detail.",
  DEFAULT_TEXT_PROMPT: "Hello! How can I help you today?",
  
  // Maximum image size in bytes (4MB)
  MAX_IMAGE_SIZE: 4 * 1024 * 1024,
  
  // Image compression quality (0-1)
  IMAGE_COMPRESSION_QUALITY: 0.8,
  
  // Maximum resolution for images
  MAX_IMAGE_DIMENSION: 1024
};