import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import AnimatedSection from '../common/AnimatedSection';
import SectionHeading from '../common/SectionHeading';

const AboutPreview = () => {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-custom px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Images */}
          <motion.div 
            className="w-full lg:w-1/2 relative min-h-[400px] sm:min-h-[500px]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute top-0 left-0 w-3/4 h-3/4 rounded-2xl overflow-hidden shadow-2xl z-10 border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1596733430284-f743727520d2?w=800" 
                alt="Cows in gaushala" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-2/3 h-2/3 rounded-2xl overflow-hidden shadow-xl z-20 border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=800" 
                alt="Feeding cows" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-saffron-500 rounded-full z-0 blur-3xl opacity-50"></div>
          </motion.div>

          {/* Content */}
          <motion.div 
            className="w-full lg:w-1/2 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <SectionHeading 
              title="About Our Gaushala" 
              subtitle="Dedicated to the Welfare and Protection of Gau Mata"
              align="left"
            />
            
            <p className="text-charcoal-600 text-lg leading-relaxed">
              Since 2005, we have been on a mission to provide a safe haven for stray, abandoned, and old cows. Our Gaushala is more than just a shelter; it's a home where cows receive unconditional love, nutritious food, and proper medical care.
            </p>
            
            <p className="text-charcoal-600 leading-relaxed mb-6">
              We believe in the sacred duty of protecting cows and aim to spread awareness about their importance in our ecosystem and spiritual traditions.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Established in 2005",
                "1000+ Cows Rescued & Rehabilitated",
                "Certified NGO Organization",
                "Community-driven Approach"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-charcoal-800 font-medium">
                  <CheckCircle className="w-6 h-6 text-saffron-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Link to="/about" className="btn-primary inline-flex mt-4">
              Know More About Us
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
