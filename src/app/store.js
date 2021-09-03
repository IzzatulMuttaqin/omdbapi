import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import moviesListReducer from '../features/movies-list/moviesListReducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    moviesList: moviesListReducer,
  },
});
