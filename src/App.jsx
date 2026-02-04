import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import api, { endpoints } from './api';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieGrid from './components/MovieGrid';
import Modal from './components/Modal';
import SearchOverlay from './components/SearchOverlay'; // Import this

function App() {
  const [heroMovie, setHeroMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State for search

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const { data } = await api.get(endpoints.trending);
        setHeroMovie(data.results[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHero();
  }, []);

  return (
    <div className="min-h-screen bg-cinema-black text-white font-sans">
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />
      
      {heroMovie && <Hero movie={heroMovie} />}
      
      <MovieGrid onMovieClick={setSelectedMovie} />

      <AnimatePresence>
        {isSearchOpen && (
          <SearchOverlay 
            isOpen={isSearchOpen} 
            onClose={() => setIsSearchOpen(false)}
            onMovieClick={setSelectedMovie} // Re-use the existing modal logic
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedMovie && (
          <Modal 
            movie={selectedMovie} 
            onClose={() => setSelectedMovie(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App;