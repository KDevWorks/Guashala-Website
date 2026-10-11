import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';

const StickyDonateCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Don't show on donate page or admin pages
    if (location.pathname === '/donate' || location.pathname.startsWith('/admin')) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      // Show after scrolling down a bit
      if (window.scrollY > 400 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-gradient-to-r from-saffron-500 to-saffron-600 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] p-4 rounded-t-2xl flex items-center justify-between"
        >
          <div className="flex-1 mr-4">
            <p className="text-white text-sm font-semibold mb-1">Support Our Cause</p>
            <p className="text-white/80 text-xs">Your contribution saves lives.</p>
          </div>
          <Link 
            to="/donate" 
            className="bg-white text-saffron-600 px-6 py-2.5 rounded-full font-bold text-sm shadow-md hover:bg-cream-50 transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Heart className="w-4 h-4 fill-saffron-600" />
            Donate
          </Link>
          <button 
            onClick={handleDismiss}
            className="absolute -top-3 -right-1 bg-white text-gray-500 p-1 rounded-full shadow-sm"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyDonateCTA;
