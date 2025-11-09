import React from 'react'
import { Link } from 'react-router-dom'

const AnimeCard = ({ anime }) => {
  return (
    <Link to={`/anime/${anime.mal_id}`} className="border rounded-lg overflow-hidden shadow hover:shadow-lg">
      <img src={anime.images?.jpg?.image_url} alt={anime.title} className="w-full h-64 object-cover" />
      <div className="p-2">
        <h3 className="font-semibold">{anime.title}</h3>
      </div>
    </Link>
  )
}

export default AnimeCard
