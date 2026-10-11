import React from 'react';
import { motion } from 'framer-motion';

const GalleryFilter = ({ categories, activeCategory, onCategoryChange, counts }) => {
  return (
    <div className="w-full overflow-x-auto pb-4 scrollbar-hide mb-8">
      <div className="flex justify-center md:flex-wrap gap-3 min-w-max md:min-w-0 px-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              relative px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-300
              ${activeCategory === category 
                ? 'text-white' 
                : 'bg-white text-charcoal-700 hover:bg-cream-100 border border-cream-200 shadow-sm'}
            `}
          >
            {activeCategory === category && (
              <motion.div
                layoutId="activeFilter"
                className="absolute inset-0 bg-saffron-500 rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {category}
              <span className={`
                text-[10px] px-2 py-0.5 rounded-full
                ${activeCategory === category ? 'bg-white/20 text-white' : 'bg-cream-200 text-charcoal-500'}
              `}>
                {counts[category] || 0}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GalleryFilter;
