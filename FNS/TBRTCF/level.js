import { Platform } from './platform.js';
import { Collectible } from './collectible.js';
import { Obstacle } from './obstacle.js';
import { Door } from './door.js';

export class Level {
  constructor(player) {
    this.player = player;
    this.platforms = [];
    this.collectibles = [];
    this.obstacles = [];
    this.decorations = [];
    this.doors = [];
    
    // Level boundaries
    this.worldBounds = {
      left: -1000,
      right: 8000, 
      top: -500,
      bottom: 1200
    };
    
    // Level metrics
    this.startX = -800;
    this.endX = 7500;
    this.groundY = 600;
    
    this.initialize();
  }
  
  initialize() {
    this.createDoors();
    this.createPlatforms();
    this.createCollectibles();
    this.createObstacles();
    this.createDecorations();
    
    // Position player at entrance door
    const entranceDoor = this.doors.find(door => door.type === 'entrance');
    if (entranceDoor) {
      this.player.x = entranceDoor.x + 50;
      this.player.y = entranceDoor.y + entranceDoor.height - this.player.height;
      this.player.initialX = this.player.x;
      this.player.initialY = this.player.y;
    }
  }
  
  createDoors() {
    // Entrance door at beginning of level
    this.doors.push(new Door(
      this.startX + 100, 
      this.groundY - 150, 
      100, 
      150, 
      'entrance'
    ));
    
    // Exit door at end of level
    this.doors.push(new Door(
      this.endX - 200, 
      this.groundY - 150, 
      100, 
      150, 
      'exit'
    ));
  }
  
  createPlatforms() {
    // First section - Factory entrance area
    // Ground platforms
    for (let i = 0; i < 25; i++) {
      this.platforms.push(new Platform(this.startX + i * 400, this.groundY, 400, 100, 'normal'));
    }
    
    // Entry area platforms
    this.platforms.push(new Platform(this.startX + 300, 500, 200, 20));
    this.platforms.push(new Platform(this.startX + 600, 450, 150, 20, 'bounce'));
    this.platforms.push(new Platform(this.startX + 850, 400, 200, 20));
    
    // Second section - Conveyor belt production line
    this.platforms.push(new Platform(500, 500, 300, 20, 'conveyor-right'));
    this.platforms.push(new Platform(1000, 480, 300, 20, 'conveyor-left'));
    this.platforms.push(new Platform(1500, 450, 300, 20, 'conveyor-right'));
    
    // Rising platforms to upper level
    this.platforms.push(new Platform(1900, 400, 120, 20, 'crumble'));
    this.platforms.push(new Platform(2100, 350, 120, 20, 'bounce'));
    this.platforms.push(new Platform(2300, 300, 120, 20, 'crumble'));
    this.platforms.push(new Platform(2500, 250, 150, 20, 'moving-vertical'));
    
    // Upper factory level
    for (let i = 0; i < 5; i++) {
      this.platforms.push(new Platform(2700 + i * 300, 200, 250, 20));
    }
    
    // Moving platforms challenge section
    this.platforms.push(new Platform(4200, 200, 150, 20, 'moving-horizontal'));
    this.platforms.push(new Platform(4500, 200, 150, 20, 'moving-vertical'));
    this.platforms.push(new Platform(4800, 200, 150, 20, 'moving-horizontal'));
    
    // Bouncy section
    for (let i = 0; i < 4; i++) {
      this.platforms.push(new Platform(5200 + i * 200, 300 + Math.sin(i) * 50, 100, 20, 'bounce'));
    }
    
    // Final approach - mix of different platform types
    this.platforms.push(new Platform(6000, 250, 200, 20, 'normal'));
    this.platforms.push(new Platform(6300, 300, 150, 20, 'conveyor-right'));
    this.platforms.push(new Platform(6600, 350, 120, 20, 'crumble'));
    this.platforms.push(new Platform(6800, 400, 150, 20, 'moving-vertical'));
    
    // Exit platform section
    this.platforms.push(new Platform(7000, 450, 200, 20));
    this.platforms.push(new Platform(this.endX - 300, this.groundY - 200, 400, 200));
  }
  
