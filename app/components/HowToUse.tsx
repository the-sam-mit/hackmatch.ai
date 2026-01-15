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
                    <strong style={{ color: '#3b82f6' }}>Step 2: Assemble Your Team (Optional)</strong>
                    <p style={{ margin: '0.25rem 0 0 0', color: '#cbd5e1' }}>
                        Provide one or more <strong>GitHub Usernames</strong> (comma-separated). The AI will analyze everyone's public work to combine your team's collective skills, ensuring the final idea brings out the best in every member.
                    </p>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <strong style={{ color: '#3b82f6' }}>Step 3: List Additional Skills</strong>
                    <p style={{ margin: '0.25rem 0 0 0', color: '#cbd5e1' }}>
                        Enter any extra technical <strong>Skills</strong> (e.g., "Three.js, AWS"). The generated tech stack will be optimized based on this total skill pool.
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
