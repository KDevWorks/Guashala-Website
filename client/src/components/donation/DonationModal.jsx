import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useDonation } from '../../context/DonationContext';
import DonationForm from './DonationForm';
import DonationSummary from './DonationSummary';
import PaymentStatus from './PaymentStatus';
import ThankYou from './ThankYou';
import { generateReceiptNumber } from '../../utils/helpers';

const steps = [
  { id: 'form', label: 'Details' },
  { id: 'summary', label: 'Summary' },
  { id: 'payment', label: 'Payment' },
  { id: 'success', label: 'Complete' }
];

const DonationModal = () => {
  const { isModalOpen, closeDonationModal, donationStep, setDonationStep, resetDonation } = useDonation();
  const [formData, setFormData] = useState({});
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, processing, failed, success
  const [donationResult, setDonationResult] = useState(null);

  const handleClose = () => {
    if (donationStep === 'payment' && paymentStatus === 'processing') return; // Prevent close during payment
    closeDonationModal();
  };

  const handleFormNext = (data) => {
    setFormData(data);
    setDonationStep('summary');
  };

  const handleSummaryConfirm = () => {
    setDonationStep('payment');
    setPaymentStatus('processing');
  };

  const handleSummaryBack = () => {
    setDonationStep('form');
  };

  const handlePaymentSuccess = () => {
    setPaymentStatus('success');
    const result = {
      ...formData,
      receiptNumber: generateReceiptNumber(),
      date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
    };
    setDonationResult(result);
    setDonationStep('success');
  };

  const handlePaymentFail = () => {
    setPaymentStatus('failed');
  };

  const handlePaymentRetry = () => {
    setPaymentStatus('processing');
  };

  const handleReset = () => {
    setFormData({});
    resetDonation();
    setDonationStep('form');
  };

  const currentIndex = steps.findIndex(s => s.id === (donationStep === 'failed' ? 'payment' : donationStep));
  const showHeader = donationStep !== 'success';

  return (
    <Modal 
      isOpen={isModalOpen} 
      onClose={handleClose} 
      title={showHeader ? "Make a Donation" : ""}
      size={donationStep === 'payment' ? 'xl' : 'lg'}
      closeOnOutsideClick={donationStep !== 'payment'}
    >
      {showHeader && (
        <div className="mb-8 mt-2">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded -z-10"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-saffron-500 rounded -z-10 transition-all duration-500"
              style={{ width: `${(Math.max(0, currentIndex) / (steps.length - 1)) * 100}%` }}
            ></div>
            
            {steps.map((step, idx) => {
              const isActive = idx === currentIndex;
              const isPast = idx < currentIndex;
              
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                    isActive ? 'bg-saffron-500 text-white shadow-md' : 
                    isPast ? 'bg-saffron-100 text-saffron-600 border border-saffron-300' : 
                    'bg-white text-gray-400 border border-gray-300'
                  }`}>
                    {isPast ? '✓' : idx + 1}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${isActive ? 'text-charcoal-900' : 'text-charcoal-500'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="min-h-[300px]">
        {donationStep === 'form' && <DonationForm onNext={handleFormNext} initialData={formData} />}
        {donationStep === 'summary' && <DonationSummary formData={formData} onConfirm={handleSummaryConfirm} onBack={handleSummaryBack} />}
        {(donationStep === 'payment' || donationStep === 'failed') && (
          <PaymentStatus 
            status={paymentStatus} 
            formData={formData} 
            onSuccess={handlePaymentSuccess}
            onFail={handlePaymentFail}
            onRetry={handlePaymentRetry}
          />
        )}
        {donationStep === 'success' && <ThankYou donationData={donationResult} onReset={handleReset} />}
      </div>
    </Modal>
  );
};

export default DonationModal;
