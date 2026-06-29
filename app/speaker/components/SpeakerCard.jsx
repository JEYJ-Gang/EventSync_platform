'use client';

import Link from 'next/link';

function getInitials(first, last) {
  return `${first?.[0] ?? ''}${last?.[0] ?? ''}`.toUpperCase();
}

export default function SpeakerCard({ speaker }) {
  return (
    <Link
      href={`/speakers/${speaker.id_speaker}`}
      className="speaker-card"
    >

      <div className="speaker-avatar">
        {speaker.photo_url ? (
          <img
            src={speaker.photo_url}
            alt={`${speaker.first_name} ${speaker.last_name}`}
          />
        ) : (
          <span>
            {getInitials(speaker.first_name, speaker.last_name)}
          </span>
        )}
      </div>

      <div className="speaker-info">
        <h3 className="speaker-name">
          {speaker.first_name} {speaker.last_name}
        </h3>

        {speaker.biography && (
          <p className="speaker-bio">
            {speaker.biography}
          </p>
        )}
      </div>

      <span className="speaker-link">
        Voir profil →
      </span>

    </Link>
  );
}