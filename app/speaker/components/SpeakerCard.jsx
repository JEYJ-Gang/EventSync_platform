'use client';

import Link from 'next/link';

function getInitials(first, last) {
  return `${first?.[0] ?? ''}${last?.[0] ?? ''}`.toUpperCase();
}

export default function SpeakerCard({ speaker }) {
  return (
    <Link
      href={`/speakers/${speaker.id_speaker}`}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 flex flex-col items-center text-center"
    >

      {/* AVATAR */}
      <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center mb-4">

        {speaker.photo_url ? (
          <img
            src={speaker.photo_url}
            alt={`${speaker.first_name} ${speaker.last_name}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xl font-bold text-gray-600">
            {getInitials(speaker.first_name, speaker.last_name)}
          </span>
        )}

      </div>

      {/* NAME */}
      <h3 className="text-lg font-semibold">
        {speaker.first_name} {speaker.last_name}
      </h3>

      {/* BIO SHORT */}
      {speaker.biography && (
        <p className="text-sm text-gray-500 mt-2 line-clamp-3">
          {speaker.biography}
        </p>
      )}

      <span className="text-xs text-blue-500 mt-3">
        Voir profil →
      </span>

    </Link>
  );
}