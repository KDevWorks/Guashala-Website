import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import CauseCard from '../components/donation/CauseCard';
import SectionHeading from '../components/common/SectionHeading';
import AnimatedSection from '../components/common/AnimatedSection';
import { causes } from '../data/placeholderData';

const categories = ['All', 'Food', 'Medical', 'Shelter', 'Rescue', 'General'];

const Causes = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCauses = activeCategory === 'All' 
    ? causes 
    : causes.filter(c => c.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Support a Cause | Gaushala</title>
        <meta name="description" content="Support various causes at our Gaushala including food, medical care, shelter, and rescue operations for cows." />
      </Helmet>

      {/* Hero Section */}
      <section className="page-hero pt-32 pb-16 bg-gradient-to-r from-saffron-600 to-saffron-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10 mix-blend-overlay"></div>
        <div className="container-custom relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
          >
            Support a Cause
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-white/80 text-sm font-medium"
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Causes</span>
          </motion.div>
        </div>
      </section>

      {/* Intro & Filters */}
      <section className="section-padding bg-cream-50">
        <div className="container-custom">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-lg text-charcoal-700 leading-relaxed">
              Every cow deserves a life of dignity, love, and care. Choose a cause close to your heart and make a tangible difference in their lives today. Your support helps us provide nutritious food, vital medical care, and a safe shelter.
            </p>
          </AnimatedSection>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === category 
                    ? 'bg-saffron-500 text-white shadow-md' 
                    : 'bg-white text-charcoal-600 hover:bg-saffron-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Causes Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredCauses.map((cause) => (
                <motion.div
                  key={cause.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <CauseCard cause={cause} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredCauses.length === 0 && (
            <div className="text-center py-12 text-charcoal-500">
              No causes found for this category at the moment.
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-forest-800 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
           {/* Abstract shape placeholder */}
           <div className="w-96 h-96 rounded-full bg-white blur-3xl"></div>
        </div>
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Every Contribution Counts</h2>
          <p className="max-w-2xl mx-auto text-forest-100 mb-8 text-lg">
            Not sure which cause to choose? Make a general donation and we will allocate it to where it is needed most urgently.
          </p>
          <Link to="/donate" className="btn-golden inline-block px-8 py-3 text-lg font-bold">
            Donate Now
          </Link>
        </div>
      </section>
    </>
  );
};

export default Causes;
