import { useWishlist } from "../context/WishlistContext";
import GameCard from "./gamecard";

const WishlistPage = ({ theme, onGameClick, onClose }) => {
  const { wishlist } = useWishlist();

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: theme.bg,
      zIndex: 200,
      overflowY: "auto",
      padding: "24px",
    }}>
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between",
        alignItems: "center", marginBottom: "32px",
        borderBottom: `1px solid ${theme.border}`,
        paddingBottom: "16px"
      }}>
        <h1 style={{
          fontSize: "2rem", fontWeight: "800",
          fontFamily: "Raleway, sans-serif", color: theme.text
        }}>
          ❤️ My Wishlist
          <span style={{
            marginLeft: "12px", fontSize: "16px",
            background: "#e94560", color: "white",
            padding: "2px 10px", borderRadius: "20px"
          }}>
            {wishlist.length}
          </span>
        </h1>
        <button onClick={onClose} style={{
          background: "#e94560", color: "white", border: "none",
          padding: "10px 20px", borderRadius: "10px",
          cursor: "pointer", fontWeight: "700", fontSize: "14px"
        }}>
          ← Back to Games
        </button>
      </div>

      {/* Empty state */}
      {wishlist.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "80px 20px",
          color: theme.subtext
        }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>💔</div>
          <h2 style={{ fontSize: "24px", marginBottom: "8px", color: theme.text }}>
            Your wishlist is empty
          </h2>
          <p>Click the ❤️ on any game card to save it here!</p>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px"
        }}>
          {wishlist.map(game => (
            <GameCard
              key={game.id}
              game={game}
              theme={theme}
              onClick={() => onGameClick(game)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;