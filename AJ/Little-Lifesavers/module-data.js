// Module content data
export const moduleData = {
    cpr: {
        title: 'CPR for Infants and Children',
        description: 'Learn the proper techniques for performing CPR on infants and children based on Australian Resuscitation Council guidelines.',
        progress: 0,
        sections: [
            {
                id: 'intro',
                title: 'Introduction to Pediatric CPR',
                content: `
                    <p>Cardiopulmonary Resuscitation (CPR) for infants and children differs from adult CPR. This module will teach you the proper techniques based on Australian Resuscitation Council guidelines.</p>
                    <p>Remember: Early CPR can double or triple a child's chance of survival.</p>
                    <h4>Key Differences Between Adult and Pediatric CPR:</h4>
                    <ul>
                        <li>Compression depth is different (approximately 1/3 the depth of the chest)</li>
                        <li>For infants, use two fingers or two thumbs-encircling hands technique</li>
                        <li>For children, use one or two hands depending on child size</li>
                        <li>Causes of cardiac arrest are often respiratory-related in children</li>
                    </ul>
                `
            },
            {
                id: 'child-cpr',
                title: 'Child CPR (1-8 years)',
                content: `
                    <div class="demonstration-container">
                        <div class="video-placeholder">
                            <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                                <rect width="300" height="200" fill="#e9ecef" rx="10"/>
                                <circle cx="150" cy="100" r="40" fill="#FF6B6B" fill-opacity="0.7"/>
                                <polygon points="140,80 140,120 170,100" fill="white"/>
                                <text x="150" y="170" font-family="Arial" font-size="12" fill="#333" text-anchor="middle">Video demonstration will appear here</text>
                            </svg>
                        </div>
                    </div>
                    <h4>Steps for Child CPR:</h4>
                    <ol class="steps-list">
                        <li>
                            <strong>Check for Danger</strong>
                            <p>Ensure the area is safe for you and the child.</p>
                        </li>
                        <li>
                            <strong>Check for Response</strong>
                            <p>Gently tap the child's shoulders and ask loudly, "Are you OK?"</p>
                        </li>
                        <li>
                            <strong>Send for Help</strong>
                            <p>If alone, call 000 or have someone else call.</p>
                        </li>
                        <li>
                            <strong>Open Airway</strong>
                            <p>Tilt head back slightly and lift chin.</p>
                        </li>
                        <li>
                            <strong>Check Breathing</strong>
                            <p>Look, listen, and feel for breathing for up to 10 seconds.</p>
                        </li>
                        <li>
                            <strong>Give 2 Rescue Breaths</strong>
                            <p>Seal your mouth over the child's mouth, pinch nose, and give 2 gentle breaths.</p>
                        </li>
                        <li>
                            <strong>Start Compressions</strong>
                            <p>Place the heel of one hand on the lower half of the breastbone. Push down by approximately 1/3 of chest depth and release.</p>
                        </li>
                        <li>
                            <strong>Continue CPR</strong>
                            <p>Perform 30 compressions followed by 2 breaths. Compression rate should be 100-120 per minute.</p>
                        </li>
                    </ol>
                `
            },
            {
                id: 'infant-cpr',
                title: 'Infant CPR (Under 1 year)',
                content: `
                    <div class="demonstration-container">
                        <div class="video-placeholder">
                            <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                                <rect width="300" height="200" fill="#e9ecef" rx="10"/>
                                <circle cx="150" cy="100" r="40" fill="#FF6B6B" fill-opacity="0.7"/>
                                <polygon points="140,80 140,120 170,100" fill="white"/>
                                <text x="150" y="170" font-family="Arial" font-size="12" fill="#333" text-anchor="middle">Video demonstration will appear here</text>
                            </svg>
                        </div>
                    </div>
                    <h4>Steps for Infant CPR:</h4>
                    <ol class="steps-list">
                        <li>
                            <strong>Check for Danger</strong>
                            <p>Ensure the area is safe for you and the infant.</p>
                        </li>
                        <li>
                            <strong>Check for Response</strong>
                            <p>Gently tap the infant's feet and observe for a response.</p>
                        </li>
                        <li>
                            <strong>Send for Help</strong>
                            <p>If alone, call 000 or have someone else call.</p>
                        </li>
                        <li>
                            <strong>Open Airway</strong>
                            <p>Position the infant's head in a neutral position (not tilted back).</p>
                        </li>
                        <li>
                            <strong>Check Breathing</strong>
                            <p>Look, listen, and feel for breathing for up to 10 seconds.</p>
                        </li>
                        <li>
                            <strong>Give 2 Rescue Breaths</strong>
                            <p>Cover the infant's mouth and nose with your mouth and give 2 gentle puffs.</p>
                        </li>
                        <li>
                            <strong>Start Compressions</strong>
                            <p>Place two fingers in the center of the chest, just below the nipple line. Push down by approximately 1/3 of chest depth and release.</p>
                        </li>
                        <li>
                            <strong>Continue CPR</strong>
                            <p>Perform 30 compressions followed by 2 breaths. Compression rate should be 100-120 per minute.</p>
                        </li>
                    </ol>
                `
            },
            {
                id: 'assessment',
                title: 'Knowledge Check',
                content: `
                    <div class="quiz-container">
                        <div class="quiz-question">
                            <p>1. What is the correct compression to breath ratio for child CPR?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="a"> 15 compressions : 1 breath
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="b"> 30 compressions : 2 breaths
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="c"> 5 compressions : 1 breath
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="d"> 20 compressions : 2 breaths
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <div class="quiz-question">
                            <p>2. Which hand position is correct for infant CPR?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="a"> Two hands, one on top of the other
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="b"> The heel of one hand only
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="c"> Two fingers in the center of the chest
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="d"> Two thumbs side by side
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <div class="quiz-question">
                            <p>3. What is the correct compression depth for a child?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="a"> 1/4 of the depth of the chest
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="b"> 1/3 of the depth of the chest
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="c"> 1/2 of the depth of the chest
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="d"> 5 cm, regardless of chest size
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <button class="btn primary-btn quiz-submit">Submit Answers</button>
                    </div>
                `
            }
        ],
        answers: {
            q1: "b",
            q2: "c",
            q3: "b"
        }
    },
    drsabcd: {
        title: 'DRSABCD Action Plan',
        description: "Learn the St John's step-by-step emergency response protocol for responding to emergencies involving children.",
        progress: 0,
        sections: [
            {
                id: 'intro',
                title: 'Introduction to DRSABCD',
                content: `
                    <p>The DRSABCD action plan is a vital first aid protocol used in Australia. It provides a systematic approach to assessing and managing emergency situations.</p>
                    <p>This module will guide you through each step of the process, with specific considerations for infants and children.</p>
                    <h4>The DRSABCD Acronym Stands For:</h4>
                    <ul>
                        <li><strong>D</strong> - Danger</li>
                        <li><strong>R</strong> - Response</li>
                        <li><strong>S</strong> - Send for help</li>
                        <li><strong>A</strong> - Airway</li>
                        <li><strong>B</strong> - Breathing</li>
                        <li><strong>C</strong> - CPR</li>
                        <li><strong>D</strong> - Defibrillation</li>
                    </ul>
                    <p>Following this systematic approach ensures you don't miss critical steps during an emergency.</p>
                `
            },
            {
                id: 'danger',
                title: 'D - Danger',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <path class="danger-sign" d="M200 30l130 145H70z" fill="#EF5350" stroke="#333" stroke-width="2"/>
                            <text x="200" y="125" font-family="Arial" font-size="60" font-weight="bold" fill="white" text-anchor="middle">!</text>
                            <text x="200" y="180" font-family="Arial" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">Check for Danger</text>
                        </svg>
                    </div>
                    <h4>Key Points:</h4>
                    <ul>
                        <li>Always check for danger to yourself, the child, and bystanders before approaching</li>
                        <li>Common dangers include electrical hazards, fire, traffic, water, and unstable structures</li>
                        <li>With children, also be aware of small objects, cords, and hazardous substances</li>
                        <li>Only proceed when it's safe to do so</li>
                    </ul>
                    <div class="info-box">
                        <p><strong>Remember:</strong> Your safety comes first. You cannot help the child if you become injured yourself.</p>
                    </div>
                `
            },
            {
                id: 'response',
                title: 'R - Response',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <circle class="adult-figure" cx="150" cy="100" r="40" fill="#FF6B6B"/>
                            <circle class="child-figure" cx="250" cy="110" r="25" fill="#4FC3F7"/>
                            <path d="M140 70c0 0 20 15 20 0s-20 15-20 0z" fill="#333"/>
                            <path d="M240 85c0 0 15 10 15 0s-15 10-15 0z" fill="#333"/>
                            <path class="talk-bubble" d="M130 110c0 0 40 10 40 0" fill="none" stroke="#333" stroke-width="2"/>
                            <path class="talk-bubble" d="M235 110c0 0 25 5 25 0" fill="none" stroke="#333" stroke-width="2"/>
                            <text x="200" y="180" font-family="Arial" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">Check for Response</text>
                        </svg>
                    </div>
                    <h4>For Children (1-8 years):</h4>
                    <ul>
                        <li>Gently squeeze their shoulders</li>
                        <li>Speak loudly and clearly: "Hello, can you hear me? Are you OK?"</li>
                        <li>Look for any movement, eye opening, or sounds</li>
                    </ul>
                    <h4>For Infants (Under 1 year):</h4>
                    <ul>
                        <li>Gently tap the soles of their feet</li>
                        <li>Call their name or make a noise to stimulate a response</li>
                        <li>Look for any movement, eye opening, or sounds</li>
                    </ul>
                    <div class="info-box">
                        <p><strong>Note:</strong> Never shake a baby or child to check for response.</p>
                    </div>
                `
            },
            {
                id: 'send-for-help',
                title: 'S - Send for Help',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <rect x="120" y="60" width="160" height="80" rx="10" fill="#4FC3F7"/>
                            <text x="200" y="105" font-family="Arial" font-size="24" font-weight="bold" fill="white" text-anchor="middle">000</text>
                            <path class="phone-wave" d="M270 80 a30 30 0 0 1 30 30" fill="none" stroke="#333" stroke-width="2"/>
                            <path class="phone-wave" d="M280 70 a40 40 0 0 1 40 40" fill="none" stroke="#333" stroke-width="2"/>
                            <path class="phone-wave" d="M290 60 a50 50 0 0 1 50 50" fill="none" stroke="#333" stroke-width="2"/>
                            <text x="200" y="180" font-family="Arial" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">Call 000 for Emergency</text>
                        </svg>
                    </div>
                    <h4>Key Points:</h4>
                    <ul>
                        <li>Call 000 (Australian Emergency Services) or ask someone else to call</li>
                        <li>Clearly state that the emergency involves a child or infant</li>
                        <li>Give your location as precisely as possible</li>
                        <li>Follow the operator's instructions</li>
                        <li>Stay on the line until told to hang up</li>
                    </ul>
                    <div class="info-box">
                        <p><strong>Important:</strong> If you're alone with a child who is unresponsive and not breathing normally, call 000 immediately after checking for response. Put the phone on speaker mode if possible while beginning CPR.</p>
                    </div>
                `
            },
            {
                id: 'airway',
                title: 'A - Airway',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <ellipse cx="200" cy="100" rx="120" ry="40" fill="#FFD54F" fill-opacity="0.5"/>
                            <path class="head-tilt" d="M160 100 Q 200 70 240 100" fill="none" stroke="#333" stroke-width="3"/>
                            <circle cx="180" cy="90" r="15" fill="#FFD54F"/>
                            <circle cx="220" cy="90" r="15" fill="#FFD54F"/>
                            <path d="M190 110 Q 200 120 210 110" fill="none" stroke="#333" stroke-width="2"/>
                            <text x="200" y="180" font-family="Arial" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">Open the Airway</text>
                        </svg>
                    </div>
                    <h4>For Children (1-8 years):</h4>
                    <ul>
                        <li>Place the child on their back on a firm, flat surface</li>
                        <li>Open the airway using the head tilt-chin lift method</li>
                        <li>Tilt the head back slightly and lift the chin</li>
                        <li>Be gentle - don't tilt the head too far back</li>
                    </ul>
                    <h4>For Infants (Under 1 year):</h4>
                    <ul>
                        <li>Place the infant on their back on a firm, flat surface</li>
                        <li>Position the head in a neutral position (not tilted back)</li>
                        <li>Gently lift the chin to open the airway</li>
                        <li>Avoid over-extending the neck</li>
                    </ul>
                    <div class="info-box">
                        <p><strong>Caution:</strong> If you suspect a neck injury, open the airway using the jaw thrust method without tilting the head.</p>
                    </div>
                `
            },
            {
                id: 'breathing',
                title: 'B - Breathing',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <ellipse cx="200" cy="100" rx="120" ry="40" fill="#81C784" fill-opacity="0.5"/>
                            <path class="breathing-chest" d="M150 100 Q 200 80 250 100 Q 200 120 150 100" fill="#81C784" fill-opacity="0.7"/>
                            <path class="breathing-arrow-1" d="M270 80 L 290 80 L 280 70 L 270 80" fill="#333"/>
                            <path class="breathing-arrow-2" d="M270 120 L 290 120 L 280 130 L 270 120" fill="#333"/>
                            <text x="200" y="180" font-family="Arial" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">Check for Breathing</text>
                        </svg>
                    </div>
                    <h4>Look, Listen, and Feel for Breathing:</h4>
                    <ul>
                        <li><strong>Look</strong> for chest movement</li>
                        <li><strong>Listen</strong> for breathing sounds</li>
                        <li><strong>Feel</strong> for breath on your cheek</li>
                        <li>Do this for no more than 10 seconds</li>
                    </ul>
                    <h4>If Breathing Normally:</h4>
                    <ul>
                        <li>Place in recovery position (if no suspected spinal injury)</li>
                        <li>Continue to monitor breathing</li>
                        <li>Wait for emergency services</li>
                    </ul>
                    <h4>If Not Breathing Normally:</h4>
                    <ul>
                        <li>Begin CPR immediately (30 compressions, then 2 rescue breaths)</li>
                    </ul>
                    <div class="info-box">
                        <p><strong>Important:</strong> Occasional gasps are not normal breathing. If you see only occasional gasps, the child needs CPR.</p>
                    </div>
                `
            },
            {
                id: 'cpr',
                title: 'C - CPR',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <ellipse cx="200" cy="100" rx="120" ry="40" fill="#FF6B6B" fill-opacity="0.5"/>
                            <circle class="compression-point" cx="200" cy="100" r="20" fill="#FF6B6B"/>
                            <path class="compression-arrow" d="M200 60 L 200 80 L 190 70 M 200 80 L 210 70" fill="none" stroke="#333" stroke-width="2"/>
                            <text x="200" y="180" font-family="Arial" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">Start CPR</text>
                        </svg>
                    </div>
                    <h4>Key Points for Pediatric CPR:</h4>
                    <ul>
                        <li>Compression depth: approximately 1/3 the depth of the chest</li>
                        <li>Compression rate: 100-120 compressions per minute</li>
                        <li>Ratio: 30 compressions to 2 rescue breaths</li>
                        <li>For children: Use the heel of one hand or two hands for larger children</li>
                        <li>For infants: Use two fingers or two thumbs-encircling hands technique</li>
                    </ul>
                    <div class="info-box">
                        <p><strong>Remember:</strong> High-quality CPR is crucial. Push hard, push fast, allow complete chest recoil, and minimize interruptions.</p>
                    </div>
                `
            },
            {
                id: 'defibrillation',
                title: 'D - Defibrillation',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <rect x="120" y="60" width="160" height="100" rx="10" fill="#9575CD"/>
                            <path class="aed-symbol" d="M180 80 L 190 100 L 210 80 L 220 100" fill="none" stroke="white" stroke-width="4"/>
                            <circle class="aed-light" cx="160" cy="90" r="10" fill="#EF5350"/>
                            <rect x="160" y="120" width="80" height="20" rx="5" fill="#81C784"/>
                            <text x="200" y="135" font-family="Arial" font-size="12" fill="white" text-anchor="middle">SHOCK</text>
                            <text x="200" y="180" font-family="Arial" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">Use AED if Available</text>
                        </svg>
                    </div>
                    <h4>Using an AED on Children:</h4>
                    <ul>
                        <li>Use pediatric pads/settings for children under 8 years if available</li>
                        <li>If not available, use adult pads, ensuring they don't touch/overlap</li>
                        <li>For children under 1 year, manual defibrillation is preferred (if available)</li>
                        <li>Follow the AED's voice/visual prompts</li>
                        <li>Ensure no one is touching the child when a shock is delivered</li>
                        <li>Resume CPR immediately after the shock</li>
                    </ul>
                    <div class="info-box">
                        <p><strong>Remember:</strong> If an AED is available, use it as soon as possible. Early defibrillation can significantly increase survival rates.</p>
                    </div>
                `
            },
            {
                id: 'assessment',
                title: 'Knowledge Check',
                content: `
                    <div class="quiz-container">
                        <div class="quiz-question">
                            <p>1. What does the 'S' in DRSABCD stand for?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="a"> Safety
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="b"> Shock
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="c"> Send for help
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="d"> Start CPR
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <div class="quiz-question">
                            <p>2. When checking for response in an infant, you should:</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="a"> Gently tap the soles of their feet
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="b"> Vigorously shake them
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="c"> Pinch their shoulders
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="d"> Splash water on their face
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <div class="quiz-question">
                            <p>3. For how long should you check for breathing?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="a"> 5 seconds
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="b"> 30 seconds
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="c"> 1 minute
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="d"> No more than 10 seconds
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <button class="btn primary-btn quiz-submit">Submit Answers</button>
                    </div>
                `
            }
        ],
        answers: {
            q1: "c",
            q2: "a",
            q3: "d"
        }
    },
    recovery: {
        title: 'Recovery Position',
        description: "Learn the proper recovery position techniques for infants and children in emergency situations.",
        progress: 0,
        sections: [
            {
                id: 'intro',
                title: 'Introduction to Recovery Position',
                content: `
                    <p>The recovery position is a stable position that helps maintain an open airway and reduces the risk of choking in an unconscious breathing person.</p>
                    <p>The pediatric recovery position is slightly different from the adult position, with special considerations for infants under 1 year of age.</p>
                    <h4>When to Use the Recovery Position:</h4>
                    <ul>
                        <li>When a child or infant is unconscious but breathing normally</li>
                        <li>When there is no suspected spinal injury</li>
                        <li>After a seizure if the child remains unconscious but is breathing</li>
                    </ul>
                    <div class="info-box">
                        <p><strong>Important:</strong> If breathing stops or becomes abnormal at any point, place the child on their back and begin CPR immediately.</p>
                    </div>
                `
            },
            {
                id: 'child-recovery',
                title: 'Recovery Position for Children (1-8 years)',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <ellipse class="body-shadow" cx="200" cy="130" rx="120" ry="30" fill="#6c757d" opacity="0.2"/>
                            <path class="body" d="M140 110 C 180 90, 220 90, 260 110 C 220 130, 180 130, 140 110 Z" fill="#4FC3F7"/>
                            <circle class="head" cx="150" cy="100" r="25" fill="#4FC3F7"/>
                            <path class="arm-top" d="M230 100 C 240 90, 250 90, 260 100" stroke="#4FC3F7" stroke-width="10" fill="none"/>
                            <path class="arm-bottom" d="M180 110 C 190 120, 200 120, 210 110" stroke="#4FC3F7" stroke-width="10" fill="none"/>
                            <path class="leg-top" d="M220 110 L 240 130" stroke="#4FC3F7" stroke-width="12" fill="none"/>
                            <path class="leg-bottom" d="M180 110 L 160 130" stroke="#4FC3F7" stroke-width="12" fill="none"/>
                            <text x="200" y="180" font-family="Arial" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">Child Recovery Position</text>
                        </svg>
                    </div>
                    <h4>Step-by-Step Guide:</h4>
                    <ol>
                        <li>
                            <strong>Prepare</strong>
                            <p>Kneel beside the child and make sure both legs are straight.</p>
                        </li>
                        <li>
                            <strong>Position Arm</strong>
                            <p>Place the arm nearest to you at right angles to the body, with the elbow bent and palm facing upward.</p>
                        </li>
                        <li>
                            <strong>Other Arm</strong>
                            <p>Bring the other arm across the chest and hold the back of the hand against the child's cheek nearest to you.</p>
                        </li>
                        <li>
                            <strong>Bend Knee</strong>
                            <p>With your other hand, bend the far knee up until the foot is flat on the ground.</p>
                        </li>
                        <li>
                            <strong>Roll</strong>
                            <p>Keeping the hand pressed against the cheek, pull on the far knee and roll the child toward you onto their side.</p>
                        </li>
                        <li>
                            <strong>Adjust</strong>
                            <p>Adjust the top leg so that both the hip and knee are bent at right angles.</p>
                        </li>
                        <li>
                            <strong>Check Airway</strong>
                            <p>Tilt the head back slightly to ensure the airway remains open.</p>
                        </li>
                    </ol>
                    <div class="info-box">
                        <p><strong>Monitor:</strong> Continue to check breathing and be ready to turn the child onto their back to perform CPR if breathing becomes abnormal or stops.</p>
                    </div>
                `
            },
            {
                id: 'infant-recovery',
                title: 'Recovery Position for Infants (Under 1 year)',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <ellipse class="body-shadow" cx="200" cy="130" rx="80" ry="20" fill="#6c757d" opacity="0.2"/>
                            <path class="body" d="M170 110 C 190 100, 210 100, 230 110 C 210 120, 190 120, 170 110 Z" fill="#FF6B6B"/>
                            <circle class="head" cx="180" cy="100" r="18" fill="#FF6B6B"/>
                            <path class="arm" d="M200 110 C 210 115, 220 115, 230 110" stroke="#FF6B6B" stroke-width="6" fill="none"/>
                            <path class="leg" d="M200 115 L 210 125" stroke="#FF6B6B" stroke-width="8" fill="none"/>
                            <path class="supporting-arm" d="M130 120 L 170 110" stroke="#4FC3F7" stroke-width="10" fill="none"/>
                            <path class="supporting-hand" d="M120 120 C 125 125, 135 125, 140 120" stroke="#4FC3F7" stroke-width="5" fill="none"/>
                            <text x="200" y="180" font-family="Arial" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">Infant Recovery Position (Supported)</text>
                        </svg>
                    </div>
                    <h4>Methods for Infant Recovery Position:</h4>
                    <h5>Method 1: Supported Side Position</h5>
                    <ul>
                        <li>Hold the infant in your arms with their head slightly lowered and supported</li>
                        <li>Turn the infant onto their side, facing slightly downward</li>
                        <li>This position allows fluids to drain from the mouth and prevents the tongue from blocking the airway</li>
                    </ul>
                    
                    <h5>Method 2: On Your Lap</h5>
                    <ul>
                        <li>Sit down and place the infant face down across your lap</li>
                        <li>Keep the infant's head lower than their chest</li>
                        <li>Support the infant's head and ensure the airway remains open</li>
                        <li>This position is especially good for monitoring breathing</li>
                    </ul>
                    
                    <div class="info-box">
                        <p><strong>Important:</strong> Continuously monitor the infant's breathing and color. Be prepared to begin CPR if necessary.</p>
                    </div>
                `
            },
            {
                id: 'monitoring',
                title: 'Monitoring & Re-assessment',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <circle class="clock-face" cx="200" cy="100" r="60" fill="white" stroke="#333" stroke-width="2"/>
                            <path class="clock-hand" d="M200 100 L 200 60" stroke="#FF6B6B" stroke-width="3" stroke-linecap="round"/>
                            <path class="clock-hand-short" d="M200 100 L 230 130" stroke="#333" stroke-width="3" stroke-linecap="round"/>
                            <circle class="clock-center" cx="200" cy="100" r="5" fill="#333"/>
                            <path class="heartbeat-line" d="M100 170 L 120 170 L 130 150 L 140 190 L 150 170 L 300 170" stroke="#FF6B6B" stroke-width="2" fill="none"/>
                            <text x="200" y="40" font-family="Arial" font-size="14" font-weight="bold" fill="#333" text-anchor="middle">Monitor Every 2 Minutes</text>
                        </svg>
                    </div>
                    <h4>Critical Monitoring Points:</h4>
                    <ul>
                        <li><strong>Breathing</strong> - Check that breathing remains normal</li>
                        <li><strong>Airway</strong> - Ensure the airway stays clear and open</li>
                        <li><strong>Circulation</strong> - Check skin color (pale or bluish skin may indicate poor circulation)</li>
                        <li><strong>Response</strong> - Continue to check for any response</li>
                    </ul>
                    
                    <h4>When to Reassess:</h4>
                    <ul>
                        <li>Check the child's condition every 2 minutes</li>
                        <li>If waiting for emergency services, maintain the recovery position and monitor continuously</li>
                        <li>If the child must be left alone briefly to call for help, check them immediately upon returning</li>
                    </ul>
                    
                    <h4>When to Change Position:</h4>
                    <ul>
                        <li>If the child has been in recovery position for more than 30 minutes, consider rolling them onto their other side (if safe to do so)</li>
                        <li>This helps prevent pressure injuries</li>
                    </ul>
                    
                    <div class="info-box warning-box">
                        <p><strong>Warning:</strong> If at any point breathing becomes abnormal or stops, immediately roll the child onto their back and begin CPR.</p>
                    </div>
                `
            },
            {
                id: 'assessment',
                title: 'Knowledge Check',
                content: `
                    <div class="quiz-container">
                        <div class="quiz-question">
                            <p>1. When should you place a child in the recovery position?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="a"> When they're conscious but injured
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="b"> When they're unconscious and not breathing
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="c"> When they're unconscious but breathing normally
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="d"> When they have a suspected spinal injury
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <div class="quiz-question">
                            <p>2. What is a recommended recovery position for an infant?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="a"> On their side with head supported and slightly lower than chest
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="b"> On their back with a pillow under their head
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="c"> On their stomach with head turned to the side
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="d"> In an upright seated position
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <div class="quiz-question">
                            <p>3. How often should you check a child in the recovery position?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="a"> Once every 15 minutes
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="b"> Only when emergency services arrive
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="c"> Every 2 minutes
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="d"> Only if their condition appears to change
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <button class="btn primary-btn quiz-submit">Submit Answers</button>
                    </div>
                `
            }
        ],
        answers: {
            q1: "c",
            q2: "a",
            q3: "c"
        }
    },
    choking: {
        title: 'Choking Management',
        description: "Learn to recognize and respond to choking emergencies in infants and children.",
        progress: 0,
        sections: [
            {
                id: 'intro',
                title: 'Introduction to Choking',
                content: `
                    <p>Choking occurs when a foreign object partially or completely blocks the airway, preventing normal breathing.</p>
                    <p>Children, especially those under 4 years of age, are at higher risk of choking due to their smaller airways and tendency to put objects in their mouths.</p>
                    <h4>Signs of Choking:</h4>
                    <ul>
                        <li><strong>Mild Obstruction:</strong> Coughing effectively, able to speak or cry, making sounds when breathing</li>
                        <li><strong>Severe Obstruction:</strong> Unable to speak, cry, or breathe, silent cough, blue/gray skin color (cyanosis), loss of consciousness</li>
                    </ul>
                    <div class="info-box">
                        <p><strong>Remember:</strong> If a child is coughing effectively, encourage them to continue coughing to clear the obstruction. Only intervene if the obstruction becomes severe.</p>
                    </div>
                `
            },
            {
                id: 'child-choking',
                title: 'Choking Management for Children (1-8 years)',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <circle class="adult-body" cx="150" cy="100" r="40" fill="#FF6B6B"/>
                            <circle class="child-body" cx="220" cy="110" r="25" fill="#4FC3F7"/>
                            <circle class="adult-head" cx="150" cy="45" r="20" fill="#FF6B6B"/>
                            <circle class="child-head" cx="220" cy="70" r="15" fill="#4FC3F7"/>
                            <path class="adult-arm-1" d="M180 100 Q 200 110 220 95" stroke="#FF6B6B" stroke-width="8" fill="none"/>
                            <path class="adult-arm-2" d="M180 100 Q 200 90 220 125" stroke="#FF6B6B" stroke-width="8" fill="none"/>
                            <path class="warning-sign" d="M225 70 L 240 60" stroke="#EF5350" stroke-width="2" stroke-dasharray="4"/>
                            <path class="warning-sign" d="M235 55 L 245 45" stroke="#EF5350" stroke-width="2" stroke-dasharray="4"/>
                            <text x="200" y="180" font-family="Arial" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">Back Blows Technique</text>
                        </svg>
                    </div>
                    <h4>Step-by-Step Management:</h4>
                    <ol>
                        <li>
                            <strong>Assess Severity</strong>
                            <p>Determine if the obstruction is mild or severe.</p>
                            <p>For mild obstruction (effective cough): Encourage the child to keep coughing and monitor closely.</p>
                            <p>For severe obstruction (ineffective or absent cough): Proceed with back blows.</p>
                        </li>
                        <li>
                            <strong>Back Blows</strong>
                            <p>Position yourself to the side and slightly behind the child.</p>
                            <p>Support the child's chest with one hand and lean them forward.</p>
                            <p>Give up to 5 sharp back blows between the shoulder blades with the heel of your hand.</p>
                            <p>Check after each blow if the obstruction has cleared.</p>
                        </li>
                        <li>
                            <strong>Abdominal Thrusts (if back blows are unsuccessful)</strong>
                            <p>Stand or kneel behind the child.</p>
                            <p>Place your fist just above the navel (belly button) with thumb against the abdomen.</p>
                            <p>Grasp your fist with your other hand and pull sharply inward and upward.</p>
                            <p>Give up to 5 abdominal thrusts.</p>
                            <p>Check after each thrust if the obstruction has cleared.</p>
                        </li>
                        <li>
                            <strong>Continue Alternating</strong>
                            <p>If the obstruction has not cleared, continue alternating 5 back blows and 5 abdominal thrusts.</p>
                        </li>
                        <li>
                            <strong>If the Child Becomes Unconscious</strong>
                            <p>Lower them carefully to the ground.</p>
                            <p>Call 000 immediately or ask someone else to call.</p>
                            <p>Begin CPR, starting with chest compressions.</p>
                            <p>Each time you open the airway to give rescue breaths, look in the mouth for the object.</p>
                        </li>
                    </ol>
                    <div class="info-box warning-box">
                        <p><strong>Warning:</strong> Do not perform blind finger sweeps in the mouth as this may push the object further into the airway.</p>
                    </div>
                `
            },
            {
                id: 'infant-choking',
                title: 'Choking Management for Infants (Under 1 year)',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <ellipse class="adult-body" cx="150" cy="120" rx="40" ry="30" fill="#FF6B6B"/>
                            <circle class="adult-head" cx="150" cy="70" r="20" fill="#FF6B6B"/>
                            <path class="adult-arm" d="M180 120 L 230 110" stroke="#FF6B6B" stroke-width="8" fill="none"/>
                            <path class="infant-body" d="M230 110 L 260 105 L 250 120 L 220 125 Z" fill="#FFD54F"/>
                            <circle class="infant-head" cx="270" cy="100" r="12" fill="#FFD54F"/>
                            <path class="back-blow" d="M210 110 L 230 110" stroke="#333" stroke-width="2" stroke-dasharray="4"/>
                            <path class="back-blow-arrow" d="M220 105 L 230 110 L 220 115" fill="#333"/>
                            <text x="200" y="180" font-family="Arial" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">Infant Choking Management</text>
                        </svg>
                    </div>
                    <h4>Step-by-Step Management for Infants:</h4>
                    <ol>
                        <li>
                            <strong>Assess Severity</strong>
                            <p>Determine if the obstruction is mild or severe.</p>
                            <p>For mild obstruction: Monitor the infant closely and allow them to cough.</p>
                            <p>For severe obstruction: Proceed with back blows and chest thrusts.</p>
                        </li>
                        <li>
                            <strong>Position the Infant</strong>
                            <p>Sit or kneel and lay the infant face down along your forearm, supporting their head and jaw with your hand.</p>
                            <p>Keep the infant's head lower than their body.</p>
                        </li>
                        <li>
                            <strong>Back Blows</strong>
                            <p>Support the infant on your forearm with their head lower than their chest.</p>
                            <p>Give up to 5 sharp back blows between the shoulder blades using the heel of your hand.</p>
                            <p>The force should be less than that used for a child or adult.</p>
                        </li>
                        <li>
                            <strong>Chest Thrusts (if back blows are unsuccessful)</strong>
                            <p>Turn the infant onto their back while supporting their head.</p>
                            <p>Place two fingers in the center of the chest, just below the nipple line.</p>
                            <p>Give up to 5 chest thrusts, pushing downward by about 1/3 of the chest depth.</p>
                            <p>Allow the chest to fully recoil between thrusts.</p>
                        </li>
                        <li>
                            <strong>Continue Alternating</strong>
                            <p>If the obstruction has not cleared, continue alternating 5 back blows and 5 chest thrusts.</p>
                        </li>
                        <li>
                            <strong>If the Infant Becomes Unconscious</strong>
                            <p>Lay them on a firm, flat surface.</p>
                            <p>Call 000 immediately or ask someone else to call.</p>
                            <p>Begin CPR, starting with chest compressions.</p>
                            <p>Each time you open the airway to give rescue breaths, look in the mouth for the object.</p>
                        </li>
                    </ol>
                    <div class="info-box warning-box">
                        <p><strong>Important:</strong> Never use abdominal thrusts (Heimlich maneuver) on infants, as this can cause internal injuries. Use chest thrusts instead.</p>
                    </div>
                `
            },
            {
                id: 'prevention',
                title: 'Choking Prevention',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <circle cx="150" cy="100" r="50" fill="#81C784" fill-opacity="0.2"/>
                            <circle cx="250" cy="100" r="50" fill="#EF5350" fill-opacity="0.2"/>
                            <text x="150" y="105" font-family="Arial" font-size="14" fill="#333" text-anchor="middle">Safe</text>
                            <text x="250" y="105" font-family="Arial" font-size="14" fill="#333" text-anchor="middle">Unsafe</text>
                            
                            <circle class="safe-item" cx="120" cy="80" r="10" fill="#81C784"/>
                            <circle class="safe-item" cx="150" cy="70" r="15" fill="#81C784"/>
                            <circle class="safe-item" cx="180" cy="80" r="12" fill="#81C784"/>
                            
                            <path class="unsafe-item" d="M230 80 L 250 70 L 270 80 L 250 90 Z" fill="#EF5350"/>
                            <path class="unsafe-item" d="M230 120 L 240 110 L 250 120 L 240 130 Z" fill="#EF5350"/>
                            <circle class="unsafe-item" cx="270" cy="120" r="8" fill="#EF5350"/>
                            
                            <line x1="150" y1="160" x2="250" y2="160" stroke="#333" stroke-width="2"/>
                            <circle class="coin-measure" cx="200" cy="160" r="10" fill="#FFD54F"/>
                            <text x="200" y="180" font-family="Arial" font-size="12" fill="#333" text-anchor="middle">Coin size comparison - choking hazard</text>
                    </div>
                    <h4>Common Choking Hazards for Children:</h4>
                    <ul>
                        <li><strong>Food:</strong> Hard lollies, nuts, raw carrots, grapes, hot dogs, popcorn, sticky foods</li>
                        <li><strong>Household Items:</strong> Coins, batteries, small toys, beads, buttons, pen caps, plastic bags</li>
                        <li><strong>Outdoor Items:</strong> Small stones, marbles, uninflated or broken balloons</li>
                    </ul>
                    
                    <h4>Prevention Strategies:</h4>
                    <ul>
                        <li><strong>Food Safety:</strong>
                            <ul>
                                <li>Cut food into small pieces (smaller than a child's airway)</li>
                                <li>Always supervise children while eating</li>
                                <li>Teach children to sit while eating and to chew food thoroughly</li>
                                <li>Avoid giving hard foods to children under 4 years</li>
                                <li>Cut round foods (like grapes) into quarters</li>
                            </ul>
                        </li>
                        <li><strong>Toy Safety:</strong>
                            <ul>
                                <li>Follow age recommendations on toy packages</li>
                                <li>Use a toilet paper roll to test - if an item fits inside, it's a potential choking hazard</li>
                                <li>Keep older children's toys away from younger siblings</li>
                                <li>Regularly check toys for loose or broken parts</li>
                            </ul>
                        </li>
                        <li><strong>Home Safety:</strong>
                            <ul>
                                <li>Get down to your child's eye level to spot hazards</li>
                                <li>Keep small objects out of reach</li>
                                <li>Secure loose batteries and magnets</li>
                                <li>Be vigilant with items like coins, jewelry, and buttons</li>
                            </ul>
                        </li>
                    </ul>
                    
                    <div class="info-box">
                        <p><strong>Did you know?</strong> In Australia, at least one child dies from choking each month, and hundreds more are admitted to hospital. Most of these incidents could be prevented.</p>
                    </div>
                `
            },
            {
                id: 'assessment',
                title: 'Knowledge Check',
                content: `
                    <div class="quiz-container">
                        <div class="quiz-question">
                            <p>1. What should you do if a 6-year-old child is choking but can still cough effectively?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="a"> Immediately perform back blows
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="b"> Give abdominal thrusts
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="c"> Encourage them to keep coughing and monitor closely
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="d"> Perform a finger sweep of their mouth
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <div class="quiz-question">
                            <p>2. Which sequence is correct for managing severe choking in a 9-month-old infant?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="a"> 5 back blows, then 5 chest thrusts
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="b"> 5 abdominal thrusts, then 5 back blows
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="c"> 5 chest thrusts only
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="d"> 5 gentle slaps on the back, then shake the infant
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <div class="quiz-question">
                            <p>3. Which of these foods should be modified before giving to young children to prevent choking?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="a"> Cooked rice
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="b"> Mashed potatoes
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="c"> Whole grapes
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="d"> Yogurt
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <button class="btn primary-btn quiz-submit">Submit Answers</button>
                    </div>
                `
            }
        ],
        answers: {
            q1: "c",
            q2: "a",
            q3: "c"
        }
    },
    respiratory: {
        title: 'Respiratory Distress',
        description: "Managing asthma and breathing difficulties in children and infants.",
        progress: 0,
        sections: [
            {
                id: 'intro',
                title: 'Introduction to Respiratory Distress',
                content: `
                    <p>Respiratory distress occurs when a child has difficulty breathing. It can range from mild to severe and may be caused by various conditions, including asthma, croup, pneumonia, or an allergic reaction.</p>
                    <p>Early recognition and appropriate response are crucial, as respiratory emergencies can quickly become life-threatening in children.</p>
                    <h4>Signs and Symptoms of Respiratory Distress:</h4>
                    <ul>
                        <li><strong>Increased breathing rate</strong> (faster than normal)</li>
                        <li><strong>Nasal flaring</strong> (nostrils widening with each breath)</li>
                        <li><strong>Retractions</strong> (skin pulling in around ribs or clavicles during breathing)</li>
                        <li><strong>Wheezing</strong> (high-pitched sound when breathing out)</li>
                        <li><strong>Grunting</strong> (making noise with each breath)</li>
                        <li><strong>Cyanosis</strong> (bluish color to lips, tongue, or skin)</li>
                        <li><strong>Difficulty speaking</strong> or inability to speak in full sentences</li>
                        <li><strong>Anxiety or restlessness</strong></li>
                    </ul>
                    <div class="info-box">
                        <p><strong>Important:</strong> Children compensate well until they suddenly deteriorate. Always take respiratory distress seriously, even if the child seems to be coping.</p>
                    </div>
                `
            },
            {
                id: 'asthma',
                title: 'Asthma Management',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <circle class="child-head" cx="150" cy="80" r="25" fill="#4FC3F7"/>
                            <path class="child-body" d="M130 105 L 170 105 L 180 160 L 120 160 Z" fill="#4FC3F7"/>
                            <path class="inhaler" d="M200 100 L 240 100 L 240 130 L 200 130 Z" fill="#9575CD"/>
                            <path class="inhaler-top" d="M240 105 L 260 95 L 260 125 L 240 125 Z" fill="#9575CD"/>
                            <path class="inhaler-mist" d="M200 115 C 190 115, 180 115, 170 115" fill="none" stroke="#9575CD" stroke-width="2" stroke-dasharray="3"/>
                            <ellipse class="lungs-background" cx="150" cy="130" rx="30" ry="25" fill="#81C784" fill-opacity="0.2"/>
                            <path class="lungs-outline" d="M135 120 Q 150 140, 165 120" fill="none" stroke="#81C784" stroke-width="2"/>
                            <text x="200" y="180" font-family="Arial" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">Asthma Reliever Medication</text>
                        </svg>
                    </div>
                    <h4>Recognizing an Asthma Attack:</h4>
                    <ul>
                        <li>Persistent coughing, especially at night</li>
                        <li>Wheezing or whistling sound when breathing</li>
                        <li>Shortness of breath</li>
                        <li>Tight feeling in the chest</li>
                        <li>Difficulty speaking in complete sentences</li>
                    </ul>
                    
                    <h4>4-Step Asthma First Aid:</h4>
                    <ol>
                        <li>
                            <strong>Sit the child upright</strong>
                            <p>Stay calm and reassure them. Do not leave them alone.</p>
                        </li>
                        <li>
                            <strong>Give 4 separate puffs of reliever inhaler (blue/gray)</strong>
                            <p>Use a spacer if available. Ask the child to take 4 breaths from the spacer after each puff.</p>
                            <p>Shake the inhaler before each puff.</p>
                        </li>
                        <li>
                            <strong>Wait 4 minutes</strong>
                            <p>If there's no improvement, give 4 more separate puffs.</p>
                        </li>
                        <li>
                            <strong>If still no improvement, call 000</strong>
                            <p>Continue giving 4 puffs every 4 minutes until emergency assistance arrives.</p>
                        </li>
                    </ol>
                    
                    <div class="info-box warning-box">
                        <p><strong>Call 000 immediately if:</strong></p>
                        <ul>
                            <li>The child is not improving after following the 4-step plan</li>
                            <li>The child is severely distressed</li>
                            <li>The child is unable to speak normally</li>
                            <li>The child's lips are turning blue</li>
                            <li>You're not sure if it's asthma</li>
                        </ul>
                    </div>
                `
            },
            {
                id: 'croup',
                title: 'Croup Management',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <circle class="child-head" cx="200" cy="70" r="30" fill="#FFD54F"/>
                            <path class="child-body" d="M175 100 L 225 100 L 235 160 L 165 160 Z" fill="#FFD54F"/>
                            <path class="steam" d="M160 125 C 170 115, 180 105, 190 115" fill="none" stroke="#81C784" stroke-width="2" stroke-dasharray="3"/>
                            <path class="steam" d="M180 120 C 190 110, 200 100, 210 110" fill="none" stroke="#81C784" stroke-width="2" stroke-dasharray="3"/>
                            <path class="steam" d="M200 125 C 210 115, 220 105, 230 115" fill="none" stroke="#81C784" stroke-width="2" stroke-dasharray="3"/>
                            <path class="throat-area" d="M190 80 L 210 80 L 205 100 L 195 100 Z" fill="#EF5350" fill-opacity="0.3"/>
                            <text x="200" y="180" font-family="Arial" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">Croup Management with Humid Air</text>
                        </svg>
                    </div>
                    <h4>About Croup:</h4>
                    <p>Croup is characterized by a distinctive barking cough that sounds like a seal bark. It's caused by inflammation of the voice box (larynx) and windpipe (trachea), usually due to a viral infection.</p>
                    
                    <h4>Symptoms of Croup:</h4>
                    <ul>
                        <li>Barking, seal-like cough (worse at night)</li>
                        <li>Harsh, high-pitched sound when breathing in (stridor)</li>
                        <li>Hoarse voice</li>
                        <li>Difficulty breathing that may worsen with agitation</li>
                    </ul>
                    
                    <h4>Managing Mild to Moderate Croup:</h4>
                    <ol>
                        <li>
                            <strong>Stay calm and keep the child calm</strong>
                            <p>Crying and distress can worsen symptoms.</p>
                        </li>
                        <li>
                            <strong>Sit the child upright</strong>
                            <p>This position helps them breathe more easily.</p>
                        </li>
                        <li>
                            <strong>Comfort and reassure</strong>
                            <p>Read a story, sing softly, or offer a favorite toy.</p>
                        </li>
                        <li>
                            <strong>Offer small sips of cool water</strong>
                            <p>This can soothe the throat and prevent dehydration.</p>
                        </li>
                        <li>
                            <strong>Consider humid air</strong>
                            <p>Sitting in a steamy bathroom (with hot shower running) may help, though research on its effectiveness is mixed.</p>
                        </li>
                    </ol>
                    
                    <div class="info-box warning-box">
                        <p><strong>Seek medical help immediately if:</strong></p>
                        <ul>
                            <li>The child is struggling to breathe</li>
                            <li>There's significant stridor at rest</li>
                            <li>The child becomes pale or bluish</li>
                            <li>The child is unusually sleepy or difficult to wake</li>
                            <li>The child is drooling or has difficulty swallowing</li>
                        </ul>
                    </div>
                `
            },
            {
                id: 'general-management',
                title: 'General Management of Respiratory Distress',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <path class="drsabcd-bg" d="M50 50 L 350 50 L 350 150 L 50 150 Z" fill="#4FC3F7" fill-opacity="0.2" rx="10" ry="10"/>
                            <text x="100" y="85" font-family="Arial" font-size="16" font-weight="bold" fill="#333">D - Danger</text>
                            <text x="100" y="115" font-family="Arial" font-size="16" font-weight="bold" fill="#333">R - Response</text>
                            <text x="240" y="85" font-family="Arial" font-size="16" font-weight="bold" fill="#333">S - Send for help</text>
                            <text x="240" y="115" font-family="Arial" font-size="16" font-weight="bold" fill="#333">A - Airway</text>
                            <text x="170" y="145" font-family="Arial" font-size="16" font-weight="bold" fill="#333">B - Breathing</text>
                            <text x="200" y="180" font-family="Arial" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">Follow DRSABCD for All Respiratory Emergencies</text>
                        </svg>
                    </div>
                    <h4>General Steps for Managing Respiratory Distress:</h4>
                    <ol>
                        <li>
                            <strong>Recognize the signs</strong>
                            <p>Early recognition of respiratory distress is crucial for effective intervention.</p>
                        </li>
                        <li>
                            <strong>Position the child appropriately</strong>
                            <p>Usually sitting upright or in a position of comfort that maximizes breathing efficiency.</p>
                            <p>For infants, hold them in a slightly upright position.</p>
                        </li>
                        <li>
                            <strong>Provide reassurance</strong>
                            <p>Stay calm and reassure the child to reduce anxiety, which can worsen breathing difficulties.</p>
                        </li>
                        <li>
                            <strong>Administer appropriate medication if available</strong>
                            <p>For known asthma: Use reliever medication as prescribed.</p>
                            <p>For known allergic reactions: Use adrenaline auto-injector if prescribed.</p>
                        </li>
                        <li>
                            <strong>Monitor closely</strong>
                            <p>Continuously assess breathing rate, effort, and level of consciousness.</p>
                            <p>Watch for signs of deterioration.</p>
                        </li>
                        <li>
                            <strong>Seek appropriate medical help</strong>
                            <p>Call 000 for severe distress.</p>
                            <p>For mild symptoms that don't improve, consult a healthcare provider.</p>
                        </li>
                    </ol>
                    
                    <h4>Do NOT:</h4>
                    <ul>
                        <li>Put anything in the child's mouth</li>
                        <li>Give food or drink if breathing is severely compromised</li>
                        <li>Lie the child flat if they're struggling to breathe</li>
                        <li>Leave the child alone</li>
                        <li>Delay seeking medical help if symptoms are severe or worsening</li>
                    </ul>
                    
                    <div class="info-box">
                        <p><strong>Remember:</strong> Respiratory distress can escalate quickly in children. Always err on the side of caution and seek medical help if you are concerned.</p>
                    </div>
                `
            },
            {
                id: 'assessment',
                title: 'Knowledge Check',
                content: `
                    <div class="quiz-container">
                        <div class="quiz-question">
                            <p>1. Which of these is NOT a sign of respiratory distress in a child?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="a"> Nasal flaring
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="b"> Wheezing
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="c"> Pink, warm skin
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="d"> Retractions (skin pulling in around ribs)
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <div class="quiz-question">
                            <p>2. What is the first step in the 4-step asthma first aid plan?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="a"> Give 4 puffs of reliever medication
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="b"> Call 000
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="c"> Sit the child upright
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="d"> Wait 4 minutes to see if symptoms improve
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <div class="quiz-question">
                            <p>3. Which of these is a distinctive symptom of croup?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="a"> High fever only
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="b"> Barking, seal-like cough
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="c"> Rapid breathing without sound
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="d"> Runny nose with clear discharge
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <button class="btn primary-btn quiz-submit">Submit Answers</button>
                    </div>
                `
            }
        ],
        answers: {
            q1: "c",
            q2: "c",
            q3: "b"
        }
    },
    drowning: {
        title: 'Drowning Prevention & Response',
        description: "Learn to prevent water emergencies and respond effectively to drowning incidents.",
        progress: 0,
        sections: [
            {
                id: 'intro',
                title: 'Understanding Drowning',
                content: `
                    <p>Drowning is a leading cause of accidental death in children in Australia, especially for those under 5 years of age. Drowning can occur in as little as 20 seconds and in just a few centimeters of water.</p>
                    <p>Understanding drowning and how to prevent it is crucial for all parents and caregivers.</p>
                    <h4>Key Facts About Drowning:</h4>
                    <ul>
                        <li>Drowning is often silent - many children drown without splashing or calling for help</li>
                        <li>It can happen very quickly - in the time it takes to answer a phone call</li>
                        <li>Drowning can occur in bathtubs, buckets, pools, spas, dams, rivers, and at beaches</li>
                        <li>For every fatal drowning, many more children suffer non-fatal drowning with potential long-term health effects</li>
                    </ul>
                    <div class="info-box">
                        <p><strong>Did you know?</strong> In Australia, drowning remains one of the leading causes of preventable death in children under 5 years. Most drownings in this age group occur in home swimming pools.</p>
                    </div>
                `
            },
            {
                id: 'prevention',
                title: 'Drowning Prevention',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <path class="water" d="M50 130 C 80 110, 120 150, 150 130 C 180 110, 220 150, 250 130 C 280 110, 320 150, 350 130 L 350 180 L 50 180 Z" fill="#4FC3F7" fill-opacity="0.7"/>
                            <rect class="pool-fence" x="70" y="90" width="260" height="40" fill="none" stroke="#333" stroke-width="2" rx="5"/>
                            <path class="fence-posts" d="M90 90 L 90 130 M 130 90 L 130 130 M 170 90 L 170 130 M 210 90 L 210 130 M 250 90 L 250 130 M 290 90 L 290 130" stroke="#333" stroke-width="2"/>
                            <rect class="gate" x="170" y="90" width="60" height="40" fill="none" stroke="#EF5350" stroke-width="3" rx="5"/>
                            <circle class="lock" cx="220" cy="110" r="5" fill="#EF5350"/>
                            <path class="adult-supervision" d="M120 70 C 110 60, 100 60, 90 70 C 80 80, 80 90, 90 100" stroke="#81C784" stroke-width="3" fill="none"/>
                            <circle class="adult-head" cx="110" cy="60" r="15" fill="#81C784"/>
                            <circle class="child-head" cx="100" cy="85" r="10" fill="#FFD54F"/>
                            <text x="200" y="180" font-family="Arial" font-size="16" font-weight="bold" fill="white" text-anchor="middle">Supervision + Barriers = Prevention</text>
                        </svg>
                    </div>
                    <h4>The Four Layers of Protection:</h4>
                    <ol>
                        <li>
                            <strong>Supervision</strong>
                            <p>Active, constant supervision by a responsible adult is the most critical drowning prevention strategy.</p>
                            <ul>
                                <li>Always designate a specific adult to watch children near water</li>
                                <li>Maintain constant visual contact</li>
                                <li>Stay within arm's reach of infants and toddlers in water ("touch supervision")</li>
                                <li>Avoid distractions like phones, reading, or household chores when supervising</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Barriers</strong>
                            <p>Physical barriers prevent unsupervised access to water.</p>
                            <ul>
                                <li>Install four-sided pool fencing (at least 1.2m high) with self-closing, self-latching gates</li>
                                <li>Regularly check and maintain fences and gates</li>
                                <li>Secure doors and windows that provide access to water</li>
                                <li>Use toilet locks for young children</li>
                                <li>Empty buckets, bathtubs, and wading pools immediately after use</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Swimming Skills</strong>
                            <p>While not a substitute for supervision, water familiarization and swimming lessons can help.</p>
                            <ul>
                                <li>Enroll children in age-appropriate water safety lessons</li>
                                <li>Learn basic swimming and water safety skills yourself</li>
                                <li>Teach children to never swim alone</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Emergency Preparedness</strong>
                            <p>Be prepared for water emergencies.</p>
                            <ul>
                                <li>Learn CPR and keep skills updated</li>
                                <li>Keep rescue equipment near water areas</li>
                                <li>Have a phone nearby to call emergency services</li>
                                <li>Create and practice a water emergency plan</li>
                            </ul>
                        </li>
                    </ol>
                    
                    <div class="info-box">
                        <p><strong>Remember:</strong> No single layer of protection is enough on its own. Multiple layers work together to provide the best protection against drowning.</p>
                    </div>
                `
            },
            {
                id: 'response',
                title: 'Responding to Drowning',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <rect class="ground" x="50" y="160" width="300" height="20" fill="#81C784" fill-opacity="0.3"/>
                            <path class="water-edge" d="M50 160 L 350 160" stroke="#4FC3F7" stroke-width="2" stroke-dasharray="5"/>
                            <circle class="child-head" cx="150" cy="140" r="15" fill="#FFD54F"/>
                            <path class="child-body" d="M140 155 L 160 155 L 165 180 L 135 180 Z" fill="#FFD54F"/>
                            <circle class="rescuer-head" cx="200" cy="120" r="20" fill="#FF6B6B"/>
                            <path class="rescuer-body" d="M180 140 L 220 140 L 230 180 L 170 180 Z" fill="#FF6B6B"/>
                            <path class="rescuer-arm" d="M220 150 C 230 140, 240 140, 250 150" stroke="#FF6B6B" stroke-width="8" fill="none"/>
                            <path class="cpr-indication" d="M150 140 L 150 130 M 150 130 L 140 120 M 150 130 L 160 120" stroke="#EF5350" stroke-width="2" stroke-dasharray="3"/>
                            <text x="200" y="100" font-family="Arial" font-size="14" font-weight="bold" fill="#333" text-anchor="middle">Remember DRSABCD</text>
                            <text x="200" y="190" font-family="Arial" font-size="12" fill="#333" text-anchor="middle">Always check for Danger before rescue</text>
                        </svg>
                    </div>
                    <h4>Immediate Response to Drowning:</h4>
                    <ol>
                        <li>
                            <strong>Check for Danger</strong>
                            <p>Ensure it's safe for you to help. Never put yourself at risk.</p>
                            <p>Look for hazards like electricity, strong currents, or deep water.</p>
                        </li>
                        <li>
                            <strong>Remove from Water</strong>
                            <p>If safe to do so, remove the child from water as quickly as possible.</p>
                            <p>For open water rescues, remember: "Reach, throw, row, go"</p>
                            <ul>
                                <li><strong>Reach</strong> with an object like a pole or branch</li>
                                <li><strong>Throw</strong> a flotation device if reaching isn't possible</li>
                                <li><strong>Row</strong> using a boat if available</li>
                                <li><strong>Go</strong> into the water only as a last resort (and only if trained)</li>
                            </ul>
                        </li>
                        <li>
                            <strong>Call for Help</strong>
                            <p>Call 000 immediately or ask someone else to call while you begin first aid.</p>
                        </li>
                        <li>
                            <strong>Check for Response</strong>
                            <p>Gently tap the child and check if they respond.</p>
                        </li>
                        <li>
                            <strong>Open Airway</strong>
                            <p>Tilt the head slightly back and lift the chin (for a child).</p>
                            <p>Position the head in neutral position for an infant.</p>
                        </li>
                        <li>
                            <strong>Check Breathing</strong>
                            <p>Look, listen, and feel for breathing for up to 10 seconds.</p>
                        </li>
                        <li>
                            <strong>Begin CPR if Not Breathing Normally</strong>
                            <p>Start with 5 initial rescue breaths, then continue with 30 compressions followed by 2 breaths.</p>
                            <p>Continue until help arrives or the child starts breathing normally.</p>
                        </li>
                    </ol>
                    
                    <div class="info-box warning-box">
                        <p><strong>Important:</strong> Even if a child has been rescued from water and appears to recover, they should still be medically assessed. "Secondary drowning" can occur hours after water inhalation.</p>
                    </div>
                `
            },
            {
                id: 'secondary-drowning',
                title: 'Secondary Drowning',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <circle class="clock" cx="100" cy="80" r="30" fill="white" stroke="#333" stroke-width="2"/>
                            <path class="clock-hand" d="M100 80 L 100 60" stroke="#333" stroke-width="2"/>
                            <path class="clock-hand" d="M100 80 L 115 95" stroke="#333" stroke-width="2"/>
                            <text x="100" y="120" font-family="Arial" font-size="12" fill="#333" text-anchor="middle">Watch for 24h</text>
                            
                            <circle class="lung-outline" cx="200" cy="80" r="30" fill="none" stroke="#333" stroke-width="2"/>
                            <path class="lung-detail" d="M185 65 C 190 70, 195 75, 190 85 M 215 65 C 210 70, 205 75, 210 85" stroke="#333" stroke-width="1"/>
                            <path class="water-in-lung" d="M180 90 C 190 85, 210 85, 220 90 L 220 100 L 180 100 Z" fill="#4FC3F7" fill-opacity="0.5"/>
                            <text x="200" y="120" font-family="Arial" font-size="12" fill="#333" text-anchor="middle">Water in Lungs</text>
                            
                            <rect class="medical-cross" x="280" y="60" width="40" height="40" fill="white" stroke="#EF5350" stroke-width="2"/>
                            <path class="cross" d="M290 80 L 310 80 M 300 70 L 300 90" stroke="#EF5350" stroke-width="3"/>
                            <text x="300" y="120" font-family="Arial" font-size="12" fill="#333" text-anchor="middle">Seek Medical Help</text>
                            
                            <text x="200" y="160" font-family="Arial" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">Be Alert for Delayed Symptoms</text>
                        </svg>
                    </div>
                    <h4>Understanding Secondary Drowning:</h4>
                    <p>Secondary drowning (also called delayed drowning) occurs when a small amount of water enters the lungs, causing inflammation and swelling. Symptoms may not appear until 1-24 hours after water exposure.</p>
                    
                    <h4>Warning Signs to Watch For:</h4>
                    <ul>
                        <li><strong>Breathing difficulties</strong> - Persistent coughing, wheezing, or rapid breathing</li>
                        <li><strong>Extreme fatigue</strong> - Unusual tiredness or lethargy</li>
                        <li><strong>Behavioral changes</strong> - Irritability or altered mental state</li>
                        <li><strong>Chest pain</strong> - Especially with breathing</li>
                        <li><strong>Vomiting</strong></li>
                        <li><strong>Blue lips or face</strong> (cyanosis)</li>
                        <li><strong>Fever</strong></li>
                    </ul>
                    
                    <h4>When to Seek Medical Attention:</h4>
                    <p>ANY child who has had a significant water incident (submersion or struggle in water) should be medically assessed, even if they seem fine initially.</p>
                    
                    <p>Seek immediate medical attention if your child develops any of the above symptoms within 24 hours of a water incident.</p>
                    
                    <div class="info-box warning-box">
                        <p><strong>Critical:</strong> Secondary drowning can be fatal if not treated. Always err on the side of caution and seek medical assessment after ANY submersion incident, especially if the child coughed extensively after being in water.</p>
                    </div>
                `
            },
            {
                id: 'assessment',
                title: 'Knowledge Check',
                content: `
                    <div class="quiz-container">
                        <div class="quiz-question">
                            <p>1. What is the first step when responding to a drowning incident?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="a"> Call 000
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="b"> Check for danger to yourself
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="c"> Remove the person from water
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="d"> Begin CPR immediately
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <div class="quiz-question">
                            <p>2. What does "touch supervision" mean in water safety?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="a"> Touching the water to check its temperature before children enter
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="b"> Teaching children to touch the bottom of the pool with their feet
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="c"> Staying within arm's reach of children in the water
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="d"> Touching children occasionally to make sure they're okay
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <div class="quiz-question">
                            <p>3. Which of these is a sign of possible secondary drowning?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="a"> Hunger
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="b"> Difficulty breathing or persistent coughing
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="c"> Mild headache
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="d"> Sunburn
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <button class="btn primary-btn quiz-submit">Submit Answers</button>
                    </div>
                `
            }
        ],
        answers: {
            q1: "b",
            q2: "c",
            q3: "b"
        }
    },
    allergies: {
        title: 'Allergic Reactions & Anaphylaxis',
        description: "Learn to identify and respond to allergic reactions and anaphylaxis in children.",
        progress: 0,
        sections: [
            {
                id: 'intro',
                title: 'Understanding Allergies & Anaphylaxis',
                content: `
                    <p>Allergic reactions occur when the immune system overreacts to substances (allergens) that are typically harmless to most people. In children, allergic reactions can range from mild to severe, with anaphylaxis being the most serious form.</p>
                    <p>Australia has one of the highest rates of food allergies in the world, affecting 1 in 10 infants and about 1 in 20 children up to 5 years of age.</p>
                    <h4>Common Allergens in Children:</h4>
                    <ul>
                        <li><strong>Foods:</strong> Eggs, cow's milk, peanuts, tree nuts, soy, wheat, fish, shellfish</li>
                        <li><strong>Insect stings:</strong> Bees, wasps, ants</li>
                        <li><strong>Medications:</strong> Antibiotics, non-steroidal anti-inflammatory drugs</li>
                        <li><strong>Other:</strong> Latex, animal dander, pollen</li>
                    </ul>
                    <div class="info-box">
                        <p><strong>Important:</strong> Anaphylaxis is a severe, potentially life-threatening allergic reaction that can develop rapidly. Recognizing and responding quickly to anaphylaxis is critical.</p>
                    </div>
                `
            },
            {
                id: 'signs-symptoms',
                title: 'Signs & Symptoms',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <circle class="head" cx="200" cy="70" r="30" fill="#FFD54F"/>
                            <path class="mild-symptoms" d="M190 60 C 195 55, 205 55, 210 60" stroke="#81C784" stroke-width="2" fill="none"/>
                            <circle class="eye" cx="185" cy="65" r="5" fill="white" stroke="#333"/>
                            <circle class="eye" cx="215" cy="65" r="5" fill="white" stroke="#333"/>
                            <path class="face-rash" d="M180 75 L 185 75 M 190 75 L 195 75 M 205 75 L 210 75 M 215 75 L 220 75" stroke="#EF5350" stroke-width="2"/>
                            
                            <path class="body" d="M180 100 L 220 100 L 230 160 L 170 160 Z" fill="#FFD54F"/>
                            <path class="severe-symptoms" d="M200 115 C 190 120, 180 130, 180 140 M 200 115 C 210 120, 220 130, 220 140" stroke="#EF5350" stroke-width="3" fill="none"/>
                            <path class="breathing" d="M190 125 L 210 125" stroke="#333" stroke-width="2" stroke-dasharray="2"/>
                            
                            <text x="110" y="70" font-family="Arial" font-size="12" fill="#81C784" font-weight="bold">Mild:</text>
                            <text x="110" y="90" font-family="Arial" font-size="10" fill="#333">• Hives, rash</text>
                            <text x="110" y="105" font-family="Arial" font-size="10" fill="#333">• Swelling of lips, face</text>
                            <text x="110" y="120" font-family="Arial" font-size="10" fill="#333">• Itchy or runny nose</text>
                            
                            <text x="290" y="70" font-family="Arial" font-size="12" fill="#EF5350" font-weight="bold">Severe:</text>
                            <text x="290" y="90" font-family="Arial" font-size="10" fill="#333">• Difficult breathing</text>
                            <text x="290" y="105" font-family="Arial" font-size="10" fill="#333">• Swelling of tongue</text>
                            <text x="290" y="120" font-family="Arial" font-size="10" fill="#333">• Pale and floppy (young)</text>
                            
                            <text x="200" y="185" font-family="Arial" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">Recognizing Allergic Reactions</text>
                        </svg>
                    </div>
                    <h4>Mild to Moderate Allergic Reaction Symptoms:</h4>
                    <ul>
                        <li>Swelling of face, lips, eyes</li>
                        <li>Hives or welts (raised, itchy red bumps)</li>
                        <li>Tingling or itchy mouth</li>
                        <li>Abdominal pain, vomiting (these are signs of anaphylaxis for insect sting or medication allergies)</li>
                    </ul>
                    
                    <h4>Anaphylaxis (Severe Allergic Reaction) Symptoms:</h4>
                    <ul>
                        <li><strong>Difficult/noisy breathing</strong></li>
                        <li><strong>Swelling of tongue</strong></li>
                        <li><strong>Swelling/tightness in throat</strong></li>
                        <li><strong>Difficulty talking and/or hoarse voice</strong></li>
                        <li><strong>Wheeze or persistent cough</strong></li>
                        <li><strong>Persistent dizziness or collapse</strong></li>
                        <li><strong>Pale and floppy (young children)</strong></li>
                        <li><strong>Abdominal pain, vomiting (for food allergic reactions)</strong></li>
                    </ul>
                    
                    <div class="info-box warning-box">
                        <p><strong>Remember:</strong> Anaphylaxis can start with mild symptoms that progress rapidly. ANY respiratory or cardiovascular symptoms should be treated as anaphylaxis.</p>
                    </div>
                `
            },
            {
                id: 'management',
                title: 'Management of Allergic Reactions',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <rect class="epipen" x="120" y="70" width="160" height="30" rx="5" fill="#FFB74D"/>
                            <path class="epipen-cap" d="M120 85 L 100 85 L 110 70 L 110 100 Z" fill="#FFB74D" stroke="#333"/>
                            <rect class="epipen-label" x="150" y="75" width="100" height="20" fill="white"/>
                            <text x="200" y="90" font-family="Arial" font-size="12" fill="#EF5350" text-anchor="middle" font-weight="bold">ADRENALINE</text>
                            <path class="epipen-needle" d="M280 85 L 290 85" stroke="#333" stroke-width="2"/>
                            <path class="usage-instruction" d="M200 120 L 200 140 L 240 140" stroke="#333" stroke-width="1" stroke-dasharray="2"/>
                            <path class="arrow" d="M235 135 L 240 140 L 235 145" stroke="#333" stroke-width="1"/>
                            <path class="leg-outline" d="M260 120 C 280 120, 300 130, 300 160 C 300 180, 280 190, 260 190 C 240 190, 220 180, 220 160 C 220 130, 240 120, 260 120 Z" fill="#FFD54F" fill-opacity="0.3" stroke="#333"/>
                            <path class="injection-site" d="M260 155 C 265 150, 275 150, 280 155 C 285 160, 285 170, 280 175 C 275 180, 265 180, 260 175 C 255 170, 255 160, 260 155 Z" fill="#FF6B6B" fill-opacity="0.3"/>
                            <text x="200" y="180" font-family="Arial" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">Adrenaline Auto-Injector (EpiPen®)</text>
                        </svg>
                    </div>
                    <h4>For Mild to Moderate Allergic Reactions:</h4>
                    <ol>
                        <li>
                            <strong>Stay with the child</strong> and call for assistance
                        </li>
                        <li>
                            <strong>Locate the child's allergy action plan</strong> if available
                        </li>
                        <li>
                            <strong>Remove the allergen</strong> if possible (e.g., remove stinger for bee stings)
                        </li>
                        <li>
                            <strong>Administer antihistamine</strong> if prescribed and available
                        </li>
                        <li>
                            <strong>Contact the parent/guardian</strong>
                        </li>
                        <li>
                            <strong>Monitor for signs of anaphylaxis</strong>
                        </li>
                    </ol>
                    
                    <h4>For Anaphylaxis (Severe Allergic Reaction):</h4>
                    <ol>
                        <li>
                            <strong>Lay the child flat</strong>
                            <p>If breathing is difficult, allow them to sit but not stand</p>
                            <p>If unconscious or pregnant, place in recovery position</p>
                        </li>
                        <li>
                            <strong>Administer adrenaline autoinjector (EpiPen®)</strong>
                            <p>Follow the instructions on the device</p>
                            <p>For children under 20kg, use a lower dose device if available (EpiPen Jr®)</p>
                        </li>
                        <li>
                            <strong>Call 000</strong>
                            <p>State that the child is having anaphylaxis</p>
                        </li>
                        <li>
                            <strong>Further adrenaline doses</strong> may be given if no response after 5 minutes
                        </li>
                        <li>
                            <strong>Commence CPR</strong> if the child stops breathing or loses consciousness
                        </li>
                        <li>
                            <strong>Contact parent/guardian</strong>
                        </li>
                        <li>
                            <strong>Transport to hospital</strong>
                            <p>Even if symptoms resolve, the child should be transported to hospital for observation</p>
                        </li>
                    </ol>
                    
                    <div class="info-box">
                        <p><strong>Remember:</strong> If in doubt, give the adrenaline autoinjector. It is better to give it unnecessarily than not give it when needed.</p>
                    </div>
                `
            },
            {
                id: 'using-epipen',
                title: 'Using an Adrenaline Auto-Injector',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <!-- Step 1 -->
                            <g class="step-1">
                                <rect x="70" y="50" width="80" height="100" fill="white" stroke="#333" rx="5"/>
                                <rect class="epipen-1" x="85" y="70" width="50" height="15" rx="3" fill="#FFB74D"/>
                                <path class="epipen-cap-1" d="M85 77.5 L 75 77.5 L 80 70 L 80 85 Z" fill="#FFB74D" stroke="#333"/>
                                <text x="110" y="110" font-family="Arial" font-size="10" fill="#333" text-anchor="middle">Remove blue</text>
                                <text x="110" y="125" font-family="Arial" font-size="10" fill="#333" text-anchor="middle">safety cap</text>
                                <text x="110" y="170" font-family="Arial" font-size="12" fill="#333" font-weight="bold" text-anchor="middle">STEP 1</text>
                            </g>
                            
                            <!-- Step 2 -->
                            <g class="step-2">
                                <rect x="160" y="50" width="80" height="100" fill="white" stroke="#333" rx="5"/>
                                <rect class="epipen-2" x="175" y="70" width="50" height="15" rx="3" fill="#FFB74D"/>
                                <path class="leg-outline-2" d="M185 90 C 175 100, 175 120, 185 130 C 195 140, 215 140, 225 130 C 235 120, 235 100, 225 90 Z" fill="#FFD54F" fill-opacity="0.3" stroke="#333"/>
                                <line class="place-line" x1="200" y1="70" x2="200" y2="110" stroke="#EF5350" stroke-width="2" stroke-dasharray="3"/>
                                <text x="200" y="170" font-family="Arial" font-size="12" fill="#333" font-weight="bold" text-anchor="middle">STEP 2</text>
                                <text x="200" y="155" font-family="Arial" font-size="10" fill="#333" text-anchor="middle">Place orange end against</text>
                                <text x="200" y="142" font-family="Arial" font-size="10" fill="#333" text-anchor="middle">outer mid-thigh</text>
                            </g>
                            
                            <!-- Step 3 -->
                            <g class="step-3">
                                <rect x="250" y="50" width="80" height="100" fill="white" stroke="#333" rx="5"/>
                                <rect class="epipen-3" x="265" y="70" width="50" height="15" rx="3" fill="#FFB74D"/>
                                <path class="leg-outline-3" d="M275 90 C 265 100, 265 120, 275 130 C 285 140, 305 140, 315 130 C 325 120, 325 100, 315 90 Z" fill="#FFD54F" fill-opacity="0.3" stroke="#333"/>
                                <path class="push-arrow" d="M290 60 L 290 90" stroke="#EF5350" stroke-width="2"/>
                                <path class="arrow-head" d="M285 85 L 290 90 L 295 85" stroke="#EF5350" stroke-width="2"/>
                                <text x="290" y="170" font-family="Arial" font-size="12" fill="#333" font-weight="bold" text-anchor="middle">STEP 3</text>
                                <text x="290" y="155" font-family="Arial" font-size="10" fill="#333" text-anchor="middle">Push down hard until</text>
                                <text x="290" y="142" font-family="Arial" font-size="10" fill="#333" text-anchor="middle">a click is heard</text>
                            </g>
                            
                            <text x="200" y="30" font-family="Arial" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">How to Use an EpiPen®</text>
                        </svg>
                    </div>
                    <h4>Steps for Using an EpiPen®:</h4>
                    <ol>
                        <li>
                            <strong>Form a fist around the EpiPen® with the orange end pointing downward</strong>
                            <p>Remove the blue safety cap by pulling straight up - don't bend or twist</p>
                        </li>
                        <li>
                            <strong>Place the orange end against the outer mid-thigh</strong>
                            <p>Can be administered through clothing</p>
                            <p>Make sure there's nothing in pockets that might obstruct the device</p>
                        </li>
                        <li>
                            <strong>Push down hard until a click is heard</strong>
                            <p>Hold in place for 3 seconds</p>
                        </li>
                        <li>
                            <strong>Remove the EpiPen®</strong>
                            <p>The orange tip will extend to cover the needle</p>
                        </li>
                        <li>
                            <strong>Massage the injection site</strong> for 10 seconds
                        </li>
                    </ol>
                    
                    <h4>After Administering:</h4>
                    <ul>
                        <li>Call 000 if not already done</li>
                        <li>Note the time of administration</li>
                        <li>Give the used EpiPen® to paramedics</li>
                        <li>Be prepared to administer a second dose after 5 minutes if symptoms don't improve</li>
                    </ul>
                    
                    <div class="info-box warning-box">
                        <p><strong>Important:</strong> Different brands of adrenaline auto-injectors (e.g., Anapen®) may have different instructions. Always familiarize yourself with the specific device a child might have.</p>
                    </div>
                `
            },
            {
                id: 'prevention-management',
                title: 'Prevention & Long-term Management',
                content: `
                    <div class="info-box">
                        <p><strong>Note:</strong> While prevention and long-term management of allergies are primarily the responsibility of parents and healthcare providers, caregivers should be aware of these principles to support children with allergies.</p>
                    </div>
                    
                    <h4>Allergy Prevention Strategies:</h4>
                    <ul>
                        <li><strong>Allergen Avoidance:</strong>
                            <ul>
                                <li>Read food labels carefully (for food allergies)</li>
                                <li>Be aware of cross-contamination risks</li>
                                <li>Communicate with schools, childcare, and other caregivers</li>
                                <li>Follow guidance about high-risk environments (for insect allergies)</li>
                            </ul>
                        </li>
                        <li><strong>Education:</strong>
                            <ul>
                                <li>Educate the child (age-appropriately) about their allergies</li>
                                <li>Teach them to inform adults if they experience symptoms</li>
                                <li>Ensure all caregivers recognize allergy symptoms and know the emergency plan</li>
                            </ul>
                        </li>
                        <li><strong>Medical Alert Identification:</strong>
                            <ul>
                                <li>Consider medical alert bracelets or necklaces for children with severe allergies</li>
                            </ul>
                        </li>
                    </ul>
                    
                    <h4>Action Plans:</h4>
                    <p>All children with known allergies should have an ASCIA (Australasian Society of Clinical Immunology and Allergy) Action Plan provided by their doctor.</p>
                    <ul>
                        <li>The action plan should be kept with the child's adrenaline autoinjector</li>
                        <li>Copies should be provided to schools, childcare facilities, and other regular caregivers</li>
                        <li>Review and update the plan annually or when circumstances change</li>
                    </ul>
                    
                    <div class="info-box">
                        <p><strong>Resources:</strong> The ASCIA website (www.allergy.org.au) provides downloadable action plans and comprehensive information about allergies in Australia.</p>
                    </div>
                `
            },
            {
                id: 'assessment',
                title: 'Knowledge Check',
                content: `
                    <div class="quiz-container">
                        <div class="quiz-question">
                            <p>1. Which of these symptoms indicates anaphylaxis (severe allergic reaction)?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="a"> Mild hives on the arm
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="b"> Runny nose
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="c"> Swelling of the tongue or difficulty breathing
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="d"> Slight redness around the mouth
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <div class="quiz-question">
                            <p>2. What is the correct first action for a child experiencing anaphylaxis?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="a"> Give an antihistamine
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="b"> Call the child's parents
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="c"> Administer an adrenaline autoinjector (EpiPen®)
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="d"> Apply a cold compress
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <div class="quiz-question">
                            <p>3. After administering an EpiPen®, what should you do next?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="a"> Wait to see if symptoms improve before calling emergency services
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="b"> Call 000 and continue to monitor the child
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="c"> Immediately administer a second dose
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="d"> Drive the child to hospital yourself
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <button class="btn primary-btn quiz-submit">Submit Answers</button>
                    </div>
                `
            }
        ],
        answers: {
            q1: "c",
            q2: "c",
            q3: "b"
        }
    },
    fever: {
        title: 'Fever & Febrile Convulsions',
        description: "Managing high temperatures and febrile seizures in infants and children.",
        progress: 0,
        sections: [
            {
                id: 'intro',
                title: 'Understanding Fever in Children',
                content: `
                    <p>Fever is a rise in body temperature above normal, typically defined as a temperature above 38°C. It is a natural response of the body to infection and often helps the immune system fight illness.</p>
                    <p>While fevers can be concerning for parents and caregivers, most are not harmful and are simply a sign that the body is fighting an infection.</p>
                    <h4>Normal Body Temperature Range:</h4>
                    <ul>
                        <li>Rectal: 36.6°C - 38°C (most accurate for young children)</li>
                        <li>Oral: 35.5°C - 37.5°C</li>
                        <li>Axillary (armpit): 34.7°C - 37.3°C</li>
                        <li>Tympanic (ear): 35.8°C - 38°C</li>
                        <li>Forehead/temporal: 35.8°C - 37.8°C</li>
                    </ul>
                    <div class="info-box">
                        <p><strong>Note:</strong> The height of a fever does not necessarily indicate the severity of the illness. A child's overall appearance, behavior, and other symptoms are more important indicators.</p>
                    </div>
                `
            },
            {
                id: 'fever-management',
                title: 'Managing Fever in Children',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            
                            <rect class="thermometer" x="90" y="60" width="20" height="80" rx="10" fill="white" stroke="#333"/>
                            <rect class="temp-indicator" x="95" y="100" width="10" height="35" rx="5" fill="#EF5350"/>
                            <circle class="temp-bulb" cx="100" cy="140" r="15" fill="#EF5350"/>
                            
                            <path class="clothing" d="M230 80 C 210 75, 200 85, 200 100 L 220 100 L 210 110 L 230 110 L 220 120 L 240 120" stroke="#81C784" stroke-width="2" fill="none"/>
                            <text x="230" y="145" font-family="Arial" font-size="10" fill="#333" text-anchor="middle">Light clothing</text>
                            
                            <path class="water-glass" d="M320 90 L 330 120 L 350 120 L 360 90 Z" fill="none" stroke="#4FC3F7" stroke-width="2"/>
                            <path class="water" d="M333 120 L 347 120 L 343 105 L 337 105 Z" fill="#4FC3F7"/>
                            <text x="340" y="145" font-family="Arial" font-size="10" fill="#333" text-anchor="middle">Regular fluids</text>
                            
                            <text x="100" y="175" font-family="Arial" font-size="12" fill="#333" text-anchor="middle">Monitor temperature</text>
                            <text x="200" y="175" font-family="Arial" font-size="12" fill="#333" text-anchor="middle">Keep comfortable</text>
                            <text x="340" y="175" font-family="Arial" font-size="12" fill="#333" text-anchor="middle">Offer fluids often</text>
                            
                            <text x="200" y="40" font-family="Arial" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">Fever Management</text>
                        </svg>
                    </div>
                    <h4>How to Manage Fever at Home:</h4>
                    <ol>
                        <li>
                            <strong>Keep the child comfortable</strong>
                            <p>Dress in light clothing</p>
                            <p>Keep room temperature comfortable (not too hot or cold)</p>
                            <p>Use a light blanket or sheet if the child feels cold</p>
                        </li>
                        <li>
                            <strong>Offer plenty of fluids</strong>
                            <p>Water, diluted juice, or electrolyte solutions for older children</p>
                            <p>Breast milk or formula for infants</p>
                            <p>Offer small amounts frequently if the child doesn't want to drink much at once</p>
                        </li>
                        <li>
                            <strong>Monitor temperature</strong>
                            <p>Check temperature periodically, but avoid waking a sleeping child just to take their temperature</p>
                            <p>Digital thermometers are recommended for accuracy</p>
                        </li>
                        <li>
                            <strong>Medication (if needed)</strong>
                            <p>Paracetamol or ibuprofen can help reduce fever and discomfort</p>
                            <p>Always follow dosage instructions based on the child's weight and age</p>
                            <p>Never give aspirin to children due to the risk of Reye's syndrome</p>
                        </li>
                    </ol>
                    
                    <div class="info-box warning-box">
                        <p><strong>Important:</strong> The goal of treating fever is to improve the child's comfort, not necessarily to normalize the temperature.</p>
                    </div>
                    
                    <h4>Do NOT:</h4>
                    <ul>
                        <li>Use alcohol baths or rubs</li>
                        <li>Use cold baths or ice packs</li>
                        <li>Over-bundle the child</li>
                        <li>Alternate paracetamol and ibuprofen routinely (consult a healthcare provider first)</li>
                    </ul>
                `
            },
            {
                id: 'febrile-convulsions',
                title: 'Febrile Convulsions',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <rect class="safe-position" x="100" y="80" width="200" height="80" rx="10" fill="white" stroke="#333"/>
                            <ellipse class="body" cx="200" cy="120" rx="70" ry="20" fill="#FFD54F" fill-opacity="0.3"/>
                            <circle class="head" cx="150" cy="110" r="20" fill="#FFD54F" fill-opacity="0.3"/>
                            <path class="arrow" d="M180 110 C 195 95, 210 95, 225 110" stroke="#81C784" stroke-width="2" fill="none"/>
                            <path class="arrow-head" d="M220 105 L 225 110 L 220 115" stroke="#81C784" stroke-width="2"/>
                            <text x="200" y="150" font-family="Arial" font-size="12" fill="#333" text-anchor="middle">Position child on their side</text>
                            <text x="200" y="175" font-family="Arial" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">Safety During a Febrile Convulsion</text>
                        </svg>
                    </div>
                    <h4>About Febrile Convulsions:</h4>
                    <p>Febrile convulsions (or febrile seizures) are fits that can occur when a child has a fever. They're most common in children between 6 months and 5 years of age and affect about 1 in 30 children.</p>
                    <p>While frightening to witness, febrile convulsions are generally harmless and don't cause brain damage or lead to epilepsy.</p>
                    
                    <h4>Signs of a Febrile Convulsion:</h4>
                    <ul>
                        <li>Loss of consciousness (the child becomes unaware of their surroundings)</li>
                        <li>Stiffening of the body</li>
                        <li>Twitching or jerking of arms and legs</li>
                        <li>Rolling back eyes</li>
                        <li>May lose bladder or bowel control</li>
                        <li>May have trouble breathing (fast breathing, grunting, or working hard to breathe)</li>
                    </ul>
                    
                    <h4>Managing a Febrile Convulsion:</h4>
                    <ol>
                        <li>
                            <strong>Stay calm</strong>
                            <p>Remember that febrile convulsions, while scary, are usually harmless</p>
                        </li>
                        <li>
                            <strong>Ensure safety</strong>
                            <p>Place the child on a soft surface</p>
                            <p>Remove any objects that could cause injury</p>
                            <p>Don't restrain the child or put anything in their mouth</p>
                        </li>
                        <li>
                            <strong>Position correctly</strong>
                            <p>Once the jerking stops, place the child in the recovery position (on their side)</p>
                            <p>This helps maintain an open airway and allows fluid to drain from the mouth</p>
                        </li>
                        <li>
                            <strong>Time the seizure</strong>
                            <p>Note when the seizure starts and how long it lasts</p>
                        </li>
                        <li>
                            <strong>Cool the child</strong>
                            <p>Once the seizure stops, you can remove excess clothing to help lower temperature</p>
                        </li>
                        <li>
                            <strong>Seek medical advice</strong>
                            <p>If this is the child's first febrile convulsion</p>
                            <p>If the convulsion lasts more than 5 minutes</p>
                            <p>If the child doesn't fully recover within a short time</p>
                            <p>If you're concerned about the child's condition</p>
                        </li>
                    </ol>
                    
                    <div class="info-box warning-box">
                        <p><strong>Call 000 immediately if:</strong></p>
                        <ul>
                            <li>The seizure lasts more than 5 minutes</li>
                            <li>The child has trouble breathing</li>
                            <li>The child looks very ill</li>
                            <li>The child doesn't wake up after the seizure</li>
                            <li>Another seizure occurs soon after the first one</li>
                        </ul>
                    </div>
                `
            },
            {
                id: 'when-to-seek-help',
                title: 'When to Seek Medical Help',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <rect class="alert-box" x="70" y="50" width="260" height="100" rx="10" fill="white" stroke="#EF5350" stroke-width="2"/>
                            <text x="200" y="75" font-family="Arial" font-size="14" fill="#333" text-anchor="middle" font-weight="bold">Seek Medical Help If:</text>
                            
                            <circle class="bullet" cx="100" cy="95" r="3" fill="#EF5350"/>
                            <text x="110" y="95" font-family="Arial" font-size="10" fill="#333" text-anchor="start" dominant-baseline="middle">Baby under 3 months with any fever</text>
                            
                            <circle class="bullet" cx="100" cy="115" r="3" fill="#EF5350"/>
                            <text x="110" y="115" font-family="Arial" font-size="10" fill="#333" text-anchor="start" dominant-baseline="middle">Child under 5 with fever >40°C</text>
                            
                            <circle class="bullet" cx="100" cy="135" r="3" fill="#EF5350"/>
                            <text x="110" y="135" font-family="Arial" font-size="10" fill="#333" text-anchor="start" dominant-baseline="middle">Fever with stiff neck or purple rash</text>
                            
                            <path class="phone" d="M340 140 C 330 145, 330 155, 340 160 C 350 165, 360 155, 360 145 C 360 135, 350 135, 340 140 Z" fill="#4FC3F7"/>
                            <text x="350" y="150" font-family="Arial" font-size="12" fill="white" text-anchor="middle" font-weight="bold">000</text>
                            
                            <text x="200" y="175" font-family="Arial" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">Know When to Call for Help</text>
                        </svg>
                    </div>
                    <h4>Seek Medical Advice if the Child:</h4>
                    <ul>
                        <li>Is under 3 months of age with any fever (>38°C)</li>
                        <li>Is under 6 months of age with a fever >38.5°C</li>
                        <li>Is between 6 months and 5 years with a fever >40°C</li>
                        <li>Has a fever for more than 2 days</li>
                        <li>Has a fever that went away for 24+ hours and then returned</li>
                        <li>Seems very unwell, lethargic, or irritable despite fever medication</li>
                        <li>Is not drinking enough or is urinating less than usual</li>
                        <li>Has pain that's not relieved by medication</li>
                        <li>Has symptoms of dehydration (dry mouth, no tears, sunken eyes, sunken fontanelle)</li>
                        <li>Has a febrile convulsion (especially if it's their first one)</li>
                    </ul>
                    
                    <div class="info-box warning-box">
                        <p><strong>Call 000 or go to emergency immediately if the child:</strong></p>
                        <ul>
                            <li>Has a rash that doesn't fade when pressed (glass test)</li>
                            <li>Has a stiff neck</li>
                            <li>Is very pale, mottled, or blue</li>
                            <li>Has trouble breathing (fast breathing, grunting, or working hard to breathe)</li>
                            <li>Is difficult to wake or very drowsy</li>
                            <li>Has a convulsion lasting more than 5 minutes</li>
                            <li>Shows signs of severe dehydration</li>
                            <li>Is in severe pain</li>
                        </ul>
                    </div>
                    
                    <h4>Meningitis Awareness:</h4>
                    <p>Be particularly alert for signs of meningitis, which can develop rapidly and be life-threatening.</p>
                    <p>Symptoms may include:</p>
                    <ul>
                        <li>Fever with cold hands and feet</li>
                        <li>Refusal of food and vomiting</li>
                        <li>Drowsiness or irritability</li>
                        <li>Purple-red rash that doesn't fade when pressed</li>
                        <li>Stiff neck</li>
                        <li>Sensitivity to light</li>
                        <li>Bulging fontanelle (in infants)</li>
                    </ul>
                    <p>If you suspect meningitis, seek emergency medical help immediately.</p>
                `
            },
            {
                id: 'assessment',
                title: 'Knowledge Check',
                content: `
                    <div class="quiz-container">
                        <div class="quiz-question">
                            <p>1. What is the correct way to manage a child with a fever?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="a"> Bundle them in warm blankets to "sweat out" the fever
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="b"> Give them aspirin to reduce the temperature
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="c"> Keep them comfortable with light clothing and offer fluids
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="d"> Give them an ice bath
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <div class="quiz-question">
                            <p>2. What should you do during a febrile convulsion?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="a"> Try to restrain the child's movements
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="b"> Place the child on their side in a safe position
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="c"> Put something in their mouth to prevent them from biting their tongue
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="d"> Immerse the child in cold water
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <div class="quiz-question">
                            <p>3. When should you seek immediate medical help for a child with fever?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="a"> Any child with a temperature of 38°C
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="b"> A 4-year-old with a fever who is playing normally
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="c"> A child with a fever lasting less than 24 hours
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="d"> A child with fever and a purple rash that doesn't fade when pressed
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <button class="btn primary-btn quiz-submit">Submit Answers</button>
                    </div>
                `
            }
        ],
        answers: {
            q1: "c",
            q2: "b",
            q3: "d"
        }
    },
    trauma: {
        title: 'Trauma Management',
        description: "How to manage bleeding, burns, and head injuries in infants and children.",
        progress: 0,
        sections: [
            {
                id: 'intro',
                title: 'Introduction to Pediatric Trauma',
                content: `
                    <p>Accidents and injuries are a common part of childhood. While most injuries are minor, knowing how to properly respond to more serious trauma can prevent complications and may even save a life.</p>
                    <p>This module covers three common types of pediatric trauma: bleeding, burns, and head injuries.</p>
                    <h4>General Principles for Trauma Management:</h4>
                    <ul>
                        <li><strong>Safety first</strong> - Ensure the scene is safe before approaching</li>
                        <li><strong>Stay calm</strong> - Your calmness helps reassure the injured child</li>
                        <li><strong>Assess quickly</strong> - Determine the severity of injury</li>
                        <li><strong>Call for help</strong> - Don't hesitate to call 000 for serious injuries</li>
                        <li><strong>Prevent infection</strong> - Use clean materials when treating wounds</li>
                        <li><strong>Monitor closely</strong> - Watch for changes in the child's condition</li>
                    </ul>
                    <div class="info-box">
                        <p><strong>Remember:</strong> Children's bodies respond differently to trauma than adults. They can compensate well initially but may deteriorate rapidly once their compensatory mechanisms are overwhelmed.</p>
                    </div>
                `
            },
            {
                id: 'bleeding',
                title: 'Managing Bleeding',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <path class="arm-outline" d="M120 80 C 150 60, 200 60, 230 80 C 260 100, 260 130, 230 150 C 200 170, 150 170, 120 150 C 90 130, 90 100, 120 80 Z" fill="#FFD54F" fill-opacity="0.3" stroke="#333"/>
                            <path class="cut" d="M170 100 L 200 120" stroke="#EF5350" stroke-width="3"/>
                            <path class="bandage" d="M150 90 L 220 130" stroke="white" stroke-width="20" stroke-opacity="0"/>
                            <path class="pressure-arrows" d="M180 70 L 180 90 M 175 75 L 180 70 L 185 75" stroke="#333" stroke-width="2" stroke-dasharray="3"/>
                            <path class="pressure-arrows" d="M190 130 L 190 150 M 185 145 L 190 150 L 195 145" stroke="#333" stroke-width="2" stroke-dasharray="3"/>
                            <text x="200" y="175" font-family="Arial" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">Apply Direct Pressure</text>
                        </svg>
                    </div>
                    <h4>Types of Bleeding:</h4>
                    <ul>
                        <li><strong>Capillary bleeding</strong> - Slow oozing from small blood vessels, common in scrapes</li>
                        <li><strong>Venous bleeding</strong> - Steady flow of dark red blood</li>
                        <li><strong>Arterial bleeding</strong> - Spurting bright red blood, most serious type</li>
                    </ul>
                    
                    <h4>Managing External Bleeding:</h4>
                    <ol>
                        <li>
                            <strong>Ensure safety</strong>
                            <p>Wear gloves if available to protect against bloodborne infections</p>
                            <p>If gloves aren't available, use a plastic bag or have the child apply pressure themselves if possible</p>
                        </li>
                        <li>
                            <strong>Apply direct pressure</strong>
                            <p>Use a clean cloth, gauze pad, or dressing</p>
                            <p>Press firmly on the wound</p>
                            <p>Maintain pressure for at least 5 minutes without checking</p>
                        </li>
                        <li>
                            <strong>Elevate the injury</strong>
                            <p>If possible, raise the injured area above the level of the heart</p>
                            <p>This helps reduce blood flow to the area</p>
                        </li>
                        <li>
                            <strong>Add more dressing if needed</strong>
                            <p>If blood soaks through, add more dressing on top without removing the original dressing</p>
                        </li>
                        <li>
                            <strong>Secure with bandage</strong>
                            <p>Once bleeding is controlled, secure the dressing with a bandage</p>
                            <p>Ensure it's firm but not too tight (check circulation beyond the bandage)</p>
                        </li>
                    </ol>
                    
                    <div class="info-box warning-box">
                        <p><strong>Seek immediate medical help if:</strong></p>
                        <ul>
                            <li>Bleeding can't be controlled with direct pressure</li>
                            <li>The wound is large, deep, or has jagged edges</li>
                            <li>The wound is heavily contaminated</li>
                            <li>The wound is from an animal or human bite</li>
                            <li>There's an embedded object in the wound (don't remove it)</li>
                            <li>The wound is on the face or genitals</li>
                            <li>There are signs of infection (increased pain, swelling, redness, warmth, pus)</li>
                        </ul>
                    </div>
                `
            },
            {
                id: 'burns',
                title: 'Managing Burns',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <path class="hand-outline" d="M150 100 C 160 80, 180 80, 190 90 C 200 70, 220 70, 230 90 C 240 70, 260 70, 270 90 C 280 70, 300 70, 310 90 C 320 110, 320 140, 300 160 C 270 180, 230 180, 200 160 C 170 180, 130 180, 120 140 C 110 120, 130 100, 150 100 Z" fill="#FFD54F" fill-opacity="0.3" stroke="#333"/>
                            <path class="burn-area" d="M180 120 C 200 110, 220 110, 240 120 C 250 130, 250 150, 240 160 C 220 170, 200 170, 180 160 C 170 150, 170 130, 180 120 Z" fill="#EF5350" fill-opacity="0.3"/>
                            <path class="water-stream" d="M120 50 C 130 70, 140 80, 160 90 M 130 45 C 140 65, 150 75, 170 85 M 140 40 C 150 60, 160 70, 180 80" stroke="#4FC3F7" stroke-width="2" stroke-dasharray="3"/>
                            <path class="faucet" d="M100 30 L 140 30 L 140 40 L 130 40 L 130 50 L 110 50 L 110 40 L 100 40 Z" fill="#90A4AE"/>
                            <text x="200" y="175" font-family="Arial" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">Cool the Burn with Running Water</text>
                        </svg>
                    </div>
                    <h4>Types of Burns:</h4>
                    <ul>
                        <li><strong>Superficial burns (1st degree)</strong> - Red, painful, no blisters (like mild sunburn)</li>
                        <li><strong>Partial thickness burns (2nd degree)</strong> - Red, painful, blisters, swelling</li>
                        <li><strong>Full thickness burns (3rd degree)</strong> - White/charred appearance, may be painless due to nerve damage</li>
                    </ul>
                    
                    <h4>First Aid for Burns:</h4>
                    <ol>
                        <li>
                            <strong>Stop the burning process</strong>
                            <p>Remove the child from the source of the burn</p>
                            <p>Remove clothing from the burned area unless it's stuck to the skin</p>
                            <p>Remove jewelry, watches, etc. from the burned area if possible</p>
                        </li>
                        <li>
                            <strong>Cool the burn</strong>
                            <p>Run cool (not cold) water over the burn for at least 20 minutes</p>
                            <p>If running water isn't available, immerse in cool water</p>
                            <p>Do not use ice, as this can worsen the injury</p>
                        </li>
                        <li>
                            <strong>Cover the burn</strong>
                            <p>After cooling, cover with a clean, non-stick bandage or cling film</p>
                            <p>Apply bandage loosely to avoid putting pressure on the burned area</p>
                        </li>
                        <li>
                            <strong>Manage pain</strong>
                            <p>Give paracetamol or ibuprofen according to age-appropriate dosing</p>
                        </li>
                    </ol>
                    
                    <div class="info-box warning-box">
                        <p><strong>DO NOT:</strong></p>
                        <ul>
                            <li>Apply butter, oil, ointments, or home remedies to burns</li>
                            <li>Break blisters</li>
                            <li>Remove clothing that's stuck to the skin</li>
                            <li>Use cotton wool or fluffy dressings on burns</li>
                        </ul>
                    </div>
                    
                    <div class="info-box warning-box">
                        <p><strong>Seek immediate medical help if:</strong></p>
                        <ul>
                            <li>The burn is larger than the size of the child's palm</li>
                            <li>The burn is on the face, hands, feet, genitals, or across a joint</li>
                            <li>The burn is deep (partial or full thickness)</li>
                            <li>The burn is chemical or electrical</li>
                            <li>You're unsure about the severity</li>
                            <li>The child is under 1 year of age</li>
                        </ul>
                    </div>
                `
            },
            {
                id: 'head-injuries',
                title: 'Head Injuries',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <circle class="head" cx="200" cy="100" r="50" fill="#FFD54F" fill-opacity="0.3" stroke="#333"/>
                            <path class="brain" d="M185 80 C 190 70, 210 70, 215 80 C 220 90, 210 100, 200 95 C 190 90, 180 80, 185 70 Z" fill="#FF8A65" fill-opacity="0.3"/>
                            <path class="bacteria" d="M195 55 L 195 65 M 190 60 L 200 60" stroke="#9575CD" stroke-width="2"/>
                            <path class="bacteria" d="M205 55 L 205 65 M 200 60 L 210 60" stroke="#9575CD" stroke-width="2"/>
                            <path class="neck" d="M190 100 L 210 100 L 210 120 L 190 120 Z" fill="#FFD54F" fill-opacity="0.3" stroke="#333"/>
                            <path class="stiff-neck" d="M180 110 L 170 110 M 175 105 L 170 110 L 175 115" stroke="#333" stroke-width="1" stroke-dasharray="2"/>
                            <path class="body" d="M180 120 L 220 120 L 230 160 L 170 160 Z" fill="#FFD54F" fill-opacity="0.3" stroke="#333"/>
                            <circle class="rash-1" cx="190" cy="130" r="3" fill="#EF5350"/>
                            <circle class="rash-2" cx="210" cy="140" r="3" fill="#EF5350"/>
                            <circle class="rash-3" cx="185" cy="150" r="3" fill="#EF5350"/>
                            <circle class="rash-4" cx="205" cy="155" r="3" fill="#EF5350"/>
                            <text x="200" y="180" font-family="Arial" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">Head Injury Assessment</text>
                        </svg>
                    </div>
                    <h4>Types of Head Injuries:</h4>
                    <ul>
                        <li><strong>Minor</strong> - Small bumps, bruises, or cuts to the scalp</li>
                        <li><strong>Concussion</strong> - Temporary disruption of brain function, may or may not involve loss of consciousness</li>
                        <li><strong>More serious</strong> - Skull fractures, bleeding within the skull, brain damage</li>
                    </ul>
                    
                    <h4>First Aid for Head Injuries:</h4>
                    <ol>
                        <li>
                            <strong>Check responsiveness and breathing</strong>
                            <p>Follow DRSABCD if the child is unresponsive</p>
                        </li>
                        <li>
                            <strong>Keep the child still</strong>
                            <p>Particularly if you suspect a spinal injury</p>
                            <p>Support their head and neck to prevent movement</p>
                        </li>
                        <li>
                            <strong>Control bleeding</strong>
                            <p>Apply gentle pressure to scalp wounds with a clean cloth</p>
                            <p>Be careful not to press on areas where there might be a skull fracture</p>
                        </li>
                        <li>
                            <strong>Apply cold compress</strong>
                            <p>Use a cold pack wrapped in a towel for bumps and swelling</p>
                            <p>Apply for 20 minutes at a time</p>
                        </li>
                        <li>
                            <strong>Monitor closely</strong>
                            <p>Watch for signs of serious head injury (see below)</p>
                            <p>Continue monitoring for 24-48 hours after the injury</p>
                        </li>
                    </ol>
                    
                    <h4>Warning Signs of Serious Head Injury:</h4>
                    <ul>
                        <li>Unconsciousness or decreased level of consciousness</li>
                        <li>Seizures or convulsions</li>
                        <li>Persistent or worsening headache</li>
                        <li>Repeated vomiting</li>
                        <li>Blood or clear fluid from the nose or ears</li>
                        <li>Unequal pupil size</li>
                        <li>Weakness or numbness in arms or legs</li>
                        <li>Slurred speech or confusion</li>
                        <li>Difficulty recognizing people or places</li>
                        <li>Unusual behavior or irritability</li>
                        <li>Excessive drowsiness or difficulty waking</li>
                    </ul>
                    
                    <div class="info-box warning-box">
                        <p><strong>Seek immediate medical help if:</strong></p>
                        <ul>
                            <li>The child loses consciousness, even briefly</li>
                            <li>You observe any of the warning signs listed above</li>
                            <li>The injury was caused by significant force</li>
                            <li>The child is under 1 year of age</li>
                            <li>You're concerned about the child's condition</li>
                        </ul>
                    </div>
                `
            },
            {
                id: 'assessment',
                title: 'Knowledge Check',
                content: `
                    <div class="quiz-container">
                        <div class="quiz-question">
                            <p>1. What is the correct first aid for a bleeding wound?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="a"> Apply a tourniquet immediately
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="b"> Rinse with alcohol to clean the wound
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="c"> Apply direct pressure with a clean cloth or dressing
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="d"> Apply butter or petroleum jelly to the wound
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <div class="quiz-question">
                            <p>2. How long should you cool a burn with running water?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="a"> 5 minutes
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="b"> At least 20 minutes
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="c"> 1 minute is sufficient
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="d"> Until the skin feels cold
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <div class="quiz-question">
                            <p>3. Which of these is a warning sign of a serious head injury?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="a"> Mild headache that goes away with paracetamol
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="b"> Small bump on the forehead
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="c"> Brief crying immediately after the injury
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="d"> Repeated vomiting after the injury
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <button class="btn primary-btn quiz-submit">Submit Answers</button>
                    </div>
                `
            }
        ],
        answers: {
            q1: "c",
            q2: "b",
            q3: "d"
        }
    },
    rashes: {
        title: 'Serious Rashes & Meningococcal Disease',
        description: "How to identify potentially serious rashes in children and respond appropriately.",
        progress: 0,
        sections: [
            {
                id: 'intro',
                title: 'Understanding Childhood Rashes',
                content: `
                    <p>Rashes are common in children and are often harmless. However, some rashes can be signs of serious conditions that require immediate medical attention.</p>
                    <p>This module focuses on recognizing potentially serious rashes, with special emphasis on meningococcal disease, which can be life-threatening if not treated promptly.</p>
                    <h4>Types of Childhood Rashes:</h4>
                    <ul>
                        <li><strong>Common, usually harmless rashes:</strong> Eczema, heat rash, nappy rash, hives</li>
                        <li><strong>Infectious rashes:</strong> Chickenpox, hand-foot-mouth disease, impetigo</li>
                        <li><strong>Potentially serious rashes:</strong> Meningococcal rash, measles, scarlet fever</li>
                    </ul>
                    <div class="info-box">
                        <p><strong>Important:</strong> While many rashes are harmless, it's essential to know the warning signs that require medical attention, especially when a rash is accompanied by other symptoms like fever or lethargy.</p>
                    </div>
                `
            },
            {
                id: 'serious-rashes',
                title: 'Recognizing Serious Rashes',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <circle class="skin-area-1" cx="120" cy="80" r="30" fill="#FFD54F" fill-opacity="0.3"/>
                            <circle class="rash-spot-1-1" cx="110" cy="70" r="3" fill="#EF5350"/>
                            <circle class="rash-spot-1-2" cx="125" cy="75" r="2" fill="#EF5350"/>
                            <circle class="rash-spot-1-3" cx="115" cy="90" r="3" fill="#EF5350"/>
                            <text x="120" y="130" font-family="Arial" font-size="10" fill="#333" text-anchor="middle">Non-blanching</text>
                            <text x="120" y="142" font-family="Arial" font-size="10" fill="#333" text-anchor="middle">(doesn't fade when pressed)</text>
                            
                            <circle class="skin-area-2" cx="280" cy="80" r="30" fill="#FFD54F" fill-opacity="0.3"/>
                            <circle class="glass-outline" cx="280" cy="80" r="20" fill="none" stroke="#333" stroke-width="1" stroke-dasharray="2"/>
                            <path class="glass-test" d="M265 65 L 295 95 M 265 95 L 295 65" stroke="#333" stroke-width="1"/>
                            <text x="280" y="130" font-family="Arial" font-size="10" fill="#333" text-anchor="middle">Glass Test</text>
                            <text x="280" y="142" font-family="Arial" font-size="10" fill="#333" text-anchor="middle">(press clear glass on rash)</text>
                            
                            <text x="200" y="175" font-family="Arial" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">Assessing Suspicious Rashes</text>
                        </svg>
                    </div>
                    <h4>Warning Signs of Serious Rashes:</h4>
                    <ul>
                        <li><strong>Non-blanching rash</strong> - Rash that doesn't fade when pressed (glass test)</li>
                        <li><strong>Petechiae</strong> - Tiny, flat purple or red spots that look like pinpricks</li>
                        <li><strong>Purpura</strong> - Larger purple spots that resemble bruises</li>
                        <li><strong>Rapid spreading</strong> - Rash that spreads quickly across the body</li>
                        <li><strong>Accompanied by concerning symptoms</strong> - Such as high fever, severe headache, neck stiffness, light sensitivity, lethargy, or confusion</li>
                    </ul>
                    
                    <h4>The Glass Test:</h4>
                    <p>The glass test is a simple way to check if a rash might be serious:</p>
                    <ol>
                        <li>Press a clear drinking glass firmly against the rash</li>
                        <li>If the rash fades (blanches) under the pressure, it's less likely to be serious</li>
                        <li>If the rash doesn't fade and you can still see it through the glass, seek urgent medical attention</li>
                    </ol>
                    
                    <h4>Potentially Serious Rashes to Be Aware Of:</h4>
                    <ul>
                        <li><strong>Meningococcal rash</strong> - Starts as small, red or purple spots that can grow into larger blotches or bruises; doesn't fade when pressed</li>
                        <li><strong>Measles</strong> - Red-brown blotchy rash that starts behind the ears and spreads downward; accompanied by high fever, cough, runny nose, and red eyes</li>
                        <li><strong>Scarlet fever</strong> - Fine, red rash that feels like sandpaper; often with strawberry-like tongue and sore throat</li>
                        <li><strong>Severe allergic reaction</strong> - Hives, swelling (especially of face or throat)</li>
                    </ul>
                    
                    <div class="info-box warning-box">
                        <p><strong>Seek immediate medical attention if:</strong></p>
                        <ul>
                            <li>A rash doesn't fade under pressure (non-blanching)</li>
                            <li>A rash is accompanied by a fever and the child appears unwell</li>
                            <li>The rash is spreading rapidly</li>
                            <li>The child is very unwell, lethargic, or difficult to wake</li>
                            <li>You're concerned about the child's condition</li>
                        </ul>
                    </div>
                `
            },
            {
                id: 'meningococcal',
                title: 'Meningococcal Disease',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <circle class="head" cx="200" cy="70" r="30" fill="#FFD54F" fill-opacity="0.3" stroke="#333"/>
                            <path class="meninges" d="M185 60 C 190 50, 210 50, 215 60" stroke="#FF8A65" stroke-width="3" fill="none"/>
                            <path class="brain" d="M185 70 C 190 60, 210 60, 215 70 C 220 80, 210 90, 200 95 C 190 90, 180 80, 185 70 Z" fill="#FF8A65" fill-opacity="0.3"/>
                            <path class="bacteria" d="M195 55 L 195 65 M 190 60 L 200 60" stroke="#9575CD" stroke-width="2"/>
                            <path class="bacteria" d="M205 55 L 205 65 M 200 60 L 210 60" stroke="#9575CD" stroke-width="2"/>
                            <path class="neck" d="M190 100 L 210 100 L 210 120 L 190 120 Z" fill="#FFD54F" fill-opacity="0.3" stroke="#333"/>
                            <path class="stiff-neck" d="M180 110 L 170 110 M 175 105 L 170 110 L 175 115" stroke="#333" stroke-width="1" stroke-dasharray="2"/>
                            <path class="body" d="M180 120 L 220 120 L 230 160 L 170 160 Z" fill="#FFD54F" fill-opacity="0.3" stroke="#333"/>
                            <circle class="rash-1" cx="190" cy="130" r="3" fill="#EF5350"/>
                            <circle class="rash-2" cx="210" cy="140" r="3" fill="#EF5350"/>
                            <circle class="rash-3" cx="185" cy="150" r="3" fill="#EF5350"/>
                            <circle class="rash-4" cx="205" cy="155" r="3" fill="#EF5350"/>
                            <text x="200" y="180" font-family="Arial" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">Meningococcal Disease</text>
                        </svg>
                    </div>
                    <h4>About Meningococcal Disease:</h4>
                    <p>Meningococcal disease is a serious bacterial infection that can cause meningitis (inflammation of the lining around the brain and spinal cord) and septicemia (blood poisoning). It can develop rapidly and be fatal within hours if not treated.</p>
                    <p>Australia has seen a decline in cases due to vaccination programs, but the disease remains a significant concern, particularly in infants, young children, and adolescents.</p>
                    
                    <h4>Early Symptoms (can be difficult to recognize):</h4>
                    <ul>
                        <li>Fever</li>
                        <li>Headache</li>
                        <li>Neck stiffness</li>
                        <li>Joint pain</li>
                        <li>Dislike of bright lights</li>
                        <li>Nausea and vomiting</li>
                        <li>Irritability or lethargy</li>
                        <li>Refusal to feed (in infants)</li>
                    </ul>
                    
                    <h4>Later Symptoms (as disease progresses):</h4>
                    <ul>
                        <li><strong>Distinctive rash</strong> - Purple/red spots or bruises that don't fade under pressure (glass test)</li>
                        <li>Severe headache</li>
                        <li>Extreme drowsiness or confusion</li>
                        <li>Stiff neck</li>
                        <li>Photophobia (severe sensitivity to light)</li>
                        <li>Seizures</li>
                    </ul>
                    
                    <h4>In Infants, Additional Signs Include:</h4>
                    <ul>
                        <li>High-pitched or moaning cry</li>
                        <li>Bulging fontanelle (soft spot on baby's head)</li>
                        <li>Refusing feeds</li>
                        <li>Irritable when picked up</li>
                        <li>Floppy or lethargic</li>
                    </ul>
                    
                    <div class="info-box warning-box">
                        <p><strong>Critical information:</strong></p>
                        <ul>
                            <li>Meningococcal disease can progress extremely rapidly - a child can go from seemingly well to critically ill within hours</li>
                            <li>The characteristic rash may not appear until late in the illness, and sometimes not at all</li>
                            <li>Not all symptoms appear in every case</li>
                            <li>Trust your instincts - if you're concerned about a child's condition, seek urgent medical advice</li>
                        </ul>
                    </div>
                `
            },
            {
                id: 'response',
                title: 'Responding to Suspected Meningococcal Disease',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <rect class="emergency-bg" x="150" y="60" width="100" height="50" rx="5" fill="#EF5350"/>
                            <text x="200" y="90" font-family="Arial" font-size="24" fill="white" text-anchor="middle" font-weight="bold">000</text>
                            <path class="arrow-1" d="M120 85 L 140 85 M 135 80 L 140 85 L 135 90" stroke="#333" stroke-width="2"/>
                            <path class="arrow-2" d="M260 85 L 280 85 M 275 80 L 280 85 L 275 90" stroke="#333" stroke-width="2"/>
                            <rect class="hospital-bg" x="290" y="70" width="80" height="30" rx="5" fill="#4FC3F7"/>
                            <path class="hospital-cross" d="M330 75 L 330 95 M 320 85 L 340 85" stroke="white" stroke-width="3"/>
                            <circle class="clock" cx="90" cy="85" r="20" fill="white" stroke="#333"/>
                            <path class="clock-hand-1" d="M90 85 L 90 70" stroke="#333" stroke-width="2"/>
                            <path class="clock-hand-2" d="M90 85 L 100 85" stroke="#333" stroke-width="2"/>
                            <text x="200" y="140" font-family="Arial" font-size="14" fill="#333" text-anchor="middle">Time is critical - Seek emergency care immediately</text>
                            <text x="200" y="175" font-family="Arial" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">Emergency Response</text>
                        </svg>
                    </div>
                    <h4>What to Do If You Suspect Meningococcal Disease:</h4>
                    <ol>
                        <li>
                            <strong>Seek emergency medical attention immediately</strong>
                            <p>Call 000 for an ambulance</p>
                            <p>State clearly that you suspect meningococcal disease</p>
                            <p>If you can't get an ambulance quickly, take the child to the nearest emergency department</p>
                        </li>
                        <li>
                            <strong>Check for a rash</strong>
                            <p>Perform the glass test on any suspicious rash</p>
                            <p>Remember that the rash may not appear until later stages, or sometimes not at all</p>
                        </li>
                        <li>
                            <strong>Monitor the child closely</strong>
                            <p>Check breathing and consciousness</p>
                            <p>Be prepared to perform CPR if necessary</p>
                        </li>
                        <li>
                            <strong>Keep the child comfortable</strong>
                            <p>Keep them in a quiet, dim environment if they're sensitive to light</p>
                            <p>Reduce fever with paracetamol if appropriate</p>
                        </li>
                        <li>
                            <strong>Provide information to healthcare providers</strong>
                            <p>When symptoms started</p>
                            <p>Any medications given</p>
                            <p>Recent illnesses or exposures</p>
                            <p>Vaccination history if known</p>
                        </li>
                    </ol>
                    
                    <div class="info-box warning-box">
                        <p><strong>Remember:</strong> Meningococcal disease is a medical emergency. Early diagnosis and treatment significantly improve outcomes. Antibiotics need to be given as soon as possible.</p>
                    </div>
                    
                    <h4>Prevention:</h4>
                    <ul>
                        <li><strong>Vaccination</strong> - Several meningococcal vaccines are available in Australia and are part of the National Immunisation Program Schedule</li>
                        <li><strong>Good hygiene</strong> - Regular handwashing, avoiding sharing drinks, food, or utensils</li>
                        <li><strong>Being aware</strong> - Knowing the symptoms and seeking help early if concerned</li>
                    </ul>
                `
            },
            {
                id: 'other-serious-rashes',
                title: 'Other Serious Rashes',
                content: `
                    <div class="demonstration-container">
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" class="animated-graphic">
                            <!-- Measles -->
                            <circle class="face-1" cx="100" cy="70" r="25" fill="#FFD54F" fill-opacity="0.3"/>
                            <path class="measles-rash" d="M90 60 C 85 58, 85 62, 90 60 M 110 60 C 105 58, 105 62, 110 60 M 95 80 C 90 78, 90 82, 95 80" fill="#EF5350"/>
                            <text x="100" y="110" font-family="Arial" font-size="12" fill="#333" text-anchor="middle">Measles</text>
                            
                            <!-- Scarlet Fever -->
                            <circle class="face-2" cx="200" cy="70" r="25" fill="#FFD54F" fill-opacity="0.3"/>
                            <path class="scarlet-rash" d="M190 60 L 190 62 M 195 60 L 195 62 M 200 60 L 200 62 M 205 60 L 205 62 M 210 60 L 210 62" stroke="#EF5350" stroke-width="1"/>
                            <path class="scarlet-rash" d="M190 65 L 190 67 M 195 65 L 195 67 M 200 65 L 200 67 M 205 65 L 205 67 M 210 65 L 210 67" stroke="#EF5350" stroke-width="1"/>
                            <path class="tongue" d="M195 80 C 200 85, 205 85, 210 80" fill="#EF5350"/>
                            <text x="200" y="110" font-family="Arial" font-size="12" fill="#333" text-anchor="middle">Scarlet Fever</text>
                            
                            <!-- Cellulitis -->
                            <circle class="face-3" cx="300" cy="70" r="25" fill="#FFD54F" fill-opacity="0.3"/>
                            <path class="cellulitis" d="M285 65 C 290 55, 310 55, 315 65 C 320 75, 310 85, 300 90 C 290 85, 280 75, 285 65 Z" fill="#EF5350" fill-opacity="0.5"/>
                            <text x="300" y="110" font-family="Arial" font-size="12" fill="#333" text-anchor="middle">Cellulitis</text>
                            
                            <text x="200" y="150" font-family="Arial" font-size="14" fill="#333" text-anchor="middle">All require medical attention</text>
                            <text x="200" y="175" font-family="Arial" font-size="16" font-weight="bold" fill="#333" text-anchor="middle">Other Serious Childhood Rashes</text>
                        </svg>
                    </div>
                    <h4>Measles:</h4>
                    <ul>
                        <li><strong>Appearance:</strong> Red-brown blotchy rash that starts behind the ears and spreads downward</li>
                        <li><strong>Associated symptoms:</strong> High fever, cough, runny nose, red eyes, white spots inside the mouth</li>
                        <li><strong>Action:</strong> Seek medical attention; measles is highly contagious and can have serious complications</li>
                    </ul>
                    
                    <h4>Scarlet Fever:</h4>
                    <ul>
                        <li><strong>Appearance:</strong> Fine, red rash that feels like sandpaper; often most noticeable in skin folds</li>
                        <li><strong>Associated symptoms:</strong> Sore throat, fever, "strawberry tongue" (red, bumpy tongue), flushed face</li>
                        <li><strong>Action:</strong> See a doctor for antibiotic treatment</li>
                    </ul>
                    
                    <h4>Cellulitis:</h4>
                    <ul>
                        <li><strong>Appearance:</strong> Red, swollen, hot, and painful area of skin, often with defined edges</li>
                        <li><strong>Associated symptoms:</strong> Fever, malaise, sometimes red streaks extending from the affected area</li>
                        <li><strong>Action:</strong> Seek medical attention for antibiotic treatment</li>
                    </ul>
                    
                    <h4>Kawasaki Disease:</h4>
                    <ul>
                        <li><strong>Appearance:</strong> Widespread red rash, often on the trunk and genital area</li>
                        <li><strong>Associated symptoms:</strong> Persistent high fever (>5 days), red eyes, red lips/tongue, swollen hands/feet, swollen lymph nodes in neck</li>
                        <li><strong>Action:</strong> Seek immediate medical attention; early treatment is crucial to prevent complications</li>
                    </ul>
                    
                    <h4>Severe Allergic Reaction:</h4>
                    <ul>
                        <li><strong>Appearance:</strong> Widespread hives, swelling (especially of face or throat)</li>
                        <li><strong>Associated symptoms:</strong> Difficulty breathing, wheezing, vomiting, dizziness, collapse</li>
                        <li><strong>Action:</strong> Call 000 immediately; use an adrenaline auto-injector if available and prescribed</li>
                    </ul>
                    
                    <div class="info-box">
                        <p><strong>When to consult a healthcare professional about any rash:</strong></p>
                        <ul>
                            <li>If the child has a fever or appears unwell</li>
                            <li>If the rash is widespread or spreading rapidly</li>
                            <li>If the rash is painful or severely itchy</li>
                            <li>If the rash is accompanied by swelling of the face or breathing difficulties</li>
                            <li>If the rash doesn't fade when pressed (glass test)</li>
                            <li>If you're concerned about the child's condition</li>
                        </ul>
                    </div>
                `
            },
            {
                id: 'assessment',
                title: 'Knowledge Check',
                content: `
                    <div class="quiz-container">
                        <div class="quiz-question">
                            <p>1. What is the "glass test" used for?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="a"> To measure a child's temperature
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="b"> To check if a rash fades under pressure
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="c"> To look for signs of dehydration
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q1" value="d"> To test if a child can see clearly
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <div class="quiz-question">
                            <p>2. Which of these is a warning sign of meningococcal disease?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="a"> Itchy red rash that fades when pressed
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="b"> Mild headache that improves with paracetamol
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="c"> Purple or red spots that don't fade when pressed
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q2" value="d"> Slight fever with runny nose
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <div class="quiz-question">
                            <p>3. What should you do if you suspect a child has meningococcal disease?</p>
                            <div class="quiz-options">
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="a"> Wait and see if symptoms improve
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="b"> Give paracetamol and reassess in the morning
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="c"> Seek emergency medical attention immediately
                                </label>
                                <label class="quiz-option">
                                    <input type="radio" name="q3" value="d"> Apply a cool compress to the rash
                                </label>
                            </div>
                            <div class="feedback-container"></div>
                        </div>
                        
                        <button class="btn primary-btn quiz-submit">Submit Answers</button>
                    </div>
                `
            }
        ],
        answers: {
            q1: "b",
            q2: "c",
            q3: "c"
        }
    }
};