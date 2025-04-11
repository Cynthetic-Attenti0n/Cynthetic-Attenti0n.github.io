import { Player } from './player.js';
import { Camera } from './camera.js';
import { TouchControls } from './touchControls.js';
import { Level } from './level.js';

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.setCanvasSize();
    
    // Game states
    this.state = 'loading'; // loading, title, playing, gameover, levelComplete
    this.score = 0;
    this.level = 1;
    
    // Initialize audio (to be loaded later)
    this.sounds = {};
    
    // Assets to be preloaded
    this.assets = {};
    this.assetsLoaded = 0;
    this.assetsToLoad = 0;
    
    // Game objects
    this.player = new Player(100, 300);
    this.levelManager = null;
    this.particles = [];
    
    this.camera = new Camera();
    this.touchControls = new TouchControls();
    
    // Input handling
    this.keys = {};
    this.analogInput = { x: 0, y: 0 };
    
    // Timing
    this.lastFrameTime = 0;
    this.timeScale = 1;
    this.gameTime = 0;
    
    window.addEventListener('resize', () => this.setCanvasSize());
    this.setupControls();
  }
  
  async preload() {
    // Load sprite assets
    this.loadAssets();
    
    // Load player sprites
    this.loadPlayerSprites();
    
    // Initialize level
    this.levelManager = new Level(this.player);
    
    // Return a promise that resolves when assets are loaded
    return new Promise((resolve) => {
      const checkAssetsLoaded = () => {
        if (this.assetsLoaded >= this.assetsToLoad) {
          resolve();
        } else {
          setTimeout(checkAssetsLoaded, 100);
        }
      };
      
      // Add a timeout in case loading takes too long
      setTimeout(resolve, 3000);
      checkAssetsLoaded();
    });
  }
  
  loadAssets() {
    // Count total assets to load
    this.assetsToLoad = 2; // walking and jumping sprites
    this.assetsLoaded = 0;
    
    // Load walking sprite
    this.assets.fatAlbertWalking = new Image();
    this.assets.fatAlbertWalking.onload = () => this.assetsLoaded++;
    this.assets.fatAlbertWalking.src = 'fat_albert_walking.png';
    
    // Load jumping sprite
    this.assets.fatAlbertJumping = new Image();
    this.assets.fatAlbertJumping.onload = () => this.assetsLoaded++;
    this.assets.fatAlbertJumping.src = 'fat_albert_jumping.png';
  }
  
  loadPlayerSprites() {
    if (this.player) {
      this.player.loadSprites(
        this.assets.fatAlbertWalking,
        this.assets.fatAlbertJumping
      );
    }
  }

  setCanvasSize() {
    // Use device pixel ratio for sharp rendering on mobile
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
  }

  setupControls() {
    // Keyboard controls
    window.addEventListener('keydown', (e) => {
      if(!this.keys[e.code]) {
        this.keys[e.code] = true;
        
        // Check for jump key press
        if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
          this.player.jump();
        }
      }
    });
    
    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });

    // Prevent default touch behaviors
    document.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
    document.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
  }

  update(deltaTime) {
    // Apply time scaling
    const scaledDelta = deltaTime * this.timeScale;
    this.gameTime += scaledDelta;
    
    // Update based on game state
    if (this.state === 'playing') {
      // Update all game objects
      this.updateControlInput();
      this.updatePlayer(scaledDelta);
      this.levelManager.update(scaledDelta);
      this.updateParticles(scaledDelta);
      this.updateCamera(scaledDelta);
      
      // Check for level completion
      if (this.levelManager.checkLevelCompletion(this.player)) {
        this.onLevelComplete();
      }
    }
  }
  
  updateControlInput() {
    // Handle keyboard movement
    let horizontalInput = 0;
    
    if (this.keys['ArrowLeft'] || this.keys['KeyA']) {
      horizontalInput = -1;
    }
    if (this.keys['ArrowRight'] || this.keys['KeyD']) {
      horizontalInput = 1;
    }
    
    // Handle touch/analog movement
    const touchInput = this.touchControls.getInput();
    if (touchInput.analog) {
      horizontalInput = touchInput.analog.x;
      
      // Handle analog jump
      if (touchInput.analog.y < -0.5 && !this.player.isJumping) {
        this.player.jump(Math.abs(touchInput.analog.y));
      }
    }
    
    if (touchInput.jump) {
      this.player.jump();
    }
    
    if (touchInput.action) {
      this.player.activateSpeedBoost();
    }
    
    // Apply movement
    if (horizontalInput < 0) {
      this.player.moveLeft(Math.abs(horizontalInput));
    } else if (horizontalInput > 0) {
      this.player.moveRight(horizontalInput);
    }
  }
  
  updatePlayer(deltaTime) {
    this.player.update();
    
    // Handle collisions after movement
    this.handlePlayerCollisions();
    
    // Check collectibles
    this.levelManager.collectibles.forEach((collectible) => {
      if (!collectible.collected && this.checkCollision(this.player, collectible)) {
        collectible.collected = true;
        this.player.collectChicken();
        
        // Apply score with multiplier
        const scoreValue = Math.floor(collectible.value * this.player.scoreMultiplier);
        this.score += scoreValue;
        
        // Camera effect
        this.camera.shake(3);
        
        // Create particles
        this.createCollectParticles(collectible.x + collectible.width/2, collectible.y + collectible.height/2);
        
        // Display score popup
        this.addScorePopup(collectible.x, collectible.y, scoreValue);
      }
    });
    
    // Check obstacles
    this.levelManager.obstacles.forEach((obstacle) => {
      if (this.checkCollision(this.player, obstacle)) {
        if (this.player.takeDamage()) {
          // Camera effect
          this.camera.shake(7);
          
          // Create damage particles
          this.createDamageParticles(
            this.player.x + this.player.width/2, 
            this.player.y + this.player.height/2
          );
        }
      }
    });
    
    // Check world boundaries
    const worldBounds = this.levelManager.worldBounds;
    if (this.player.x < worldBounds.left) {
      this.player.x = worldBounds.left;
      this.player.velocityX = 0;
    } else if (this.player.x + this.player.width > worldBounds.right) {
      this.player.x = worldBounds.right - this.player.width;
      this.player.velocityX = 0;
    }
  }
  
  createCollectParticles(x, y) {
    // Add particles for collecting fried chicken
    for (let i = 0; i < 15; i++) {
      this.particles.push({
        type: 'collect',
        x,
        y,
        size: 5 + Math.random() * 10,
        velocityX: (Math.random() - 0.5) * 5,
        velocityY: -2 - Math.random() * 5,
        gravity: 0.1 + Math.random() * 0.1,
        life: 60 + Math.random() * 40,
        color: Math.random() > 0.5 ? '#ffcc00' : '#ff9900'
      });
    }
  }
  
  createDamageParticles(x, y) {
    // Add particles for damage
    for (let i = 0; i < 20; i++) {
      this.particles.push({
        type: 'damage',
        x,
        y,
        size: 3 + Math.random() * 8,
        velocityX: (Math.random() - 0.5) * 8,
        velocityY: -1 - Math.random() * 6,
        gravity: 0.2,
        life: 40 + Math.random() * 20,
        color: Math.random() > 0.5 ? '#ff0000' : '#ff6666'
      });
    }
  }
  
  addScorePopup(x, y, value) {
    this.particles.push({
      type: 'text',
      text: `+${value}`,
      x,
      y,
      velocityY: -2,
      life: 60,
      color: '#ffcc00',
      fontSize: 24
    });
  }
  
  updateParticles(deltaTime) {
    // Update all particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      
      // Update life
      particle.life -= deltaTime;
      
      // Remove dead particles
      if (particle.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }
      
      // Update position
      if (particle.velocityX !== undefined) {
        particle.x += particle.velocityX;
      }
      
      if (particle.velocityY !== undefined) {
        particle.y += particle.velocityY;
        
        // Apply gravity if applicable
        if (particle.gravity) {
          particle.velocityY += particle.gravity;
        }
      }
      
      // Update size for some particle types
      if (particle.type === 'bubble') {
        particle.size += 0.2;
        
        // Decrease opacity as bubble rises
        particle.opacity = particle.life / 50;
      }
    }
  }
  
  updateCamera(deltaTime) {
    // Update camera position to follow player
    this.camera.update(this.player);
  }
  
  handlePlayerCollisions() {
    let hasCollision = false;
    
    // Check platform collisions
    this.levelManager.platforms.forEach(platform => {
      if (platform.isVisible() && this.player.checkCollision(platform)) {
        this.player.handleCollision(platform);
        platform.applyEffect(this.player);
        hasCollision = true;
      }
    });
    
    // Set jumping state based on collisions
    if (hasCollision) {
      this.player.isJumping = false;
    }
  }
  
  checkCollision(objA, objB) {
    return (
      objA.x < objB.x + objB.width &&
      objA.x + objA.width > objB.x &&
      objA.y < objB.y + objB.height &&
      objA.y + objA.height > objB.y
    );
  }
  
  onLevelComplete() {
    this.state = 'levelComplete';
    
    // Show level complete screen
    this.showLevelCompleteScreen();
    
    // After delay, go to next level or back to title
    setTimeout(() => {
      this.state = 'title';
      this.level++;
      
      // Show title screen again
      document.getElementById('title-screen').classList.add('active');
      document.getElementById('start-button').textContent = 'CONTINUE';
    }, 3000);
  }
  
  showLevelCompleteScreen() {
    // Create and show level complete overlay
    const overlay = document.createElement('div');
    overlay.id = 'level-complete';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0, 0, 0, 0.7)';
    overlay.style.color = 'white';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '95';
    
    const title = document.createElement('h1');
    title.textContent = 'LEVEL COMPLETE!';
    title.style.fontSize = '3rem';
    title.style.marginBottom = '1rem';
    title.style.color = '#ffcc00';
    title.style.textShadow = '3px 3px 0 #d43a12';
    
    const scoreText = document.createElement('p');
    scoreText.textContent = `Score: ${this.score}`;
    scoreText.style.fontSize = '2rem';
    scoreText.style.marginBottom = '0.5rem';
    
    const chickensText = document.createElement('p');
    chickensText.textContent = `Chickens collected: ${this.player.chickenCount}`;
    chickensText.style.fontSize = '1.5rem';
    chickensText.style.marginBottom = '2rem';
    
    overlay.appendChild(title);
    overlay.appendChild(scoreText);
    overlay.appendChild(chickensText);
    
    document.body.appendChild(overlay);
    
    // Remove after animation is complete
    setTimeout(() => {
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.5s ease-out';
      
      setTimeout(() => {
        document.body.removeChild(overlay);
      }, 500);
    }, 2500);
  }

  render() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw background
    this.camera.drawBackground(this.ctx);

    // Apply camera transform
    this.ctx.save();
    this.camera.apply(this.ctx);
    
    // Draw level elements
    this.renderLevel();
    
    // Draw particles
    this.renderParticles();
    
    // Draw player
    this.player.draw(this.ctx);
    
    this.ctx.restore();

    // Draw touch controls overlay
    this.touchControls.draw(this.ctx);
    
    // Draw UI
    this.renderUI();
  }
  
  renderLevel() {
    // Draw decorations
    this.renderDecorations();
    
    // Draw obstacles
    this.levelManager.obstacles.forEach(obstacle => obstacle.draw(this.ctx));
    
    // Draw platforms
    this.levelManager.platforms.forEach(platform => platform.draw(this.ctx));
    
    // Draw collectibles
    this.levelManager.collectibles.forEach(collectible => collectible.draw(this.ctx));
    
    // Draw doors
    this.levelManager.doors.forEach(door => door.draw(this.ctx));
  }
  
  renderDecorations() {
    this.levelManager.decorations.forEach(decoration => {
      if (decoration.type === 'pipe') {
        this.ctx.fillStyle = '#666';
        this.ctx.fillRect(decoration.x, decoration.y, decoration.size, 1000 - decoration.y);
        
        // Pipe cap
        this.ctx.fillStyle = '#888';
        this.ctx.beginPath();
        this.ctx.arc(decoration.x + decoration.size/2, decoration.y, decoration.size/2, 0, Math.PI, true);
        this.ctx.fill();
      } else if (decoration.type === 'valve') {
        // Valve wheel
        this.ctx.save();
        this.ctx.translate(decoration.x + decoration.size/2, decoration.y + decoration.size/2);
        this.ctx.rotate(decoration.rotation + this.gameTime / 1000);
        
        this.ctx.fillStyle = '#d00';
        this.ctx.beginPath();
        this.ctx.arc(0, 0, decoration.size/2, 0, Math.PI*2);
        this.ctx.fill();
        
        this.ctx.fillStyle = '#800';
        this.ctx.beginPath();
        this.ctx.arc(0, 0, decoration.size/4, 0, Math.PI*2);
        this.ctx.fill();
        
        // Valve handles
        this.ctx.fillStyle = '#a00';
        for (let i = 0; i < 4; i++) {
          this.ctx.fillRect(-decoration.size/6, -decoration.size/2, decoration.size/3, decoration.size/4);
          this.ctx.rotate(Math.PI/2);
        }
        
        this.ctx.restore();
      } else if (decoration.type === 'sign') {
        // Factory sign
        const padding = 10;
        const textWidth = this.ctx.measureText(decoration.text).width;
        const signWidth = textWidth + padding * 2;
        
        // Sign background
        this.ctx.fillStyle = '#f39c12';
        this.ctx.fillRect(decoration.x, decoration.y, signWidth, decoration.size + padding * 2);
        
        // Sign border
        this.ctx.strokeStyle = '#e67e22';
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(decoration.x, decoration.y, signWidth, decoration.size + padding * 2);
        
        // Sign text
        this.ctx.fillStyle = '#000';
        this.ctx.font = `bold ${decoration.size}px Arial`;
        this.ctx.fillText(decoration.text, decoration.x + padding, decoration.y + decoration.size + padding/2);
      }
    });
  }
  
  renderParticles() {
    this.particles.forEach(particle => {
      if (particle.type === 'collect' || particle.type === 'damage' || particle.type === 'bubble') {
        // Calculate opacity based on remaining life
        const opacity = Math.min(1, particle.life / 30);
        this.ctx.globalAlpha = opacity;
        
        // Draw particle
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
      }
      else if (particle.type === 'text') {
        // Calculate opacity based on remaining life
        const opacity = Math.min(1, particle.life / 30);
        this.ctx.globalAlpha = opacity;
        
        // Draw text
        this.ctx.fillStyle = particle.color;
        this.ctx.font = `bold ${particle.fontSize}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(particle.text, particle.x, particle.y);
      }
    });
    
    // Reset alpha
    this.ctx.globalAlpha = 1.0;
  }
  
  renderUI() {
    // Draw score
    this.ctx.fillStyle = '#fff';
    this.ctx.font = 'bold 24px Arial';
    this.ctx.fillText(`SCORE: ${this.score}`, 20, 40);
    
    // Draw chicken counter
    this.ctx.fillText(`CHICKENS: ${this.player.chickenCount}`, 20, 70);
    
    // Draw size meter
    this.ctx.fillStyle = '#555';
    this.ctx.fillRect(20, 100, 150, 15);
    
    const filledWidth = Math.max(0, Math.min(150, 150 * ((this.player.sizeMultiplier - 1) / (this.player.maxSizeMultiplier - 1))));
    
    const gradient = this.ctx.createLinearGradient(20, 100, 170, 100);
    gradient.addColorStop(0, '#ffcc00');
    gradient.addColorStop(1, '#ff6600');
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(20, 100, filledWidth, 15);
    
    this.ctx.strokeStyle = '#fff';
    this.ctx.strokeRect(20, 100, 150, 15);
    
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText('SIZE', 190, 113);
    
    // Draw health
    this.ctx.fillText(`HEALTH: `, 20, 140);
    
    for (let i = 0; i < this.player.maxHealth; i++) {
      if (i < this.player.health) {
        this.ctx.fillStyle = '#ff6600';
      } else {
        this.ctx.fillStyle = '#666';
      }
      
      this.ctx.fillRect(120 + i * 30, 125, 20, 20);
    }
    
    // Draw score multiplier if active
    if (this.player.scoreMultiplier > 1.05) {
      this.ctx.fillStyle = '#ffcc00';
      this.ctx.font = 'bold 18px Arial';
      this.ctx.fillText(`SCORE ×${this.player.scoreMultiplier.toFixed(1)}`, 20, 170);
    }
  }

  gameLoop(timestamp) {
    // Calculate delta time
    if (!this.lastFrameTime) {
      this.lastFrameTime = timestamp;
    }
    
    const deltaTime = (timestamp - this.lastFrameTime) / 16.67; // normalize to 60fps
    this.lastFrameTime = timestamp;
    
    // Update game state
    this.update(deltaTime);
    
    // Render game
    this.render();
    
    // Continue game loop
    requestAnimationFrame((t) => this.gameLoop(t));
  }

  start() {
    // Start the game loop
    this.state = 'playing';
    this.lastFrameTime = 0;
    requestAnimationFrame((t) => this.gameLoop(t));
  }
}