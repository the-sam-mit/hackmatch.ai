import React from 'react';

export default function HowToUse() {
    return (
        <div className="clean-card mb-small fade-in" style={{ animationDelay: '0.05s', marginBottom: '2rem' }}>
            <h2>How to Use</h2>
            <div className="feature-list" style={{ marginTop: '1rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <strong style={{ color: '#3b82f6' }}>Step 1: Define Your Goal</strong>
                    <p style={{ margin: '0.25rem 0 0 0', color: '#cbd5e1' }}>
                        Enter a <strong>Problem Statement or Domain</strong> (e.g., "Sustainable Energy", "Healthcare"). This sets the context for the AI to generate relevant ideas.
                    </p>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <strong style={{ color: '#3b82f6' }}>Step 2: Personalize (Optional)</strong>
                    <p style={{ margin: '0.25rem 0 0 0', color: '#cbd5e1' }}>
                        Provide your <strong>GitHub Username</strong>. The AI will analyze your public repositories to match the idea to your coding style and experience level.
                    </p>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <strong style={{ color: '#3b82f6' }}>Step 3: List Your Skills</strong>
                    <p style={{ margin: '0.25rem 0 0 0', color: '#cbd5e1' }}>
                        Enter your technical <strong>Skills</strong> (e.g., "React, Python, AWS"). The generated tech stack will be optimized based on what you know.
                    </p>
                </div>

                <div>
                    <strong style={{ color: '#3b82f6' }}>Step 4: Generate</strong>
                    <p style={{ margin: '0.25rem 0 0 0', color: '#cbd5e1' }}>
                        Click the button to get a full project concept including Title, Tagline, Description, Tech Stack, and Features.
                    </p>
                </div>
            </div>
        </div>
    );
}
