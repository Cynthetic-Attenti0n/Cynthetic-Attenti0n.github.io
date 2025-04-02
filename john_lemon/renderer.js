export class CanvasRenderer {
  constructor(element, engine, Matter, options = {}) {
    this.engine = engine;
    this.Matter = Matter;
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d', {
      alpha: false,
      desynchronized: true
    });
    
    this.options = {
      width: options.width || window.innerWidth,
      height: options.height || window.innerHeight,
      background: options.background || '#f0f0f0',
      pixelRatio: options.pixelRatio || window.devicePixelRatio || 1,
      optimizeShadows: options.optimizeShadows || false,
      batchDrawing: options.batchDrawing || false
    };
    
    element.appendChild(this.canvas);
    this.setSize();

    this.isMouseDown = false;
    this.vertexPool = new Float32Array(1000 * 2); // Pool for vertex coordinates
    this.staticBodies = new Set(); // Cache static bodies
    
    this.canvas.addEventListener('mousedown', () => this.isMouseDown = true);
    this.canvas.addEventListener('mouseup', () => this.isMouseDown = false);
    this.canvas.addEventListener('mouseleave', () => this.isMouseDown = false);
  }

  setSize() {
    const { width, height, pixelRatio } = this.options;
    this.canvas.width = width * pixelRatio;
    this.canvas.height = height * pixelRatio;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.context.scale(pixelRatio, pixelRatio);

    if (this.mouseConstraint) {
      this.mouseConstraint.mouse.pixelRatio = pixelRatio;
      this.mouseConstraint.mouse.element = this.canvas;
    }
  }

  render() {
    const { context: ctx } = this;
    const bodies = this.Matter.Composite.allBodies(this.engine.world);

    // Clear canvas with background
    ctx.fillStyle = this.options.background;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.save();
    
    bodies.forEach(body => {
      if (!body.render.visible) return;

      const vertices = body.vertices;
      ctx.beginPath();
      
      // Draw shape outline
      ctx.moveTo(vertices[0].x, vertices[0].y);
      for (let j = 1; j < vertices.length; j++) {
        ctx.lineTo(vertices[j].x, vertices[j].y);
      }
      ctx.lineTo(vertices[0].x, vertices[0].y);
      
      if (body.render.sprite && body.render.sprite.texture) {
        // Save context for rotation
        ctx.save();
        
        // Move to body position
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);
        
        // Draw image
        const sprite = body.render.sprite;
        const width = sprite.texture.width * sprite.xScale;
        const height = sprite.texture.height * sprite.yScale;
        ctx.drawImage(sprite.texture, -width/2, -height/2, width, height);
        
        ctx.restore();
      } else {
        // Use regular fill if no sprite
        ctx.fillStyle = body.render.fillStyle || '#ffffff';
        ctx.fill();
      }
      
      // Draw outline
      ctx.strokeStyle = 'rgba(0,0,0,0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    ctx.restore();

    // Enhanced mouse constraint visualization with spring effect
    if (this.mouseConstraint && this.isMouseDown && this.mouseConstraint.body) {
      const mousePosition = this.mouseConstraint.mouse.position;
      const body = this.mouseConstraint.body;
      
      // Draw spring-like line
      ctx.beginPath();
      const steps = 12;
      const dx = (body.position.x - mousePosition.x) / steps;
      const dy = (body.position.y - mousePosition.y) / steps;
      
      ctx.moveTo(mousePosition.x, mousePosition.y);
      
      for (let i = 1; i <= steps; i++) {
        const x = mousePosition.x + dx * i;
        const y = mousePosition.y + dy * i;
        const offset = Math.sin(i / steps * Math.PI * 2) * 5;
        
        ctx.lineTo(
          x + offset * Math.cos(Math.atan2(dy, dx) + Math.PI/2),
          y + offset * Math.sin(Math.atan2(dy, dx) + Math.PI/2)
        );
      }
      
      ctx.strokeStyle = 'rgba(0,0,0,0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw connection points
      ctx.beginPath();
      ctx.arc(mousePosition.x, mousePosition.y, 4, 0, Math.PI * 2);
      ctx.arc(body.position.x, body.position.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.fill();
    }
  }

  setMouse(mouseConstraint) {
    this.mouseConstraint = mouseConstraint;
    if (mouseConstraint) {
      mouseConstraint.mouse.element = this.canvas;
      mouseConstraint.mouse.pixelRatio = this.options.pixelRatio;
    }
  }
}