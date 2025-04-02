import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Movement constants
const SPEED = 0.08;
const GRAVITY = 0.01;
const JUMP_FORCE = 0.25;

export class PlayerControls {
  constructor(scene, room, options = {}) {
    this.scene = scene;
    this.room = room;
    this.camera = options.camera || new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = options.renderer;
    this.domElement = this.renderer ? this.renderer.domElement : document.body;
    this.playerModel = options.playerModel;
    
    // Player state
    this.velocity = new THREE.Vector3();
    this.canJump = true;
    this.keysPressed = new Set();
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Mobile control variables
    this.joystick = null;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchSensitivity = 0.005;
    this.moveVector = { x: 0, z: 0 };
    this.jumpButtonPressed = false;
    this.moveForward = 0;
    this.moveRight = 0;
    
    // Initial player position
    const initialPos = options.initialPosition || {};
    this.playerX = initialPos.x || (Math.random() * 10) - 5;
    this.playerY = initialPos.y || 0.5;
    this.playerZ = initialPos.z || (Math.random() * 10) - 5;
    
    // Set initial player model position if it exists
    if (this.playerModel) {
      this.playerModel.position.set(this.playerX, this.playerY, this.playerZ);
    }
    
    // Set camera to third-person perspective
    this.camera.position.set(this.playerX, this.playerY + 2, this.playerZ + 5);
    this.camera.lookAt(this.playerX, this.playerY + 1, this.playerZ);
    // NEW: Store the initial camera offset (relative to player's target position)
    this.cameraOffset = new THREE.Vector3();
    this.cameraOffset.copy(this.camera.position).sub(new THREE.Vector3(this.playerX, this.playerY + 1, this.playerZ));
    
    // Initialize controls based on device
    this.initializeControls();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Add game state variables
    this.tributePoints = 0;
    this.isSpinning = false;
    this.wheelObject = null;
    this.nearWheel = false;
  }
  
  initializeControls() {
    if (this.isMobile) {
      this.initializeMobileControls();
    } else {
      this.initializeDesktopControls();
    }
  }
  
  initializeDesktopControls() {
    // Use OrbitControls for third-person view
    this.controls = new OrbitControls(this.camera, this.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.1;
    this.controls.maxPolarAngle = Math.PI * 0.9; // Prevent going below ground
    this.controls.minDistance = 3; // Minimum zoom distance
    this.controls.maxDistance = 10; // Maximum zoom distance
    
    // Increase sensitivity for Safari
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
      this.controls.rotateSpeed = 2.0; // Double sensitivity for Safari
    }
    
    // Add instructions for desktop with Goon of Fortune theme
    const instructionsDiv = document.createElement("div");
    instructionsDiv.className = "instructions";
    instructionsDiv.innerHTML = "Welcome to GOON OF FORTUNE!<br>Click to begin.<br>Use WASD to move, Space to jump.<br>Find the wheel and press 'E' to spin!";
    document.getElementById('game-container').appendChild(instructionsDiv);
    
    // Hide instructions on first click
    document.addEventListener('click', () => {
      if (document.querySelector(".instructions")) {
        document.querySelector(".instructions").style.display = 'none';
      }
    }, { once: true });
    
    // NEW: When the user rotates the view, update the camera offset so that future translations preserve the new relative angle.
    this.controls.addEventListener('change', () => {
      this.cameraOffset.copy(this.camera.position).sub(this.controls.target);
    });
  }
  
