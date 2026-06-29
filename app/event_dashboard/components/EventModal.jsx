"use client";

export default function EventModal({ event, closeModal }) {
  if (!event) return null;

  return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
        <div className="bg-[#1a1a1c] border border-[#2a2a2e] w-[750px] max-h-[85vh] overflow-y-auto rounded-2xl p-8 relative shadow-2xl">

          {/* Close button */}
          <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-xl text-[#9999a5] hover:text-red-400 transition-colors"
          >
            ✕
          </button>

          {/* HEADER */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2 text-[#f0ede8]">
              {event.title}
            </h1>
            <p className="text-[#9999a5] text-sm mb-2">
              {new Date(event.start_date).toLocaleDateString("fr-FR")} →{" "}
              {new Date(event.end_date).toLocaleDateString("fr-FR")}
            </p>
            <p className="text-[#f0ede8]/80 text-sm mb-1">
              {event.description}
            </p>
            {event.location && (
                <p className="text-sm text-[#9999a5]">
                  {event.location}
                </p>
            )}
          </div>

          {/* SESSIONS */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-[#f0ede8]">
              Sessions
            </h2>
            {!event.sessions || event.sessions.length === 0 ? (
                <p className="text-[#9999a5] text-sm">Aucune session disponible.</p>
            ) : (
                <div className="space-y-4">
                  {event.sessions.map((session) => (
                      <div
                          key={session.id_session}
                          className="border border-[#2a2a2e] rounded-xl p-4 bg-[#131315]"
                      >
                        <h3 className="font-bold text-base text-[#f0ede8] mb-1">
                          {session.title}
                        </h3>
                        <p className="text-xs text-[#9999a5] mb-2">
                          {new Date(session.start_time).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}{" "}
                          →{" "}
                          {new Date(session.end_time).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                        {session.description && (
                            <p className="text-sm text-[#9999a5] mb-2">
                              {session.description}
                            </p>
                        )}
                        {session.room && (
                            <p className="text-sm text-[#9999a5]">
                              Salle :{" "}
                              <span className="font-medium text-[#7b6ef6]">
                        {session.room.name}
                      </span>
                            </p>
                        )}
                        {session.speakers?.length > 0 && (
                            <div className="mt-3">
                              <p className="text-xs font-semibold text-[#9999a5] mb-1">
                                Speakers
                              </p>
                              <ul className="list-disc ml-5 text-sm text-[#f0ede8]/70">
                                {session.speakers.map((sp) => (
                                    <li key={sp.id}>{sp.full_name}</li>
                                ))}
                              </ul>
                            </div>
                        )}
                      </div>
                  ))}
                </div>
            )}
          </div>
        </div>
      </div>
  );
}