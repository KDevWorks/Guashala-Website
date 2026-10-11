import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeading from '../components/common/SectionHeading';
import AnimatedSection from '../components/common/AnimatedSection';
import Input from '../components/common/Input';

const Contact = () => {
  const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: ''
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.phone) {
      tempErrors.phone = "Phone is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      tempErrors.phone = "Phone must be 10 digits";
    }
    if (!formData.subject) tempErrors.subject = "Subject is required";
    if (!formData.message.trim()) tempErrors.message = "Message is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully.' });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setStatus({ type: '', message: '' }), 5000);
      }, 1500);
    } else {
      setStatus({ type: 'error', message: 'Please fix the errors in the form.' });
    }
  };

  return (
    <>
      <SEO title="Contact Us - Gaushala" description="Get in touch with us for queries, visits, or donations." />
      
      {/* Page Hero */}
      <section className="page-hero py-16 md:py-24 bg-gradient-to-r from-saffron-500 to-saffron-600 text-white">
        <div className="container-custom">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Contact Us</h1>
            <div className="flex items-center justify-center space-x-2 text-sm md:text-base opacity-90">
              <Link to="/" className="hover:underline">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span>Contact</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-cream-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <AnimatedSection>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-heading font-bold text-charcoal-900 mb-6">Send us a Message</h2>
                
                {status.message && (
                  <div className={`p-4 rounded-lg mb-6 flex items-start space-x-3 ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 mt-0.5" /> : <AlertCircle className="w-5 h-5 mt-0.5" />}
                    <span>{status.message}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <Input 
                      label="Full Name" name="name" value={formData.name} onChange={handleChange} 
                      error={errors.name} placeholder="John Doe" 
                    />
                    <Input 
                      label="Email Address" name="email" type="email" value={formData.email} 
                      onChange={handleChange} error={errors.email} placeholder="john@example.com" 
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <Input 
                      label="Phone Number" name="phone" value={formData.phone} 
                      onChange={handleChange} error={errors.phone} placeholder="9876543210" 
                    />
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-charcoal-700">Subject</label>
                      <select 
                        name="subject" value={formData.subject} onChange={handleChange}
                        className={`input-field w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-saffron-500 focus:border-saffron-500 outline-none transition-colors ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Donation">Donation</option>
                        <option value="Volunteering">Volunteering</option>
                        <option value="Rescue Request">Rescue Request</option>
                      </select>
                      {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-charcoal-700">Message</label>
                    <textarea 
                      name="message" value={formData.message} onChange={handleChange}
                      rows="4" placeholder="How can we help you?"
                      className={`input-field w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-saffron-500 focus:border-saffron-500 outline-none transition-colors resize-none ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>
                  
                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3 rounded-lg flex items-center justify-center text-white bg-saffron-500 hover:bg-saffron-600 transition-colors disabled:opacity-70">
                    {isSubmitting ? 'Sending...' : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </AnimatedSection>

            {/* Contact Info & Map */}
            <AnimatedSection delay={0.2} className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4">
                  <div className="bg-saffron-100 p-3 rounded-full text-saffron-600 flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-charcoal-900 mb-1">Our Location</h3>
                    <p className="text-charcoal-600 text-sm">123 Gaushala Road, Green Valley, State, 123456</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4">
                  <div className="bg-forest-100 p-3 rounded-full text-forest-600 flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-charcoal-900 mb-1">Phone Number</h3>
                    <p className="text-charcoal-600 text-sm">+91 98765 43210<br/>+91 12345 67890</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full text-blue-600 flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-charcoal-900 mb-1">Email Address</h3>
                    <p className="text-charcoal-600 text-sm">info@gaushala.org<br/>support@gaushala.org</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start space-x-4">
                  <div className="bg-golden-100 p-3 rounded-full text-golden-600 flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-charcoal-900 mb-1">Working Hours</h3>
                    <p className="text-charcoal-600 text-sm">Mon-Sat: 9:00 AM - 5:00 PM<br/>Sun: Open for visits</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-2xl h-64 flex flex-col items-center justify-center text-gray-500 overflow-hidden shadow-inner relative">
                <MapPin className="w-12 h-12 mb-3 opacity-50" />
                <p className="font-medium">Google Maps will be displayed here</p>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] opacity-20 pointer-events-none"></div>
              </div>
            </AnimatedSection>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
