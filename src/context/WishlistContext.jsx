import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (game) => {
    setWishlist(prev => {
      if (prev.find(g => g.id === game.id)) return prev;
      return [...prev, game];
    });
  };

  const removeFromWishlist = (gameId) => {
    setWishlist(prev => prev.filter(g => g.id !== gameId));
  };

  const isWishlisted = (gameId) => wishlist.some(g => g.id === gameId);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);