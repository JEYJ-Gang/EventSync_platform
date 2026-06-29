import SpeakerCard from "./components/SpeakerCard";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

async function fetchSpeakers() {
  const res = await fetch(`${BASE_URL}/api/speaker`, {
    cache: "no-store",
  });

  const json = await res.json();
  return json.data ?? [];
}

export default async function SpeakersPage() {
  const speakers = await fetchSpeakers();

  return (
    <main className="min-h-screen bg-gray-50 p-10">

      <h1 className="text-4xl font-bold text-center mb-10">
         Intervenants
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {speakers.map((speaker) => (
          <SpeakerCard
            key={speaker.id_speaker}
            speaker={speaker}
          />
        ))}
      </div>

    </main>
  );
}