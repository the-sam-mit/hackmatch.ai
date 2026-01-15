'use client'

import { useState } from 'react'
import HowToUse from './components/HowToUse'

interface Idea {
    title: string
    tagline: string
    description: string
    tech_stack: string[]
    key_features: string[]
    challenge_addressed: string
}

export default function Home() {
    const [username, setUsername] = useState('')
    const [skills, setSkills] = useState('')
    const [problemStatement, setProblemStatement] = useState('')
    const [loading, setLoading] = useState(false)
    const [idea, setIdea] = useState<Idea | null>(null)
    const [error, setError] = useState('')

    const generateIdea = async () => {
        setLoading(true)
        setError('')
        setIdea(null)

        try {
            const skillsList = skills.split(',').map(s => s.trim()).filter(s => s.length > 0)

            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username.trim() || null,
                    skills: skillsList,
                    problem_statement: problemStatement.trim() || null
                }),
            })

            if (!res.ok) {
                throw new Error('Failed to generate idea')
            }

            const data = await res.json()
            setIdea(data)
        } catch (err) {
            setError('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="container">
            <h1 className="fade-in">Hackathon Idea Generator</h1>
            <p className="subtitle fade-in">
                Turn your skills into a winning hackathon project using Agentic AI.
            </p>

            <HowToUse />

            <div className="clean-card fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="form-group">
                    <label>Problem Statement or Domain</label>
                    <input
                        type="text"
                        value={problemStatement}
                        onChange={(e) => setProblemStatement(e.target.value)}
                        placeholder="e.g. Sustainable Energy, Healthcare, Fintech..."
                        onKeyDown={(e) => e.key === 'Enter' && generateIdea()}
                    />
                </div>

                <div className="row">
                    <div className="col form-group">
                        <label>GitHub Username(s)</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="e.g. torvalds, gaearon"
                        />
                    </div>
                    <div className="col form-group">
                        <label>Skills</label>
                        <input
                            type="text"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            placeholder="e.g. React, Python, Three.js"
                        />
                    </div>
                </div>

                <div className="mt-large">
                    <button
                        className="btn-primary"
                        onClick={generateIdea}
                        disabled={loading}
                    >
                        {loading ? 'Analyzing Trends & Generating...' : 'Generate Winning Idea'}
                    </button>
                </div>
            </div>

            {error && (
                <div className="error-msg fade-in">
                    {error}
                </div>
            )}

            {idea && (
                <div className="clean-card fade-in mt-large">
                    <div className="mb-small" style={{ textAlign: 'center' }}>
                        <h2>{idea.title}</h2>
                        <p style={{ fontStyle: 'italic', color: '#94a3b8', fontSize: '1.1rem' }}>
                            "{idea.tagline}"
                        </p>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '8px' }}>
                        <h3>The Concept</h3>
                        <p style={{ color: '#e2e8f0', lineHeight: 1.7 }}>{idea.description}</p>
                    </div>

                    <div className="feature-grid">
                        <div>
                            <h3>Tech Stack</h3>
                            <div className="tag-container">
                                {idea.tech_stack.map((tech) => (
                                    <span key={tech} className="tag">{tech}</span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3>Key Features</h3>
                            <ul className="feature-list">
                                {idea.key_features.map((feature) => (
                                    <li key={feature}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-large pt-3" style={{ borderTop: '1px solid #334155' }}>
                        <strong style={{ color: '#3b82f6' }}>Challenge Addressed:</strong> <span style={{ color: '#cbd5e1' }}>{idea.challenge_addressed}</span>
                    </div>
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                <a
                    href="https://github.com/the-sam-mit/hackmatch.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-link fade-in"
                    title="View on GitHub"
                    style={{ position: 'static', animationDelay: '0.2s' }}
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '20px', height: '20px' }}>
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>View Project Source</span>
                </a>
            </div>
        </main>
    )
}
