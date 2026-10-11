import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Heart, Home, Stethoscope, Bird, ShieldAlert, BookOpen } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeading from '../components/common/SectionHeading';
import AnimatedSection from '../components/common/AnimatedSection';

const ProgressBar = ({ label, percentage, colorClass }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div className="mb-6" ref={ref}>
      <div className="flex justify-between mb-2">
        <span className="font-semibold text-charcoal-800">{label}</span>
        <span className="font-bold text-charcoal-900">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <motion.div
          className={`h-3 rounded-full ${colorClass}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const OurWork = () => {
  const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  const works = [
    {
      id: 1,
      title: "Daily Food & Fodder",
      icon: <Heart className="w-6 h-6 text-saffron-500" />,
      image: "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?q=80&w=800&auto=format&fit=crop",
      description: "We provide highly nutritious, fresh fodder and mineral mixtures to all our cattle daily. Ensuring a balanced diet is crucial for the recovery of rescued cows and the sustained health of our residents.",
      stats: "Over 5000 kg of fodder served daily."
    },
    {
      id: 2,
      title: "Safe Shelter",
      icon: <Home className="w-6 h-6 text-saffron-500" />,
      image: "https://images.unsplash.com/photo-1628169114757-5ceaf54b8ff5?q=80&w=800&auto=format&fit=crop",
      description: "Our expansive sheds are designed to protect cows from harsh weather conditions. We maintain clean, hygienic environments with proper ventilation, soft bedding, and distinct quarantine areas for sick animals.",
      stats: "5+ large sheds accommodating 500+ cows safely."
    },
    {
      id: 3,
      title: "Medical Care",
      icon: <Stethoscope className="w-6 h-6 text-saffron-500" />,
      image: "https://images.unsplash.com/photo-1570044955373-3e110c9be740?q=80&w=800&auto=format&fit=crop",
      description: "Equipped with an on-site clinic, we offer round-the-clock veterinary services. We treat injured animals, administer vaccinations, and manage chronic conditions with the help of experienced vets.",
      stats: "Over 200 successful surgeries and 1000+ treated."
    },
    {
      id: 4,
      title: "Rescue & Rehabilitation",
      icon: <Bird className="w-6 h-6 text-saffron-500" />,
      image: "https://images.unsplash.com/photo-1544413660-299165566b1d?q=80&w=800&auto=format&fit=crop",
      description: "Our dedicated rescue team is always on standby to respond to calls about injured or abandoned cows. Post-rescue, we focus on physical and emotional rehabilitation.",
      stats: "300+ cows rescued from accidents and slaughterings."
    },
    {
      id: 5,
      title: "Cow Protection",
      icon: <ShieldAlert className="w-6 h-6 text-saffron-500" />,
      image: "https://images.unsplash.com/photo-1588691524316-11f8b1a56112?q=80&w=800&auto=format&fit=crop",
      description: "We actively work with local authorities to prevent cattle smuggling and illegal slaughtering. Legal assistance is provided to ensure strict action against perpetrators.",
      stats: "Assisted in saving hundreds of cows via legal channels."
    },
    {
      id: 6,
      title: "Community & Awareness",
      icon: <BookOpen className="w-6 h-6 text-saffron-500" />,
      image: "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?q=80&w=800&auto=format&fit=crop",
      description: "Educating the masses about the economic, spiritual, and ecological importance of cows. We organize regular camps and school visits to foster a compassionate attitude among the youth.",
      stats: "Reached 10,000+ students through our outreach programs."
    }
  ];

  return (
    <>
      <SEO title="Our Work - Gaushala" description="Discover our initiatives including daily feeding, medical care, shelter, and rescue operations for cows." />
      
      {/* Page Hero */}
      <section className="page-hero py-16 md:py-24 bg-gradient-to-r from-saffron-500 to-saffron-600 text-white">
        <div className="container-custom">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Our Work</h1>
            <div className="flex items-center justify-center space-x-2 text-sm md:text-base opacity-90">
              <Link to="/" className="hover:underline">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span>Our Work</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-cream-50">
        <div className="container-custom">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-charcoal-700">
              Our comprehensive approach ensures that every aspect of a cow's well-being is addressed. From the moment a cow enters our gates, they are promised a life of respect, care, and love. Here is a detailed look at what we do every day.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Work Details */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="space-y-16">
            {works.map((work, idx) => (
              <AnimatedSection key={work.id}>
                <div className={`flex flex-col md:flex-row gap-8 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="w-full md:w-1/2">
                    <div className="rounded-2xl overflow-hidden shadow-lg h-64 md:h-80">
                      <img src={work.image} alt={work.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 bg-cream-100 rounded-lg">
                        {work.icon}
                      </div>
                      <h2 className="text-3xl font-heading font-bold text-charcoal-900">{work.title}</h2>
                    </div>
                    <p className="text-charcoal-700 leading-relaxed text-lg mb-6">
                      {work.description}
                    </p>
                    <div className="bg-cream-50 border-l-4 border-saffron-500 p-4 rounded-r-lg">
                      <p className="font-semibold text-charcoal-800">Impact: <span className="font-normal">{work.stats}</span></p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="section-padding bg-cream-50">
        <div className="container-custom">
          <SectionHeading title="Where Your Donation Goes" subtitle="Commitment to Transparency" />
          <div className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-charcoal-600 mb-8 text-center">We ensure every rupee you donate is maximized for the welfare of the cows. Here is a breakdown of our fund allocation.</p>
            
            <ProgressBar label="Food & Fodder" percentage={35} colorClass="bg-saffron-500" />
            <ProgressBar label="Medical Care" percentage={25} colorClass="bg-forest-500" />
            <ProgressBar label="Shelter & Maintenance" percentage={20} colorClass="bg-blue-500" />
            <ProgressBar label="Rescue & Rehabilitation" percentage={12} colorClass="bg-golden-500" />
            <ProgressBar label="Operations & Logistics" percentage={8} colorClass="bg-gray-400" />
            
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-forest-600 text-white text-center">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Support Our Vital Work</h2>
            <p className="text-lg md:text-xl text-forest-50 max-w-2xl mx-auto mb-10">
              Our ongoing initiatives rely on the generosity of people like you. Help us continue our mission.
            </p>
            <Link to="/donate" className="btn-primary inline-flex bg-saffron-500 hover:bg-saffron-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-xl">
              Donate Now
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default OurWork;
