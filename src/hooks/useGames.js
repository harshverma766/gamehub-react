import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "fc5d9ee65eed4c7ca4db8b86fa7b5d65"; // 🔑 same key as GameDetail.jsx

const useGames = (genre, ordering, search, page = 1) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setGames([]);
  }, [genre, ordering, search]);

  useEffect(() => {
    setLoading(true);
    axios.get("https://api.rawg.io/api/games", {
      params: {
        key: API_KEY,
        genres: genre || undefined,
        ordering: ordering || undefined,
        search: search || undefined,
        page_size: 20,
        page: page,
      }
    }).then(res => {
      setGames(prev => page === 1 ? res.data.results : [...prev, ...res.data.results]);
      setHasMore(!!res.data.next);
      setLoading(false);
    });
  }, [genre, ordering, search, page]);

  return { games, loading, hasMore };
};

export default useGames;