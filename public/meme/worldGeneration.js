import * as THREE from "three";

// Simple seeded random number generator
class MathRandom {
  constructor(seed) {
    this.seed = seed;
  }
  
  random() {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }
}

export function createBarriers(scene) {
  // Function is kept but empty for compatibility
  // All barriers have been removed
}

export function createTrees(scene) {
  // Use a deterministic random number generator for consistent tree placement
  const treeSeed = 54321; // Different seed than barriers
  let rng = new MathRandom(treeSeed);
  
  // Tree trunk materials (varying browns)
  const trunkMaterials = [
    new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.9, metalness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: 0x6B4423, roughness: 0.9, metalness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: 0x5D4037, roughness: 0.8, metalness: 0.1 })
  ];
  
  // Tree leaves materials (brighter greens for daytime)
  const leavesMaterials = [
    new THREE.MeshStandardMaterial({ color: 0x3CB371, roughness: 0.8, metalness: 0.0 }),
    new THREE.MeshStandardMaterial({ color: 0x32CD32, roughness: 0.8, metalness: 0.0 }),
    new THREE.MeshStandardMaterial({ color: 0x228B22, roughness: 0.7, metalness: 0.0 })
  ];
  
  // Create different types of trees
  for (let i = 0; i < 30; i++) {  
    // Select random materials
    const trunkMaterial = trunkMaterials[Math.floor(rng.random() * trunkMaterials.length)];
    const leavesMaterial = leavesMaterials[Math.floor(rng.random() * leavesMaterials.length)];
    
    // Create tree group
    const tree = new THREE.Group();
    
    // Create tree trunk
    const trunkHeight = 5 + rng.random() * 7;
    const trunkRadius = 0.3 + rng.random() * 0.3;
    const trunkGeometry = new THREE.CylinderGeometry(trunkRadius * 0.8, trunkRadius * 1.2, trunkHeight, 8);
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = trunkHeight / 2;
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    tree.add(trunk);
    
    // Determine tree type (pine or broad-leaf)
    const isPine = rng.random() > 0.5;
    
    if (isPine) {
      // Pine tree (multiple cones stacked)
      const layers = 2 + Math.floor(rng.random() * 3);
      const baseRadius = trunkRadius * 6;
      const layerHeight = trunkHeight * 0.4;
      
      for (let j = 0; j < layers; j++) {
        const layerRadius = baseRadius * (1 - j * 0.2);
        const coneGeometry = new THREE.ConeGeometry(layerRadius, layerHeight, 8);
        const cone = new THREE.Mesh(coneGeometry, leavesMaterial);
        cone.position.y = trunkHeight * 0.5 + j * (layerHeight * 0.6);
        cone.castShadow = true;
        cone.receiveShadow = true;
        tree.add(cone);
      }
    } else {
      // Broad-leaf tree (ellipsoid or sphere)
      const leafShape = rng.random() > 0.5 ? 'ellipsoid' : 'sphere';
      const leavesRadius = trunkRadius * (4 + rng.random() * 2);
      
      if (leafShape === 'ellipsoid') {
        // Create ellipsoid using scaled sphere
        const leavesGeometry = new THREE.SphereGeometry(leavesRadius, 8, 8);
        const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
        leaves.position.y = trunkHeight * 0.7;
        leaves.scale.set(1, 1.2 + rng.random() * 0.5, 1);
        leaves.castShadow = true;
        leaves.receiveShadow = true;
        tree.add(leaves);
      } else {
        // Create multiple spheres for a more natural canopy
        const sphereCount = 2 + Math.floor(rng.random() * 3);
        for (let j = 0; j < sphereCount; j++) {
          const sphereSize = leavesRadius * (0.7 + rng.random() * 0.5);
          const leavesGeometry = new THREE.SphereGeometry(sphereSize, 8, 8);
          const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
          leaves.position.y = trunkHeight * 0.7;
          leaves.position.x = (rng.random() - 0.5) * trunkRadius * 2;
          leaves.position.z = (rng.random() - 0.5) * trunkRadius * 2;
          leaves.castShadow = true;
          leaves.receiveShadow = true;
          tree.add(leaves);
        }
      }
    }
    
    // Random position, avoiding center area and existing barriers
    const angle = rng.random() * Math.PI * 2;
    const distance = 15 + rng.random() * 40;  
    tree.position.x = Math.cos(angle) * distance;
    tree.position.z = Math.sin(angle) * distance;
    
    // Add some random rotation and scale variation
    tree.rotation.y = rng.random() * Math.PI * 2;
    const treeScale = 0.8 + rng.random() * 0.5;
    tree.scale.set(treeScale, treeScale, treeScale);
    
    // Add custom property for collision detection - move barrier detection to the whole tree instead
    tree.userData.isTree = true;
    tree.userData.isBarrier = true;
    
    scene.add(tree);
  }
}

