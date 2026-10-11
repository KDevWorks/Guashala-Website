import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Shield, Eye, Users, ChevronRight } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeading from '../components/common/SectionHeading';
import AnimatedSection from '../components/common/AnimatedSection';

const About = () => {
  const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
  const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

  const values = [
    { icon: <Heart className="w-8 h-8 text-saffron-500" />, title: "Compassion", desc: "Every cow deserves love, respect, and a pain-free life. We treat all animals with utmost care." },
    { icon: <Shield className="w-8 h-8 text-saffron-500" />, title: "Service", desc: "Serving the sacred cow is our primary dharma. We dedicate our time and resources to their wellbeing." },
    { icon: <Eye className="w-8 h-8 text-saffron-500" />, title: "Transparency", desc: "We ensure every donation is utilized effectively and transparently for the welfare of the cows." },
    { icon: <Users className="w-8 h-8 text-saffron-500" />, title: "Community", desc: "We believe in building a strong community of volunteers and donors who share our vision." }
  ];

  const milestones = [
    { year: "2010", title: "Foundation", desc: "Started with a humble shelter for 10 rescued cows." },
    { year: "2015", title: "Medical Facility", desc: "Inaugurated our first dedicated veterinary clinic on-site." },
    { year: "2019", title: "Expansion", desc: "Expanded capacity to house over 500 cows safely." },
    { year: "2023", title: "Modernization", desc: "Introduced modern dairy and waste management techniques." }
  ];

  return (
    <>
      <SEO title="About Us - Gaushala" description="Learn about our mission, vision, and journey in protecting and caring for cows." />
      
      {/* Page Hero */}
      <section className="page-hero py-16 md:py-24 bg-gradient-to-r from-saffron-500 to-saffron-600 text-white">
        <div className="container-custom">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">About Us</h1>
            <div className="flex items-center justify-center space-x-2 text-sm md:text-base opacity-90">
              <Link to="/" className="hover:underline">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span>About</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-padding bg-cream-50">
        <div className="container-custom">
          <AnimatedSection className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-charcoal-900 mb-6">Who We Are</h2>
            <p className="text-lg md:text-xl text-charcoal-700 leading-relaxed">
              We are a dedicated sanctuary for cows, committed to providing love, shelter, and medical care to stray, abandoned, and rescued cattle. Our mission is to ensure that every cow lives a life of dignity and peace.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-xl">
                <img src="https://images.unsplash.com/photo-1596733430284-f7437764b1a9?q=80&w=800&auto=format&fit=crop" alt="Our Gaushala" className="object-cover w-full h-full" />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <SectionHeading title="Our Story" subtitle="A Journey of Compassion" align="left" />
              <div className="space-y-4 text-charcoal-700 mt-6">
                <p>
                  Established in 2010, our Gaushala began with a simple vision: to create a safe haven for cows that were left to fend for themselves on the streets.
                </p>
                <p>
                  What started as a small shelter for 10 cows has now grown into a vast sanctuary housing hundreds of cattle. Over the years, we have expanded our facilities to include dedicated veterinary care, specialized feeding programs, and large grazing grounds.
                </p>
                <p>
                  Our founder's vision of a society where every cow is respected and cared for continues to drive our daily operations and future plans.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-cream-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="card p-8 h-full bg-white border-t-4 border-saffron-500 shadow-lg rounded-xl">
                <h3 className="text-2xl font-heading font-bold text-charcoal-900 mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-saffron-500" />
                  Our Mission
                </h3>
                <p className="text-charcoal-700 leading-relaxed">
                  To rescue, rehabilitate, and protect destitute cows by providing them with lifelong shelter, nutritious food, and prompt medical attention, while promoting awareness about cow welfare in society.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="card p-8 h-full bg-white border-t-4 border-forest-600 shadow-lg rounded-xl">
                <h3 className="text-2xl font-heading font-bold text-charcoal-900 mb-4 flex items-center">
                  <Eye className="w-6 h-6 mr-3 text-forest-600" />
                  Our Vision
                </h3>
                <p className="text-charcoal-700 leading-relaxed">
                  To create a compassionate world where no cow is left abandoned or suffers from cruelty, and where the intrinsic value and sacredness of cows are recognized and respected by all.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading title="Our Core Values" subtitle="What Guides Us" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {values.map((val, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <div className="card-hover p-6 rounded-xl bg-cream-50 text-center h-full">
                  <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                    {val.icon}
                  </div>
                  <h4 className="text-xl font-heading font-bold text-charcoal-900 mb-3">{val.title}</h4>
                  <p className="text-charcoal-600 text-sm">{val.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-cream-50">
        <div className="container-custom">
          <SectionHeading title="Our Journey" subtitle="Milestones of our mission" />
          <div className="max-w-3xl mx-auto mt-12">
            {milestones.map((ms, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <div className="flex mb-8 relative">
                  {/* Line connecting nodes */}
                  {idx !== milestones.length - 1 && (
                    <div className="absolute left-6 top-10 bottom-[-2rem] w-0.5 bg-saffron-300"></div>
                  )}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-saffron-500 text-white flex items-center justify-center font-bold relative z-10 shadow-md">
                    {idx + 1}
                  </div>
                  <div className="ml-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex-grow">
                    <span className="text-sm font-bold text-saffron-600 tracking-wider mb-1 block">{ms.year}</span>
                    <h4 className="text-xl font-heading font-bold text-charcoal-900 mb-2">{ms.title}</h4>
                    <p className="text-charcoal-600">{ms.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-forest-600 text-white text-center">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Be a Part of Our Mission</h2>
            <p className="text-lg md:text-xl text-forest-50 max-w-2xl mx-auto mb-10">
              Your support can change the lives of hundreds of voiceless cows. Join hands with us today.
            </p>
            <Link to="/donate" className="btn-primary inline-flex bg-saffron-500 hover:bg-saffron-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-xl">
              Support Our Mission
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default About;
