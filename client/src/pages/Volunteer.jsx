import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Calendar, Monitor, Heart, Megaphone, Send, CheckCircle2 } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeading from '../components/common/SectionHeading';
import AnimatedSection from '../components/common/AnimatedSection';
import Input from '../components/common/Input';

const Volunteer = () => {
  const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  const opportunities = [
    { icon: <MapPin className="w-8 h-8 text-saffron-500" />, title: "On-site Volunteering", desc: "Help with daily feeding, cleaning, and caring for the cows at the Gaushala.", commitment: "High (Weekly)" },
    { icon: <Calendar className="w-8 h-8 text-forest-500" />, title: "Event Support", desc: "Assist in organizing and managing awareness camps, medical camps, and festivals.", commitment: "Medium (Project-based)" },
    { icon: <Monitor className="w-8 h-8 text-blue-500" />, title: "Digital Volunteering", desc: "Help us with social media, content creation, website updates, and graphic design.", commitment: "Flexible (Remote)" },
    { icon: <Heart className="w-8 h-8 text-pink-500" />, title: "Fundraising", desc: "Organize campaigns in your community or online to raise funds for cow welfare.", commitment: "Flexible" },
    { icon: <Megaphone className="w-8 h-8 text-golden-500" />, title: "Awareness Campaigns", desc: "Be an ambassador. Conduct sessions in schools and societies about cow protection.", commitment: "Medium" }
  ];

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', city: '', interest: '', availability: '', experience: '', source: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (!formData.phone) tempErrors.phone = "Phone is required";
    if (!formData.city) tempErrors.city = "City is required";
    if (!formData.interest) tempErrors.interest = "Please select an interest area";
    if (!formData.availability) tempErrors.availability = "Please select your availability";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', city: '', interest: '', availability: '', experience: '', source: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <>
      <SEO title="Volunteer With Us - Gaushala" description="Join our community of volunteers and dedicate your time for the welfare of cows." />
      
      {/* Page Hero */}
      <section className="page-hero py-16 md:py-24 bg-gradient-to-r from-forest-600 to-forest-700 text-white">
        <div className="container-custom">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Become a Volunteer</h1>
            <div className="flex items-center justify-center space-x-2 text-sm md:text-base opacity-90">
              <Link to="/" className="hover:underline">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span>Volunteer</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro & Opportunities */}
      <section className="section-padding bg-cream-50">
        <div className="container-custom">
          <AnimatedSection className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-charcoal-900 mb-4">Make a Difference</h2>
            <p className="text-lg text-charcoal-700">
              Volunteering with us is a profoundly rewarding experience. Whether you can spare a few hours a week on-site or help us remotely, your skills and passion can make a huge impact on the lives of destitute cows.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opp, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <div className="card-hover p-6 bg-white rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
                  <div className="mb-4 bg-gray-50 p-3 rounded-full inline-block w-max">
                    {opp.icon}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-charcoal-900 mb-2">{opp.title}</h3>
                  <p className="text-charcoal-600 mb-4 flex-grow">{opp.desc}</p>
                  <div className="pt-4 border-t border-gray-100">
                    <span className="text-sm font-semibold text-charcoal-800">Commitment: </span>
                    <span className="text-sm text-saffron-600">{opp.commitment}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Form */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="bg-cream-50 p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100">
                <SectionHeading title="Volunteer Registration Form" subtitle="Join Our Community" />
                
                {isSubmitted && (
                  <div className="mb-8 p-4 bg-green-50 text-green-700 rounded-lg flex items-center space-x-3">
                    <CheckCircle2 className="w-6 h-6" />
                    <span>Thank you for applying! Our team will get in touch with you shortly.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} placeholder="John Doe" />
                    <Input label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} placeholder="john@example.com" />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} placeholder="9876543210" />
                    <Input label="City" name="city" value={formData.city} onChange={handleChange} error={errors.city} placeholder="Your City" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-charcoal-700">Area of Interest</label>
                      <select name="interest" value={formData.interest} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-saffron-500 focus:border-saffron-500 outline-none bg-white ${errors.interest ? 'border-red-500' : 'border-gray-300'}`}>
                        <option value="">Select Interest Area</option>
                        <option value="on-site">On-site Volunteering</option>
                        <option value="events">Event Support</option>
                        <option value="digital">Digital / Remote</option>
                        <option value="fundraising">Fundraising</option>
                        <option value="awareness">Awareness Campaigns</option>
                      </select>
                      {errors.interest && <p className="text-red-500 text-xs">{errors.interest}</p>}
                    </div>
                    
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-charcoal-700">Availability</label>
                      <select name="availability" value={formData.availability} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-saffron-500 focus:border-saffron-500 outline-none bg-white ${errors.availability ? 'border-red-500' : 'border-gray-300'}`}>
                        <option value="">Select Availability</option>
                        <option value="weekdays">Weekdays</option>
                        <option value="weekends">Weekends Only</option>
                        <option value="both">Both Weekdays & Weekends</option>
                        <option value="flexible">Flexible / Project Basis</option>
                      </select>
                      {errors.availability && <p className="text-red-500 text-xs">{errors.availability}</p>}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-charcoal-700">Past Experience / Skills (Optional)</label>
                    <textarea name="experience" value={formData.experience} onChange={handleChange} rows="3" placeholder="Tell us about any relevant experience or specific skills you bring..." className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron-500 focus:border-saffron-500 outline-none resize-none"></textarea>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-charcoal-700">How did you hear about us? (Optional)</label>
                    <select name="source" value={formData.source} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron-500 focus:border-saffron-500 outline-none bg-white">
                      <option value="">Select an option</option>
                      <option value="social">Social Media</option>
                      <option value="friend">Friend / Family</option>
                      <option value="search">Search Engine</option>
                      <option value="event">Attended an Event</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="pt-4 text-center">
                    <button type="submit" className="btn-primary bg-forest-600 hover:bg-forest-700 text-white px-10 py-3 rounded-full text-lg font-semibold inline-flex items-center transition-colors">
                      <Send className="w-5 h-5 mr-2" />
                      Join Us Today
                    </button>
                  </div>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
};

export default Volunteer;
