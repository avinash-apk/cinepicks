import { useEffect, useState } from 'react';
import api, { endpoints } from './api';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

function App() {
  const [heroMovie, setHeroMovie] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const { data } = await api.get(endpoints.trending);
        setHeroMovie(data.results[0]); // Top trending movie
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
      
      {/* Spacer to test scrolling */}
      <div className="h-screen w-full flex items-center justify-center text-gray-500">
        Grid Content Coming Soon
      </div>
    </div>
  )
}

export default App;