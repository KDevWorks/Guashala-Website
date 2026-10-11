import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Shield, Users, ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=1600')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom px-4 text-center mt-16">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Give Them Care. <br className="hidden md:block" />
          <span className="text-saffron-500">Give Them a Home.</span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-cream-50 mb-10 max-w-3xl mx-auto drop-shadow-md font-body"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Your contribution helps us provide food, shelter, medical care and a safe home for cows in need.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <Link to="/donate" className="btn-primary py-4 px-8 text-lg w-full sm:w-auto text-center rounded-full shadow-lg shadow-saffron-500/30">
            Donate Now
          </Link>
          <Link to="/our-work" className="btn-outline py-4 px-8 text-lg w-full sm:w-auto text-center text-white border-white hover:bg-white hover:text-charcoal-900 rounded-full transition-colors">
            Explore Our Work
          </Link>
        </motion.div>
      </div>

      {/* Trust Elements */}
      <motion.div 
        className="absolute bottom-16 left-0 right-0 z-10 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div className="container-custom">
          <div className="flex justify-center items-center gap-8 text-cream-50/80 text-sm font-medium">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-saffron-500" />
              <span>Serving with compassion</span>
            </div>
            <span className="text-white/30">•</span>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-saffron-500" />
              <span>Caring for cows</span>
            </div>
            <span className="text-white/30">•</span>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-saffron-500" />
              <span>Building a better future</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Down */}
      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="w-6 h-6 opacity-70" />
      </motion.div>
    </div>
  );
};

export default Hero;
