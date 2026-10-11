import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';
import { NAV_LINKS, SITE_NAME } from '../../utils/constants';
import { classNames } from '../../utils/helpers';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navBackground = isHomePage
    ? isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    : 'bg-white shadow-sm';

  const textColor = isHomePage && !isScrolled ? 'text-white' : 'text-charcoal-900';
  const logoColor = isHomePage && !isScrolled ? 'text-white' : 'text-saffron-600';

  return (
    <header className={classNames('fixed w-full top-0 z-50 transition-all duration-300', navBackground)}>
      <div className="container-custom mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 lg:h-24">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 z-50">
            <div className={classNames('p-2 rounded-full', isHomePage && !isScrolled ? 'bg-white/20' : 'bg-saffron-50')}>
              <span className={classNames('text-2xl font-bold', logoColor)}>ॐ</span>
            </div>
            <span className={classNames('font-heading font-bold text-2xl tracking-tight', textColor)}>
              {SITE_NAME}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex space-x-8">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={classNames(
                        'text-sm font-semibold tracking-wide transition-colors relative group',
                        textColor,
                        isActive && !isHomePage ? 'text-saffron-600' : 'hover:text-saffron-500'
                      )}
                    >
                      {link.label}
                      <span className={classNames(
                        'absolute -bottom-1 left-0 w-0 h-0.5 bg-saffron-500 transition-all duration-300 group-hover:w-full',
                        isActive ? 'w-full' : ''
                      )}></span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link to="/donate" className="btn-primary shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>Donate Now</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={classNames('lg:hidden z-50 p-2 focus:outline-none', textColor)}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 lg:hidden z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-2xl z-40 flex flex-col pt-24 pb-6 px-6 lg:hidden overflow-y-auto"
            >
              <nav className="flex flex-col gap-6">
                <ul className="flex flex-col space-y-4">
                  {NAV_LINKS.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className={classNames(
                          'block text-lg font-medium pb-2 border-b border-gray-100',
                          location.pathname === link.path ? 'text-saffron-600' : 'text-charcoal-700'
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6 border-t border-gray-100">
                  <Link to="/donate" className="btn-primary w-full justify-center flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    <span>Donate Now</span>
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
