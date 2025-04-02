import Matter from 'matter-js';

// Create engine and world
const engine = Matter.Engine.create({
  positionIterations: 4, 
  velocityIterations: 3, 
  constraintIterations: 1,
  enableSleeping: true, 
});

const world = engine.world;

// Configure grid-based broad-phase collision detection
world.grid = Matter.Grid.create({
  bucketWidth: 100,
  bucketHeight: 100
});

// Configure engine
engine.gravity.y = 1;

// Create custom renderer with optimization flags
import { CanvasRenderer } from './renderer.js';
const renderer = new CanvasRenderer(document.body, engine, Matter, {
  width: window.innerWidth,
  height: window.innerHeight,
  background: '#f0f0f0',
  pixelRatio: window.devicePixelRatio,
  optimizeShadows: true,
  batchDrawing: true
});

// Create static bodies
const staticBodies = [
  Matter.Bodies.rectangle(window.innerWidth/2, window.innerHeight + 30, window.innerWidth * 2, 60, { 
    isStatic: true,
    friction: 0.3,
    render: {
      fillStyle: '#2c3e50'
    }
  }),
  Matter.Bodies.rectangle(-30, window.innerHeight/2, 60, window.innerHeight * 2, { 
    isStatic: true,
    friction: 0.3,
    render: {
      fillStyle: '#2c3e50'
    }
  }),
  Matter.Bodies.rectangle(window.innerWidth + 30, window.innerHeight/2, 60, window.innerHeight * 2, { 
    isStatic: true,
    friction: 0.3,
    render: {
      fillStyle: '#2c3e50'
    }
  }),
  Matter.Bodies.rectangle(window.innerWidth/2, -30, window.innerWidth * 2, 60, { 
    isStatic: true,
    friction: 0.3,
    render: {
      fillStyle: '#2c3e50'
    }
  })
];

const colors = [
  '#e74c3c', '#3498db', '#2ecc71', '#f1c40f',
  '#9b59b6', '#1abc9c', '#e67e22', '#34495e'
];

// Create fewer, larger dynamic bodies
const dynamicBodies = [];
for (let i = 0; i < 15; i++) {
  const radius = Math.random() * 60 + 30; 
  const color = colors[Math.floor(Math.random() * colors.length)];
  const alpha = 0.85;
  const colorWithAlpha = color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
  
  const shape = Math.random() > 0.5 
    ? Matter.Bodies.circle(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
        radius,
        {
          restitution: 0.6,
          friction: 0.1,
          density: 0.001,
          render: {
            fillStyle: colorWithAlpha
          }
        }
      )
    : Matter.Bodies.polygon(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
        Math.floor(Math.random() * 3) + 3, 
        radius,
        {
          restitution: 0.6,
          friction: 0.1,
          density: 0.001,
          render: {
            fillStyle: colorWithAlpha
          }
        }
      );
  
  dynamicBodies.push(shape);
}

// Add bodies in batches
Matter.Composite.add(world, [...staticBodies, ...dynamicBodies]);

// Add mouse control with spring properties
const mouse = Matter.Mouse.create(renderer.canvas);
const mouseConstraint = Matter.MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.1,
    damping: 0.1,
    length: 0.1,
    render: {
      visible: true,
      lineWidth: 2,
      strokeStyle: 'rgba(0,0,0,0.2)',
      type: 'spring'
    }
  }
});

// Add spring effect to mouse movement
Matter.Events.on(mouseConstraint, 'mousedown', function(event) {
  const mousePosition = event.mouse.position;
  const bodies = Matter.Query.point(dynamicBodies, mousePosition);
  
  if (bodies.length > 0) {
    const clickedBody = bodies[0];
    Matter.Body.applyForce(clickedBody, mousePosition, {
      x: (Math.random() - 0.5) * 0.001,
      y: (Math.random() - 0.5) * 0.001
    });
  }
});

Matter.Events.on(mouseConstraint, 'mousemove', function(event) {
  if (mouseConstraint.body) {
    const body = mouseConstraint.body;
    const mousePosition = event.mouse.position;
    
    const force = {
      x: (mousePosition.x - body.position.x) * 0.000015,
      y: (mousePosition.y - body.position.y) * 0.000015
    };
    
    Matter.Body.applyForce(body, body.position, force);
  }
});

renderer.setMouse(mouseConstraint);
Matter.Composite.add(world, mouseConstraint);

// Handle image upload
const imageInput = document.getElementById('imageInput');
const uploadBtn = document.getElementById('uploadBtn');
const spinBtn = document.getElementById('spinBtn');

uploadBtn.addEventListener('click', () => {
  imageInput.click();
});

imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        dynamicBodies.forEach(body => {
          body.render.sprite = {
            texture: img,
            xScale: (body.circleRadius * 2 || body.bounds.max.x - body.bounds.min.x) / img.width,
            yScale: (body.circleRadius * 2 || body.bounds.max.y - body.bounds.min.y) / img.height
          };
        });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

spinBtn.addEventListener('click', () => {
  dynamicBodies.forEach(body => {
    Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.8);
    // Add a random force to make it more chaotic
    Matter.Body.applyForce(body, body.position, {
      x: (Math.random() - 0.5) * 0.05,
      y: (Math.random() - 0.5) * 0.05
    });
  });
});

// Add boundary checking
Matter.Events.on(engine, 'afterUpdate', () => {
  dynamicBodies.forEach(body => {
    // If body goes too far out of bounds, reset it to center with reduced velocity
    if (body.position.x < -100 || body.position.x > window.innerWidth + 100 ||
        body.position.y < -100 || body.position.y > window.innerHeight + 100) {
      Matter.Body.setPosition(body, {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      });
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1);
    }
  });
});

// Throttled resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
  if (resizeTimeout) clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    renderer.options.width = window.innerWidth;
    renderer.options.height = window.innerHeight;
    renderer.setSize();
    
    staticBodies.forEach(body => {
      if (body.position.y > window.innerHeight) {
        Matter.Body.setPosition(body, { 
          x: window.innerWidth/2, 
          y: window.innerHeight + 30 
        });
      } else if (body.position.x < 0) {
        Matter.Body.setPosition(body, { 
          x: -30, 
          y: window.innerHeight/2 
        });
      } else if (body.position.x > window.innerWidth) {
        Matter.Body.setPosition(body, { 
          x: window.innerWidth + 30, 
          y: window.innerHeight/2 
        });
      } else {
        Matter.Body.setPosition(body, { 
          x: window.innerWidth/2, 
          y: -30 
        });
      }
    });
  }, 100);
});

// Create runner with fixed time step
const runner = Matter.Runner.create({
  isFixed: true,
  delta: 1000 / 60
});

// RAF with frame limiting
let lastTime = 0;
const frameInterval = 1000 / 60; 

function animate(currentTime) {
  requestAnimationFrame(animate);
  
  const deltaTime = currentTime - lastTime;
  
  if (deltaTime > frameInterval) {
    lastTime = currentTime - (deltaTime % frameInterval);
    renderer.render();
  }
}

// Run the engine
Matter.Runner.run(runner, engine);

// Start animation loop
animate(0);