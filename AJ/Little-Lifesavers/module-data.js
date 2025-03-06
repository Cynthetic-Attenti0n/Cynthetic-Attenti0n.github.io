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
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <path d="M200 30l130 145H70z" fill="#EF5350" stroke="#333" stroke-width="2"/>
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
                        <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                            <rect width="400" height="200" fill="#e9ecef" rx="10"/>
                            <circle cx="150" cy="100" r="40" fill="#FF6B6B"/>
                            <circle cx="250" cy="100" r="25" fill="#4FC3F7"/>
                            <path d="M140 70c0 0 20 15 20 0s-20 15-20 0z" fill="#333"/>
                            <path d="M240 85c0 0 15 10 15 0s-15 10-15 0z" fill="#333"/>
                            <path d="M130 110c0 0 40 10 40 0" fill="none" stroke="#333" stroke-width="2"/>
                            <path d="M235 110c0 0 25 5 25 0" fill="none" stroke="#333" stroke-width="2"/>
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
            }
            // Other sections would be defined similarly
        ],
        answers: {
            q1: "c",
            q2: "a",
            q3: "d"
        }
    }
    // Additional modules would be added here
};

