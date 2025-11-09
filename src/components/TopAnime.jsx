import React, { useEffect, useState } from "react";
import AnimeCard from "./AnimeCard";

const TopAnime = () => {
  const [topAnime, setTopAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        // Ambil 10 anime teratas dari API Jikan
        const response = await fetch("https://api.jikan.moe/v4/top/anime?limit=10");
        const data = await response.json();
        setTopAnime(data.data);
      } catch (error) {
        console.error("Error fetching top anime:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopAnime();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading top anime...</p>;

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-4">🔥 Top 10 Anime Terbaru</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {topAnime.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    </section>
  );
};

export default TopAnime;
