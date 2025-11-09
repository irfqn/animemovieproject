export async function fetchAnime(query, page = 1, signal) {
    const url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&page=${page}`
    const res = await fetch(url, { signal })
    if (!res.ok) throw new Error(`API Error: ${res.status}`)
    const data = await res.json()
    const items = data.data || []
    const totalPages = data.pagination?.last_visible_page || 1
    return { items, totalPages }
}

export const fetchTopAnime = async () => {
    const res = await fetch("https://api.jikan.moe/v4/top/anime?limit=10");
    const data = await res.json();
    return data.data; // Jikan API return di dalam key "data"
};

