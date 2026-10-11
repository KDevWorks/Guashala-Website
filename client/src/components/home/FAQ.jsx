import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../../data/placeholderData';
import SectionHeading from '../common/SectionHeading';
import AnimatedSection from '../common/AnimatedSection';

const FAQItem = ({ faq, isOpen, toggleOpen }) => {
  return (
    <div className="border border-cream-200 rounded-lg bg-white overflow-hidden mb-4 shadow-sm">
      <button
        onClick={toggleOpen}
        className="w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-cream-50 transition-colors focus:outline-none text-left"
        aria-expanded={isOpen}
      >
        <span className="font-heading font-semibold text-charcoal-900 pr-4">{faq.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 text-saffron-500"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-5 text-charcoal-600 leading-relaxed border-t border-cream-100 pt-3">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const displayFaqs = faqs.slice(0, 6);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom px-4">
        <AnimatedSection>
          <SectionHeading 
            title="Frequently Asked Questions" 
            subtitle="Everything you need to know about our gaushala and how you can help."
          />
        </AnimatedSection>

        <div className="max-w-3xl mx-auto mt-12">
          {displayFaqs.map((faq, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <FAQItem 
                faq={faq} 
                isOpen={openIndex === index} 
                toggleOpen={() => setOpenIndex(openIndex === index ? -1 : index)} 
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
