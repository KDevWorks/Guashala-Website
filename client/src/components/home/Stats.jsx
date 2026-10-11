import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { stats } from '../../data/placeholderData';
import useCountUp from '../../hooks/useCountUp';

const StatCard = ({ stat, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const statValueStr = String(stat.value);
  const numValue = parseInt(statValueStr.replace(/,/g, '').replace(/\+/g, '')) || 0;
  const suffix = stat.suffix || (statValueStr.includes('+') ? '+' : '');
  
  const { count } = useCountUp(isInView ? numValue : 0, 2000);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-2xl p-6 text-center shadow-lg shadow-forest-900/5 card-hover border border-cream-100"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-saffron-50 text-saffron-600 mb-4">
        <i className="text-2xl" dangerouslySetInnerHTML={{ __html: stat.icon || '&#10084;' }}></i>
      </div>
      <h3 className="text-4xl font-heading font-bold text-charcoal-900 mb-2">
        {count.toLocaleString()}{suffix}
      </h3>
      <p className="text-forest-600 font-medium">{stat.label}</p>
    </motion.div>
  );
};

const Stats = () => {
  return (
    <section className="py-16 bg-cream-100 relative">
      <div className="container-custom px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
