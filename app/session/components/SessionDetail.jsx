'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';

function formatTime(timeStr) {
    if (!timeStr) return '';
    const d = new Date(timeStr);
    return `${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`;
}

export default function SessionDetail({ sessionId, eventId }) {
    const [session, setSession] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadData() {
        try {
            const res = await fetch(`/api/events/${eventId}/sessions/${sessionId}`);
            const data = await res.json();
            setSession(data);
        } catch {}

        try {
            const res = await fetch(`/api/events/${eventId}/sessions/${sessionId}/questions`);
            const data = await res.json();
            setQuestions(Array.isArray(data) ? data : []);
        } catch {}

        setLoading(false);
    }

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 15000);
        return () => clearInterval(interval);
    }, [sessionId, eventId]);

    async function handleUpvote(questionId) {
        try {
            await fetch(`/api/events/${eventId}/sessions/${sessionId}/questions/${questionId}/upvote`, {
                method: 'POST',
            });
            setQuestions(prev =>
                prev.map(q => q.id_question === questionId
                    ? { ...q, upvote: (q.upvote ?? 0) + 1 }
                    : q
                )
            );
        } catch {}
    }

    function handleQuestionAdded(newQuestion) {
        setQuestions(prev => [newQuestion, ...prev]);
    }

    if (loading) return (
        <main className="home-main">
            <p className="empty-state">Chargement...</p>
        </main>
    );

    if (!session) return (
        <main className="home-main">
            <p className="empty-state">Session introuvable.</p>
        </main>
    );

    return (
        <main className="home-main">
            <div style={{ marginBottom: '16px' }}>
                <Link href="/session" className="back-link">← Retour aux sessions</Link>
            </div>

            {/* Header */}
            <div className="hero-section" style={{ padding: '36px 40px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div className="hero-badge">Session</div>
                    <span className={`event-status ${session.is_live ? 'status-live' : 'status-upcoming'}`}>
                        {session.is_live ? '🔴 En direct' : 'À venir'}
                    </span>
                </div>
                <h1 className="hero-title" style={{ fontSize: '32px' }}>{session.title}</h1>
                {session.description && (
                    <p className="hero-desc" style={{ fontSize: '16px' }}>{session.description}</p>
                )}
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <span className="event-date">
                        🕐 {formatTime(session.start_time)} – {formatTime(session.end_time)}
                    </span>
                    {session.room && (
                        <span className="event-location">📍 {session.room.name}</span>
                    )}
                    {session.capacity && (
                        <span className="event-location">👥 {session.capacity} places</span>
                    )}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Speakers */}
                {session.speakers?.length > 0 && (
                    <section className="section" style={{ marginBottom: 0 }}>
                        <div className="section-header">
                            <h2 className="section-title">Intervenants</h2>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {session.speakers.map(s => (
                                <div key={s.id} className="speaker-card"
                                    style={{ flexDirection: 'row', alignItems: 'center', gap: '14px' }}>
                                    <div className="speaker-avatar">
                                        {s.photo_url
                                            ? <img src={s.photo_url} alt={s.full_name} />
                                            : <span>{s.full_name?.[0]}</span>
                                        }
                                    </div>
                                    <span className="speaker-name">{s.full_name}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Questions */}
                <section className="section" style={{ marginBottom: 0 }}>
                    <div className="section-header">
                        <h2 className="section-title">
                            Questions {session.is_live ? '(live)' : ''}
                        </h2>
                    </div>
                    {session.is_live && (
                        <QuestionForm
                            sessionId={sessionId}
                            eventId={eventId}
                            onQuestionAdded={handleQuestionAdded}
                        />
                    )}
                    <QuestionList
                        questions={questions}
                        isLive={session.is_live}
                        onUpvote={handleUpvote}
                    />
                </section>
            </div>
        </main>
    );
}