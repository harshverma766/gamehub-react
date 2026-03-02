import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "YOUR_API_KEY_HERE";

const TrendingSection = ({ onGameClick, theme }) => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    axios.get("https://api.rawg.io/api/games", {
      params: {
        key: API_KEY,
        ordering: "-rating",
        page_size: 6,
        metacritic: "85,100",
      }
    }).then(res => setTrending(res.data.results));
  }, []);

  return (
    <div style={{ marginBottom: "36px" }}>
      <h2 style={{
        fontSize: "1.4rem",
        marginBottom: "16px",
        fontFamily: "Raleway, sans-serif",
        fontWeight: "800",
        color: "#e94560",
      }}>
        🔥 Trending & Top Rated
      </h2>
      <div style={{
        display: "flex", gap: "16px",
        overflowX: "auto", paddingBottom: "12px",
      }}>
        {trending.map(game => (
          <div
            key={game.id}
            onClick={() => onGameClick(game)}
            style={{
              minWidth: "200px",
              borderRadius: "12px",
              overflow: "hidden",
              background: theme?.card || "#1e1e1e",
              cursor: "pointer",
              flexShrink: 0,
              border: `1px solid ${theme?.border || "#333"}`,
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(233,69,96,0.3)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <img
              src={game.background_image}
              alt={game.name}
              style={{ width: "100%", height: "120px", objectFit: "cover" }}
            />
            <div style={{ padding: "10px" }}>
              <h4 style={{
                fontSize: "13px", marginBottom: "6px",
                color: theme?.text || "white",
                fontWeight: "700",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}>
                {game.name}
              </h4>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#f5c518", fontSize: "12px" }}>⭐ {game.rating}</span>
                {game.metacritic && (
                  <span style={{
                    background: "#4caf50", color: "white",
                    padding: "2px 8px", borderRadius: "4px",
                    fontSize: "11px", fontWeight: "bold"
                  }}>
                    {game.metacritic}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;