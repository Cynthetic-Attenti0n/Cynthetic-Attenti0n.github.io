export class Collectible {
  constructor(type, x, y, width, height, value, animationFrame, rotationSpeed, rotation, bobHeight, bobSpeed) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.collected = false;
    this.animationFrame = animationFrame || 0;
    this.value = value || 100;
    this.rotationSpeed = rotationSpeed || 0.02;
    this.rotation = rotation || 0;
    this.bobHeight = bobHeight || 5;
    this.bobSpeed = bobSpeed || 1;
    this.initialY = y; // Store for bobbing animation
  }
  
  update(deltaTime) {
    if (!this.collected) {
      // Animate the collectible
      this.animationFrame = (this.animationFrame + 0.1) % 4;
      
      // Bobbing motion
      this.y = this.initialY + Math.sin(Date.now() / (300 / this.bobSpeed)) * this.bobHeight;
      
      // Slow rotation
      this.rotation += this.rotationSpeed;
    }
  }
  
  draw(ctx) {
    if (this.collected) return;
    
    if (this.type === 'fried-chicken') {
      this.drawFriedChicken(ctx);
    }
  }
  
  drawFriedChicken(ctx) {
    // Save context for rotation
    ctx.save();
    ctx.translate(this.x + this.width/2, this.y + this.height/2);
    ctx.rotate(this.rotation);
    
    // Draw fried chicken shadow
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(0, this.height + 5, this.width/2, this.width/4, 0, 0, Math.PI*2);
    ctx.fill();
    
    // Fried chicken body
    ctx.fillStyle = '#e8a238'; // Golden brown color
    ctx.beginPath();
    ctx.ellipse(0, 0, this.width/2 - 2, this.height/2 - 2, 0, 0, Math.PI*2);
    ctx.fill();
    
    // Crispy exterior
    ctx.strokeStyle = '#c17a2f';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, 0, this.width/2 - 2, this.height/2 - 2, 0, 0, Math.PI*2);
    ctx.stroke();
    
    // Highlights/shine on the fried chicken
    ctx.fillStyle = '#ffebb3';
    ctx.beginPath();
    ctx.ellipse(-this.width/6, -this.height/6, this.width/6, this.height/6, 0, 0, Math.PI*2);
    ctx.fill();
    
    // Glow effect for collectibility
    ctx.globalAlpha = 0.3 + Math.sin(Date.now() / 200) * 0.2;
    const glow = ctx.createRadialGradient(
      0, 0, 5,
      0, 0, this.width
    );
    glow.addColorStop(0, 'rgba(255, 200, 0, 0.8)');
    glow.addColorStop(1, 'rgba(255, 200, 0, 0)');
    
    ctx.fillStyle = glow;
    ctx.fillRect(-this.width, -this.height, this.width * 2, this.height * 2);
    ctx.globalAlpha = 1.0;
    
    ctx.restore();
  }
}