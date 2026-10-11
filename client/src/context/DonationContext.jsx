import React, { createContext, useContext, useState } from 'react';

export const DonationContext = createContext();

export const DonationProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCause, setSelectedCause] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [donationStep, setDonationStep] = useState('form'); // form, summary, payment, success, failed

  const openDonationModal = (cause = null) => {
    setSelectedCause(cause);
    setDonationStep('form');
    setIsModalOpen(true);
  };

  const closeDonationModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedCause(null);
      setDonationAmount('');
      setDonationStep('form');
    }, 300);
  };

  const resetDonation = () => {
    setSelectedCause(null);
    setDonationAmount('');
    setDonationStep('form');
  };

  const value = {
    isModalOpen,
    selectedCause,
    donationAmount,
    donationStep,
    openDonationModal,
    closeDonationModal,
    setDonationAmount,
    setDonationStep,
    resetDonation
  };

  return (
    <DonationContext.Provider value={value}>
      {children}
    </DonationContext.Provider>
  );
};

export const useDonation = () => {
  const context = useContext(DonationContext);
  if (!context) {
    throw new Error('useDonation must be used within a DonationProvider');
  }
  return context;
};
