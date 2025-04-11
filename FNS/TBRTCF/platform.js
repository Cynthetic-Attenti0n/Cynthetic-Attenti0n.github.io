export class Platform {
  constructor(x, y, width, height, type = 'normal') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type; // normal, conveyor, bounce, crumble, etc.
    this.animationFrame = 0;
    this.animationTick = 0;
    
    // For conveyor belts
    this.direction = 1; // 1 = right, -1 = left
    this.speed = 2;
    
    // For bounce platforms
    this.bounceForce = 25;
    
    // For crumbling platforms
    this.isCrumbling = false;
    this.crumbleTimer = 0;
    this.crumbleDuration = 60; // frames before disappearing
    this.respawnTimer = 0;
    this.respawnDuration = 180; // frames before respawning
    
    // For moving platforms
    this.isMoving = false;
    this.moveSpeed = 1;
    this.moveDistance = 200;
    this.initialX = x;
    this.initialY = y;
    this.movementProgress = 0;
    this.movementDirection = 1; // 1 = forward, -1 = backward
    
    // Set specific properties based on type
    this.initializeType();
  }
  
  initializeType() {
    switch(this.type) {
      case 'conveyor-left':
        this.direction = -1;
        this.speed = 2;
        break;
      case 'conveyor-right':
        this.direction = 1;
        this.speed = 2;
        break;
      case 'bounce':
        // No additional initialization needed
        break;
      case 'crumble':
        this.height = Math.max(20, this.height); // Ensure minimum height
        break;
      case 'moving-horizontal':
        this.isMoving = true;
        this.moveDistance = 200;
        break;
      case 'moving-vertical':
        this.isMoving = true;
        this.moveDistance = 100;
        this.vertical = true;
        break;
    }
  }

  update() {
    // Animation tick for all platform types
    this.animationTick++;
    if (this.animationTick >= 10) {
      this.animationFrame = (this.animationFrame + 1) % 4;
      this.animationTick = 0;
    }
    
    // Handle crumbling platforms
    if (this.type === 'crumble' && this.isCrumbling) {
      this.crumbleTimer++;
      if (this.crumbleTimer >= this.crumbleDuration) {
        this.crumbleTimer = 0;
        this.isCrumbling = false;
        this.respawnTimer = 0;
      }
    }
    
    // Handle respawning of crumbled platforms
    if (this.type === 'crumble' && !this.isCrumbling && this.respawnTimer > 0) {
      this.respawnTimer++;
      if (this.respawnTimer >= this.respawnDuration) {
        this.respawnTimer = 0;
      }
    }
    
    // Handle moving platforms
    if (this.isMoving) {
      this.movementProgress += this.moveSpeed * this.movementDirection;
      
      // Reverse direction if reached end of movement
      if (this.movementProgress >= this.moveDistance || this.movementProgress <= 0) {
        this.movementDirection *= -1;
      }
      
      // Update position
      if (this.vertical) {
        this.y = this.initialY + this.movementProgress;
      } else {
        this.x = this.initialX + this.movementProgress;
      }
    }
  }
  
  triggerCrumble() {
    if (this.type === 'crumble' && !this.isCrumbling && this.respawnTimer === 0) {
      this.isCrumbling = true;
      this.crumbleTimer = 0;
    }
  }
  
  applyEffect(player) {
    switch(this.type) {
      case 'conveyor-left':
      case 'conveyor-right':
        // Add velocity to player when standing on conveyor
        player.x += this.direction * this.speed;
        break;
        
      case 'bounce':
        // Give player an upward boost
        player.velocityY = -this.bounceForce;
        player.isJumping = true;
        break;
        
      case 'crumble':
        // Start crumbling when player stands on it
        this.triggerCrumble();
        break;
    }
  }
  
  isVisible() {
    // For crumble platforms that are in respawn state
    if (this.type === 'crumble') {
      if (this.isCrumbling && this.crumbleTimer > this.crumbleDuration * 0.7) {
        return false;
      }
      if (!this.isCrumbling && this.respawnTimer > 0) {
        return false;
      }
    }
    return true;
  }

  draw(ctx) {
    // Don't draw if not visible (e.g., crumbled platforms)
    if (!this.isVisible()) {
      return;
    }
    
    // Draw platform shadow
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(
      this.x + this.width/2,
      1000,
      this.width/2,
      this.width/8,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
    
    // Draw based on platform type
    switch(this.type) {
      case 'conveyor-left':
      case 'conveyor-right':
        this.drawConveyor(ctx);
        break;
      case 'bounce':
        this.drawBounce(ctx);
        break;
      case 'crumble':
        this.drawCrumble(ctx);
        break;
      case 'moving-horizontal':
      case 'moving-vertical':
        this.drawMoving(ctx);
        break;
      default:
        this.drawNormal(ctx);
        break;
    }
  }
  
  drawNormal(ctx) {
    // Factory floor tile style
    const baseColor = '#555555';
    const highlightColor = '#777777';
    const shadowColor = '#333333';
    
    // Main platform body
    ctx.fillStyle = baseColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Top edge
    ctx.fillStyle = highlightColor;
    ctx.fillRect(this.x, this.y, this.width, 5);
    
    // Side edge
    ctx.fillStyle = shadowColor;
    ctx.fillRect(this.x + this.width - 5, this.y, 5, this.height);
    
    // Add tile pattern
    const tileSize = 20;
    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.lineWidth = 1;
    
    for (let x = this.x; x < this.x + this.width; x += tileSize) {
      for (let y = this.y; y < this.y + this.height; y += tileSize) {
        ctx.strokeRect(x, y, tileSize, tileSize);
      }
    }
  }
  
  drawConveyor(ctx) {
    const baseColor = '#888888';
    const rollerColor = '#666666';
    const arrowColor = this.direction > 0 ? '#ffcc00' : '#ff6600';
    
    // Main platform body
    ctx.fillStyle = baseColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Conveyor belt rollers
    const rollerSpacing = 20;
    const rollerOffset = (this.animationFrame / 4) * rollerSpacing * this.direction;
    
    ctx.fillStyle = rollerColor;
    for (let x = this.x - rollerSpacing + rollerOffset; x < this.x + this.width + rollerSpacing; x += rollerSpacing) {
      ctx.fillRect(x, this.y, 10, this.height);
    }
    
    // Direction arrows
    ctx.fillStyle = arrowColor;
    const arrowSize = 10;
    const arrowSpacing = 40;
    
    for (let x = this.x + 15; x < this.x + this.width - 15; x += arrowSpacing) {
      ctx.beginPath();
      if (this.direction > 0) {
        // Right arrow
        ctx.moveTo(x, this.y + this.height / 2);
        ctx.lineTo(x + arrowSize, this.y + this.height / 2 - arrowSize / 2);
        ctx.lineTo(x + arrowSize, this.y + this.height / 2 + arrowSize / 2);
      } else {
        // Left arrow
        ctx.moveTo(x + arrowSize, this.y + this.height / 2);
        ctx.lineTo(x, this.y + this.height / 2 - arrowSize / 2);
        ctx.lineTo(x, this.y + this.height / 2 + arrowSize / 2);
      }
      ctx.fill();
    }
  }
  
  drawBounce(ctx) {
    // Spring-loaded platform
    const baseColor = '#ff6600';
    const springColor = '#ffcc00';
    
    // Base
    ctx.fillStyle = baseColor;
    ctx.fillRect(this.x, this.y + 5, this.width, this.height - 5);
    
    // Springs - animation based on frame
    const springCompression = Math.abs(Math.sin(this.animationFrame / 4 * Math.PI)) * 5;
    
    ctx.fillStyle = springColor;
    const springWidth = 15;
    const springSpacing = 40;
    
    for (let x = this.x + springSpacing/2; x < this.x + this.width - springWidth; x += springSpacing) {
      // Draw spring coils
      ctx.fillRect(x, this.y + springCompression, springWidth, 5);
      ctx.fillRect(x + 2, this.y + springCompression + 8, springWidth - 4, 3);
      ctx.fillRect(x, this.y + springCompression + 14, springWidth, 3);
    }
    
    // Top pad
    ctx.fillStyle = '#ff9900';
    ctx.fillRect(this.x, this.y - 3 + springCompression, this.width, 8);
  }
  
  drawCrumble(ctx) {
    // Determine alpha based on crumble state
    let alpha = 1.0;
    
    if (this.isCrumbling) {
      alpha = 1 - (this.crumbleTimer / this.crumbleDuration);
    } else if (this.respawnTimer > 0) {
      alpha = this.respawnTimer / this.respawnDuration;
    }
    
    // Cracked platform
    const baseColor = `rgba(160, 82, 45, ${alpha})`;
    const crackColor = `rgba(101, 67, 33, ${alpha})`;
    
    // Base
    ctx.fillStyle = baseColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Cracks
    ctx.strokeStyle = crackColor;
    ctx.lineWidth = 2;
    
    // Draw random cracks
    const seed = this.x * this.y; // Use position as seed for consistent random cracks
    const random = (min, max) => {
      const x = Math.sin(seed + this.crumbleTimer) * 10000;
      return min + (x - Math.floor(x)) * (max - min);
    };
    
    ctx.beginPath();
    let startX = this.x + this.width / 3;
    let startY = this.y;
    ctx.moveTo(startX, startY);
    
    // First crack
    for (let i = 0; i < 4; i++) {
      startX += random(-15, 15);
      startY += this.height / 4;
      ctx.lineTo(startX, startY);
    }
    ctx.stroke();
    
    // Second crack
    ctx.beginPath();
    startX = this.x + this.width * 2 / 3;
    startY = this.y;
    ctx.moveTo(startX, startY);
    
    for (let i = 0; i < 4; i++) {
      startX += random(-15, 15);
      startY += this.height / 4;
      ctx.lineTo(startX, startY);
    }
    ctx.stroke();
    
    // Add shaking if crumbling
    if (this.isCrumbling) {
      const shakeAmount = this.crumbleTimer / 4;
      ctx.translate(random(-shakeAmount, shakeAmount), random(-shakeAmount, shakeAmount));
    }
  }
  
  drawMoving(ctx) {
    // Moving platform with machinery look
    const baseColor = '#3498db';
    const edgeColor = '#2980b9';
    const detailColor = '#1f618d';
    
    // Main platform body
    ctx.fillStyle = baseColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Top edge
    ctx.fillStyle = edgeColor;
    ctx.fillRect(this.x, this.y, this.width, 5);
    
    // Side edge
    ctx.fillRect(this.x + this.width - 5, this.y, 5, this.height);
    
    // Mechanical details (gears, pistons, etc.)
    ctx.fillStyle = detailColor;
    
    // Draw bolts in corners
    const boltSize = 5;
    const boltInset = 5;
    ctx.fillRect(this.x + boltInset, this.y + boltInset, boltSize, boltSize);
    ctx.fillRect(this.x + this.width - boltInset - boltSize, this.y + boltInset, boltSize, boltSize);
    ctx.fillRect(this.x + boltInset, this.y + this.height - boltInset - boltSize, boltSize, boltSize);
    ctx.fillRect(this.x + this.width - boltInset - boltSize, this.y + this.height - boltInset - boltSize, boltSize, boltSize);
    
    // Draw movement indicators
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    if (this.vertical) {
      // Vertical movement indicators
      const arrowX = this.x + this.width / 2;
      const arrowSize = 10;
      
      ctx.moveTo(arrowX, this.y + 15);
      ctx.lineTo(arrowX - arrowSize / 2, this.y + 15 + arrowSize);
      ctx.lineTo(arrowX + arrowSize / 2, this.y + 15 + arrowSize);
      ctx.lineTo(arrowX, this.y + 15);
      
      ctx.moveTo(arrowX, this.y + this.height - 15);
      ctx.lineTo(arrowX - arrowSize / 2, this.y + this.height - 15 - arrowSize);
      ctx.lineTo(arrowX + arrowSize / 2, this.y + this.height - 15 - arrowSize);
      ctx.lineTo(arrowX, this.y + this.height - 15);
    } else {
      // Horizontal movement indicators
      const arrowY = this.y + this.height / 2;
      const arrowSize = 10;
      
      ctx.moveTo(this.x + 15, arrowY);
      ctx.lineTo(this.x + 15 + arrowSize, arrowY - arrowSize / 2);
      ctx.lineTo(this.x + 15 + arrowSize, arrowY + arrowSize / 2);
      ctx.lineTo(this.x + 15, arrowY);
      
      ctx.moveTo(this.x + this.width - 15, arrowY);
      ctx.lineTo(this.x + this.width - 15 - arrowSize, arrowY - arrowSize / 2);
      ctx.lineTo(this.x + this.width - 15 - arrowSize, arrowY + arrowSize / 2);
      ctx.lineTo(this.x + this.width - 15, arrowY);
    }
    
    ctx.stroke();
  }
}