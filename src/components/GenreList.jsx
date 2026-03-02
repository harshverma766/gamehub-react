const genres = [
  { name: "All Games", slug: "", icon: "🎮" },
  { name: "Action", slug: "action", icon: "💥" },
  { name: "Indie", slug: "indie", icon: "🎨" },
  { name: "Adventure", slug: "adventure", icon: "🗺️" },
  { name: "RPG", slug: "role-playing-games-rpg", icon: "⚔️" },
  { name: "Strategy", slug: "strategy", icon: "♟️" },
  { name: "Shooter", slug: "shooter", icon: "🔫" },
  { name: "Casual", slug: "casual", icon: "😄" },
  { name: "Simulation", slug: "simulation", icon: "🏙️" },
  { name: "Puzzle", slug: "puzzle", icon: "🧩" },
  { name: "Racing", slug: "racing", icon: "🏎️" },
  { name: "Sports", slug: "sports", icon: "⚽" },
  { name: "Fighting", slug: "fighting", icon: "🥊" },
  { name: "Horror", slug: "horror", icon: "👻" },
  { name: "Platformer", slug: "platformer", icon: "🕹️" },
];

const GenreList = ({ selected, onSelect, theme, darkMode }) => (
  <div style={{
    width: "230px",
    minWidth: "230px",
    padding: "24px 16px",
    background: theme?.sidebar || "#1a1a1a",
    borderRight: `1px solid ${theme?.border || "#333"}`,
    minHeight: "100vh",
    transition: "all 0.3s",
  }}>
    <h3 style={{
      marginBottom: "16px",
      color: theme?.subtext || "#aaa",
      fontSize: "11px",
      textTransform: "uppercase",
      letterSpacing: "2px",
      fontFamily: "Raleway, sans-serif",
      paddingLeft: "8px",
    }}>
      Genres
    </h3>
    {genres.map(g => (
      <div
        key={g.slug}
        onClick={() => onSelect(g.slug)}
        style={{
          padding: "10px 12px",
          borderRadius: "10px",
          cursor: "pointer",
          marginBottom: "2px",
          fontWeight: g.slug === selected ? "800" : "600",
          background: g.slug === selected
            ? "linear-gradient(135deg, #e94560, #c73652)"
            : "transparent",
          color: g.slug === selected ? "white" : theme?.text || "white",
          transition: "all 0.2s",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          fontSize: "14px",
          boxShadow: g.slug === selected ? "0 4px 12px rgba(233,69,96,0.3)" : "none",
        }}
        onMouseEnter={e => {
          if (g.slug !== selected) {
            e.currentTarget.style.background = darkMode ? "#2a2a2a" : "#f0f0f0";
            e.currentTarget.style.paddingLeft = "16px";
          }
        }}
        onMouseLeave={e => {
          if (g.slug !== selected) {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.paddingLeft = "12px";
          }
        }}
      >
        <span style={{ fontSize: "18px" }}>{g.icon}</span>
        <span>{g.name}</span>
      </div>
    ))}
  </div>
);

export default GenreList;