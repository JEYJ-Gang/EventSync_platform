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
        <main className="home-main bg-[var(--bg)] text-[var(--text)]">

            <h1 className="text-[22px] font-semibold mb-6 text-[var(--text)]">
                Intervenants
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[20px]">
                {speakers.map((s) => (
                    <SpeakerCard key={s.id_speaker} speaker={s} />
                ))}
            </div>

        </main>
    );
}