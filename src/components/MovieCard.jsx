import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { getImageUrl } from '../api';

const MovieCard = ({ movie, onClick }) => {
  return (
    <motion.div 
      layoutId={`movie-${movie.id}`} //for shared element transition later
      onClick={() => onClick(movie)}
      className="relative group w-full h-full cursor-pointer overflow-hidden rounded-xl bg-cinema-dark"
      whileHover={{ y: -5 }}
    >
      <img 
        src={getImageUrl(movie.poster_path, 'w500')} 
        alt={movie.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="font-bold text-white text-lg leading-tight">{movie.title}</h3>
        <div className="flex items-center gap-1 text-cinema-red mt-1">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm font-medium">{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;