  createCollectibles() {
    // First section collectibles
    for (let i = 0; i < 10; i++) {
      this.addFriedChicken(this.startX + 400 + i * 150, 500 - Math.random() * 200);
    }
    
    // Conveyor belt section
    for (let i = 0; i < 8; i++) {
      this.addFriedChicken(500 + i * 150, 400);
    }
    
    // Upper path collectibles
    for (let i = 0; i < 15; i++) {
      this.addFriedChicken(2700 + i * 150, 100);
    }
    
    // Moving platform challenge collectibles
    for (let i = 0; i < 5; i++) {
      this.addFriedChicken(4200 + i * 150, 100);
    }
    
    // Bouncy section reward
    for (let i = 0; i < 8; i++) {
      this.addFriedChicken(5200 + i * 100, 200);
    }
    
    // Final approach - bonus chickens
    for (let i = 0; i < 10; i++) {
      this.addFriedChicken(6000 + i * 180, 200);
    }
    
    // Special jackpot near exit
    for (let i = 0; i < 5; i++) {
      this.addFriedChicken(this.endX - 250 + (i % 3) * 50, this.groundY - 300 - (i % 3) * 50);
    }
  }
  
  addFriedChicken(x, y) {
    this.collectibles.push(new Collectible(
      'fried-chicken',
      x,
      y,
      40,
      40,
      100,
      Math.floor(Math.random() * 4),
      (Math.random() - 0.5) * 0.05,
      Math.random() * Math.PI * 2,
      Math.random() * 10,
      1 + Math.random()
    ));
  }
  
  createObstacles() {
    // Add danger obstacles - deep fryers throughout the level
    for (let i = 0; i < 20; i++) {
      const x = this.startX + 500 + i * 350 + Math.random() * 100;
      const y = this.groundY - 20; 
      
      this.obstacles.push(new Obstacle(
        'fryer',
        x,
        y,
        80,
        50,
        1,
        Math.random() * 100
      ));
    }
    
    // Add some steam vents on upper platforms
    for (let i = 0; i < 8; i++) {
      const x = 2800 + i * 350;
      const y = 180;
      
      this.obstacles.push(new Obstacle(
        'steam-vent',
        x,
        y,
        60,
        20,
        1,
        Math.random() * 100
      ));
    }
    
    // Add some chicken fryers in final section
    for (let i = 0; i < 5; i++) {
      const x = 6000 + i * 250;
      const y = 350;
      
      this.obstacles.push(new Obstacle(
        'chicken-fryer',
        x,
        y,
        100,
        80,
        2,
        Math.random() * 100
      ));
    }
  }
  
  createDecorations() {
    // Factory background elements throughout the level
    for (let i = 0; i < 50; i++) {
      const x = this.startX + i * 180;
      const y = this.groundY - Math.random() * 50;
      
      this.decorations.push({
        type: Math.random() > 0.7 ? 'pipe' : 'valve',
        x,
        y,
        size: 20 + Math.random() * 30,
        rotation: Math.random() * Math.PI * 2
      });
    }
    
    // Add factory signs
    this.decorations.push({
      type: 'sign',
      x: this.startX + 200,
      y: this.groundY - 200,
      text: 'CHICKEN FACTORY',
      size: 30
    });
    
    this.decorations.push({
      type: 'sign',
      x: 2700,
      y: 150,
      text: 'PROCESSING AREA',
      size: 20
    });
    
    this.decorations.push({
      type: 'sign',
      x: 5200,
      y: 250,
      text: 'SHIPPING DEPT',
      size: 20
    });
    
    this.decorations.push({
      type: 'sign',
      x: this.endX - 300,
      y: this.groundY - 300,
      text: 'EXIT',
      size: 25
    });
  }
  
  update(deltaTime) {
    // Update platforms (some might be animated)
    this.platforms.forEach(platform => platform.update());
    
    // Update collectibles
    this.updateCollectibles(deltaTime);
    
    // Update obstacles
    this.updateObstacles(deltaTime);
    
    // Update doors
    this.doors.forEach(door => door.update(deltaTime));
  }
  
  updateCollectibles(deltaTime) {
    this.collectibles.forEach(collectible => {
      if (!collectible.collected) {
        collectible.update(deltaTime);
      }
    });
  }
  
  updateObstacles(deltaTime) {
    this.obstacles.forEach(obstacle => obstacle.update(deltaTime));
  }
  
  checkLevelCompletion(player) {
    const exitDoor = this.doors.find(door => door.type === 'exit');
    if (exitDoor && this.checkCollision(player, exitDoor)) {
      return exitDoor.interact();
    }
    return false;
  }
  
  checkCollision(objA, objB) {
    return (
      objA.x < objB.x + objB.width &&
      objA.x + objA.width > objB.x &&
      objA.y < objB.y + objB.height &&
      objA.y + objA.height > objB.y
    );
  }
}