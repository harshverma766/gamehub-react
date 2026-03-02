import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "fc5d9ee65eed4c7ca4db8b86fa7b5d65"; // 🔑 same key as useGames.js

const GameDetail = ({ game, onClose }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios.get(`https://api.rawg.io/api/games/${game.id}`, {
      params: { key: API_KEY }
    }).then(res => setDetails(res.data));
  }, [game.id]);

  const getDifficulty = (rating) => {
    if (rating >= 4.5) return { label: "Easy", color: "#4caf50" };
    if (rating >= 3.5) return { label: "Medium", color: "#ff9800" };
    if (rating >= 2.5) return { label: "Hard", color: "#f44336" };
    return { label: "Very Hard", color: "#9c27b0" };
  };

  const difficulty = getDifficulty(game.rating);

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0,
      background: "rgba(0,0,0,0.85)",
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#1a1a1a",
        borderRadius: "16px",
        width: "100%",
        maxWidth: "800px",
        maxHeight: "90vh",
        overflowY: "auto",
        position: "relative",
        boxShadow: "0 20px 60px rgba(233,69,96,0.3)",
      }}>

        <button onClick={onClose} style={{
          position: "absolute", top: "16px", right: "16px",
          background: "#e94560", border: "none", color: "white",
          width: "36px", height: "36px", borderRadius: "50%",
          fontSize: "16px", cursor: "pointer", zIndex: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: "bold",
        }}>✕</button>

        <div style={{ position: "relative" }}>
          <img
            src={game.background_image}
            alt={game.name}
            style={{
              width: "100%", height: "400px",
              objectFit: "cover", objectPosition: "top",
              borderRadius: "16px 16px 0 0", display: "block",
            }}
          />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: "150px",
            background: "linear-gradient(to top, #1a1a1a, transparent)",
          }} />
          <h1 style={{
            position: "absolute", bottom: "20px", left: "24px",
            fontSize: "28px", fontWeight: "800", color: "white",
            fontFamily: "Raleway, sans-serif", margin: 0,
            textShadow: "0 2px 10px rgba(0,0,0,0.9)",
          }}>
            {game.name}
          </h1>
        </div>

        <div style={{ padding: "24px" }}>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "24px" }}>
            {game.metacritic && (
              <span style={{
                background: game.metacritic >= 75 ? "#4caf50" : "#f44336",
                color: "white", padding: "6px 14px",
                borderRadius: "8px", fontWeight: "bold", fontSize: "14px",
              }}>🏆 Metacritic: {game.metacritic}</span>
            )}
            <span style={{
              background: difficulty.color, color: "white",
              padding: "6px 14px", borderRadius: "8px",
              fontWeight: "bold", fontSize: "14px",
            }}>💀 {difficulty.label}</span>
            <span style={{
              background: "#2a2a2a", color: "#f5c518",
              padding: "6px 14px", borderRadius: "8px", fontSize: "14px",
            }}>⭐ {game.rating} / 5</span>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "12px", marginBottom: "24px",
          }}>
            {[
              { label: "📅 Release Date", value: game.released || "TBA" },
              { label: "⏱️ Avg Playtime", value: game.playtime ? `${game.playtime} hours` : "N/A" },
              { label: "🎮 Platforms", value: game.parent_platforms?.map(p => p.platform.name).join(", ") || "N/A" },
              { label: "👥 Ratings Count", value: game.ratings_count?.toLocaleString() || "N/A" },
            ].map(item => (
              <div key={item.label} style={{
                background: "#2a2a2a", borderRadius: "10px", padding: "14px",
              }}>
                <div style={{ color: "#aaa", fontSize: "12px", marginBottom: "4px" }}>{item.label}</div>
                <div style={{ color: "white", fontSize: "14px", fontWeight: "600" }}>{item.value}</div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: "24px" }}>
            <h3 style={{
              color: "#aaa", fontSize: "13px", marginBottom: "10px",
              textTransform: "uppercase", letterSpacing: "1px",
            }}>Genres</h3>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {game.genres?.map(g => (
                <span key={g.id} style={{
                  background: "#333", border: "1px solid #555",
                  borderRadius: "20px", padding: "4px 14px",
                  fontSize: "13px", color: "#ccc",
                }}>{g.name}</span>
              ))}
            </div>
          </div>

          {details?.short_screenshots?.length > 0 && (
            <div style={{ marginBottom: "24px" }}>
              <h3 style={{
                color: "#aaa", fontSize: "13px", marginBottom: "10px",
                textTransform: "uppercase", letterSpacing: "1px",
              }}>Screenshots</h3>
              <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "8px" }}>
                {details.short_screenshots.slice(0, 5).map(s => (
                  <img key={s.id} src={s.image} alt="screenshot"
                    style={{
                      height: "120px", minWidth: "200px",
                      objectFit: "cover", borderRadius: "8px",
                      border: "1px solid #333",
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {details?.description_raw && (
            <div>
              <h3 style={{
                color: "#aaa", fontSize: "13px", marginBottom: "10px",
                textTransform: "uppercase", letterSpacing: "1px",
              }}>About</h3>
              <p style={{
                color: "#ccc", fontSize: "14px",
                lineHeight: "1.8", margin: 0,
              }}>
                {details.description_raw.slice(0, 800)}...
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default GameDetail;