import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, FileText, ArrowRight } from 'lucide-react';
import { causes } from '../data/placeholderData';
import DonationForm from '../components/donation/DonationForm';
import DonationSummary from '../components/donation/DonationSummary';
import PaymentStatus from '../components/donation/PaymentStatus';
import ThankYou from '../components/donation/ThankYou';
import { generateReceiptNumber } from '../utils/helpers';
import { useDonation } from '../context/DonationContext';

const Donate = () => {
  const { setSelectedCause, resetDonation } = useDonation();
  const [step, setStep] = useState('form'); // form, summary, payment, success
  const [formData, setFormData] = useState({});
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [donationResult, setDonationResult] = useState(null);
  const [localSelectedCauseId, setLocalSelectedCauseId] = useState('general');

  useEffect(() => {
    // Reset context on mount
    resetDonation();
    // Setup a default general cause
    const generalCause = { id: 'general', title: 'General Fund', category: 'General' };
    setSelectedCause(generalCause);
  }, []);

  const handleCauseSelect = (causeId) => {
    setLocalSelectedCauseId(causeId);
    if (causeId === 'general') {
      setSelectedCause({ id: 'general', title: 'General Fund', category: 'General' });
    } else {
      const cause = causes.find(c => c.id === causeId);
      if (cause) setSelectedCause(cause);
    }
  };

  const handleFormNext = (data) => {
    setFormData(data);
    setStep('summary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSummaryConfirm = () => {
    setStep('payment');
    setPaymentStatus('processing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSummaryBack = () => {
    setStep('form');
  };

  const handlePaymentSuccess = () => {
    setPaymentStatus('success');
    const result = {
      ...formData,
      receiptNumber: generateReceiptNumber(),
      date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
    };
    setDonationResult(result);
    setStep('success');
  };

  const handlePaymentFail = () => {
    setPaymentStatus('failed');
  };

  const handleReset = () => {
    setFormData({});
    resetDonation();
    setStep('form');
    setLocalSelectedCauseId('general');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Make a Donation | Gaushala</title>
        <meta name="description" content="Make a secure online donation to support our Gaushala." />
      </Helmet>

      <section className="page-hero pt-32 pb-16 bg-gradient-to-r from-forest-700 to-forest-600 relative">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Make a Donation
          </h1>
          <div className="flex items-center justify-center gap-2 text-white/80 text-sm font-medium">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Donate</span>
          </div>
        </div>
      </section>

      <section className="section-padding bg-cream-50">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Main Content Area */}
            <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-md p-6 md:p-8">
              
              {step === 'form' && (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-heading font-bold text-charcoal-900 mb-4">Choose Your Cause</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div 
                        onClick={() => handleCauseSelect('general')}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${localSelectedCauseId === 'general' ? 'border-saffron-500 bg-saffron-50' : 'border-gray-200 hover:border-saffron-300'}`}
                      >
                        <h4 className="font-bold text-charcoal-900 mb-1">General Fund</h4>
                        <p className="text-sm text-charcoal-600">Allocated to where it's needed most</p>
                      </div>
                      
                      {causes.slice(0, 3).map(cause => (
                        <div 
                          key={cause.id}
                          onClick={() => handleCauseSelect(cause.id)}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex items-start gap-3 ${localSelectedCauseId === cause.id ? 'border-saffron-500 bg-saffron-50' : 'border-gray-200 hover:border-saffron-300'}`}
                        >
                          <img src={cause.image} alt={cause.title} className="w-12 h-12 rounded object-cover shrink-0" />
                          <div>
                            <h4 className="font-bold text-charcoal-900 mb-1 line-clamp-1">{cause.title}</h4>
                            <p className="text-sm text-charcoal-600 line-clamp-1">{cause.category}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <h2 className="text-2xl font-heading font-bold text-charcoal-900 mb-6 border-t pt-8">Donation Details</h2>
                  <DonationForm onNext={handleFormNext} initialData={formData} />
                </>
              )}

              {step === 'summary' && (
                <div>
                  <h2 className="text-2xl font-heading font-bold text-charcoal-900 mb-6">Review Donation</h2>
                  <DonationSummary formData={formData} onConfirm={handleSummaryConfirm} onBack={handleSummaryBack} />
                </div>
              )}

              {step === 'payment' && (
                <div>
                  <h2 className="text-2xl font-heading font-bold text-charcoal-900 mb-6">Secure Payment</h2>
                  <PaymentStatus 
                    status={paymentStatus}
                    formData={formData}
                    onSuccess={handlePaymentSuccess}
                    onFail={handlePaymentFail}
                    onRetry={() => setPaymentStatus('processing')}
                  />
                </div>
              )}

              {step === 'success' && (
                <ThankYou donationData={donationResult} onReset={handleReset} />
              )}
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-1/3 space-y-6">
              
              {/* Trust Badges */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-heading font-bold text-lg text-charcoal-900 mb-4 pb-2 border-b">Why Donate to Us?</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <ShieldCheck className="text-green-600 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-charcoal-900 text-sm">100% Secure</h4>
                      <p className="text-xs text-charcoal-600">Your payment details are encrypted and safe.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <FileText className="text-blue-600 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-charcoal-900 text-sm">Tax Deductible</h4>
                      <p className="text-xs text-charcoal-600">Eligible donations get 80G tax benefits.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Heart className="text-saffron-600 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-charcoal-900 text-sm">Transparent Usage</h4>
                      <p className="text-xs text-charcoal-600">We ensure every rupee reaches the cows.</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Where it goes */}
              <div className="bg-saffron-50 rounded-xl shadow-sm border border-saffron-100 p-6">
                <h3 className="font-heading font-bold text-lg text-saffron-900 mb-3">Where Your Donation Goes</h3>
                <div className="space-y-2 text-sm text-charcoal-700">
                  <div className="flex justify-between items-center">
                    <span>Nutritious Fodder</span>
                    <span className="font-semibold">45%</span>
                  </div>
                  <div className="w-full bg-saffron-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-saffron-500 h-full w-[45%]"></div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3">
                    <span>Medical Care</span>
                    <span className="font-semibold">30%</span>
                  </div>
                  <div className="w-full bg-saffron-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-saffron-500 h-full w-[30%]"></div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3">
                    <span>Shelter Maintenance</span>
                    <span className="font-semibold">15%</span>
                  </div>
                  <div className="w-full bg-saffron-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-saffron-500 h-full w-[15%]"></div>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <span>Rescue Ops</span>
                    <span className="font-semibold">10%</span>
                  </div>
                  <div className="w-full bg-saffron-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-saffron-500 h-full w-[10%]"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Donate;
