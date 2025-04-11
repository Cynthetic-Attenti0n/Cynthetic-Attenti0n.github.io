export class Player {
  constructor(x, y) {
    this.initialX = x;
    this.initialY = y;
    this.x = x;
    this.y = y;
    this.baseWidth = 60;
    this.baseHeight = 80;
    this.width = this.baseWidth;
    this.height = this.baseHeight;
    this.velocityX = 0;
    this.velocityY = 0;
    this.speed = 5;
    this.jumpForce = 15;
    this.maxJumpForce = 20;
    this.gravity = 0.8;
    this.isJumping = false;
    this.facingRight = true;
    this.state = 'idle'; // idle, running, jumping, falling
    this.animationFrame = 0;
    this.animationTick = 0;
    this.chickenCount = 0;
    
    // Sprites
    this.sprites = {
      walking: null,
      jumping: null
    };
    
    // Size and growth mechanics
    this.sizeMultiplier = 1.0;
    this.targetSizeMultiplier = 1.0;
    this.maxSizeMultiplier = 2.0;
    this.sizeDecayRate = 0.0001; // How quickly size decreases over time
    this.sizeIncreasePerChicken = 0.1; // 10% size increase per chicken
    
    // Animation frames for each state
    this.animations = {
      idle: { frames: 4, speed: 10 },
      running: { frames: 4, speed: 8 },
      jumping: { frames: 4, speed: 10 },
      falling: { frames: 4, speed: 10 }
    };

    // Speed boost for charging through obstacles
    this.hasSpeedBoost = false;
    this.speedBoostTimer = 0;
    this.speedBoostDuration = 120; // 2 seconds at 60fps
    
    // Invulnerability after getting hit
    this.isInvulnerable = false;
    this.invulnerabilityTimer = 0;
    this.invulnerabilityDuration = 90; // 1.5 seconds at 60fps
    
    // Health
    this.maxHealth = 3;
    this.health = this.maxHealth;
    
    // Score bonuses
    this.scoreMultiplier = 1.0;
  }

  loadSprites(walkingSprite, jumpingSprite) {
    this.sprites.walking = walkingSprite;
    this.sprites.jumping = jumpingSprite;
  }

  respawn() {
    // Reset position to initial spawn point
    this.x = this.initialX;
    this.y = this.initialY;
    // Reset velocities
    this.velocityX = 0;
    this.velocityY = 0;
    this.isJumping = false;
    // Reset state
    this.state = 'idle';
    this.facingRight = true;
    
    // Reduce size as penalty
    this.targetSizeMultiplier = Math.max(1.0, this.targetSizeMultiplier - 0.2);
    
    // Give temporary invulnerability
    this.setInvulnerable(true);
  }

  setInvulnerable(value) {
    this.isInvulnerable = value;
    if (value) {
      this.invulnerabilityTimer = this.invulnerabilityDuration;
    }
  }
  
  activateSpeedBoost() {
    this.hasSpeedBoost = true;
    this.speedBoostTimer = this.speedBoostDuration;
  }

  takeDamage() {
    if (!this.isInvulnerable) {
      this.health--;
      // Decrease size when taking damage
      this.targetSizeMultiplier = Math.max(1.0, this.targetSizeMultiplier - 0.15);
      
      if (this.health <= 0) {
        // Handle death
        this.health = this.maxHealth;
        this.respawn();
      } else {
        this.setInvulnerable(true);
      }
      return true;
    }
    return false;
  }

  moveLeft(strength = 1) {
    const baseSpeed = this.hasSpeedBoost ? this.speed * 1.5 : this.speed;
    // Scale speed by size - bigger = slightly slower
    const sizeAdjustedSpeed = baseSpeed * (1 - (this.sizeMultiplier - 1) * 0.2);
    this.velocityX = -sizeAdjustedSpeed * strength;
    this.facingRight = false;
    if (this.isOnGround && this.state !== 'running') {
      this.state = 'running';
      this.animationFrame = 0;
    }
  }

  moveRight(strength = 1) {
    const baseSpeed = this.hasSpeedBoost ? this.speed * 1.5 : this.speed;
    // Scale speed by size - bigger = slightly slower
    const sizeAdjustedSpeed = baseSpeed * (1 - (this.sizeMultiplier - 1) * 0.2);
    this.velocityX = sizeAdjustedSpeed * strength;
    this.facingRight = true;
    if (this.isOnGround && this.state !== 'running') {
      this.state = 'running';
      this.animationFrame = 0;
    }
  }

  jump(strength = 1) {
    if (!this.isJumping) {
      // Jump force increases with size
      const sizeAdjustedJumpForce = this.jumpForce * (1 + (this.sizeMultiplier - 1) * 0.3);
      this.velocityY = -sizeAdjustedJumpForce * Math.min(strength, 1);
      this.isJumping = true;
      this.state = 'jumping';
      this.animationFrame = 0;
    }
  }

  update() {
    // Apply gravity
    this.velocityY += this.gravity;
    
    // Update position
    this.x += this.velocityX;
    this.y += this.velocityY;
    
    // Apply friction
    this.velocityX *= 0.9;
    
    // Update animation
    this.animationTick++;
    if (this.animationTick >= this.animations[this.state].speed) {
      this.animationFrame = (this.animationFrame + 1) % this.animations[this.state].frames;
      this.animationTick = 0;
    }
    
    // Update state based on velocity
    if (this.isJumping) {
      if (this.velocityY > 0) {
        this.state = 'falling';
      } else {
        this.state = 'jumping';
      }
    } else if (Math.abs(this.velocityX) > 0.5) {
      this.state = 'running';
    } else {
      this.state = 'idle';
    }
    
    // Update invulnerability
    if (this.isInvulnerable) {
      this.invulnerabilityTimer--;
      if (this.invulnerabilityTimer <= 0) {
        this.isInvulnerable = false;
      }
    }
    
    // Update speed boost
    if (this.hasSpeedBoost) {
      this.speedBoostTimer--;
      if (this.speedBoostTimer <= 0) {
        this.hasSpeedBoost = false;
      }
    }
    
    // Check if player fell too far - trigger respawn
    if (this.y > 1200) {
      this.health = Math.max(0, this.health - 1);
      this.respawn();
    }
    
    // Update size
    this.sizeMultiplier += (this.targetSizeMultiplier - this.sizeMultiplier) * 0.1;
    
    // Apply gradual size decay
    this.targetSizeMultiplier = Math.max(1.0, this.targetSizeMultiplier - this.sizeDecayRate);
    
    // Update actual width and height based on size multiplier
    this.width = this.baseWidth * this.sizeMultiplier;
    this.height = this.baseHeight * this.sizeMultiplier;
    
    // Score multiplier based on size
    this.scoreMultiplier = 1 + (this.sizeMultiplier - 1) * 0.5; // Up to 50% more score when at max size
    
    // Reset jumping state when landing
    this.isOnGround = false;
  }

  checkCollision(platform) {
    return (
      this.x < platform.x + platform.width &&
      this.x + this.width > platform.x &&
      this.y < platform.y + platform.height &&
      this.y + this.height > platform.y
    );
  }

  handleCollision(platform) {
    // Calculate overlap on each axis
    const overlapX = Math.min(
      Math.abs((this.x + this.width) - platform.x),
      Math.abs(this.x - (platform.x + platform.width))
    );

    const overlapY = Math.min(
      Math.abs((this.y + this.height) - platform.y),
      Math.abs(this.y - (platform.y + platform.height))
    );

    // Resolve collision on axis with smallest overlap
    if (overlapX < overlapY) {
      // Horizontal collision
      if (this.x < platform.x) {
        this.x = platform.x - this.width;
      } else {
        this.x = platform.x + platform.width;
      }
      this.velocityX = 0;
    } else {
      // Vertical collision  
      if (this.y < platform.y) {
        this.y = platform.y - this.height;
        this.velocityY = 0;
        this.isJumping = false;
        this.isOnGround = true;
      } else {
        this.y = platform.y + platform.height;
        this.velocityY = 0;
      }
    }
  }

  collectChicken() {
    this.chickenCount++;
    
    // Increase size when collecting chicken
    this.targetSizeMultiplier = Math.min(
      this.maxSizeMultiplier, 
      this.targetSizeMultiplier + this.sizeIncreasePerChicken
    );
    
    // Could trigger a sound effect or visual effect here
    return this.chickenCount;
  }

  draw(ctx) {
    // Don't render player during certain invulnerability frames for flashing effect
    if (this.isInvulnerable && Math.floor(this.invulnerabilityTimer / 5) % 2 === 0) {
      return;
    }
    
    // Draw pseudo-3D shadow
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(
      this.x + this.width/2,
      1000,
      this.width/2,
      this.width/4,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Save context for transformations
    ctx.save();
    
    // For flipping the character when facing left
    if (!this.facingRight) {
      ctx.translate(this.x + this.width, this.y);
      ctx.scale(-1, 1);
    } else {
      ctx.translate(this.x, this.y);
    }

    // Draw sprite based on state
    this.drawSprite(ctx, 0, 0, this.state, this.animationFrame);
    
    // Speed boost effect
    if (this.hasSpeedBoost) {
      this.drawSpeedBoostEffect(ctx, 0, 0);
    }
    
    ctx.restore();
  }
  
  drawSprite(ctx, x, y, state, frame) {
    if (!this.sprites.walking || !this.sprites.jumping) {
      // Fallback to drawn character if sprites not loaded
      this.drawCharacter(ctx, x, y, state, frame);
      return;
    }
    
    const frameIndex = Math.floor(frame);
    const sprite = (state === 'jumping' || state === 'falling') ? 
                    this.sprites.jumping : this.sprites.walking;
    
    const spriteWidth = sprite.width / 4; // 4 frames per sprite sheet
    const spriteHeight = sprite.height;
    
    try {
      // Draw the character from sprite sheet
      ctx.drawImage(
        sprite,
        frameIndex * spriteWidth,     // source x
        0,                            // source y
        spriteWidth,                  // source width
        spriteHeight,                 // source height
        0,                            // dest x
        0,                            // dest y
        this.width,                   // dest width
        this.height                   // dest height
      );
      
      // Draw size indicator
      if (this.sizeMultiplier > 1.1) {
        this.drawSizeEffect(ctx, this.width/2, this.height/2);
      }
    } catch (e) {
      console.error("Error drawing sprite:", e);
      this.drawCharacter(ctx, x, y, state, frame);
    }
  }
  
  drawSizeEffect(ctx, x, y) {
    // Add visual effect showing powerful size
    ctx.globalAlpha = 0.2 + Math.sin(Date.now() / 200) * 0.1;
    const gradient = ctx.createRadialGradient(
      x, y, 0,
      x, y, this.width * 0.7
    );
    gradient.addColorStop(0, '#ffcc00');
    gradient.addColorStop(1, 'rgba(255, 204, 0, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, this.width * 0.7, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1.0;
  }
  
  drawCharacter(ctx, x, y, state, frame) {
    // Fallback character drawing code - kept as backup
    const bodyColor = '#ff9d00'; // Orange body
    const outlineColor = '#d43a12'; // Darker orange outline
    const faceColor = '#fff8e7'; // Light cream face
    
    // Draw body
    ctx.fillStyle = bodyColor;
    ctx.strokeStyle = outlineColor;
    ctx.lineWidth = 3;
    
    // Body shape changes slightly based on state
    if (state === 'jumping' || state === 'falling') {
      // Squished while jumping/falling
      ctx.beginPath();
      ctx.ellipse(x + this.width/2, y + this.height/2, this.width/2, this.height/2 - 5, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.stroke();
    } else if (state === 'running') {
      // Bouncy while running - use frame for bouncing effect
      const bounceOffset = Math.sin(frame / this.animations.running.frames * Math.PI * 2) * 3;
      ctx.beginPath();
      ctx.ellipse(x + this.width/2, y + this.height/2 + bounceOffset, this.width/2, this.height/2, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.stroke();
    } else {
      // Normal round body for idle
      ctx.beginPath();
      ctx.ellipse(x + this.width/2, y + this.height/2, this.width/2, this.height/2, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.stroke();
      
      // Slight breathing animation when idle
      if (frame % 2 === 0) {
        ctx.beginPath();
        ctx.ellipse(x + this.width/2, y + this.height/2 + 2, this.width/2 - 3, this.height/2 - 3, 0, 0, Math.PI*2);
        ctx.fillStyle = bodyColor;
        ctx.fill();
      }
    }
    
    // Face details
    // Face
    ctx.fillStyle = faceColor;
    ctx.beginPath();
    ctx.ellipse(x + this.width/2 + 5, y + this.height/2 - 5, this.width/3, this.height/3, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.stroke();
    
    // Eyes
    ctx.fillStyle = '#000';
    
    // Different eye expressions based on state
    if (state === 'jumping') {
      // Determined eyes when jumping
      ctx.beginPath();
      ctx.ellipse(x + this.width/2 + 10, y + this.height/2 - 10, 4, 6, 0, 0, Math.PI*2);
      ctx.fill();
    } else if (state === 'falling') {
      // Worried eyes when falling
      ctx.beginPath();
      ctx.ellipse(x + this.width/2 + 10, y + this.height/2 - 8, 4, 6, 0, 0, Math.PI*2);
      ctx.fill();
    } else {
      // Normal eyes
      ctx.beginPath();
      ctx.ellipse(x + this.width/2 + 10, y + this.height/2 - 10, 5, 5, 0, 0, Math.PI*2);
      ctx.fill();
    }
    
    // Mouth varies by state
    if (state === 'jumping') {
      // Determined mouth
      ctx.beginPath();
      ctx.moveTo(x + this.width/2 - 5, y + this.height/2 + 5);
      ctx.lineTo(x + this.width/2 + 15, y + this.height/2 + 5);
      ctx.stroke();
    } else if (state === 'falling') {
      // Worried mouth
      ctx.beginPath();
      ctx.arc(x + this.width/2 + 5, y + this.height/2 + 10, 5, 0, Math.PI, false);
      ctx.stroke();
    } else if (state === 'running') {
      // Happy mouth when running
      ctx.beginPath();
      ctx.arc(x + this.width/2 + 5, y + this.height/2 + 5, 5, 0, Math.PI, false);
      ctx.fill();
    } else {
      // Neutral/slightly happy mouth when idle
      ctx.beginPath();
      ctx.arc(x + this.width/2 + 5, y + this.height/2 + 5, 4, 0, Math.PI, false);
      ctx.stroke();
    }
    
    // Arms and legs change based on animation state
    this.drawLimbs(ctx, x, y, state, frame);
  }
  
  drawLimbs(ctx, x, y, state, frame) {
    ctx.strokeStyle = '#d43a12';
    ctx.lineWidth = 4;
    
    if (state === 'running') {
      // Running animation for arms and legs
      const legOffset = Math.cos(frame / this.animations.running.frames * Math.PI * 2);
      const armOffset = -legOffset; // Arms and legs alternate
      
      // Legs
      ctx.beginPath();
      ctx.moveTo(x + this.width/2 - 10, y + this.height - 20);
      ctx.lineTo(x + this.width/2 - 15, y + this.height + 5 + legOffset * 10);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(x + this.width/2 + 10, y + this.height - 20);
      ctx.lineTo(x + this.width/2 + 15, y + this.height + 5 - legOffset * 10);
      ctx.stroke();
      
      // Arms
      ctx.beginPath();
      ctx.moveTo(x + this.width/2 - 15, y + this.height/2);
      ctx.lineTo(x + this.width/2 - 25, y + this.height/2 + 15 + armOffset * 10);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(x + this.width/2 + 15, y + this.height/2);
      ctx.lineTo(x + this.width/2 + 25, y + this.height/2 + 15 - armOffset * 10);
      ctx.stroke();
    } else if (state === 'jumping') {
      // Jumping pose
      // Arms raised
      ctx.beginPath();
      ctx.moveTo(x + this.width/2 - 15, y + this.height/2);
      ctx.lineTo(x + this.width/2 - 25, y + this.height/2 - 15);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(x + this.width/2 + 15, y + this.height/2);
      ctx.lineTo(x + this.width/2 + 25, y + this.height/2 - 15);
      ctx.stroke();
      
      // Legs tucked in
      ctx.beginPath();
      ctx.moveTo(x + this.width/2 - 10, y + this.height - 20);
      ctx.lineTo(x + this.width/2 - 15, y + this.height - 5);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(x + this.width/2 + 10, y + this.height - 20);
      ctx.lineTo(x + this.width/2 + 15, y + this.height - 5);
      ctx.stroke();
    } else if (state === 'falling') {
      // Falling pose
      // Arms flailing
      ctx.beginPath();
      ctx.moveTo(x + this.width/2 - 15, y + this.height/2);
      ctx.lineTo(x + this.width/2 - 25, y + this.height/2 + 20);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(x + this.width/2 + 15, y + this.height/2);
      ctx.lineTo(x + this.width/2 + 25, y + this.height/2 + 20);
      ctx.stroke();
      
      // Legs kicking
      ctx.beginPath();
      ctx.moveTo(x + this.width/2 - 10, y + this.height - 20);
      ctx.lineTo(x + this.width/2 - 20, y + this.height + 5);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(x + this.width/2 + 10, y + this.height - 20);
      ctx.lineTo(x + this.width/2 + 20, y + this.height + 5);
      ctx.stroke();
    } else {
      // Idle pose
      // Slight arm and leg movement for idle breathing
      const idleOffset = Math.sin(frame / this.animations.idle.frames * Math.PI) * 2;
      
      // Arms
      ctx.beginPath();
      ctx.moveTo(x + this.width/2 - 15, y + this.height/2);
      ctx.lineTo(x + this.width/2 - 25, y + this.height/2 + 10 + idleOffset);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(x + this.width/2 + 15, y + this.height/2);
      ctx.lineTo(x + this.width/2 + 25, y + this.height/2 + 10 + idleOffset);
      ctx.stroke();
      
      // Legs
      ctx.beginPath();
      ctx.moveTo(x + this.width/2 - 10, y + this.height - 20);
      ctx.lineTo(x + this.width/2 - 15, y + this.height + 5);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(x + this.width/2 + 10, y + this.height - 20);
      ctx.lineTo(x + this.width/2 + 15, y + this.height + 5);
      ctx.stroke();
    }
  }
  
  drawSpeedBoostEffect(ctx, x, y) {
    // Draw motion trail/flames behind the character when speed boost is active
    ctx.globalAlpha = 0.6;
    
    for (let i = 0; i < 5; i++) {
      const size = (5 - i) * 5;
      const offset = i * 10;
      
      ctx.fillStyle = i % 2 === 0 ? '#ff6600' : '#ffcc00';
      
      // Direction depends on which way we're facing
      const xOffset = this.facingRight ? -offset : offset;
      
      ctx.beginPath();
      ctx.ellipse(
        x + this.width/2 + xOffset, 
        y + this.height/2,
        size,
        size * 1.5,
        0, 
        0, 
        Math.PI * 2
      );
      ctx.fill();
    }
    
    ctx.globalAlpha = 1.0;
  }
}