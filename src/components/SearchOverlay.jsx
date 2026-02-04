import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Loader2 } from 'lucide-react';
import api, { endpoints, getImageUrl } from '../api';

const SearchOverlay = ({ isOpen, onClose, onMovieClick }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim()) {
        setLoading(true);
        try {
          const { data } = await api.get(endpoints.search, {
            params: { query: query }
          });
          setResults(data.results);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery(''); 
      setResults([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      // PERFORMANCE FIX: Removed backdrop-blur, used solid dark background
      className="fixed inset-0 z-50 bg-cinema-black overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-end mb-8">
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-8 h-8 text-white" />
          </button>
        </div>

        <div className="relative max-w-3xl mx-auto mb-16">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-400" />
          <input 
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-b-2 border-gray-700 text-3xl md:text-5xl font-bold text-white py-4 pl-16 focus:outline-none focus:border-cinema-red transition-colors placeholder:text-gray-700"
            autoFocus
          />
        </div>

        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="w-12 h-12 text-cinema-red animate-spin" />
          </div>
        ) : (
          // Added 'layout' prop here to smooth out the grid resizing
          <motion.div layout className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {results.map((movie) => (
              movie.poster_path && (
                <motion.div 
                  layout
                  key={movie.id}
                  layoutId={`movie-${movie.id}`} 
                  onClick={() => onMovieClick(movie)}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer group"
                >
                  <div className="aspect-[2/3] rounded-lg overflow-hidden mb-2 bg-gray-800">
                    <img 
                      // PERFORMANCE FIX: Smaller image size (w342) for faster painting
                      src={getImageUrl(movie.poster_path, 'w342')} 
                      alt={movie.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-gray-300 group-hover:text-white font-medium truncate">{movie.title}</h4>
                  <p className="text-xs text-gray-500">{movie.release_date?.split('-')[0]}</p>
                </motion.div>
              )
            ))}
          </motion.div>
        )}
        
        {!loading && query && results.length === 0 && (
          <div className="text-center text-gray-500 text-xl">
            No results found for "{query}"
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SearchOverlay;