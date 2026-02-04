import { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react'; //X icon

const Navbar = ({ onSearchClick }) => { // Accept prop
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-cinema-black/95 backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-3xl font-bold text-cinema-red tracking-tighter cursor-pointer">CINEPICKS</h1>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#" className="text-white hover:text-cinema-red transition-colors px-3 py-2 rounded-md font-medium">Home</a>
              <a href="#trending" className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md font-medium">Trending</a>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={onSearchClick}
              className="group flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <span className="hidden md:block text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">Search</span>
              <Search className="w-5 h-5" />
            </button>
            <Menu className="md:hidden w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;