import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = ({ anime }) => {
  const navigate = useNavigate();

  const handleTrailer = () => {
    if (anime?.trailer?.url) {
      window.open(anime.trailer.url, "_blank"); // buka trailer di tab baru
    } else {
      alert("Trailer not available 😔");
    }
  };

  const handleMoreInfo = () => {
    navigate(`/anime/${anime.mal_id}`); // arahkan ke detail page
  };

  return (
    <section
      className="relative w-full h-[60vh] rounded-2xl overflow-hidden mb-12"
      style={{
        backgroundImage: `url(${anime?.images?.jpg?.large_image_url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-8 text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-2">{anime?.title}</h1>
        <p className="text-sm md:text-base max-w-2xl mb-4 line-clamp-3">
          {anime?.synopsis}
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleTrailer}
            className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Watch Trailer
          </button>
          <button
            onClick={handleMoreInfo}
            className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            More Info
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
