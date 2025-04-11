import { Player } from './player.js';
import { Platform } from './platform.js';
import { Camera } from './camera.js';
import { TouchControls } from './touchControls.js';

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.setCanvasSize();
    
    // Game states
    this.state = 'loading'; // loading, title, playing, gameover
    this.score = 0;
    this.level = 1;
    
    // Initialize audio (to be loaded later)
    this.sounds = {};
    
    // Assets to be preloaded
    this.assets = {};
    this.assetsLoaded = 0;
    this.assetsToLoad = 0;
    
    // Game objects
    this.player = null;
    this.platforms = [];
    this.collectibles = [];
    this.obstacles = [];
    this.decorations = [];
    this.particles = [];
    
    this.camera = new Camera();
    this.touchControls = new TouchControls();
    
    // Input handling
    this.keys = {};
    this.analogInput = { x: 0, y: 0 };
    
    // Game boundaries
    this.worldBounds = {
      left: -1000,
      right: 3000,
      top: -500,
      bottom: 1200
    };
    
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
    
    // Initialize game objects
    this.player = new Player(100, 300);
    
    // Load player sprites
    this.loadPlayerSprites();
    
    this.initializeLevel();
    
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

  initializeLevel() {
    // Clear existing objects
    this.platforms = [];
    this.collectibles = [];
    this.obstacles = [];
    this.particles = [];
    
    // Create factory-themed platforms with different types
    
    // Main factory floor platforms
    this.platforms = [
      // Ground level
      new Platform(-800, 600, 400, 100),
      new Platform(-400, 600, 400, 100),
      new Platform(0, 600, 400, 100, 'normal'),
      new Platform(400, 600, 400, 100, 'normal'),
      new Platform(800, 600, 400, 100, 'normal'),
      new Platform(1200, 600, 400, 100, 'normal'),
      new Platform(1600, 600, 400, 100, 'normal'),
      new Platform(2000, 600, 400, 100, 'normal'),
      
      // Conveyor belts
      new Platform(800, 500, 300, 20, 'conveyor-right'),
      new Platform(1300, 480, 300, 20, 'conveyor-left'),
      new Platform(1800, 450, 300, 20, 'conveyor-right'),
      
      // Bouncy platforms
      new Platform(300, 400, 100, 20, 'bounce'),
      new Platform(700, 300, 100, 20, 'bounce'),
      new Platform(1100, 250, 100, 20, 'bounce'),
      
      // Crumbling platforms
      new Platform(500, 450, 120, 20, 'crumble'),
      new Platform(900, 350, 120, 20, 'crumble'),
      new Platform(1300, 300, 120, 20, 'crumble'),
      
      // Moving platforms
      new Platform(400, 200, 150, 20, 'moving-horizontal'),
      new Platform(800, 150, 150, 20, 'moving-vertical'),
      new Platform(1200, 100, 150, 20, 'moving-horizontal'),
      
      // Upper sections with normal platforms
      new Platform(-200, 200, 150, 20),
      new Platform(200, 300, 150, 20),
      new Platform(600, 200, 150, 20),
      new Platform(1400, 200, 150, 20),
      new Platform(1800, 150, 150, 20),
      
      // Secret areas
      new Platform(-600, 300, 100, 20),
      new Platform(-500, 200, 100, 20),
      new Platform(-400, 100, 100, 20),
      new Platform(2200, 400, 100, 20),
      new Platform(2300, 300, 100, 20),
      new Platform(2400, 200, 100, 20),
      
      // Additional platforms for more complex level design
      new Platform(1000, 200, 120, 20),
      new Platform(1500, 350, 120, 20, 'bounce'),
      new Platform(1700, 300, 120, 20, 'crumble'),
      new Platform(1900, 250, 150, 20, 'moving-vertical'),
      new Platform(2100, 200, 200, 20, 'conveyor-right')
    ];
    
    // Create collectible fried chickens throughout the level
    for (let i = 0; i < 25; i++) {
      const x = -500 + i * 150;
      const y = 500 - Math.random() * 400;
      
      this.collectibles.push({
        type: 'fried-chicken',
        x,
        y,
        width: 40,
        height: 40,
        collected: false,
        animationFrame: Math.floor(Math.random() * 4),
        value: 100,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        rotation: Math.random() * Math.PI * 2,
        bobHeight: Math.random() * 10,
        bobSpeed: 1 + Math.random()
      });
    }
    
    // Add decorative factory elements
    for (let i = 0; i < 30; i++) {
      const x = -800 + i * 120;
      const y = 600 - Math.random() * 50;
      
      this.decorations.push({
        type: Math.random() > 0.7 ? 'pipe' : 'valve',
        x,
        y,
        size: 20 + Math.random() * 30,
        rotation: Math.random() * Math.PI * 2
      });
    }
    
    // Add danger obstacles - deep fryers
    for (let i = 0; i < 10; i++) {
      const x = -700 + i * 300 + Math.random() * 100;
      const y = 580; // Just above ground level
      
      this.obstacles.push({
        type: 'fryer',
        x,
        y,
        width: 80,
        height: 50,
        damageAmount: 1,
        bubbleTimer: Math.random() * 100
      });
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
    
    // Update all game objects
    this.updateControlInput();
    this.updatePlayer(scaledDelta);
    this.updatePlatforms(scaledDelta);
    this.updateCollectibles(scaledDelta);
    this.updateObstacles(scaledDelta);
    this.updateParticles(scaledDelta);
    this.updateCamera(scaledDelta);
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
    this.collectibles.forEach((collectible) => {
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
    this.obstacles.forEach((obstacle) => {
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
    if (this.player.x < this.worldBounds.left) {
      this.player.x = this.worldBounds.left;
      this.player.velocityX = 0;
    } else if (this.player.x + this.player.width > this.worldBounds.right) {
      this.player.x = this.worldBounds.right - this.player.width;
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
  
  updatePlatforms(deltaTime) {
    // Update moving/animated platforms
    this.platforms.forEach(platform => {
      platform.update();
    });
  }
  
  updateCollectibles(deltaTime) {
    // Animate collectibles
    this.collectibles.forEach(collectible => {
      if (!collectible.collected) {
        // Animate the fried chicken
        if (collectible.type === 'fried-chicken') {
          collectible.animationFrame = (collectible.animationFrame + 0.1) % 4;
          
          // Bobbing motion
          collectible.y += Math.sin(this.gameTime / (300 / collectible.bobSpeed)) * 0.5;
          
          // Slow rotation
          collectible.rotation += collectible.rotationSpeed;
        }
      }
    });
  }
  
  updateObstacles(deltaTime) {
    this.obstacles.forEach(obstacle => {
      if (obstacle.type === 'fryer') {
        // Animate bubbling
        obstacle.bubbleTimer += deltaTime;
        if (obstacle.bubbleTimer > 10 && Math.random() > 0.7) {
          // Create a bubble particle occasionally
          this.particles.push({
            type: 'bubble',
            x: obstacle.x + Math.random() * obstacle.width,
            y: obstacle.y,
            size: 3 + Math.random() * 7,
            velocityY: -1 - Math.random() * 2,
            velocityX: (Math.random() - 0.5) * 0.5,
            life: 30 + Math.random() * 20,
            color: '#ffcc88'
          });
          
          // Reset timer with random interval
          obstacle.bubbleTimer = Math.random() * 5;
        }
      }
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
    this.platforms.forEach(platform => {
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

  render() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw background
    this.camera.drawBackground(this.ctx);

    // Apply camera transform
    this.ctx.save();
    this.camera.apply(this.ctx);
    
    // Draw decorations
    this.renderDecorations();
    
    // Draw obstacles
    this.renderObstacles();
    
    // Draw platforms
    this.platforms.forEach(platform => platform.draw(this.ctx));
    
    // Draw collectibles
    this.renderCollectibles();
    
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
  
  renderDecorations() {
    this.decorations.forEach(decoration => {
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
      }
    });
  }
  
  renderObstacles() {
    this.obstacles.forEach(obstacle => {
      if (obstacle.type === 'fryer') {
        // Draw deep fryer
        // Base container
        this.ctx.fillStyle = '#777';
        this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        
        // Oil
        this.ctx.fillStyle = '#ffc966';
        this.ctx.fillRect(obstacle.x + 3, obstacle.y + 3, obstacle.width - 6, obstacle.height - 6);
        
        // Bubbles on surface
        this.ctx.fillStyle = '#ffe0a3';
        for (let i = 0; i < 10; i++) {
          const bubbleX = obstacle.x + 5 + (obstacle.width - 10) * (i / 10);
          const bubbleY = obstacle.y + 5 + Math.sin(this.gameTime / 300 + i) * 3;
          const bubbleSize = 2 + Math.sin(this.gameTime / 200 + i * 2) * 2;
          
          this.ctx.beginPath();
          this.ctx.arc(bubbleX, bubbleY, bubbleSize, 0, Math.PI*2);
          this.ctx.fill();
        }
        
        // Oil shine/highlight
        const gradient = this.ctx.createLinearGradient(
          obstacle.x + 3, 
          obstacle.y + 3, 
          obstacle.x + obstacle.width - 3, 
          obstacle.y + obstacle.height - 3
        );
        gradient.addColorStop(0, 'rgba(255, 230, 180, 0.7)');
        gradient.addColorStop(1, 'rgba(255, 230, 180, 0)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(obstacle.x + 3, obstacle.y + 3, obstacle.width - 6, obstacle.height - 6);
        
        // Warning sign
        this.ctx.fillStyle = '#ff0000';
        this.ctx.beginPath();
        this.ctx.moveTo(obstacle.x + obstacle.width - 15, obstacle.y - 15);
        this.ctx.lineTo(obstacle.x + obstacle.width, obstacle.y - 15);
        this.ctx.lineTo(obstacle.x + obstacle.width - 7.5, obstacle.y - 5);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Exclamation mark
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '10px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('!', obstacle.x + obstacle.width - 7.5, obstacle.y - 8);
      }
    });
  }
  
  renderCollectibles() {
    // Draw only non-collected collectibles
    this.collectibles.forEach(collectible => {
      if (!collectible.collected) {
        if (collectible.type === 'fried-chicken') {
          this.drawFriedChicken(collectible);
        }
      }
    });
  }
  
  drawFriedChicken(chicken) {
    const x = chicken.x;
    const y = chicken.y;
    
    // Save context for rotation
    this.ctx.save();
    this.ctx.translate(x + chicken.width/2, y + chicken.height/2);
    this.ctx.rotate(chicken.rotation);
    
    // Draw fried chicken shadow
    this.ctx.fillStyle = 'rgba(0,0,0,0.2)';
    this.ctx.beginPath();
    this.ctx.ellipse(0, chicken.height + 5, chicken.width/2, chicken.width/4, 0, 0, Math.PI*2);
    this.ctx.fill();
    
    // Fried chicken body
    this.ctx.fillStyle = '#e8a238'; // Golden brown color
    this.ctx.beginPath();
    this.ctx.ellipse(0, 0, chicken.width/2 - 2, chicken.height/2 - 2, 0, 0, Math.PI*2);
    this.ctx.fill();
    
    // Crispy exterior
    this.ctx.strokeStyle = '#c17a2f';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.ellipse(0, 0, chicken.width/2 - 2, chicken.height/2 - 2, 0, 0, Math.PI*2);
    this.ctx.stroke();
    
    // Crispy texture details
    this.ctx.strokeStyle = '#a15b1a';
    this.ctx.lineWidth = 1;
    
    // Draw crispy bits around the fried chicken
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + this.gameTime / 1000;
      const radius = chicken.width/2 - 4;
      const x1 = Math.cos(angle) * radius;
      const y1 = Math.sin(angle) * radius;
      const x2 = Math.cos(angle + 0.2) * (radius + 5 + Math.sin(this.gameTime / 500 + i) * 2);
      const y2 = Math.sin(angle + 0.2) * (radius + 5 + Math.sin(this.gameTime / 500 + i) * 2);
      
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    }
    
    // Highlights/shine on the fried chicken
    this.ctx.fillStyle = '#ffebb3';
    this.ctx.beginPath();
    this.ctx.ellipse(-chicken.width/6, -chicken.height/6, chicken.width/6, chicken.height/6, 0, 0, Math.PI*2);
    this.ctx.fill();
    
    // Glow effect for collectibility
    this.ctx.globalAlpha = 0.3 + Math.sin(this.gameTime / 200) * 0.2;
    const glow = this.ctx.createRadialGradient(
      0, 0, 5,
      0, 0, chicken.width
    );
    glow.addColorStop(0, 'rgba(255, 200, 0, 0.8)');
    glow.addColorStop(1, 'rgba(255, 200, 0, 0)');
    
    this.ctx.fillStyle = glow;
    this.ctx.fillRect(-chicken.width, -chicken.height, chicken.width * 2, chicken.height * 2);
    this.ctx.globalAlpha = 1.0;
    
    this.ctx.restore();
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
    this.lastFrameTime = 0;
    requestAnimationFrame((t) => this.gameLoop(t));
  }
}