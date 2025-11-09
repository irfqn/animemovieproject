import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    query: '',
    page: 1,
    results: [],
    totalPages: 1,
    loading: false,
    error: null
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload
            state.page = 1
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
        searchStart: (state) => {
            state.loading = true
            state.error = null
        },
        searchSuccess: (state, action) => {
            state.loading = false
            state.results = action.payload.items
            state.totalPages = action.payload.totalPages
        },
        searchFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const { setQuery, setPage, searchStart, searchSuccess, searchFailure } = searchSlice.actions
export default searchSlice.reducer
