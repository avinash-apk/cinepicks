import { useEffect, useState } from 'react';
import api, { endpoints } from './api';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieGrid from './components/MovieGrid';

function App() {
  const [heroMovie, setHeroMovie] = useState(null);

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

  // Placeholder handler
  const handleMovieClick = (movie) => {
    console.log("Clicked:", movie.title);
  };

  return (
    <div className="min-h-screen bg-cinema-black text-white">
      <Navbar />
      {heroMovie && <Hero movie={heroMovie} />}
      <MovieGrid onMovieClick={handleMovieClick} />
    </div>
  )
}

export default App;