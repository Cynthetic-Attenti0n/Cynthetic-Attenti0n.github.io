import * as THREE from "three";
import { PlayerControls } from "./controls.js";
import { createTrees, createClouds, createGoonWheel, createPuzzleBoard } from "./worldGeneration.js";
import { PuzzleController } from "./puzzleController.js";
import { celebratePuzzleSolved, updateConfetti } from "./puzzleCelebration.js";
import { loadPlayerModel, setupCharacterSelection } from "./playerLoader.js";

// Simple seeded random number generator
class MathRandom {
  constructor(seed) {
    this.seed = seed;
  }
  
  random() {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }
}

async function main() {
  // Setup character selection
  const characterSelector = setupCharacterSelection();
  
  // Add start game button listener
  document.getElementById('start-game').addEventListener('click', async () => {
    // Hide character selection
    document.getElementById('character-selection').style.display = 'none';
    
    // Start the game with selected character
    await startGame(characterSelector.getSelectedCharacter());
  });
}

async function startGame(characterModel) {
  // Generate a random player name
  let playerName = `Goon${Math.floor(Math.random() * 1000)}`;
  
  // Safe initial position values
  const playerX = (Math.random() * 10) - 5;
  const playerZ = (Math.random() * 10) - 5;

  // Setup Three.js scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87CEEB); // Sky blue background for day time
  scene.fog = new THREE.FogExp2(0xDFEFFF, 0.005); // Lighter fog for daytime
  
  // Create trees and clouds only, removing the barriers
  createTrees(scene);
  createClouds(scene);
  
  // Create the Goon of Fortune wheel (clothesline with wine bag)
  const rotatingPart = createGoonWheel(scene);
  
  // Setup automatic rotation for the Hills Hoist
  const rotationSpeed = 0.005; // Adjust for desired speed
  
  // Create the puzzle board
  const puzzleBoard = createPuzzleBoard(scene);
  
  // Initialize puzzle controller
  const puzzleController = new PuzzleController(puzzleBoard.letterTiles);
  puzzleController.setNewPuzzle();
  
  // Variable to store confetti particles
  let confettiParticles = null;
  
  // Listen for puzzle solved event
  document.addEventListener('puzzleSolved', () => {
    confettiParticles = celebratePuzzleSolved(scene, camera);
    
    // Add bonus points for solving the puzzle
    playerControls.tributePoints += 1000;
    document.getElementById('points').textContent = playerControls.tributePoints;
  });
  
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.getElementById('game-container').appendChild(renderer.domElement);
  
  // Load the selected player model
  const playerModel = await loadPlayerModel(scene, characterModel, playerName);
  scene.add(playerModel);
  
  // Initialize player controls
  const playerControls = new PlayerControls(scene, null, {
    renderer: renderer,
    initialPosition: {
      x: playerX,
      y: 0.5,
      z: playerZ
    },
    playerModel: playerModel
  });
  playerControls.setWheelObject(rotatingPart);
  const camera = playerControls.getCamera();
  
  // Ambient light - brighter for day scene
  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.7);
  scene.add(ambientLight);
  
  // Add directional light for sun
  const sunLight = new THREE.DirectionalLight(0xFFFFFF, 1.2);
  sunLight.position.set(50, 100, 50);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 2048;
  sunLight.shadow.mapSize.height = 2048;
  sunLight.shadow.camera.near = 0.5;
  sunLight.shadow.camera.far = 500;
  sunLight.shadow.camera.left = -100;
  sunLight.shadow.camera.right = 100;
  sunLight.shadow.camera.top = 100;
  sunLight.shadow.camera.bottom = -100;
  scene.add(sunLight);
  
  // Ground with brighter color
  const groundGeometry = new THREE.PlaneGeometry(150, 150);
  const groundMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x7CFC00, // Bright grass green
    roughness: 0.8,
    metalness: 0.2
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2; // Rotate to horizontal
  ground.receiveShadow = true;
  scene.add(ground);

  // Grid helper for better spatial awareness
  const gridHelper = new THREE.GridHelper(150, 150);
  scene.add(gridHelper);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the clothesline
    if (rotatingPart) {
      rotatingPart.rotation.y += rotationSpeed;
    }
    
    // Update confetti particles if they exist
    if (confettiParticles) {
      updateConfetti(confettiParticles);
    }
    
    playerControls.update();
    puzzleController.update();
    renderer.render(scene, camera);
  }

  animate();
}

main();