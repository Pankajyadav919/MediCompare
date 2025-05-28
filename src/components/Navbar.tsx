import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPills } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Medicines', href: '#' },
    { name: 'Compare', href: '#' },
    { name: 'Pharmacies', href: '#' },
    { name: 'About', href: '#' },
  ];

  return (
    <div className="nav-container bg-white shadow-md sticky top-0 z-50 border-b border-primary/10">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">
        <div className="logo flex items-center text-primary text-3xl font-bold">
          <FontAwesomeIcon icon={faPills} className="text-gold mr-3 text-2xl" />
          <span>MediCompare</span>
        </div>
        
        <div className={`nav-links ${isMenuOpen ? 'flex' : 'hidden'} md:flex items-center gap-8 flex-col md:flex-row absolute md:relative top-20 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent p-6 md:p-0 shadow-md md:shadow-none`}>
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              className="text-text-dark hover:text-primary transition-colors duration-300 relative font-montserrat font-medium text-lg after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              onClick={closeMenu}
            >
              {link.name}
            </a>
          ))}
          
          <div className="auth-buttons flex gap-4 mt-4 md:mt-0 md:ml-6">
            <a 
              href="#" 
              className="btn-login px-5 py-2.5 rounded-md border-2 border-primary text-primary font-montserrat font-semibold text-base hover:bg-primary hover:text-white transition-colors duration-300"
              onClick={closeMenu}
            >
              Login
            </a>
            <a 
              href="#" 
              className="btn-signup px-5 py-2.5 rounded-md bg-gold text-white border-2 border-gold font-montserrat font-semibold text-base hover:bg-amber-600 hover:border-amber-600 transition-colors duration-300"
              onClick={closeMenu}
            >
              Sign Up
            </a>
          </div>
        </div>
        
        <div 
          className="menu-toggle md:hidden flex flex-col justify-between w-7 h-5 cursor-pointer" 
          onClick={toggleMenu}
        >
          <span className={`block w-full h-0.5 bg-primary transition-all duration-300 ${isMenuOpen ? 'transform rotate-45deg translate-y-2' : ''}`}></span>
          <span className={`block w-full h-0.5 bg-primary transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-full h-0.5 bg-primary transition-all duration-300 ${isMenuOpen ? 'transform -rotate-45deg -translate-y-2' : ''}`}></span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;