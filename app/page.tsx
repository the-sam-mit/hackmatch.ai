'use client'

import { useState } from 'react'

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
                        <label>GitHub Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="e.g. torvalds"
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
        </main>
    )
}