  initializeMobileControls() {
    // Setup camera position first with safe values
    this.camera.position.set(this.playerX, this.playerY + 2, this.playerZ + 5);
    this.camera.lookAt(this.playerX, this.playerY + 1, this.playerZ);
    
    // Initialize OrbitControls for camera rotation (similar to desktop)
    this.controls = new OrbitControls(this.camera, this.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.1;
    this.controls.maxPolarAngle = Math.PI * 0.9; // Prevent going below ground
    this.controls.minDistance = 3; // Minimum zoom distance
    this.controls.maxDistance = 10; // Maximum zoom distance
    
    // Store the initial camera offset for mobile too
    this.cameraOffset = new THREE.Vector3();
    this.cameraOffset.copy(this.camera.position).sub(new THREE.Vector3(this.playerX, this.playerY + 1, this.playerZ));
    
    // Update camera offset when controls change
    this.controls.addEventListener('change', () => {
      this.cameraOffset.copy(this.camera.position).sub(this.controls.target);
    });
    
    // Add joystick container for mobile
    const joystickContainer = document.getElementById('joystick-container');
    if (!joystickContainer) {
      const newJoystickContainer = document.createElement('div');
      newJoystickContainer.id = 'joystick-container';
      document.body.appendChild(newJoystickContainer);
    }
    
    // Add jump button for mobile
    const jumpButton = document.getElementById('jump-button');
    if (!jumpButton) {
      const newJumpButton = document.createElement('div');
      newJumpButton.id = 'jump-button';
      newJumpButton.innerText = 'JUMP';
      document.body.appendChild(newJumpButton);
    }
    
    // Jump button event listeners
    document.getElementById('jump-button').addEventListener('touchstart', (event) => {
      this.jumpButtonPressed = true;
      if (this.canJump) {
        this.velocity.y = JUMP_FORCE;
        this.canJump = false;
      }
      event.preventDefault();
    });
    
    document.getElementById('jump-button').addEventListener('touchend', (event) => {
      this.jumpButtonPressed = false;
      event.preventDefault();
    });
    
    // Initialize joystick with improved behavior
    this.joystick = nipplejs.create({
      zone: document.getElementById('joystick-container'),
      mode: 'static',
      position: { left: '50%', top: '50%' },
      color: 'rgba(255, 255, 255, 0.5)',
      size: 120
    });
    
    // Joystick move event with better movement handling
    this.joystick.on('move', (evt, data) => {
      const force = Math.min(data.force, 1); // Normalize force between 0 and 1
      const angle = data.angle.radian;
      
      // Calculate movement values using the joystick - fixed direction mapping
      this.moveForward = -Math.sin(angle) * force * SPEED * 5; 
      this.moveRight = Math.cos(angle) * force * SPEED * 5;    
    });
    
    // Joystick end event
    this.joystick.on('end', () => {
      console.log('Joystick released');
      this.moveForward = 0;
      this.moveRight = 0;
    });
  }
  
  setupEventListeners() {
    // Listen for key events (for desktop controls)
    document.addEventListener("keydown", (e) => {
      this.keysPressed.add(e.key.toLowerCase());
      
      // Handle jump with spacebar
      if (e.key === " " && this.canJump) {
        this.velocity.y = JUMP_FORCE;
        this.canJump = false;
      }
      
      // E key to spin the wheel when near it
      if (e.key === "e" && this.nearWheel && !this.isSpinning) {
        this.spinWheel();
      }
    });

    document.addEventListener("keyup", (e) => {
      this.keysPressed.delete(e.key.toLowerCase());
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      if (this.renderer) {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      }
    });
  }
  
  spinWheel() {
    if (this.isSpinning || !this.wheelObject) return;
    
    this.isSpinning = true;
    const rotations = 2 + Math.random() * 3; // 2-5 full rotations
    const duration = 4000; // 4 seconds
    const startTime = Date.now();
    const startRotation = this.wheelObject.rotation.y;
    const totalRotation = Math.PI * 2 * rotations;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for realistic spinning and slowing down
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      this.wheelObject.rotation.y = startRotation + totalRotation * easeOut;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.isSpinning = false;
        this.processWheelResult();
      }
    };
    
    animate();
    
