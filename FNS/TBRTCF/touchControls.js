export class TouchControls {
  constructor() {
    this.buttonSize = 80;
    this.padding = 20;
    this.opacity = 0.4;
    
    // Analog stick properties
    this.analogSize = 120;
    this.analogX = 0;
    this.analogY = 0;
    this.analogBaseX = 0;
    this.analogBaseY = 0;
    this.analogActive = false;
    this.analogID = null;
    this.analogMaxDistance = 50;
    
    // Button states
    this.jumpPressed = false;
    this.actionPressed = false;
    this.jumpTouchID = null;
    this.actionTouchID = null;
    
    this.setupTouchEvents();
  }

  setupTouchEvents() {
    document.addEventListener('touchstart', (e) => {
      const touches = e.changedTouches;
      for (let i = 0; i < touches.length; i++) {
        const touch = touches[i];
        this.handleTouchStart(touch.identifier, touch.clientX, touch.clientY);
      }
    }, { passive: false });

    document.addEventListener('touchmove', (e) => {
      const touches = e.changedTouches;
      for (let i = 0; i < touches.length; i++) {
        const touch = touches[i];
        this.handleTouchMove(touch.identifier, touch.clientX, touch.clientY);
      }
    }, { passive: false });

    document.addEventListener('touchend', (e) => {
      const touches = e.changedTouches;
      for (let i = 0; i < touches.length; i++) {
        const touch = touches[i];
        this.handleTouchEnd(touch.identifier);
      }
    }, { passive: false });
    
    document.addEventListener('touchcancel', (e) => {
      const touches = e.changedTouches;
      for (let i = 0; i < touches.length; i++) {
        const touch = touches[i];
        this.handleTouchEnd(touch.identifier);
      }
    }, { passive: false });
  }

  handleTouchStart(id, x, y) {
    const jumpBtn = this.getJumpButtonBounds();
    const actionBtn = this.getActionButtonBounds();
    const analogZone = this.getAnalogStickZone();
    
    if (this.isPointInRect(x, y, jumpBtn)) {
      this.jumpPressed = true;
      this.jumpTouchID = id;
    } 
    else if (this.isPointInRect(x, y, actionBtn)) {
      this.actionPressed = true;
      this.actionTouchID = id;
    }
    else if (this.isPointInRect(x, y, analogZone) && !this.analogActive) {
      this.analogActive = true;
      this.analogID = id;
      this.analogBaseX = x;
      this.analogBaseY = y;
      this.analogX = 0;
      this.analogY = 0;
    }
  }

  handleTouchMove(id, x, y) {
    if (id === this.analogID && this.analogActive) {
      // Calculate analog stick displacement
      let dx = x - this.analogBaseX;
      let dy = y - this.analogBaseY;
      
      // Calculate distance from analog center
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Normalize if beyond max distance
      if (distance > this.analogMaxDistance) {
        dx = dx / distance * this.analogMaxDistance;
        dy = dy / distance * this.analogMaxDistance;
      }
      
      // Update analog stick position
      this.analogX = dx / this.analogMaxDistance; // -1 to 1
      this.analogY = dy / this.analogMaxDistance; // -1 to 1
    }
  }

  handleTouchEnd(id) {
    if (id === this.jumpTouchID) {
      this.jumpPressed = false;
      this.jumpTouchID = null;
    }
    
    if (id === this.actionTouchID) {
      this.actionPressed = false;
      this.actionTouchID = null;
    }
    
    if (id === this.analogID) {
      this.analogActive = false;
      this.analogID = null;
      this.analogX = 0;
      this.analogY = 0;
    }
  }

  isPointInRect(x, y, rect) {
    return x >= rect.x && x <= rect.x + rect.width &&
           y >= rect.y && y <= rect.y + rect.height;
  }

  getAnalogStickZone() {
    return {
      x: this.padding,
      y: window.innerHeight - this.analogSize - this.padding,
      width: this.analogSize,
      height: this.analogSize
    };
  }

  getJumpButtonBounds() {
    return {
      x: window.innerWidth - this.buttonSize - this.padding,
      y: window.innerHeight - this.buttonSize - this.padding,
      width: this.buttonSize,
      height: this.buttonSize
    };
  }

  getActionButtonBounds() {
    return {
      x: window.innerWidth - this.buttonSize * 2 - this.padding * 2,
      y: window.innerHeight - this.buttonSize - this.padding,
      width: this.buttonSize,
      height: this.buttonSize
    };
  }

  getInput() {
    return {
      analog: this.analogActive ? { x: this.analogX, y: this.analogY } : null,
      jump: this.jumpPressed,
      action: this.actionPressed
    };
  }

  draw(ctx) {
    ctx.save();
    
    // Draw analog stick
    this.drawAnalogStick(ctx);
    
    // Draw action buttons with better styling
    this.drawActionButtons(ctx);
    
    ctx.restore();
  }
  
  drawAnalogStick(ctx) {
    const zone = this.getAnalogStickZone();
    
    // Base circle
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = 'rgba(50, 50, 50, 0.7)';
    ctx.beginPath();
    ctx.arc(
      zone.x + zone.width/2,
      zone.y + zone.height/2,
      zone.width/2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    
    // Draw border
    ctx.globalAlpha = this.opacity + 0.1;
    ctx.strokeStyle = 'rgba(200, 200, 200, 0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw stick
    const stickX = zone.x + zone.width/2 + this.analogX * this.analogMaxDistance;
    const stickY = zone.y + zone.height/2 + this.analogY * this.analogMaxDistance;
    
    // Stick shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.arc(stickX + 2, stickY + 2, zone.width/4, 0, Math.PI * 2);
    ctx.fill();
    
    // Stick
    ctx.fillStyle = this.analogActive ? '#ff9d00' : '#888';
    ctx.beginPath();
    ctx.arc(stickX, stickY, zone.width/4, 0, Math.PI * 2);
    ctx.fill();
    
    // Highlight on stick
    const gradient = ctx.createRadialGradient(
      stickX - 5, stickY - 5, 0,
      stickX, stickY, zone.width/4
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(stickX, stickY, zone.width/4, 0, Math.PI * 2);
    ctx.fill();
  }
  
  drawActionButtons(ctx) {
    const jumpBtn = this.getJumpButtonBounds();
    const actionBtn = this.getActionButtonBounds();
    
    // Draw action button (speed boost)
    this.drawButton(ctx, actionBtn, this.actionPressed, 'A', '#ff6600');
    
    // Draw jump button
    this.drawButton(ctx, jumpBtn, this.jumpPressed, 'B', '#3498db');
  }
  
  drawButton(ctx, bounds, isPressed, label, color) {
    ctx.globalAlpha = this.opacity;
    
    // Button shadow
    if (!isPressed) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.arc(
        bounds.x + bounds.width/2 + 3,
        bounds.y + bounds.height/2 + 3,
        bounds.width/2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
    
    // Button background
    ctx.fillStyle = isPressed ? `${color}aa` : color;
    ctx.beginPath();
    ctx.arc(
      bounds.x + bounds.width/2,
      bounds.y + bounds.height/2,
      bounds.width/2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    
    // Button highlight
    const gradient = ctx.createRadialGradient(
      bounds.x + bounds.width/2 - 10,
      bounds.y + bounds.height/2 - 10,
      0,
      bounds.x + bounds.width/2,
      bounds.y + bounds.height/2,
      bounds.width/2
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(
      bounds.x + bounds.width/2,
      bounds.y + bounds.height/2,
      bounds.width/2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    
    // Button text
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      label,
      bounds.x + bounds.width/2,
      bounds.y + bounds.height/2
    );
  }
}