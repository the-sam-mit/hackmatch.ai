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
    const [problemStatement, setProblemStatement] = useState('')
    const [loading, setLoading] = useState(false)
    const [idea, setIdea] = useState<Idea | null>(null)
    const [error, setError] = useState('')

    const generateIdea = async () => {
        if (!username.trim()) return

        setLoading(true)
        setError('')
        setIdea(null)

        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    problem_statement: problemStatement || null
                }),
            })

            if (!res.ok) {
                throw new Error('Failed to generate idea')
            }

            const data = await res.json()
            setIdea(data)
        } catch (err) {
            setError('Something went wrong. Please check the username and try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="container">
            <div style={{ marginTop: '4rem', textAlign: 'center' }}>
                <h1>Hackathon Idea Generator</h1>
                <p className="subtitle">
                    Turn your GitHub profile into a winning hackathon project using Agentic AI.
                </p>

                <div className="input-group" style={{ flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ display: 'flex', width: '100%', gap: '1rem' }}>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter GitHub Username (e.g., torvalds)"
                            onKeyDown={(e) => e.key === 'Enter' && generateIdea()}
                        />
                    </div>
                    <div style={{ display: 'flex', width: '100%', gap: '1rem' }}>
                        <input
                            type="text"
                            value={problemStatement}
                            onChange={(e) => setProblemStatement(e.target.value)}
                            placeholder="Problem Statement / Theme (Optional)"
                            onKeyDown={(e) => e.key === 'Enter' && generateIdea()}
                        />
                    </div>
                    <button onClick={generateIdea} disabled={loading} style={{ width: '100%' }}>
                        {loading ? 'Generating...' : 'Generate Idea'}
                    </button>
                </div>

                {error && (
                    <div style={{ color: '#ef4444', textAlign: 'center', marginBottom: '2rem' }}>
                        {error}
                    </div>
                )}

                {idea && (
                    <div className="glass-card fade-in">
                        <h2 style={{ marginTop: 0, color: '#3b82f6' }}>{idea.title}</h2>
                        <p style={{ fontSize: '1.25rem', color: '#cbd5e1', fontStyle: 'italic' }}>
                            {idea.tagline}
                        </p>

                        <div style={{ margin: '2rem 0' }}>
                            <h3 style={{ color: '#94a3b8', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                The Concept
                            </h3>
                            <p>{idea.description}</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div>
                                <h3 style={{ color: '#94a3b8', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Tech Stack
                                </h3>
                                <div style={{ marginTop: '0.5rem' }}>
                                    {idea.tech_stack.map((tech) => (
                                        <span key={tech} className="tag">{tech}</span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 style={{ color: '#94a3b8', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Key Features
                                </h3>
                                <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                                    {idea.key_features.map((feature) => (
                                        <li key={feature} style={{ marginBottom: '0.25rem' }}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px' }}>
                            <strong>Challenge Addressed:</strong> {idea.challenge_addressed}
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}
