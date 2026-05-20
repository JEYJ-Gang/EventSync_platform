export default function EventModal({ closeModal }) {

  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">

      <div className="bg-white w-[700px] rounded-2xl p-8 relative shadow-xl">

        {/* bouton fermer */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-2xl"
        >
          ✕
        </button>

        <h1 className="text-3xl font-bold mb-4">
          À propos de la page
        </h1>

        <p className="text-lg leading-8">
          Cette page permet de rechercher des évènements,
          les filtrer et consulter leurs détails.
        </p>

      </div>

    </div>
  );
}