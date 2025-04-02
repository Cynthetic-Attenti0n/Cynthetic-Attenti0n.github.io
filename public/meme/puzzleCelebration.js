import * as THREE from "three";

export function celebratePuzzleSolved(scene, camera) {
  // Create confetti particles
  const particleCount = 200;
  const particles = new THREE.Group();
  
  // Define vibrant party colors
  const colors = [
    0xff0000, 0x00ff00, 0x0000ff, 
    0xffff00, 0xff00ff, 0x00ffff,
    0xff8800, 0x88ff00, 0x00ff88
  ];
  
  // Create particle geometry
  const particleGeometry = new THREE.PlaneGeometry(0.1, 0.1);
  
  for (let i = 0; i < particleCount; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const material = new THREE.MeshBasicMaterial({ 
      color: color,
      side: THREE.DoubleSide
    });
    
    const particle = new THREE.Mesh(particleGeometry, material);
    
    // Position particles around the camera
    const theta = Math.random() * Math.PI * 2;
    const radius = Math.random() * 5 + 2;
    particle.position.set(
      camera.position.x + Math.cos(theta) * radius,
      camera.position.y + 2 + Math.random() * 3,
      camera.position.z + Math.sin(theta) * radius
    );
    
    // Add random velocity for animation
    particle.userData.velocity = {
      x: (Math.random() - 0.5) * 0.05,
      y: -0.02 - Math.random() * 0.03,
      z: (Math.random() - 0.5) * 0.05,
      rotationX: (Math.random() - 0.5) * 0.1,
      rotationY: (Math.random() - 0.5) * 0.1
    };
    
    particles.add(particle);
  }
  
  scene.add(particles);
  
  // Create and display celebration message
  const messageDisplay = document.getElementById('message-display');
  messageDisplay.textContent = "CONGRATULATIONS! YOU'VE SOLVED THE PUZZLE!";
  messageDisplay.style.color = "#ffff00";
  messageDisplay.style.fontSize = "32px";
  messageDisplay.style.opacity = 1;
  
  // Add bonus points
  document.getElementById('points').textContent = 
    (parseInt(document.getElementById('points').textContent) + 1000).toString();
  
  // Set timeout to remove particles after animation
  setTimeout(() => {
    scene.remove(particles);
    messageDisplay.style.opacity = 0;
  }, 5000);
  
  return particles;
}

export function updateConfetti(particles, deltaTime) {
  if (!particles) return;
  
  particles.children.forEach(particle => {
    // Update position based on velocity
    particle.position.x += particle.userData.velocity.x;
    particle.position.y += particle.userData.velocity.y;
    particle.position.z += particle.userData.velocity.z;
    
    // Update rotation
    particle.rotation.x += particle.userData.velocity.rotationX;
    particle.rotation.y += particle.userData.velocity.rotationY;
    
    // Apply some gravity effect
    particle.userData.velocity.y -= 0.0005;
  });
}