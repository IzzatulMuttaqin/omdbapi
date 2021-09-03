import axios from 'axios';

export function fetchMoviesList(title = "", page = 1) {
    return axios.get(`http://www.omdbapi.com?apikey=faf7e5bb&s=${title}&page=${page}`);
}