    // Remove audio play functionality since the sound file doesn't exist
  }
  
  processWheelResult() {
    // Determine which segment landed at the top
    const normalizedRotation = this.wheelObject.rotation.y % (Math.PI * 2);
    const segmentAngle = Math.PI * 2 / 8; // 8 segments
    const segment = Math.floor(normalizedRotation / segmentAngle);
    
    const outcomes = [
      { text: "JACKPOT! +500 POINTS", points: 500, color: "#00ff00" },
      { text: "DOUBLE TRIBUTE! +200 POINTS", points: 200, color: "#00ffff" },
      { text: "MEAT SPIN! +100 POINTS", points: 100, color: "#ff00ff" },
      { text: "LOSE HALF YOUR POINTS!", points: -0.5, color: "#ff0000" },
      { text: "GOON TAX! -100 POINTS", points: -100, color: "#ff8800" },
      { text: "MEGA BONUS! +300 POINTS", points: 300, color: "#ffff00" },
      { text: "ABSOLUTE ZERO! POINTS RESET", points: -Infinity, color: "#0000ff" },
      { text: "SMALL WIN! +50 POINTS", points: 50, color: "#88ff88" }
    ];
    
    const result = outcomes[segment];
    
    // Update tribute points
    if (result.points === -Infinity) {
      this.tributePoints = 0;
    } else if (result.points < 0 && result.points > -1) {
      this.tributePoints = Math.floor(this.tributePoints * (1 + result.points));
    } else {
      this.tributePoints += result.points;
    }
    this.tributePoints = Math.max(0, this.tributePoints);
    
    // Update UI
    document.getElementById('points').textContent = this.tributePoints;
    const messageDisplay = document.getElementById('message-display');
    messageDisplay.textContent = result.text;
    messageDisplay.style.color = result.color;
    messageDisplay.style.opacity = 1;
    
    // Hide message after a delay
    setTimeout(() => {
      messageDisplay.style.opacity = 0;
    }, 3000);
  }
  
  processMovement() {
    // Get current position
    let x = this.playerModel ? this.playerModel.position.x : this.camera.position.x;
    let y = this.playerModel ? this.playerModel.position.y : (this.camera.position.y - 1.2);
    let z = this.playerModel ? this.playerModel.position.z : this.camera.position.z;
    
    // Create movement vector
    const moveDirection = new THREE.Vector3(0, 0, 0);
    
    if (this.isMobile) {
      if (this.moveForward !== 0 || this.moveRight !== 0) {
        const forward = new THREE.Vector3();
        this.camera.getWorldDirection(forward);
        forward.y = 0;
        forward.normalize();
        
        const right = new THREE.Vector3(-forward.z, 0, forward.x);
        
        moveDirection.addScaledVector(forward, -this.moveForward); // Reversed direction
        moveDirection.addScaledVector(right, this.moveRight);
        moveDirection.normalize().multiplyScalar(SPEED * 3); // Increased speed for mobile
      }
    } else {
      if (this.keysPressed.has("w") || this.keysPressed.has("arrowup")) {
        moveDirection.z = 1; 
      } else if (this.keysPressed.has("s") || this.keysPressed.has("arrowdown")) {
        moveDirection.z = -1; 
      }
      
      if (this.keysPressed.has("a") || this.keysPressed.has("arrowleft")) {
        moveDirection.x = 1; 
      } else if (this.keysPressed.has("d") || this.keysPressed.has("arrowright")) {
        moveDirection.x = -1; 
      }
    }
    
    if (!this.isMobile && moveDirection.length() > 0) {
      moveDirection.normalize();
    }
    
    const cameraDirection = new THREE.Vector3();
    this.camera.getWorldDirection(cameraDirection);
    cameraDirection.y = 0; 
    cameraDirection.normalize();
    
    const rightVector = new THREE.Vector3();
    rightVector.crossVectors(this.camera.up, cameraDirection).normalize();
    
    const movement = new THREE.Vector3();
    if (!this.isMobile) {
      if (moveDirection.z !== 0) {
        movement.add(cameraDirection.clone().multiplyScalar(moveDirection.z));
      }
      if (moveDirection.x !== 0) {
        movement.add(rightVector.clone().multiplyScalar(moveDirection.x));
      }
      
      if (movement.length() > 0) {
        movement.normalize().multiplyScalar(SPEED);
      }
    } else {
      movement.copy(moveDirection);
    }
    
    this.velocity.y -= GRAVITY;
    
    let newX = x + movement.x;
    let newY = y + this.velocity.y;
    let newZ = z + movement.z;
    
    const blockMeshes = this.scene.children.filter(child => 
      child.userData.isBlock || child.userData.isBarrier || 
      (child.type === "Group" && child.userData.isTree));
    
    const playerRadius = 0.3;
    const playerHeight = 1.8;
    
    let standingOnBlock = false;
    blockMeshes.forEach(block => {
      if (block.type === "Group" && block.userData.isTree) {
        // Instead of checking each part (which has incorrect local positions), check collision with the tree as a whole
        checkCollision.call(this, block, 1.0, 2.0, 1.0); // Use approximate trunk dimensions
      } else {
        checkCollision.call(this, block);
      }
    });
    
    function checkCollision(block, overrideWidth, overrideHeight, overrideDepth) {
      const blockSize = new THREE.Vector3();
      if (block.geometry) {
        const boundingBox = new THREE.Box3().setFromObject(block);
        boundingBox.getSize(blockSize);
      } else {
        blockSize.set(1, 1, 1);
      }
      
      // Use override dimensions if provided (for tree groups)
      const blockWidth = overrideWidth || blockSize.x;
      const blockHeight = overrideHeight || blockSize.y;
      const blockDepth = overrideDepth || blockSize.z;
      
      if (
        this.velocity.y <= 0 &&
        Math.abs(newX - block.position.x) < (blockWidth / 2 + playerRadius) &&
        Math.abs(newZ - block.position.z) < (blockDepth / 2 + playerRadius) &&
        Math.abs(y - (block.position.y + blockHeight / 2)) < 0.2 &&
        y >= block.position.y
      ) {
        standingOnBlock = true;
        newY = block.position.y + blockHeight / 2 + 0.01;
        this.velocity.y = 0;
        this.canJump = true;
      } else if (
        Math.abs(newX - block.position.x) < (blockWidth / 2 + playerRadius) &&
        Math.abs(newZ - block.position.z) < (blockDepth / 2 + playerRadius) &&
        newY < block.position.y + blockHeight / 2 &&
        newY + playerHeight > block.position.y - blockHeight / 2
      ) {
        // Instead of snapping to the camera position, revert the movement in the colliding direction.
        if (Math.abs(movement.x) > 0) {
          newX = x;
        }
        if (Math.abs(movement.z) > 0) {
          newZ = z;
        }
      }
    }
    
    if (newY <= 0 && !standingOnBlock) {
      newY = 0;
      this.velocity.y = 0;
      this.canJump = true;
    }
    
    if (this.playerModel) {
      this.playerModel.position.set(newX, newY, newZ);
      
      if (movement.length() > 0) {
        const angle = Math.atan2(movement.x, movement.z);
        this.playerModel.rotation.y = angle;
        
        // Animate legs while moving
        const leftLeg = this.playerModel.getObjectByName("leftLeg");
        const rightLeg = this.playerModel.getObjectByName("rightLeg");
        
        if (leftLeg && rightLeg) {
          const walkSpeed = 10;
          const walkAmplitude = 0.3;
          leftLeg.rotation.x = Math.sin(this.time * walkSpeed) * walkAmplitude;
          rightLeg.rotation.x = Math.sin(this.time * walkSpeed + Math.PI) * walkAmplitude;
        }
      } else {
        // Reset legs when standing still
        const leftLeg = this.playerModel.getObjectByName("leftLeg");
        const rightLeg = this.playerModel.getObjectByName("rightLeg");
        
        if (leftLeg && rightLeg) {
          leftLeg.rotation.x = 0;
          rightLeg.rotation.x = 0;
        }
      }
      
      // NEW: Update camera by translating with a fixed offset.
      const newTarget = new THREE.Vector3(this.playerModel.position.x, this.playerModel.position.y + 1, this.playerModel.position.z);
      if (this.controls) {
        this.controls.target.copy(newTarget);
      }
      this.camera.position.copy(newTarget).add(this.cameraOffset);
    } else {
      this.camera.position.set(newX, newY + 1.2, newZ);
    }
    
    if (this.isMobile && this.controls) {
      // Update the controls target to follow the player (just like desktop)
      this.controls.target.set(newX, newY + 1, newZ);
      this.controls.update();
    } else if (!this.isMobile && this.controls) {
      this.controls.update();
    }
  }
  
  update() {
    // Add time variable for leg animation
    this.time = this.time || 0;
    this.time += 0.01;
    
    this.processMovement();
    
    // Check if player is near the wheel
    if (this.wheelObject && this.playerModel) {
      const distance = this.playerModel.position.distanceTo(this.wheelObject.position);
      this.nearWheel = distance < 5;
      
      if (this.nearWheel && !this.isSpinning) {
        // Show interactive prompt
        const messageDisplay = document.getElementById('message-display');
        messageDisplay.textContent = "Press 'E' to spin the Wheel of Fortune!";
        messageDisplay.style.color = "#ffffff";
        messageDisplay.style.opacity = 0.8;
      }
    }
  }
  
  setWheelObject(wheel) {
    this.wheelObject = wheel;
  }
  
  getTributePoints() {
    return this.tributePoints;
  }
  
  getCamera() {
    return this.camera;
  }
  
  getPlayerModel() {
    return this.playerModel;
  }
}