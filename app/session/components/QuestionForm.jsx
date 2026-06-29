'use client';
import { useState } from 'react';

export default function QuestionForm({ sessionId, eventId, onQuestionAdded }) {
    const [content, setContent] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        if (!content.trim()) return;
        setSubmitting(true);
        setError('');
        try {
            const res = await fetch(`/api/events/${eventId}/sessions/${sessionId}/questions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content, author_name: authorName || null }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || 'Erreur lors de l\'envoi');
            } else {
                onQuestionAdded(data);
                setContent('');
                setAuthorName('');
            }
        } catch {
            setError('Erreur réseau');
        }
        setSubmitting(false);
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <input
                type="text"
                placeholder="Votre nom (optionnel)"
                value={authorName}
                onChange={e => setAuthorName(e.target.value)}
                style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: 'var(--text)',
                    fontSize: '15px',
                    width: '100%',
                    outline: 'none',
                }}
            />
            <textarea
                placeholder="Posez votre question..."
                value={content}
                onChange={e => setContent(e.target.value)}
                required
                rows={3}
                style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: 'var(--text)',
                    fontSize: '15px',
                    resize: 'vertical',
                    width: '100%',
                    outline: 'none',
                    fontFamily: 'var(--font-body)',
                }}
            />
            {error && (
                <p style={{ color: '#ef4444', fontSize: '14px' }}>{error}</p>
            )}
            <button
                type="submit"
                disabled={submitting}
                className="btn-primary"
                style={{ alignSelf: 'flex-start', cursor: 'pointer', border: 'none' }}
            >
                {submitting ? 'Envoi...' : 'Envoyer la question'}
            </button>
        </form>
    );
}