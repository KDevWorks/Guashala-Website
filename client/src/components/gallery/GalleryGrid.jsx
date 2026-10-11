import React from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

const GalleryGrid = ({ images, onImageClick }) => {
  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-charcoal-500 font-body text-lg">No images found for this category.</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {images.map((img, index) => (
        <motion.div
          key={img.id}
          variants={fadeInUp}
          className="relative overflow-hidden rounded-lg group cursor-pointer break-inside-avoid shadow-sm hover:shadow-md transition-shadow"
          onClick={() => onImageClick(index)}
        >
          <img
            src={img.url}
            alt={img.alt || img.category}
            className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105 bg-cream-100 min-h-[150px]"
            loading="lazy"
          />
          
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
            <div className="bg-saffron-500/90 rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <Eye className="w-6 h-6 text-white" />
            </div>
            
            <div className="absolute bottom-4 left-4">
              <span className="bg-forest-600 text-white text-xs px-3 py-1 rounded-full font-body tracking-wider uppercase">
                {img.category}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default GalleryGrid;
