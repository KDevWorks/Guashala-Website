import React from 'react';
import { motion } from 'framer-motion';
import { SITE_NAME } from '../../utils/constants';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-cream-50 z-50 flex flex-col items-center justify-center">
      <div className="relative">
        <motion.div
          className="w-16 h-16 border-4 border-saffron-200 border-t-saffron-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          <span className="text-saffron-600 text-xl">ॐ</span>
        </motion.div>
      </div>
      <motion.h2 
        className="mt-6 text-2xl font-heading font-bold text-saffron-600"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {SITE_NAME}
      </motion.h2>
      <p className="mt-2 text-charcoal-500 text-sm animate-pulse">Loading amazing things...</p>
    </div>
  );
};

export default Loading;
