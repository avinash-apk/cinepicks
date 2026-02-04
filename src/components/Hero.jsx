import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Info } from 'lucide-react';
import { getImageUrl } from '../api';

const Hero = ({ movie }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  if (!movie) return null;

  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src={getImageUrl(movie.backdrop_path, 'original')} 
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/50 to-transparent" />
      </motion.div>

      <div className="relative z-10 h-full flex items-end pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tight"
          >
            {movie.title}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-gray-200 text-lg line-clamp-3"
          >
            {movie.overview}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4 pt-4"
          >
            <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition-colors font-bold">
              <Play className="w-5 h-5 fill-black" /> Play
            </button>
            <button className="flex items-center gap-2 bg-gray-500/30 backdrop-blur-sm text-white px-6 py-3 rounded hover:bg-gray-500/40 transition-colors font-bold border border-white/20">
              <Info className="w-5 h-5" /> More Info
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;