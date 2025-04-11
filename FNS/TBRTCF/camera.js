export class Camera {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.scale = 1;
    this.lookAheadX = 0; 
    this.lookAheadAmount = 50;
    this.targetScale = 1;
    this.shakeAmount = 0;
    this.shakeDecay = 0.9;
    
    // Background parallax layers
    this.backgroundLayers = [
      { speed: 0.1, elements: this.generateFactoryBackground(0.1) },  // Far back
      { speed: 0.3, elements: this.generateFactoryBackground(0.3) },  // Mid
      { speed: 0.6, elements: this.generateFactoryBackground(0.6) }   // Close
    ];
  }
  
  generateFactoryBackground(depth) {
    // Generate background factory elements at different depths
    const elements = [];
    const count = Math.floor(8 * depth); // More elements for closer layers
    
    // Factory building silhouettes
    for (let i = 0; i < count; i++) {
      const width = 100 + Math.random() * 300;
      const height = 100 + Math.random() * 200;
      const chimneyCount = Math.floor(Math.random() * 3);
      
      elements.push({
        type: 'building',
        x: -1000 + i * 500 - Math.random() * 200,
        y: 900 - height,
        width,
        height,
        chimneyCount,
        color: `rgba(${30 + Math.floor(40 * depth)}, ${30 + Math.floor(30 * depth)}, ${30 + Math.floor(50 * depth)}, ${0.5 + depth * 0.5})`
      });
    }
    
    // Smokestacks and pipes
    for (let i = 0; i < count; i++) {
      elements.push({
        type: 'pipe',
        x: -1200 + i * 600 + Math.random() * 400,
        y: 800 - Math.random() * 400,
        size: 20 + Math.random() * 50,
        color: `rgba(${40 + Math.floor(30 * depth)}, ${40 + Math.floor(20 * depth)}, ${40 + Math.floor(20 * depth)}, ${0.6 + depth * 0.4})`
      });
    }
    
    return elements;
  }

  update(target) {
    const targetLookAhead = target.velocityX * this.lookAheadAmount;
    this.lookAheadX += (targetLookAhead - this.lookAheadX) * 0.1;

    const targetX = -target.x - this.lookAheadX + window.innerWidth/2;
    const targetY = -target.y + window.innerHeight/2;
    
    this.x += (targetX - this.x) * 0.05;
    this.y += (targetY - this.y) * 0.05;

    // Subtle rotation based on horizontal velocity
    this.rotation = target.velocityX * 0.0002;
    
    // Update camera scale
    this.scale += (this.targetScale - this.scale) * 0.05;
    
    // Update shake effect
    if (this.shakeAmount > 0.1) {
      this.shakeAmount *= this.shakeDecay;
    } else {
      this.shakeAmount = 0;
    }
  }
  
  shake(amount) {
    this.shakeAmount = amount;
  }
  
  zoomTo(scale, duration = 1000) {
    this.targetScale = scale;
    
    // Reset after duration
    setTimeout(() => {
      this.targetScale = 1;
    }, duration);
  }

  apply(ctx) {
    ctx.translate(window.innerWidth/2, window.innerHeight/2);
    
    // Apply shake if active
    if (this.shakeAmount > 0) {
      const shakeX = (Math.random() * 2 - 1) * this.shakeAmount;
      const shakeY = (Math.random() * 2 - 1) * this.shakeAmount;
      ctx.translate(shakeX, shakeY);
    }
    
    ctx.rotate(this.rotation);
    ctx.scale(this.scale, this.scale);
    ctx.translate(-window.innerWidth/2 + this.x, -window.innerHeight/2 + this.y);
  }
  
  drawBackground(ctx) {
    // First draw static background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 1000);
    gradient.addColorStop(0, '#1c1c1c');  // Dark gray at top
    gradient.addColorStop(0.6, '#3d2a15'); // Dark brown at middle
    gradient.addColorStop(1, '#5e2b13');   // Reddish brown at bottom
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    
    // Draw each parallax layer of factory background
    ctx.save();
    
    for (const layer of this.backgroundLayers) {
      // Apply parallax effect
      ctx.save();
      
      // Parallax movement - slower layers move less with camera
      const parallaxX = this.x * layer.speed;
      const parallaxY = this.y * layer.speed * 0.5; // Less vertical parallax
      
      // Apply transform but keep the layer filling the screen
      ctx.translate(parallaxX, parallaxY);
      
      // Draw layer elements
      for (const element of layer.elements) {
        this.drawBackgroundElement(ctx, element);
      }
      
      ctx.restore();
    }
    
    // Draw some ambient fog/steam
    this.drawAmbientEffects(ctx);
    
    ctx.restore();
  }
  
  drawBackgroundElement(ctx, element) {
    ctx.fillStyle = element.color;
    
    if (element.type === 'building') {
      // Factory building silhouette
      ctx.fillRect(element.x, element.y, element.width, element.height);
      
      // Draw chimneys
      for (let i = 0; i < element.chimneyCount; i++) {
        const chimneyWidth = 20 + Math.random() * 15;
        const chimneyHeight = 50 + Math.random() * 100;
        const chimneyX = element.x + element.width * (0.2 + i * 0.3);
        
        ctx.fillRect(chimneyX, element.y - chimneyHeight, chimneyWidth, chimneyHeight);
      }
      
      // Draw windows
      ctx.fillStyle = 'rgba(255, 255, 100, 0.3)';
      const windowSize = 15;
      const windowSpacing = 30;
      
      for (let x = element.x + 20; x < element.x + element.width - 20; x += windowSpacing) {
        for (let y = element.y + 30; y < element.y + element.height - 20; y += windowSpacing) {
          // Random chance to draw a window (some will be "dark")
          if (Math.random() > 0.3) {
            ctx.fillRect(x, y, windowSize, windowSize);
          }
        }
      }
    } else if (element.type === 'pipe') {
      // Industrial pipes and tubes
      ctx.fillRect(element.x, element.y, element.size, 1000 - element.y);
      
      // Pipe top
      ctx.beginPath();
      ctx.arc(element.x + element.size / 2, element.y, element.size / 2, 0, Math.PI, true);
      ctx.fill();
      
      // Pipe joints
      const jointSpacing = 50 + Math.random() * 100;
      for (let y = element.y + jointSpacing; y < 1000; y += jointSpacing) {
        ctx.fillRect(element.x - 5, y, element.size + 10, 10);
      }
    }
  }
  
  drawAmbientEffects(ctx) {
    // Draw steam clouds and ambient particles
    const now = Date.now() / 1000;
    
    // Generate steam from various sources
    for (let i = 0; i < 5; i++) {
      const x = -1000 + i * 500 + Math.sin(now * 0.5) * 100;
      const y = 300 + Math.cos(now * 0.3 + i) * 50;
      
      this.drawSteamCloud(ctx, x, y, 80 + Math.sin(now + i) * 20);
    }
  }
  
  drawSteamCloud(ctx, x, y, size) {
    const now = Date.now() / 1000;
    
    // Create gradient for steam
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = gradient;
    
    // Draw several overlapping circles for cloud effect
    for (let i = 0; i < 5; i++) {
      const offsetX = Math.sin(now * 0.8 + i) * size * 0.2;
      const offsetY = Math.cos(now * 0.7 + i) * size * 0.1;
      const cloudSize = size * (0.6 + Math.sin(now * 0.5 + i * 2) * 0.2);
      
      ctx.beginPath();
      ctx.arc(x + offsetX, y + offsetY, cloudSize, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}