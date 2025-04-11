export class Obstacle {
  constructor(type, x, y, width, height, damageAmount, bubbleTimer) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.damageAmount = damageAmount;
    this.bubbleTimer = bubbleTimer || 0;
    
    // Animation properties
    this.animationFrame = 0;
    this.animationTick = 0;
  }
  
  update(deltaTime) {
    // Update animation
    this.animationTick++;
    if (this.animationTick >= 8) {
      this.animationFrame = (this.animationFrame + 1) % 4;
      this.animationTick = 0;
    }
    
    // Type-specific updates
    if (this.type === 'fryer' || this.type === 'chicken-fryer') {
      this.bubbleTimer += deltaTime;
    } else if (this.type === 'steam-vent') {
      // Pulsing steam
      this.bubbleTimer += deltaTime;
    }
  }
  
  draw(ctx) {
    switch (this.type) {
      case 'fryer':
        this.drawFryer(ctx);
        break;
      case 'steam-vent':
        this.drawSteamVent(ctx);
        break;
      case 'chicken-fryer':
        this.drawChickenFryer(ctx);
        break;
    }
  }
  
  drawFryer(ctx) {
    // Base container
    ctx.fillStyle = '#777';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Oil
    ctx.fillStyle = '#ffc966';
    ctx.fillRect(this.x + 3, this.y + 3, this.width - 6, this.height - 6);
    
    // Bubbles on surface
    ctx.fillStyle = '#ffe0a3';
    for (let i = 0; i < 10; i++) {
      const bubbleX = this.x + 5 + (this.width - 10) * (i / 10);
      const bubbleY = this.y + 5 + Math.sin(Date.now() / 300 + i) * 3;
      const bubbleSize = 2 + Math.sin(Date.now() / 200 + i * 2) * 2;
      
      ctx.beginPath();
      ctx.arc(bubbleX, bubbleY, bubbleSize, 0, Math.PI*2);
      ctx.fill();
    }
    
    // Warning sign
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.moveTo(this.x + this.width - 15, this.y - 15);
    ctx.lineTo(this.x + this.width, this.y - 15);
    ctx.lineTo(this.x + this.width - 7.5, this.y - 5);
    ctx.closePath();
    ctx.fill();
    
    // Exclamation mark
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('!', this.x + this.width - 7.5, this.y - 8);
  }
  
  drawSteamVent(ctx) {
    // Vent base
    ctx.fillStyle = '#555';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Vent grill
    ctx.fillStyle = '#333';
    const grillCount = 5;
    const grillWidth = this.width / grillCount;
    
    for (let i = 0; i < grillCount; i++) {
      ctx.fillRect(this.x + i * grillWidth, this.y, grillWidth - 2, this.height);
    }
    
    // Steam effect
    const steamActive = Math.sin(this.bubbleTimer / 20) > 0;
    if (steamActive) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      
      for (let i = 0; i < 3; i++) {
        const offsetX = (i - 1) * 10;
        const height = 20 + i * 10 + Math.sin(this.bubbleTimer / 10) * 5;
        
        ctx.beginPath();
        ctx.moveTo(this.x + this.width/2 + offsetX - 10, this.y);
        ctx.lineTo(this.x + this.width/2 + offsetX + 10, this.y);
        ctx.lineTo(this.x + this.width/2 + offsetX + 15, this.y - height);
        ctx.lineTo(this.x + this.width/2 + offsetX - 15, this.y - height);
        ctx.closePath();
        ctx.fill();
      }
    }
  }
  
  drawChickenFryer(ctx) {
    // Large fryer machine
    // Main body
    ctx.fillStyle = '#999';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Top opening
    ctx.fillStyle = '#ffc966';
    ctx.fillRect(this.x + 10, this.y, this.width - 20, 20);
    
    // Front panel with controls
    ctx.fillStyle = '#777';
    ctx.fillRect(this.x + 5, this.y + 25, this.width - 10, this.height - 30);
    
    // Control buttons and display
    ctx.fillStyle = '#333';
    ctx.fillRect(this.x + 15, this.y + 35, this.width - 30, 15);
    
    // Button lights
    const colors = ['#ff0000', '#00ff00', '#0000ff'];
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = colors[i];
      ctx.beginPath();
      ctx.arc(this.x + 20 + i * 20, this.y + 65, 5, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Bubbling oil effect at top
    ctx.fillStyle = '#ffe0a3';
    for (let i = 0; i < 8; i++) {
      const bubbleX = this.x + 15 + (this.width - 30) * (i / 8);
      const bubbleY = this.y + 10;
      const bubbleSize = 2 + Math.sin(Date.now() / 200 + i * 3) * 2;
      
      ctx.beginPath();
      ctx.arc(bubbleX, bubbleY, bubbleSize, 0, Math.PI*2);
      ctx.fill();
    }
    
    // Warning sign
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.moveTo(this.x + this.width - 15, this.y - 15);
    ctx.lineTo(this.x + this.width, this.y - 15);
    ctx.lineTo(this.x + this.width - 7.5, this.y - 5);
    ctx.closePath();
    ctx.fill();
    
    // Danger text
    ctx.fillStyle = '#ff0000';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('DANGER', this.x + this.width/2, this.y + 55);
  }
}