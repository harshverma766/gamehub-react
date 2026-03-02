import { useState, useEffect } from "react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";

const GameGrid = ({ genre, ordering, search, theme, onGameClick }) => {
  const [page, setPage] = useState(1);
  const { games, loading, hasMore } = useGames(genre, ordering, search, page);

  useEffect(() => {
    setPage(1);
  }, [genre, ordering, search]);

  return (
    <>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "20px",
      }}>
        {games.map(game => (
          <GameCard
            key={game.id}
            game={game}
            theme={theme}
            onClick={() => onGameClick(game)}
          />
        ))}
      </div>

      {loading && (
        <div style={{
          textAlign: "center", padding: "40px",
          color: theme?.subtext || "#aaa", fontSize: "18px"
        }}>
          Loading games... 🎮
        </div>
      )}

      {!loading && hasMore && (
        <div style={{ textAlign: "center", marginTop: "40px", marginBottom: "40px" }}>
          <button
            onClick={() => setPage(prev => prev + 1)}
            style={{
              background: "#e94560", color: "white", border: "none",
              padding: "14px 40px", borderRadius: "10px",
              fontSize: "16px", fontWeight: "bold",
              fontFamily: "Nunito, sans-serif",
              cursor: "pointer", transition: "all 0.2s",
            }}
            onMouseEnter={e => e.target.style.background = "#c73652"}
            onMouseLeave={e => e.target.style.background = "#e94560"}
          >
            Load More Games 🎮
          </button>
        </div>
      )}

      {!loading && !hasMore && games.length > 0 && (
        <div style={{
          textAlign: "center", padding: "30px",
          color: theme?.subtext || "#555", fontSize: "14px"
        }}>
          You've seen all games! 🎯
        </div>
      )}

      {!loading && games.length === 0 && (
        <div style={{
          textAlign: "center", padding: "60px",
          color: theme?.subtext || "#aaa", fontSize: "18px"
        }}>
          No games found 😔 Try a different search!
        </div>
      )}
    </>
  );
};

export default GameGrid;