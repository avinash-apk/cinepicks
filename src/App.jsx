import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import api, { endpoints } from './api';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieGrid from './components/MovieGrid';
import Modal from './components/Modal';
import SearchOverlay from './components/SearchOverlay';

function App() {
  const [heroMovie, setHeroMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false); 

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const { data } = await api.get(endpoints.movieDetails(466420));
        setHeroMovie(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHero();
  }, []);

  return (
    <div className="min-h-screen bg-cinema-black text-white font-sans" id="Home">
      <Navbar onSearchClick={() => setIsSearchOpen(true)} />
      
      <Routes>
        <Route path="/" element={
          heroMovie && <Hero movie={heroMovie} />
        } />
        <Route path="/favorites" element={
          <MovieGrid onMovieClick={setSelectedMovie} />
        } />
      </Routes>

      <AnimatePresence>
        {isSearchOpen && (
          <SearchOverlay 
            isOpen={isSearchOpen} 
            onClose={() => setIsSearchOpen(false)}
            onMovieClick={setSelectedMovie}
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