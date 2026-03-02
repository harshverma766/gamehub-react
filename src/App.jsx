import { useState } from "react";
import NavBar from "./components/NavBar";
import GenreList from "./components/GenreList";
import GameGrid from "./components/GameGrid";
import TrendingSection from "./components/TrendingSection";
import GameDetail from "./components/GameDetail";
import "./App.css";

function App() {
  const [genre, setGenre] = useState("");
  const [ordering, setOrdering] = useState("");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [selectedGame, setSelectedGame] = useState(null);

  const theme = {
    bg: darkMode ? "#121212" : "#f0f0f0",
    sidebar: darkMode ? "#1a1a1a" : "#ffffff",
    text: darkMode ? "#ffffff" : "#111111",
    card: darkMode ? "#1e1e1e" : "#ffffff",
    border: darkMode ? "#333" : "#ddd",
    subtext: darkMode ? "#aaa" : "#666",
  };

  return (
    <div style={{
      background: theme.bg,
      minHeight: "100vh",
      color: theme.text,
      transition: "all 0.3s",
      fontFamily: "Nunito, sans-serif",
    }}>

      <NavBar
        onSearch={(q) => { setSearch(q); setGenre(""); }}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        theme={theme}
      />

      <div style={{ display: "flex" }}>
        <GenreList
          selected={genre}
          onSelect={(g) => { setGenre(g); setSearch(""); }}
          theme={theme}
          darkMode={darkMode}
        />

        <div style={{ flex: 1, padding: "28px 24px" }}>

          {!search && !genre && (
            <TrendingSection
              onGameClick={setSelectedGame}
              theme={theme}
            />
          )}

          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            marginBottom: "20px",
            fontFamily: "Raleway, sans-serif",
            letterSpacing: "-0.5px",
          }}>
            {search
              ? `🔍 Results for "${search}"`
              : genre
              ? `${genre.charAt(0).toUpperCase() + genre.slice(1).replace(/-/g, " ")} Games`
              : "🎮 All Games"}
          </h1>

          <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
            <select
              onChange={e => setOrdering(e.target.value)}
              value={ordering}
              style={{
                background: darkMode ? "#2a2a2a" : "#fff",
                color: theme.text,
                border: `1px solid ${theme.border}`,
                padding: "9px 16px",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "14px",
                fontFamily: "Nunito, sans-serif",
                fontWeight: "600",
                outline: "none",
              }}>
              <option value="">Order by: Relevance</option>
              <option value="-metacritic">🏆 Metacritic Score</option>
              <option value="-rating">⭐ Rating</option>
              <option value="-released">📅 Release Date</option>
              <option value="name">🔤 Name (A-Z)</option>
            </select>

            {(genre || search || ordering) && (
              <button
                onClick={() => { setGenre(""); setSearch(""); setOrdering(""); }}
                style={{
                  background: "transparent",
                  color: "#e94560",
                  border: "2px solid #e94560",
                  padding: "9px 16px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "700",
                  fontFamily: "Nunito, sans-serif",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  e.target.style.background = "#e94560";
                  e.target.style.color = "white";
                }}
                onMouseLeave={e => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#e94560";
                }}
              >
                ✕ Clear Filters
              </button>
            )}
          </div>

          <GameGrid
            genre={genre}
            ordering={ordering}
            search={search}
            theme={theme}
            onGameClick={setSelectedGame}
          />
        </div>
      </div>

      {selectedGame && (
        <GameDetail
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
        />
      )}

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          background: "#e94560",
          color: "white",
          border: "none",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          fontSize: "22px",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(233,69,96,0.5)",
          zIndex: 99,
          transition: "transform 0.2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.15)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >↑</button>

    </div>
  );
}

export default App;