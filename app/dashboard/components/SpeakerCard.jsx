'use client';
import Link from 'next/link';

function getInitials(first, last) {
    return `${first?.[0] ?? ''}${last?.[0] ?? ''}`.toUpperCase();
}

export default function SpeakerCard({ speaker }) {
    return (
        <Link href={`/speakers/${speaker.id_speaker}`} className="speaker-card">
            <div className="speaker-avatar">
                {speaker.photo_url ? (
                    <image src={speaker.photo_url} alt={speaker.first_name} />
                ) : (
                    <span>{getInitials(speaker.first_name, speaker.last_name)}</span>
                )}
            </div>
            <div className="speaker-info">
                <span className="speaker-name">
                    {speaker.first_name} {speaker.last_name}
                </span>
                {speaker.biography && (
                    <span className="speaker-bio">{speaker.biography.slice(0, 60)}...</span>
                )}
            </div>
        </Link>
    );
}