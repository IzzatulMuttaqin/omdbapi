import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMoviesList } from './moviesListAPI';

const initialState = {
    data: undefined,
    status: 'idle',
};

export const fetchMovies = createAsyncThunk(
    'movies/fetchCount',
    async (name, page) => {
        try {
            const response = await fetchMoviesList(name, page);
            return { data: response.data, status: 'idle' };
        } catch (error) {
            return { data: error, status: 'failed' };
        }
    }
);

export const moviesList = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        updateManually: (state, action) => {
            if (!!state.data) {
                state.data = {
                    ...action.payload,
                    Search: [
                        ...state.data.Search,
                        ...action.payload.Search,
                    ],
                }
            } else {
                state.data = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.status = action.payload.status;
                if (!!state.data && action.payload.status !== 'failed') {
                    state.data = {
                        ...action.payload.data,
                        Search: [
                            ...state.data.Search,
                            ...action.payload.dataSearch,
                        ],
                    }
                } else {
                    state.data = action.payload.data;
                }
            });
    },
});

export const { updateManually } = moviesList.actions;

export const selectMoviesList = (state) => state.moviesList.data;

export default moviesList.reducer;
