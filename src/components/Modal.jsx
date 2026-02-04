import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Star } from 'lucide-react';
import { getImageUrl } from '../api';

const Modal = ({ movie, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
       {}
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.2 }}
         onClick={onClose}
         className="absolute inset-0 bg-black/90 cursor-pointer transform-gpu"
       />

       <motion.div
         layoutId={`movie-${movie.id}`} 
         className="relative w-full max-w-4xl bg-cinema-dark rounded-2xl overflow-hidden shadow-2xl z-10 transform-gpu"
         transition={{ type: "spring", stiffness: 300, damping: 25 }}
       >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="relative h-96">
            <img
               src={getImageUrl(movie.backdrop_path || movie.poster_path, 'original')}
               alt={movie.title}
               className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark via-transparent to-transparent" />
             
             <div className="absolute bottom-0 left-0 p-8">
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-bold text-white mb-2"
                >
                  {movie.title}
                </motion.h2>
                
                <div className="flex items-center gap-4 text-gray-300">
                   <span className="flex items-center gap-1">
                     <Calendar className="w-4 h-4" /> {movie.release_date?.split('-')[0]}
                   </span>
                   <span className="flex items-center gap-1 text-cinema-red">
                     <Star className="w-4 h-4 fill-current" /> {movie.vote_average.toFixed(1)}
                   </span>
                </div>
             </div>
          </div>

          <div className="p-8">
            <h3 className="text-xl font-bold mb-2 text-white">Synopsis</h3>
            <p className="text-gray-300 leading-relaxed text-lg">{movie.overview}</p>
          </div>
       </motion.div>
    </div>
  );
};

export default Modal;