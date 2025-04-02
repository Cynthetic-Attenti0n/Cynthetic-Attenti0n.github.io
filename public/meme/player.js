import * as THREE from 'three';

export function createPlayerModel(three, username) {
    const playerGroup = new three.Group();
    
    // Create a rectangular body
    const bodyGeometry = new three.BoxGeometry(0.6 * 0.7, 1.2 * 0.7, 0.3 * 0.7);
    
    // Generate consistent color from username with more vibrant neon colors
    const hash = username.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
    }, 0);
    
    // Use more vibrant colors for the Goon theme
    const neonColors = [0xff00ff, 0x00ffff, 0xff3300, 0x33ff00, 0xffff00];
    const color = new three.Color(neonColors[Math.abs(hash) % neonColors.length]);
    
    const bodyMaterial = new three.MeshStandardMaterial({ 
        color, 
        emissive: color.clone().multiplyScalar(0.3)
    });
    
    const body = new three.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.9 * 0.7;
    body.castShadow = true;
    playerGroup.add(body);
    
    // Add eyes
    const eyeGeometry = new three.SphereGeometry(0.08 * 0.7, 8, 8);
    const eyeMaterial = new three.MeshStandardMaterial({ color: 0xffffff });
    const eyePupilMaterial = new three.MeshStandardMaterial({ color: 0x000000 });
    
    // Left eye
    const leftEye = new three.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.15 * 0.7, 1.4 * 0.7, 0.15 * 0.7);  
    playerGroup.add(leftEye);
    
    // Left pupil
    const leftPupil = new three.Mesh(new three.SphereGeometry(0.04 * 0.7, 8, 8), eyePupilMaterial);
    leftPupil.position.set(0, 0, 0.05 * 0.7);
    leftEye.add(leftPupil);
    
    // Right eye
    const rightEye = new three.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.15 * 0.7, 1.4 * 0.7, 0.15 * 0.7);  
    playerGroup.add(rightEye);
    
    // Right pupil
    const rightPupil = new three.Mesh(new three.SphereGeometry(0.04 * 0.7, 8, 8), eyePupilMaterial);
    rightPupil.position.set(0, 0, 0.05 * 0.7);
    rightEye.add(rightPupil);
    
    // Add a party hat for the Goon aesthetic
    const hatGeometry = new three.ConeGeometry(0.2 * 0.7, 0.4 * 0.7, 8);
    const hatMaterial = new three.MeshStandardMaterial({ 
        color: 0xffff00,
        emissive: 0x333300
    });
    const hat = new three.Mesh(hatGeometry, hatMaterial);
    hat.position.set(0, 1.6 * 0.7, 0);
    hat.rotation.x = -0.2;
    playerGroup.add(hat);
    
    // Add legs
    const legGeometry = new three.BoxGeometry(0.2 * 0.7, 0.6 * 0.7, 0.2 * 0.7);
    const legMaterial = new three.MeshStandardMaterial({ color: color.clone().multiplyScalar(0.8) });
    
    // Left leg
    const leftLeg = new three.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.2 * 0.7, 0.3 * 0.7, 0);
    leftLeg.name = "leftLeg";
    playerGroup.add(leftLeg);
    
    // Right leg
    const rightLeg = new three.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.2 * 0.7, 0.3 * 0.7, 0);
    rightLeg.name = "rightLeg";
    playerGroup.add(rightLeg);
    
    return playerGroup;
}