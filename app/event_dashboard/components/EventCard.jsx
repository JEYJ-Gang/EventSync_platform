
export default function EventCard({ event, openEventModal, }) {

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full">

      <h2 className="text-2xl font-bold mb-3">
        {event.title}
      </h2>

      <p className="text-gray-500 mb-2">
        {new Date(event.start_date).toLocaleDateString()}
      </p>

      <p className="mb-6">
        {event.description}
      </p>

      <button 
        onClick={() => openEventModal(event.id)}
        className="bg-black text-white px-4 py-2 rounded-xl">
        Voir les détails
      </button>

    </div>
  );
}