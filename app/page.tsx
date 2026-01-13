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
            <h1 className="glow-text">Hackathon Idea Generator</h1>
            <p className="subtitle">
                &lt; System.Initialize_Agentic_Protocol /&gt;
            </p>

            <div className="command-center fade-in delay-1" style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div className="layout-col">

                    <div>
                        <input
                            type="text"
                            value={problemStatement}
                            onChange={(e) => setProblemStatement(e.target.value)}
                            placeholder="Problem Statement or Domain"
                            onKeyDown={(e) => e.key === 'Enter' && generateIdea()}
                        />
                    </div>

                    <div className="layout-row">
                        <div style={{ flex: 1 }}>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="GitHub Username"
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <input
                                type="text"
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                                placeholder="Skills (e.g. React, Three.js)"
                            />
                        </div>
                    </div>

                    <div className="mt-8">
                        <button
                            className="btn-cyber"
                            onClick={generateIdea}
                            disabled={loading}
                        >
                            {loading ? 'PROCESSING DATA...' : 'INITIALIZE GENERATION'}
                        </button>
                    </div>
                </div>
            </div>

            {error && (
                <div style={{ color: '#ff0055', textAlign: 'center', marginTop: '2rem', fontFamily: 'monospace' }}>
                    [ERROR]: {error}
                </div>
            )}

            {idea && (
                <div className="result-frame fade-in">
                    <div className="result-header">
                        <span style={{ fontFamily: 'monospace', color: '#00f2ff' }}>ID: {Math.floor(Math.random() * 999999)}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '0.8rem', color: '#ff00ff', letterSpacing: '2px' }}>LIVE</span>
                            <div className="status-dot"></div>
                        </div>
                    </div>

                    <div className="result-content">
                        <div className="text-center">
                            <h2>{idea.title}</h2>
                            <span className="tagline">"{idea.tagline}"</span>
                        </div>

                        <div className="mb-4" style={{ borderLeft: '2px solid #00f2ff', paddingLeft: '1.5rem', marginBottom: '3rem' }}>
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#e0e0e0' }}>{idea.description}</p>
                        </div>

                        <div className="grid-cyber">
                            <div>
                                <h3>Tech Stack Database</h3>
                                <div>
                                    {idea.tech_stack.map((tech) => (
                                        <span key={tech} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3>Core Modules</h3>
                                <ul className="cyber-list">
                                    {idea.key_features.map((feature) => (
                                        <li key={feature}>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div style={{ marginTop: '3rem', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '1.5rem' }}>
                            <span style={{ color: '#707090', fontSize: '0.8rem', letterSpacing: '0.1em' }}>AMBITION METRIC:</span>
                            <p style={{ color: '#fff', marginTop: '0.5rem' }}>{idea.challenge_addressed}</p>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}
