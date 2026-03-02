import { useState } from "react";

const getPlatformIcons = (platforms) => {
  if (!platforms) return "";
  const names = platforms.map(p => p.platform.slug);
  let icons = "";
  if (names.some(n => n.includes("pc"))) icons += "🖥️ ";
  if (names.some(n => n.includes("playstation"))) icons += "🎮 ";
  if (names.some(n => n.includes("xbox"))) icons += "🕹️ ";
  if (names.some(n => n.includes("nintendo"))) icons += "🎯 ";
  return icons;
};

const getScoreColor = (score) => {
  if (score >= 90) return "#4caf50";
  if (score >= 75) return "#ff9800";
  return "#f44336";
};

const getDifficulty = (rating) => {
  if (rating >= 4.5) return { label: "Easy", color: "#4caf50" };
  if (rating >= 3.5) return { label: "Medium", color: "#ff9800" };
  if (rating >= 2.5) return { label: "Hard", color: "#f44336" };
  return { label: "Very Hard", color: "#9c27b0" };
};

const GameCard = ({ game, onClick, theme }) => {
  const [hovered, setHovered] = useState(false);
  const difficulty = getDifficulty(game.rating);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: theme?.card || "#1e1e1e",
        borderRadius: "12px",
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 30px rgba(233,69,96,0.4)" : `0 2px 8px rgba(0,0,0,0.2)`,
        transition: "transform 0.3s, box-shadow 0.3s",
        border: `1px solid ${theme?.border || "#333"}`,
      }}>

      <img
        src={game.background_image || "https://via.placeholder.com/300x200?text=No+Image"}
        alt={game.name}
        style={{ width: "100%", height: "220px", objectFit: "cover", display: "block" }}
      />

      {game.metacritic && (
        <span style={{
          position: "absolute", top: "10px", right: "10px",
          background: getScoreColor(game.metacritic), color: "white",
          padding: "4px 8px", borderRadius: "6px",
          fontWeight: "bold", fontSize: "14px", zIndex: 3,
        }}>
          {game.metacritic}
        </span>
      )}

      <span style={{
        position: "absolute", top: "10px", left: "10px",
        background: difficulty.color, color: "white",
        padding: "4px 10px", borderRadius: "6px",
        fontWeight: "bold", fontSize: "11px", zIndex: 3,
      }}>
        {difficulty.label}
      </span>

      <div style={{ padding: "12px 14px", background: theme?.card || "#1e1e1e" }}>
        <div style={{ fontSize: "12px", color: theme?.subtext || "#aaa", marginBottom: "4px" }}>
          {getPlatformIcons(game.parent_platforms)}
        </div>
        <h3 style={{
          fontSize: "15px", fontWeight: "700",
          color: theme?.text || "white",
          fontFamily: "Raleway, sans-serif",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {game.name}
        </h3>
      </div>

      {/* Hover Overlay */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.97) 80%, transparent)",
        padding: "20px 16px 16px",
        transform: hovered ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.35s ease",
        zIndex: 2,
        borderRadius: "0 0 12px 12px",
      }}>
        <h3 style={{ fontSize: "14px", fontWeight: "700", marginBottom: "10px", color: "white" }}>
          {game.name}
        </h3>
        <div style={{ borderTop: "1px solid #444", marginBottom: "8px" }} />

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
          <span style={{ color: "#aaa", fontSize: "12px" }}>📅 Release</span>
          <span style={{ fontSize: "12px", color: "white" }}>{game.released || "TBA"}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
          <span style={{ color: "#aaa", fontSize: "12px" }}>⭐ Rating</span>
          <span style={{ fontSize: "12px", color: "#f5c518" }}>{game.rating}/5</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
          <span style={{ color: "#aaa", fontSize: "12px" }}>⏱️ Playtime</span>
          <span style={{ fontSize: "12px", color: "white" }}>
            {game.playtime ? `${game.playtime}h` : "N/A"}
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span style={{ color: "#aaa", fontSize: "12px" }}>💀 Difficulty</span>
          <span style={{ fontSize: "12px", color: difficulty.color, fontWeight: "bold" }}>
            {difficulty.label}
          </span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
          {game.genres?.slice(0, 3).map(g => (
            <span key={g.id} style={{
              background: "#333", border: "1px solid #555",
              borderRadius: "20px", padding: "2px 8px",
              fontSize: "10px", color: "#ccc",
            }}>
              {g.name}
            </span>
          ))}
        </div>

        <div style={{
          marginTop: "10px", textAlign: "center",
          color: "#e94560", fontSize: "11px", fontWeight: "700",
        }}>
          🖱️ Click for more details
        </div>
      </div>
    </div>
  );
};

export default GameCard;