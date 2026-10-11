import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wheat, Home, Stethoscope, HeartHandshake, Shield, Users } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import AnimatedSection from '../common/AnimatedSection';

const services = [
  {
    title: "Daily Food & Fodder",
    desc: "Nutritious green fodder, dry grass, and organic supplements provided daily.",
    icon: Wheat,
    color: "bg-amber-100 text-amber-600"
  },
  {
    title: "Safe Shelter",
    desc: "Spacious, clean sheds designed to protect from extreme weather conditions.",
    icon: Home,
    color: "bg-forest-100 text-forest-600"
  },
  {
    title: "Medical Care",
    desc: "24/7 veterinary support, vaccinations, and treatment for sick or injured cows.",
    icon: Stethoscope,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Rescue & Rehab",
    desc: "Rescuing abandoned or abused cows and nursing them back to health.",
    icon: HeartHandshake,
    color: "bg-red-100 text-red-600"
  },
  {
    title: "Cow Protection",
    desc: "Advocating for animal rights and preventing cruelty towards cows.",
    icon: Shield,
    color: "bg-purple-100 text-purple-600"
  },
  {
    title: "Community Awareness",
    desc: "Organizing workshops and events to educate people about cow welfare.",
    icon: Users,
    color: "bg-saffron-100 text-saffron-600"
  }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const WhatWeDo = () => {
  return (
    <section className="section-padding bg-cream-50">
      <div className="container-custom px-4">
        <AnimatedSection>
          <SectionHeading 
            title="How We Care for Our Cows" 
            subtitle="Our comprehensive approach ensures every cow lives a healthy, dignified life."
          />
        </AnimatedSection>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div 
                key={idx} 
                variants={fadeUp}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-cream-100 group hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${service.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-heading font-bold text-charcoal-900 mb-3">{service.title}</h3>
                <p className="text-charcoal-600 mb-6 line-clamp-3">{service.desc}</p>
                <Link to="/our-work" className="text-saffron-600 font-semibold hover:text-saffron-700 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn More <span>&rarr;</span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDo;
