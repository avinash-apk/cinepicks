import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const endpoints = {
  trending: '/trending/movie/week',
  topRated: '/movie/top_rated',
  upcoming: '/movie/upcoming',
  discover: '/discover/movie',
  movieDetails: (id) => `/movie/${id}`,
  movieVideos: (id) => `/movie/${id}/videos`,
  search: '/search/movie',
};

export const getImageUrl = (path, size = 'original') => {
  if (!path) return '/placeholder-movie.png';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export default api;