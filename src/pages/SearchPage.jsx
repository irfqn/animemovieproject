import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setQuery, setPage, searchStart, searchSuccess, searchFailure } from '../features/search/searchSlice'
import { fetchAnime } from '../api/jikan'
import AnimeCard from '../components/AnimeCard'
import Pagination from '../components/Pagination'

const DEBOUNCE_MS = 250

const SearchPage = () => {
  const dispatch = useDispatch()
  const { query, page, results, totalPages, loading, error } = useSelector(state => state.search)
  const [localQuery, setLocalQuery] = useState(query)
  const debounceRef = useRef(null)
  const abortRef = useRef(null)

  // Debounce effect
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      if (abortRef.current) abortRef.current.abort()

      if (!localQuery.trim()) {
        dispatch(setQuery(''))
        dispatch(searchSuccess({ items: [], totalPages: 1 }))
        return
      }

      const controller = new AbortController()
      abortRef.current = controller
      dispatch(setQuery(localQuery))
      dispatch(searchStart())

      fetchAnime(localQuery, 1, controller.signal)
        .then(({ items, totalPages }) => {
          dispatch(searchSuccess({ items, totalPages }))
          dispatch(setPage(1))
        })
        .catch(err => {
          if (err.name === 'AbortError') return
          dispatch(searchFailure(err.message))
        })
    }, DEBOUNCE_MS)

    return () => clearTimeout(debounceRef.current)
  }, [localQuery, dispatch])

  // Pagination
  const goToPage = (p) => {
    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller
    dispatch(setPage(p))
    dispatch(searchStart())

    fetchAnime(query, p, controller.signal)
      .then(({ items, totalPages }) => {
        dispatch(searchSuccess({ items, totalPages }))
      })
      .catch(err => {
        if (err.name === 'AbortError') return
        dispatch(searchFailure(err.message))
      })
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Anime Search</h1>
      <input
        value={localQuery}
        onChange={(e) => setLocalQuery(e.target.value)}
        placeholder="Search anime..."
        className="w-full p-2 border rounded mb-4"
      />

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">Error: {error}</div>}
      {!loading && results.length === 0 && query && <div>No results found</div>}

      <div className="grid grid-cols-2 gap-4">
        {results.map(r => (
          <AnimeCard key={r.mal_id} anime={r} />
        ))}
      </div>

      <Pagination current={page} total={totalPages} onPageChange={goToPage} />
    </div>
  )
}

export default SearchPage
