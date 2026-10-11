import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { impactStories } from '../../data/placeholderData';
import SectionHeading from '../common/SectionHeading';
import AnimatedSection from '../common/AnimatedSection';

const ImpactStories = () => {
  const displayStories = impactStories.slice(0, 4);

  return (
    <section className="section-padding bg-cream-50">
      <div className="container-custom px-4">
        <AnimatedSection>
          <SectionHeading 
            title="See the Impact of Your Support" 
            subtitle="Real stories of transformation made possible by our generous donors."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 mt-12">
          {displayStories.map((story, idx) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-cream-100"
            >
              <div className="w-full md:w-2/5 h-48 md:h-auto overflow-hidden relative">
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-forest-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                  {story.category || 'Rescue'}
                </div>
              </div>
              <div className="w-full md:w-3/5 p-6 flex flex-col justify-center">
                <span className="text-xs text-charcoal-400 mb-2 font-medium">{story.date || 'Recent Story'}</span>
                <h3 className="text-lg font-heading font-bold text-charcoal-900 mb-2 group-hover:text-saffron-600 transition-colors">
                  {story.title}
                </h3>
                <p className="text-charcoal-600 text-sm mb-4 line-clamp-2">
                  {story.summary || story.description || 'A beautiful story of recovery and care.'}
                </p>
                <Link to={`/impact/${story.id}`} className="text-saffron-600 text-sm font-semibold hover:underline mt-auto self-start">
                  Read More &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStories;
