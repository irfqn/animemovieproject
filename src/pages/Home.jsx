import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import TopAnimeList from "../components/TopAnimeList";
import Pagination from "../components/Pagination";
import { useState, useEffect } from "react";

const Home = () => {
  const [animeList, setAnimeList] = useState([]);
  const [trendingAnime, setTrendingAnime] = useState(null);

  useEffect(() => {
    fetch("https://api.jikan.moe/v4/top/anime")
      .then((res) => res.json())
      .then((data) => {
        setAnimeList(data.data);
        setTrendingAnime(data.data[0]); // Ambil anime paling populer sebagai hero
      });
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section di atas */}
      {trendingAnime && <Hero anime={trendingAnime} />}

      {/* Search bar di bawah hero */}
      <SearchBar />

      {/* Top 10 anime list */}
      <TopAnimeList data={animeList.slice(0, 10)} />

      {/* Pagination */}
      <Pagination />
    </main>
  );
};

export default Home;
