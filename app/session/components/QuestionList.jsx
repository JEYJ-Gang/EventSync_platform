'use client';

export default function QuestionList({ questions, isLive, onUpvote }) {
    if (questions.length === 0) {
        return (
            <p className="empty-state">
                {isLive ? 'Aucune question pour le moment.' : 'Les questions sont disponibles pendant la session.'}
            </p>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {questions.map(q => (
                <div key={q.id_question} className="event-card" style={{ gap: '8px' }}>
                    <p style={{ fontSize: '15px', color: 'var(--text)', lineHeight: '1.5' }}>
                        {q.content}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                            {q.author_name ?? 'Anonyme'}
                        </span>
                        {isLive && (
                            <button
                                onClick={() => onUpvote(q.id_question)}
                                style={{
                                    background: 'var(--accent-soft)',
                                    border: '1px solid rgba(123,110,246,0.25)',
                                    borderRadius: '20px',
                                    padding: '4px 12px',
                                    color: 'var(--accent)',
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                }}
                            >
                                👍 {q.upvote ?? 0}
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}