export function createClouds(scene) {
  const cloudSeed = 67890; // Different seed for clouds
  let rng = new MathRandom(cloudSeed);
  
  const cloudMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF, // Brighter white for daytime
    opacity: 0.9,
    transparent: true,
    roughness: 1.0,
    metalness: 0.0
  });
  
  for (let i = 0; i < 20; i++) {
    const cloudGroup = new THREE.Group();
    
    // Create cloud with multiple spheres
    const puffCount = 3 + Math.floor(rng.random() * 5);
    for (let j = 0; j < puffCount; j++) {
      const puffSize = 2 + rng.random() * 3;
      const puffGeometry = new THREE.SphereGeometry(puffSize, 7, 7);
      const puff = new THREE.Mesh(puffGeometry, cloudMaterial);
      
      puff.position.x = (rng.random() - 0.5) * 5;
      puff.position.y = (rng.random() - 0.5) * 2;
      puff.position.z = (rng.random() - 0.5) * 5;
      
      cloudGroup.add(puff);
    }
    
    // Position the cloud
    const angle = rng.random() * Math.PI * 2;
    const distance = 20 + rng.random() * 60;
    cloudGroup.position.x = Math.cos(angle) * distance;
    cloudGroup.position.z = Math.sin(angle) * distance;
    cloudGroup.position.y = 30 + rng.random() * 20;
    
    // Random rotation
    cloudGroup.rotation.y = rng.random() * Math.PI * 2;
    
    // Add to scene
    scene.add(cloudGroup);
  }
}

