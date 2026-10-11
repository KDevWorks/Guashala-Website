import React from 'react';
import { motion } from 'framer-motion';
import { classNames } from '../../utils/helpers';

const SectionHeading = ({ title, subtitle, centered = false, light = false, className = '' }) => {
  return (
    <div className={classNames('mb-10', centered ? 'text-center' : '', className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {subtitle && (
          <span className={classNames(
            'inline-block px-3 py-1 rounded-full text-sm font-semibold tracking-wider uppercase mb-3',
            light ? 'bg-white/20 text-white' : 'bg-saffron-100 text-saffron-600'
          )}>
            {subtitle}
          </span>
        )}
        <h2 className={classNames(
          'text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4',
          light ? 'text-white' : 'text-charcoal-900'
        )}>
          {title}
        </h2>
        <div className={classNames(
          'w-20 h-1 rounded-full',
          centered ? 'mx-auto' : '',
          light ? 'bg-white' : 'bg-saffron-500'
        )}></div>
      </motion.div>
    </div>
  );
};

export default SectionHeading;
