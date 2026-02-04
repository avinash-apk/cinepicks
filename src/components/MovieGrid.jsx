import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api, { endpoints } from '../api';
import MovieCard from './MovieCard';

const MovieGrid = ({ onMovieClick }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await api.get(endpoints.discover);
      setMovies(data.results);
    };
    fetchMovies();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="trending">
      <h2 className="text-3xl font-bold mb-8 text-white">Trending Now</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[300px] gap-4">
        {movies.map((movie, index) => {
          // Logic: Every 5th item spans 2 rows/cols on desktop
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