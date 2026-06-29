import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000";

export default function SpeakerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [speaker, setSpeaker] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSpeaker() {
      try {
        const res = await fetch(`${API_URL}/api/speaker/${id}`);
        const json = await res.json();

        setSpeaker(json.data ?? json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadSpeaker();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: 40 }}>
        Chargement...
      </div>
    );
  }

  if (!speaker) {
    return (
      <div style={{ padding: 40 }}>
        Speaker introuvable
      </div>
    );
  }

  return (
    <main style={page}>

      <div style={card}>

        {/* BACK */}
        <button style={backBtn} onClick={() => navigate("/speakers")}>
          ← Retour
        </button>

        {/* PHOTO */}
        <div style={avatar}>
          {speaker.photo_url ? (
            <img src={speaker.photo_url} style={img} />
          ) : (
            <div style={fallback}>
              {speaker.first_name?.[0]}{speaker.last_name?.[0]}
            </div>
          )}
        </div>

        {/* INFOS */}
        <h1 style={name}>
          {speaker.first_name} {speaker.last_name}
        </h1>

        <p style={bio}>
          {speaker.biography || "Aucune biographie"}
        </p>

        {speaker.external_link && (
          <a
            href={speaker.external_link}
            target="_blank"
            style={link}
          >
            Lien externe
          </a>
        )}

      </div>

    </main>
  );
}
const page = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #f4f6fb, #eef2ff)",
};

const card = {
  width: "380px",
  padding: "30px",
  borderRadius: "28px",
  background: "#fff",
  boxShadow: "0 25px 70px rgba(79, 70, 229, 0.25)",
  border: "1px solid rgba(79, 70, 229, 0.15)",
  textAlign: "center",
};

const avatar = {
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  overflow: "hidden",
  margin: "0 auto 20px",
};

const img = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const fallback = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#4f46e5",
  color: "white",
  fontSize: "24px",
  fontWeight: "bold",
};

const name = {
  fontSize: "22px",
  fontWeight: "900",
  marginBottom: "10px",
};

const bio = {
  color: "#6b7280",
  fontSize: "14px",
  marginBottom: "12px",
};

const link = {
  color: "#4f46e5",
  fontSize: "14px",
};

const backBtn = {
  position: "absolute",
  top: "20px",
  left: "20px",
  background: "transparent",
  border: "none",
  color: "#4f46e5",
  fontWeight: "bold",
  cursor: "pointer",
};