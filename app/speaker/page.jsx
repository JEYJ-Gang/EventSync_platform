import SpeakerCard from "./SpeakerCard";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

async function fetchSpeakers() {
  try {
    const res = await fetch(`${BASE_URL}/api/speaker`, {
      cache: "no-store",
    });

    const json = await res.json();

    return json.data ?? [];
  } catch {
    return [];
  }
}

export default async function SpeakersPage() {
  const speakers = await fetchSpeakers();

  return (
    <main className="speakers-page">
      <h1 className="text-3xl font-bold mb-8">
        Nos intervenants
      </h1>

      <div className="speakers-grid">
        {speakers.length > 0 ? (
          speakers.map((speaker) => (
            <SpeakerCard
              key={speaker.id_speaker}
              speaker={speaker}
            />
          ))
        ) : (
          <p>Aucun intervenant trouvé.</p>
        )}
      </div>
    </main>
  );
}