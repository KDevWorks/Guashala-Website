import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2, Clock, MapPin, Calendar, Info } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeading from '../components/common/SectionHeading';
import AnimatedSection from '../components/common/AnimatedSection';
import Input from '../components/common/Input';

const VisitGaushala = () => {
  const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', date: '', visitors: '1', purpose: '', message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.phone) tempErrors.phone = "Phone is required";
    if (!formData.date) tempErrors.date = "Date is required";
    if (!formData.visitors || formData.visitors < 1) tempErrors.visitors = "Must be at least 1";
    if (!formData.purpose) tempErrors.purpose = "Purpose is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', date: '', visitors: '1', purpose: '', message: '' });
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
      <SEO title="Visit Our Gaushala - Experience the Peace" description="Plan your visit to our Gaushala. Spend time with cows and experience tranquility." />
      
      {/* Page Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1596733430284-f7437764b1a9?q=80&w=1920&auto=format&fit=crop" alt="Gaushala View" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>

        <div className="container-custom relative z-10 text-white text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">Visit Our Gaushala</h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">Experience the profound peace and spiritual joy of serving the sacred cows.</p>
            <div className="flex items-center justify-center space-x-2 text-sm md:text-base opacity-90">
              <Link to="/" className="hover:underline">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span>Visit</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="section-padding bg-cream-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <SectionHeading title="Plan Your Visit" subtitle="What to Expect" align="left" />
              <div className="text-charcoal-700 space-y-4 mb-8">
                <p>Visiting a Gaushala is a purifying experience. You get to witness our daily operations, interact with the cows, and learn about our conservation efforts.</p>
                <p>Visitors are welcome to feed the cows, participate in the evening Aarti, and spend tranquil time in the ashram grounds.</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-saffron-100 text-saffron-600 rounded-lg"><Clock className="w-6 h-6" /></div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 text-lg">Visiting Hours</h4>
                    <p className="text-charcoal-600">Monday to Sunday: 9:00 AM - 5:00 PM</p>
                    <p className="text-charcoal-500 text-sm">Evening Aarti at 6:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-forest-100 text-forest-600 rounded-lg"><Info className="w-6 h-6" /></div>
                  <div>
                    <h4 className="font-bold text-charcoal-900 text-lg">Guidelines</h4>
                    <ul className="list-disc list-inside text-charcoal-600 space-y-1 mt-1">
                      <li>Dress modestly and comfortably</li>
                      <li>Outside food for cows is not permitted without prior check</li>
                      <li>Maintain silence near the medical ward</li>
                      <li>Children must be supervised at all times</li>
                    </ul>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1544413660-299165566b1d?q=80&w=400&auto=format&fit=crop" alt="Cows" className="w-full h-48 object-cover rounded-xl shadow-md" />
                <img src="https://images.unsplash.com/photo-1570044955373-3e110c9be740?q=80&w=400&auto=format&fit=crop" alt="Calf" className="w-full h-48 object-cover rounded-xl shadow-md mt-8" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Form & Map */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            
            <AnimatedSection>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-2xl font-heading font-bold text-charcoal-900 mb-6 flex items-center">
                  <Calendar className="w-6 h-6 mr-3 text-saffron-500" />
                  Request a Visit
                </h3>
                
                {isSubmitted && (
                  <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Visit request received! We will confirm your slot via email/phone.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
                    <Input label="Mobile Number" name="phone" value={formData.phone} onChange={handleChange} error={errors.phone} />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-charcoal-700">Email Address (Optional)</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron-500 outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-charcoal-700">Date of Visit</label>
                      <input type="date" name="date" value={formData.date} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-saffron-500 outline-none ${errors.date ? 'border-red-500' : 'border-gray-300'}`} />
                      {errors.date && <p className="text-red-500 text-xs">{errors.date}</p>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <Input label="Number of Visitors" name="visitors" type="number" min="1" value={formData.visitors} onChange={handleChange} error={errors.visitors} />
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-charcoal-700">Purpose of Visit</label>
                      <select name="purpose" value={formData.purpose} onChange={handleChange} className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-saffron-500 outline-none bg-white ${errors.purpose ? 'border-red-500' : 'border-gray-300'}`}>
                        <option value="">Select Purpose</option>
                        <option value="Personal">Personal / Family</option>
                        <option value="Educational">Educational (School/College)</option>
                        <option value="Donation">Donation Inquiry</option>
                        <option value="Media">Media / Photography</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.purpose && <p className="text-red-500 text-xs">{errors.purpose}</p>}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-charcoal-700">Additional Message (Optional)</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} rows="3" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-saffron-500 outline-none resize-none"></textarea>
                  </div>

                  <button type="submit" className="w-full btn-primary bg-saffron-500 hover:bg-saffron-600 text-white py-3 rounded-lg font-semibold transition-colors">
                    Request a Visit
                  </button>
                </form>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} className="flex flex-col">
              <div className="bg-gray-100 rounded-2xl flex-grow min-h-[300px] flex flex-col items-center justify-center text-gray-500 relative overflow-hidden shadow-inner">
                <MapPin className="w-12 h-12 mb-3 opacity-50" />
                <p className="font-medium text-lg">Interactive Map</p>
                <p className="text-sm">Location details will appear here</p>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] opacity-20 pointer-events-none"></div>
              </div>
              <div className="mt-6 p-6 bg-cream-50 rounded-xl border border-gray-100">
                <h4 className="font-bold text-charcoal-900 mb-2">Location Address</h4>
                <p className="text-charcoal-700">123 Gaushala Road, Near Green Valley,<br/>State, Country - 123456</p>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>
    </>
  );
};

export default VisitGaushala;
