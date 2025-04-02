import * as THREE from "three";

export class PuzzleController {
  constructor(letterTiles) {
    this.letterTiles = letterTiles;
    this.currentPuzzle = "";
    this.revealedLetters = [];
    this.puzzleSolved = false;
    this.celebrationActive = false;
    this.possiblePuzzles = [
      "IT'S GOONIN' TIME"
    ];
    
    // Materials for different tile states
    this.hiddenMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xaaaaaa, 
      metalness: 0.5,
      roughness: 0.5
    });
    
    this.revealedMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff, 
      metalness: 0.7,
      roughness: 0.3,
      emissive: 0xffffaa,
      emissiveIntensity: 0.2
    });
    
    this.emptyMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x333366, 
      metalness: 0.3,
      roughness: 0.7
    });
    
    // Set up event listeners for puzzle controls
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    // Letter guessing button
    document.getElementById('guess-letter').addEventListener('click', () => {
      // Prompt for a letter
      const letter = prompt('Guess a letter:');
      if (letter && letter.length === 1) {
        this.guessLetter(letter.toUpperCase());
      }
    });
    
    // Solve puzzle button
    document.getElementById('solve-puzzle').addEventListener('click', () => {
      // Prompt for solution
      const solution = prompt('Solve the puzzle:');
      if (solution) {
        this.attemptSolve(solution);
      }
    });
  }
  
  guessLetter(letter) {
    // Check if the letter is in the puzzle
    let found = false;
    
    for (let i = 0; i < this.letterTiles.length; i++) {
      const tile = this.letterTiles[i];
      if (!tile.userData.isEmpty && !tile.userData.isRevealed && tile.userData.letter === letter) {
        // Reveal this letter
        tile.material = tile.userData.revealedMaterial;
        tile.userData.isRevealed = true;
        
        // Add to revealed letters if not already there
        if (!this.revealedLetters.includes(letter)) {
          this.revealedLetters.push(letter);
        }
        
        found = true;
      }
    }
    
    // Display message based on result
    const messageDisplay = document.getElementById('message-display');
    if (found) {
      messageDisplay.textContent = `Good guess! '${letter}' is in the puzzle!`;
      messageDisplay.style.color = "#00ff00";
    } else {
      messageDisplay.textContent = `Sorry, '${letter}' is not in the puzzle.`;
      messageDisplay.style.color = "#ff0000";
    }
    messageDisplay.style.opacity = 1;
    
    // Hide message after delay
    setTimeout(() => {
      messageDisplay.style.opacity = 0;
    }, 3000);
    
    // Check if puzzle is now solved
    this.checkPuzzleSolution();
  }
  
  attemptSolve(solution) {
    const isCorrect = solution.toUpperCase() === this.currentPuzzle;
    
    // Display message based on result
    const messageDisplay = document.getElementById('message-display');
    if (isCorrect) {
      // Reveal all letters
      this.revealAllLetters();
      
      // Set puzzle as solved
      this.puzzleSolved = true;
      
      // Trigger celebration
      this.onPuzzleSolved();
    } else {
      messageDisplay.textContent = "That's not correct! Try again!";
      messageDisplay.style.color = "#ff0000";
      messageDisplay.style.opacity = 1;
      
      // Hide message after delay
      setTimeout(() => {
        messageDisplay.style.opacity = 0;
      }, 3000);
    }
  }
  
  setNewPuzzle() {
    // Use "IT'S GOONIN' TIME" as the puzzle
    this.currentPuzzle = this.possiblePuzzles[0];
    this.revealedLetters = [];
    this.puzzleSolved = false;
    
    console.log("New puzzle: " + this.currentPuzzle);
    
    // Reset all tiles
    this.letterTiles.forEach(tile => {
      tile.material = this.hiddenMaterial;
      tile.userData.letter = '';
      tile.userData.isRevealed = false;
      tile.userData.isEmpty = true;
    });
    
    // Map the puzzle onto the board
    let row = 0;
    let col = 0;
    const lettersPerRow = 9;
    
    for (let i = 0; i < this.currentPuzzle.length; i++) {
      const char = this.currentPuzzle[i];
      
      // Move to next row if we reach the end of current row
      if (col >= lettersPerRow) {
        col = 0;
        row++;
      }
      
      const tileIndex = row * lettersPerRow + col;
      
      if (tileIndex < this.letterTiles.length) {
        const tile = this.letterTiles[tileIndex];
        
        if (char === ' ' || char === "'") {
          // Space or apostrophe - automatically revealed
          tile.material = this.emptyMaterial;
          tile.userData.isEmpty = true;
          if (char === "'") {
            // Create apostrophe texture
            this.createLetterTexture(tile, char);
            tile.material = tile.userData.revealedMaterial;
            tile.userData.isEmpty = false;
            tile.userData.isRevealed = true;
          }
        } else {
          // Letter
          tile.userData.letter = char;
          tile.userData.isRevealed = false;
          tile.userData.isEmpty = false;
          
          // Create letter texture for the tile
          this.createLetterTexture(tile, char);
        }
      }
      
      col++;
    }
    
    // Mark remaining tiles as empty
    for (let i = row * lettersPerRow + col; i < this.letterTiles.length; i++) {
      this.letterTiles[i].material = this.emptyMaterial;
      this.letterTiles[i].userData.isEmpty = true;
    }
  }
  
  createLetterTexture(tile, letter) {
    // Create canvas for the letter
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw letter
    ctx.font = 'bold 100px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000000';
    ctx.fillText(letter, canvas.width/2, canvas.height/2);
    
    // Create texture from canvas
    const texture = new THREE.CanvasTexture(canvas);
    
    // Create material with the texture
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      color: 0xffffff,
      metalness: 0.7,
      roughness: 0.3,
      emissive: 0xffffaa,
      emissiveIntensity: 0.2
    });
    
    // Store original hidden material
    tile.userData.revealedMaterial = material;
  }
  
  revealRandomLetter() {
    // Get all hidden letter tiles
    const hiddenTiles = this.letterTiles.filter(tile => 
      !tile.userData.isEmpty && !tile.userData.isRevealed);
    
    if (hiddenTiles.length > 0) {
      // Randomly select a tile to reveal
      const tileToReveal = hiddenTiles[Math.floor(Math.random() * hiddenTiles.length)];
      
      // Reveal the tile
      tileToReveal.material = tileToReveal.userData.revealedMaterial;
      tileToReveal.userData.isRevealed = true;
      
      // Add to revealed letters if not already there
      if (!this.revealedLetters.includes(tileToReveal.userData.letter)) {
        this.revealedLetters.push(tileToReveal.userData.letter);
      }
      
      // Check if puzzle is now solved
      this.checkPuzzleSolution();
      
      return tileToReveal.userData.letter;
    }
    
    return null;
  }
  
  revealAllLetters() {
    this.letterTiles.forEach(tile => {
      if (!tile.userData.isEmpty && !tile.userData.isRevealed) {
        tile.material = tile.userData.revealedMaterial;
        tile.userData.isRevealed = true;
      }
    });
    
    // Get current puzzle as array of letters (ignoring spaces)
    this.revealedLetters = this.currentPuzzle.split('').filter(char => char !== ' ' && char !== "'");
  }
  
  checkPuzzleSolution() {
    // Get all non-empty tiles
    const puzzleTiles = this.letterTiles.filter(tile => !tile.userData.isEmpty);
    
    // Check if all are revealed
    const allRevealed = puzzleTiles.every(tile => tile.userData.isRevealed);
    
    if (allRevealed && !this.puzzleSolved) {
      this.puzzleSolved = true;
      this.onPuzzleSolved();
    }
    
    return allRevealed;
  }
  
  isPuzzleSolved() {
    return this.puzzleSolved;
  }
  
  onPuzzleSolved() {
    // This will be connected to the celebration system in app.js
    this.celebrationActive = true;
    
    // Additional visual feedback can be added here
    document.dispatchEvent(new CustomEvent('puzzleSolved'));
  }
  
  update() {
    // Any animations or updates to tiles can go here
  }
}