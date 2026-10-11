import React, { useState, useMemo } from 'react';
import SEO from '../components/common/SEO';
import AnimatedSection from '../components/common/AnimatedSection';
import GalleryFilter from '../components/gallery/GalleryFilter';
import GalleryGrid from '../components/gallery/GalleryGrid';
import Lightbox from '../components/gallery/Lightbox';
import { galleryImages } from '../data/placeholderData';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(galleryImages.map(img => img.category))];
    return cats;
  }, []);

  // Calculate counts for each category
  const categoryCounts = useMemo(() => {
    const counts = { All: galleryImages.length };
    galleryImages.forEach(img => {
      counts[img.category] = (counts[img.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter images based on active category
  const filteredImages = useMemo(() => {
    if (activeCategory === 'All') return galleryImages;
    return galleryImages.filter(img => img.category === activeCategory);
  }, [activeCategory]);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <div className="bg-cream-50 min-h-screen">
      <SEO 
        title="Gallery | Gaushala Welfare" 
        description="Explore moments of love and care from our Gaushala. View our photo gallery showcasing our cows, medical care, events, and volunteers." 
      />

      {/* Page Hero */}
      <section className="bg-gradient-saffron pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="container-custom relative z-10 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-6">Our Gallery</h1>
          <div className="flex items-center justify-center space-x-2 text-white/80 font-body text-sm md:text-base">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <span className="text-white">Gallery</span>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="section-heading text-charcoal-900 mb-4">Glimpses of Our Gaushala</h2>
            <p className="text-charcoal-600 font-body text-lg">
              Witness the pure joy, dedication, and care that define everyday life at our sanctuary. Each image tells a story of compassion.
            </p>
          </AnimatedSection>

          <GalleryFilter 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            counts={categoryCounts}
          />

          <div className="min-h-[500px]">
            <GalleryGrid 
              images={filteredImages} 
              onImageClick={openLightbox} 
            />
          </div>
        </div>
      </section>

      <Lightbox 
        images={filteredImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </div>
  );
};

export default Gallery;
