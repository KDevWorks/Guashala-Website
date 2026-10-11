import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { causes } from '../../data/placeholderData';
import { useDonation } from '../../context/DonationContext';
import SectionHeading from '../common/SectionHeading';
import AnimatedSection from '../common/AnimatedSection';

const CausesPreview = () => {
  const { openDonationModal } = useDonation();
  const displayCauses = causes.slice(0, 3);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom px-4">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <SectionHeading 
              title="Your Support Can Make a Difference" 
              subtitle="Choose a cause close to your heart and help us provide better care."
              align="left"
              className="mb-0 max-w-2xl"
            />
            <Link to="/causes" className="hidden md:inline-flex text-saffron-600 font-semibold hover:text-saffron-700 items-center gap-2 mt-4 md:mt-0">
              View All Causes &rarr;
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCauses.map((cause, idx) => {
            const progress = Math.min(100, Math.round((cause.raised / cause.goal) * 100));
            return (
              <motion.div 
                key={cause.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-cream-100 flex flex-col hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 z-10 transition-opacity hover:opacity-0"></div>
                  <img 
                    src={cause.image} 
                    alt={cause.title} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-saffron-600 shadow-sm">
                    {cause.category}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-heading font-bold text-charcoal-900 mb-2">{cause.title}</h3>
                  <p className="text-charcoal-600 text-sm mb-6 line-clamp-2">{cause.description}</p>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between text-sm font-medium mb-2">
                      <span className="text-charcoal-800">₹{cause.raised.toLocaleString()} raised</span>
                      <span className="text-charcoal-500">Goal: ₹{cause.goal.toLocaleString()}</span>
                    </div>
                    
                    <div className="w-full bg-cream-200 rounded-full h-2.5 mb-4 overflow-hidden">
                      <div 
                        className="bg-saffron-500 h-2.5 rounded-full" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xs text-charcoal-500">{cause.donorCount} Donors</span>
                      <span className="text-xs font-semibold text-saffron-600">{progress}% Funded</span>
                    </div>
                    
                    <button 
                      onClick={() => openDonationModal(cause)}
                      className="btn-primary w-full py-3"
                    >
                      Donate Now
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link to="/causes" className="btn-outline inline-block">
            View All Causes
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CausesPreview;
