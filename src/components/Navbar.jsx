import { useState, useEffect } from 'react';
import { Search, Menu } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-cinema-black/95 backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-cinema-red tracking-tighter cursor-pointer">CINEPICKS</h1>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#" className="text-white hover:text-cinema-red transition-colors px-3 py-2 rounded-md text-sm font-medium">Home</a>
              <a href="#trending" className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md text-sm font-medium">Trending</a>
              <a href="#categories" className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md text-sm font-medium">Categories</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Search className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
            <Menu className="md:hidden w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;