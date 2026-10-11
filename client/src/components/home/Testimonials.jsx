import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../../data/placeholderData';
import SectionHeading from '../common/SectionHeading';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  
  const activeTestimonial = testimonials[currentIndex];

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -100 : 100, opacity: 0 })
  };

  if (!activeTestimonial) return null;

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-br from-cream-100 to-saffron-50">
      <div className="absolute top-0 right-0 w-64 h-64 bg-saffron-200/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-forest-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container-custom px-4 relative z-10">
        <SectionHeading 
          title="What Our Supporters Say" 
          subtitle="Join thousands of compassionate souls making a difference."
        />

        <div className="max-w-4xl mx-auto mt-12 relative">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-white relative">
            <Quote className="absolute top-8 left-8 w-12 h-12 text-saffron-100 -z-0" />
            
            <div className="relative z-10 min-h-[220px] flex flex-col justify-center overflow-hidden">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="text-center w-full"
                >
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < (activeTestimonial.rating || 5) ? 'text-golden-500 fill-golden-500' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  
                  <p className="text-lg md:text-2xl text-charcoal-800 font-medium italic leading-relaxed mb-8">
                    "{activeTestimonial.text}"
                  </p>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-cream-200 overflow-hidden mb-3 border-2 border-white shadow-md">
                      <img 
                        src={activeTestimonial.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(activeTestimonial.name)}&background=f97316&color=fff`} 
                        alt={activeTestimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-heading font-bold text-charcoal-900">{activeTestimonial.name}</h4>
                    <span className="text-sm text-charcoal-500">{activeTestimonial.role || 'Supporter'} • {activeTestimonial.location}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-charcoal-600 hover:text-saffron-600 hover:scale-110 transition-all focus:outline-none"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentIndex ? 'bg-saffron-600 w-6' : 'bg-charcoal-300 hover:bg-saffron-400'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-charcoal-600 hover:text-saffron-600 hover:scale-110 transition-all focus:outline-none"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
