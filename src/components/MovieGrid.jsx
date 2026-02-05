import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api, { endpoints } from '../api';
import MovieCard from './MovieCard';

const MY_FAVORITES = [
  157336,
  155,
  27205,
  629,
  911430,
  680, 
  550, 
  466272,
  1124,   
  16869 
];

const MovieGrid = ({ onMovieClick }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const requests = MY_FAVORITES.map(id => 
          api.get(endpoints.movieDetails(id))
        );
        
        const responses = await Promise.all(requests);
        
        const movieData = responses.map(res => res.data);
        setMovies(movieData);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="favorites">
      <h2 className="text-3xl font-bold mb-8 text-white">My Favorites</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[300px] gap-4">
        {movies.map((movie, index) => {
          const isLarge = index % 5 === 0;
          
          return (
            <div 
              key={movie.id}
              className={`${isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <MovieCard movie={movie} onClick={onMovieClick} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieGrid;