
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  
  const handleLogin = () => {
    navigate('/login');
  }; 
   

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);  

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <span className="text-gov-blue font-heading font-bold text-xl">NitiSetu Asifabad</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-800 hover:text-gov-blue transition-colors font-medium">
            Features
          </a>
          <a href="#users" className="text-gray-800 hover:text-gov-blue transition-colors font-medium">
            Who We Serve
          </a>
          <a href="#technology" className="text-gray-800 hover:text-gov-blue transition-colors font-medium">
            Technology
          </a>
          <Link to="/dashboard" className="text-gray-800 hover:text-gov-blue transition-colors font-medium">
            Dashboard
          </Link>
          <a href="#contact" className="button-secondary" >
            Contact Us
          </a>
          <button 
            onClick={() => navigate('/login')}
            className="button-primary"
          >
          Log In
          </button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-gray-800 hover:text-gov-blue transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#users" 
              className="text-gray-800 hover:text-gov-blue transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Who We Serve
            </a>
            <a 
              href="#technology" 
              className="text-gray-800 hover:text-gov-blue transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Technology
            </a>
            <Link 
              to="/dashboard" 
              className="text-gray-800 hover:text-gov-blue transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <a 
              href="#contact" 
              className="button-primary inline-block text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Log In
            </a>
            <button 
            onClick={handleLogin}
            className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-md"
             >
            Log In
             </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
