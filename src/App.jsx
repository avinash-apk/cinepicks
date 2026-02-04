import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion'; 
import api, { endpoints } from './api';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieGrid from './components/MovieGrid';
import Modal from './components/Modal'; 

function App() {
  const [heroMovie, setHeroMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null); 

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
    <div className="min-h-screen bg-cinema-black text-white">
      <Navbar />
      {heroMovie && <Hero movie={heroMovie} />}
      
      <MovieGrid onMovieClick={setSelectedMovie} />

      {/*animation presence for modal*/}
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