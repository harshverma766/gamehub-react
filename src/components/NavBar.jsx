import { useState } from "react";

const NavBar = ({ onSearch, darkMode, setDarkMode, theme }) => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 32px",
      background: theme.sidebar,
      borderBottom: `1px solid ${theme.border}`,
      position: "sticky",
      top: 0,
      zIndex: 50,
      boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
      transition: "all 0.3s",
    }}>

      <div style={{
        fontSize: "22px",
        fontWeight: "900",
        fontFamily: "Raleway, sans-serif",
        color: "#e94560",
        letterSpacing: "-0.5px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        whiteSpace: "nowrap",
      }}>
        🎮 GameHub
      </div>

      <form onSubmit={handleSearch} style={{
        display: "flex", gap: "8px",
        flex: 1, maxWidth: "480px", margin: "0 32px"
      }}>
        <div style={{ position: "relative", flex: 1 }}>
          <span style={{
            position: "absolute", left: "12px", top: "50%",
            transform: "translateY(-50%)", fontSize: "15px", pointerEvents: "none"
          }}>🔍</span>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search games..."
            style={{
              width: "100%",
              background: darkMode ? "#2a2a2a" : "#f5f5f5",
              border: `2px solid ${focused ? "#e94560" : theme.border}`,
              color: theme.text,
              padding: "9px 16px 9px 38px",
              borderRadius: "10px",
              fontSize: "14px",
              outline: "none",
              transition: "border 0.2s",
              fontFamily: "Nunito, sans-serif",
            }}
          />
        </div>
        <button type="submit" style={{
          background: "#e94560",
          color: "white",
          border: "none",
          padding: "9px 20px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "700",
          fontSize: "14px",
          fontFamily: "Nunito, sans-serif",
          transition: "all 0.2s",
        }}
          onMouseEnter={e => e.target.style.background = "#c73652"}
          onMouseLeave={e => e.target.style.background = "#e94560"}
          onMouseDown={e => e.target.style.transform = "scale(0.96)"}
          onMouseUp={e => e.target.style.transform = "scale(1)"}
        >
          Search
        </button>
      </form>

      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          background: darkMode ? "#2a2a2a" : "#e8e8e8",
          border: `1px solid ${theme.border}`,
          borderRadius: "10px",
          padding: "8px 16px",
          cursor: "pointer",
          color: theme.text,
          fontSize: "13px",
          fontWeight: "700",
          fontFamily: "Nunito, sans-serif",
          transition: "all 0.3s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={e => e.target.style.borderColor = "#e94560"}
        onMouseLeave={e => e.target.style.borderColor = theme.border}
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </nav>
  );
};

export default NavBar;