import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { createPlayerModel } from './player.js';

export async function loadPlayerModel(scene, modelType, playerName) {
  // Default model from player.js
  if (modelType === 'default' || !modelType) {
    const playerModel = createPlayerModel(THREE, playerName);
    return playerModel;
  }
  
  // Create a loading manager to handle events
  const loadingManager = new THREE.LoadingManager();
  
  // Create a promise that will resolve when the model is loaded
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader(loadingManager);
    
    // Set up the model path based on the selected type
    let modelPath;
    switch (modelType) {
      case 'spongebob':
        modelPath = '/spongebob.glb';
        break;
      case 'patrick':
        modelPath = '/patrick.glb';
        break;
      case 'steve':
        modelPath = '/steve.glb';
        break;
      default:
        // Fallback to default model if type is not recognized
        const defaultModel = createPlayerModel(THREE, playerName);
        resolve(defaultModel);
        return;
    }
    
    // Load the 3D model
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        
        // Adjust model properties
        model.traverse((object) => {
          if (object.isMesh) {
            object.castShadow = true;
            object.receiveShadow = true;
          }
        });
        
        // Add custom properties for controls.js compatibility
        // Create empty objects for leg rotation compatibility
        const leftLeg = new THREE.Object3D();
        leftLeg.name = "leftLeg";
        model.add(leftLeg);
        
        const rightLeg = new THREE.Object3D();
        rightLeg.name = "rightLeg";
        model.add(rightLeg);
        
        // Scale and position adjustments based on model type
        switch (modelType) {
          case 'spongebob':
            model.scale.set(0.5, 0.5, 0.5);
            model.position.y = 0.5; // Adjust height
            break;
          case 'patrick':
            model.scale.set(0.5, 0.5, 0.5);
            model.position.y = 0.5; // Adjust height
            break;
          case 'steve':
            model.scale.set(0.05, 0.05, 0.05);
            model.position.y = 0.5; // Adjust height
            break;
        }
        
        resolve(model);
      },
      // Progress callback
      (xhr) => {
        console.log(`${modelType} model ${Math.round(xhr.loaded / xhr.total * 100)}% loaded`);
      },
      // Error callback
      (error) => {
        console.error(`Error loading ${modelType} model:`, error);
        // Fallback to default model on error
        const defaultModel = createPlayerModel(THREE, playerName);
        resolve(defaultModel);
      }
    );
  });
}

export function setupCharacterSelection() {
  let selectedCharacter = 'default';
  
  // Add click event listener to each character option
  document.querySelectorAll('.character-option').forEach(option => {
    option.addEventListener('click', () => {
      // Remove selected class from all options
      document.querySelectorAll('.character-option').forEach(el => {
        el.classList.remove('selected');
      });
      
      // Add selected class to clicked option
      option.classList.add('selected');
      
      // Store the selected model
      selectedCharacter = option.getAttribute('data-model');
    });
  });
  
  // Select default character initially
  document.querySelector('.character-option[data-model="default"]').classList.add('selected');
  
  // Return the function to get the selected character
  return {
    getSelectedCharacter: () => selectedCharacter
  };
}