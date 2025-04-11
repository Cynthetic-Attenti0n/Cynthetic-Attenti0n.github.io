export class Door {
  constructor(x, y, width, height, type = 'entrance') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type; // 'entrance' or 'exit'
    
    this.isOpen = type === 'entrance'; // Entrance door starts open
    this.animationFrame = 0;
    this.animationTick = 0;
    this.interactionRadius = 30; // How close player needs to be to interact
    
    // Visual properties
    this.colors = {
      entrance: {
        frame: '#3498db',
        door: '#2980b9',
        highlight: '#5dade2'
      },
      exit: {
        frame: '#2ecc71',
        door: '#27ae60',
        highlight: '#58d68d'
      }
    };
    
    // Door animation
    this.openAmount = this.type === 'entrance' ? 1.0 : 0.0;
    this.targetOpenAmount = this.openAmount;
  }
  
  update(deltaTime) {
    // Update door animation
    this.animationTick++;
    if (this.animationTick >= 10) {
      this.animationFrame = (this.animationFrame + 1) % 4;
      this.animationTick = 0;
    }
    
    // Update door open/close animation
    this.openAmount += (this.targetOpenAmount - this.openAmount) * 0.1;
  }
  
  interact() {
    if (this.type === 'exit') {
      this.isOpen = true;
      this.targetOpenAmount = 1.0;
      return true; // Indicate level completion
    }
    return false;
  }
  
  draw(ctx) {
    const colors = this.colors[this.type];
    
    // Door frame
    ctx.fillStyle = colors.frame;
    ctx.fillRect(this.x - 10, this.y - 10, this.width + 20, this.height + 10);
    
    // Door opening (black background)
    ctx.fillStyle = '#111';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Draw the actual door
    ctx.fillStyle = colors.door;
    
    // Calculate door position based on open amount
    const doorWidth = this.width * 0.9;
    const doorOffset = (this.width - doorWidth) / 2;
    const openOffset = doorWidth * this.openAmount;
    
    if (this.type === 'entrance') {
      // Entrance door opens to the left
      ctx.fillRect(this.x + doorOffset - openOffset, this.y, doorWidth, this.height);
    } else {
      // Exit door opens to the right
      ctx.fillRect(this.x + doorOffset + openOffset, this.y, doorWidth, this.height);
    }
    
    // Door handle
    ctx.fillStyle = colors.highlight;
    if (this.type === 'entrance') {
      ctx.fillRect(this.x + this.width - 20 - openOffset, this.y + this.height / 2 - 10, 10, 20);
    } else {
      ctx.fillRect(this.x + 10 + openOffset, this.y + this.height / 2 - 10, 10, 20);
    }
    
    // Door sign
    ctx.fillStyle = 'white';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(
      this.type.toUpperCase(),
      this.x + this.width / 2,
      this.y - 15
    );
    
    // Visual effect for exit door
    if (this.type === 'exit' && !this.isOpen) {
      // Add pulsing effect to attract attention
      const glowSize = 5 + Math.sin(Date.now() / 200) * 3;
      ctx.fillStyle = 'rgba(46, 204, 113, 0.3)';
      ctx.beginPath();
      ctx.arc(
        this.x + this.width / 2,
        this.y + this.height / 2,
        this.width / 2 + glowSize,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  }
}