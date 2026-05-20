export default function EventModal({ event, closeModal }) {
  if (!event) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      
      <div className="bg-white w-[750px] max-h-[85vh] overflow-y-auto rounded-2xl p-8 relative shadow-xl">

        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-2xl hover:text-red-500"
        >
          ✕
        </button>

        {/* HEADER EVENT */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            {event.title}
          </h1>

          <p className="text-gray-500">
            📅 {new Date(event.start_date).toLocaleDateString()} →{" "}
            {new Date(event.end_date).toLocaleDateString()}
          </p>

          <p className="mt-2 text-gray-700">
            {event.description}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            📍 {event.location}
          </p>
        </div>

        {/* SESSIONS */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Sessions
          </h2>

          {!event.sessions || event.sessions.length === 0 ? (
            <p className="text-gray-500">
              Aucune session disponible.
            </p>
          ) : (
            <div className="space-y-4">
              {event.sessions.map((session) => (
                <div
                  key={session.id}
                  className="border rounded-xl p-4 bg-gray-50"
                >
                  {/* session header */}
                  <h3 className="font-bold text-lg">
                    {session.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    🕒{" "}
                    {new Date(session.start_time).toLocaleString()}{" "}
                    →{" "}
                    {new Date(session.end_time).toLocaleString()}
                  </p>

                  {/* description */}
                  {session.description && (
                    <p className="mt-2 text-sm text-gray-700">
                      {session.description}
                    </p>
                  )}

                  {/* room */}
                  {session.room && (
                    <p className="mt-2 text-sm text-gray-600">
                      📍 Salle :{" "}
                      <span className="font-medium">
                        {session.room.name}
                      </span>
                    </p>
                  )}

                  {/* speakers */}
                  {session.speakers?.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-semibold">
                        👤 Speakers
                      </p>

                      <ul className="list-disc ml-5 text-sm text-gray-700">
                        {session.speakers.map((sp) => (
                          <li key={sp.id}>
                            {sp.full_name}
                          </li>
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