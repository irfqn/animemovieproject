import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const DetailPage = () => {
  const { id } = useParams()
  const [anime, setAnime] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${id}/full`)
      .then(res => res.json())
      .then(data => {
        setAnime(data.data)
        setLoading(false)
      })
  }, [id])

  if (loading) return <div>Loading...</div>

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Link to="/" className="text-blue-500">← Back</Link>
      <h1 className="text-3xl font-bold mb-4">{anime.title}</h1>
      <img src={anime.images.jpg.image_url} alt={anime.title} className="rounded-lg mb-4" />
      <p>{anime.synopsis}</p>
      <a href={anime.url} target="_blank" rel="noreferrer" className="text-blue-500 underline mt-2 inline-block">
        View on MyAnimeList
      </a>
    </div>
  )
}

export default DetailPage