export function createGoonWheel(scene) {
  // Create a Hills Hoist clothesline with wine bag
  const clotheslineGroup = new THREE.Group();
  
  // Central pole
  const poleGeometry = new THREE.CylinderGeometry(0.2, 0.2, 6, 8);
  const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.7, roughness: 0.3 });
  const pole = new THREE.Mesh(poleGeometry, poleMaterial);
  pole.position.y = 3;
  pole.castShadow = true;
  pole.receiveShadow = true;
  clotheslineGroup.add(pole);
  
  // Create rotating top part
  const rotatingPart = new THREE.Group();
  
  // Cross beams at the top
  const beamGeometry = new THREE.CylinderGeometry(0.1, 0.1, 6, 8);
  const beamMaterial = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.7, roughness: 0.3 });
  
  // Horizontal beams (4 of them in X shape)
  for (let i = 0; i < 4; i++) {
    const beam = new THREE.Mesh(beamGeometry, beamMaterial);
    beam.position.y = 6;
    beam.rotation.y = Math.PI * i / 4;
    beam.rotation.z = Math.PI / 4; // 45 degree angle downward
    beam.castShadow = true;
    beam.receiveShadow = true;
    rotatingPart.add(beam);
  }
  
  // Wine bag (goon bag)
  const bagGeometry = new THREE.BoxGeometry(1, 1.5, 0.5);
  const bagMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xf5f5dc, // Light beige
    metalness: 0.1,
    roughness: 0.8
  });
  const wineBag = new THREE.Mesh(bagGeometry, bagMaterial);
  wineBag.position.y = 3.5;
  wineBag.position.x = 2.5; // Hang off to the side
  wineBag.castShadow = true;
  wineBag.receiveShadow = true;
  
  // Add wine label
  const labelGeometry = new THREE.PlaneGeometry(0.8, 0.6);
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#772222';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = 'bold 40px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff';
  ctx.fillText('GOON', canvas.width/2, 100);
  ctx.fillText('BOX WINE', canvas.width/2, 150);
  
  const labelTexture = new THREE.CanvasTexture(canvas);
  const labelMaterial = new THREE.MeshBasicMaterial({ map: labelTexture });
  const label = new THREE.Mesh(labelGeometry, labelMaterial);
  label.position.z = 0.26;
  wineBag.add(label);
  
  // String connecting bag to beam
  const stringGeometry = new THREE.CylinderGeometry(0.02, 0.02, 3, 8);
  const stringMaterial = new THREE.MeshStandardMaterial({ color: 0xeeeeee });
  const string = new THREE.Mesh(stringGeometry, stringMaterial);
  string.position.y = 5; // Middle point between beam and bag
  string.position.x = 2.5;
  string.castShadow = true;
  rotatingPart.add(string);
  
  // Add wine bag to the rotating part
  rotatingPart.add(wineBag);
  
  // Add the rotating part to the clothesline group
  clotheslineGroup.add(rotatingPart);
  
  // Add title sign
  const signGeometry = new THREE.BoxGeometry(8, 2, 0.2);
  const signMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x000000,
    emissive: 0xff00ff,
    emissiveIntensity: 0.3
  });
  const sign = new THREE.Mesh(signGeometry, signMaterial);
  sign.position.set(0, 8, 0);
  sign.rotation.x = Math.PI / 10;
  clotheslineGroup.add(sign);
  
  // Add text label
  const titleCanvas = document.createElement('canvas');
  titleCanvas.width = 512;
  titleCanvas.height = 128;
  const titleCtx = titleCanvas.getContext('2d');
  titleCtx.fillStyle = '#000000';
  titleCtx.fillRect(0, 0, titleCanvas.width, titleCanvas.height);
  titleCtx.font = 'bold 80px Impact';
  titleCtx.textAlign = 'center';
  titleCtx.fillStyle = '#ffffff';
  titleCtx.fillText('GOON OF FORTUNE', titleCanvas.width/2, 90);
  
  const textTexture = new THREE.CanvasTexture(titleCanvas);
  const textMaterial = new THREE.MeshBasicMaterial({ 
    map: textTexture,
    transparent: true
  });
  const textGeometry = new THREE.PlaneGeometry(7.8, 1.8);
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  textMesh.position.set(0, 0, 0.11);
  sign.add(textMesh);
  
  // Position the entire group
  clotheslineGroup.position.set(0, 0, 0);
  clotheslineGroup.userData.isWheel = true;
  clotheslineGroup.userData.rotatingPart = rotatingPart;
  
  scene.add(clotheslineGroup);
  
  // Return the rotating part instead of just the wine bag
  return rotatingPart;
}

// New function to create the word puzzle board
export function createPuzzleBoard(scene) {
  const boardGroup = new THREE.Group();
  
  // Create main board background
  const boardGeometry = new THREE.BoxGeometry(12, 6, 0.5);
  const boardMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x333366,
    metalness: 0.3,
    roughness: 0.7
  });
  const board = new THREE.Mesh(boardGeometry, boardMaterial);
  board.castShadow = true;
  board.receiveShadow = true;
  boardGroup.add(board);
  
  // Create letter tiles
  const letterSpacing = 1.2;
  const letterRows = 3;
  const lettersPerRow = 9;
  
  const tileGeometry = new THREE.BoxGeometry(1, 1, 0.1);
  const tileMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xaaaaaa, 
    metalness: 0.5,
    roughness: 0.5
  });
  
  // Store letter tiles for later access
  const letterTiles = [];
  
  // Create tile grid
  for (let row = 0; row < letterRows; row++) {
    for (let col = 0; col < lettersPerRow; col++) {
      const tile = new THREE.Mesh(tileGeometry, tileMaterial);
      
      // Position tiles in a grid
      const xPos = (col - lettersPerRow/2 + 0.5) * letterSpacing;
      const yPos = (letterRows/2 - row - 0.5) * letterSpacing;
      
      tile.position.set(xPos, yPos, 0.3);
      
      // Store the tile
      letterTiles.push(tile);
      boardGroup.add(tile);
    }
  }
  
  // Add board to scene
  boardGroup.position.set(0, 5, -15); // Position behind the clothesline
  scene.add(boardGroup);
  
  return {
    boardGroup,
    letterTiles
  };
}