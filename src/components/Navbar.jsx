import { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onSearchClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setIsMobileMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior:'smooth'});
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-cinema-black/95 backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 
              onClick={scrollToTop}
              className="text-5xl font-bold text-white hover:text-cinema-red tracking-tighter cursor-pointer">CINEPICKS</h1>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button onClick={scrollToTop} className="text-white hover:text-cinema-red transition-colors px-3 py-2 rounded-md font-medium">Home</button>
              <button onClick={() => scrollToSection('favorites')} className="text-gray-300 hover:text-cinema-red transition-colors px-3 py-2 rounded-md font-medium">Favorites</button>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={onSearchClick}
              className="group flex items-center gap-2 text-gray-300 hover:text-cinema-red transition-colors">
              <span className="hidden md:block text-sm font-medium opacity-0 group-hover:opacity-100 group-hover:text-cinema-red transition-opacity">Search</span>
              <Search className="w-5 h-5 hover:cinema-red" />
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? (
                <X className="md:hidden w-6 h-6 text-white hover:text-cinema-red" />
              ) : (
                <Menu className="md:hidden w-6 h-6 text-white hover:text-cinema-red" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cinema-black/95 border-t border-gray-800 overflow-hidden">
            <div className="px-4 pt-2 pb-4 space-y-1 flex flex-col">
              <button
                onClick={scrollToTop}
                className="text-left text-white hover:bg-white/10 block px-3 py-4 rounded-md text-base font-medium">
                Home
              </button>
              <button
                onClick={() => scrollToSection('favorites')}
                className="text-left text-gray-300 hover:text-white hover:bg-white/10 block px-3 py-4 rounded-md text-base font-medium">
                Favorites
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
export default Navbar;