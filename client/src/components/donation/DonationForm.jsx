import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDonation } from '../../context/DonationContext';
import Input from '../common/Input';
import { formatCurrency } from '../../utils/helpers';
import { isValidEmail, isValidPhone, isValidPAN } from '../../utils/validators';
import { DONATION_AMOUNTS } from '../../utils/constants';

const DonationForm = ({ onNext, initialData = {} }) => {
  const { selectedCause, donationAmount, setDonationAmount } = useDonation();
  
  const [formData, setFormData] = useState({
    fullName: initialData.fullName || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    pan: initialData.pan || '',
    address: initialData.address || '',
    isAnonymous: initialData.isAnonymous || false,
    ...initialData
  });

  const [errors, setErrors] = useState({});
  const [customAmount, setCustomAmount] = useState('');

  useEffect(() => {
    if (donationAmount && !DONATION_AMOUNTS.includes(donationAmount)) {
      setCustomAmount(donationAmount.toString());
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleAmountSelect = (amount) => {
    setDonationAmount(amount);
    setCustomAmount('');
    if (errors.amount) setErrors(prev => ({ ...prev, amount: null }));
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(val);
    if (val) {
      setDonationAmount(parseInt(val, 10));
    } else {
      setDonationAmount(0);
    }
    if (errors.amount) setErrors(prev => ({ ...prev, amount: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim() && !formData.isAnonymous) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim() || !isValidEmail(formData.email)) newErrors.email = 'Valid Email is required';
    if (!formData.phone.trim() || !isValidPhone(formData.phone)) newErrors.phone = 'Valid 10-digit Mobile Number is required';
    if (formData.pan && !isValidPAN(formData.pan)) newErrors.pan = 'Invalid PAN format';
    if (!donationAmount || donationAmount < 10) newErrors.amount = 'Minimum donation amount is ₹10';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onNext({ ...formData, amount: donationAmount, cause: selectedCause });
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
      onSubmit={handleSubmit}
    >
      {selectedCause && (
        <div className="bg-saffron-50 p-4 rounded-lg border border-saffron-200 mb-6">
          <p className="text-sm text-saffron-800">You are donating towards:</p>
          <p className="font-heading font-semibold text-lg text-charcoal-900">{selectedCause.title}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-charcoal-700 mb-2">Select Donation Amount (₹)</label>
        <div className="flex flex-wrap gap-3 mb-3">
          {DONATION_AMOUNTS.map(amt => (
            <button
              key={amt}
              type="button"
              onClick={() => handleAmountSelect(amt)}
              className={`px-4 py-2 rounded-full border transition-all ${
                donationAmount === amt 
                  ? 'bg-saffron-500 text-white border-saffron-500 shadow-md' 
                  : 'bg-white text-charcoal-700 border-charcoal-200 hover:border-saffron-300'
              }`}
            >
              ₹{amt}
            </button>
          ))}
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-500">₹</span>
          <input
            type="text"
            placeholder="Custom Amount"
            value={customAmount}
            onChange={handleCustomAmountChange}
            className={`input-field pl-8 ${errors.amount ? 'border-red-500 focus:ring-red-500' : ''}`}
          />
        </div>
        {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            disabled={formData.isAnonymous}
            placeholder="John Doe"
          />
        </div>
        <div>
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="john@example.com"
          />
        </div>
        <div>
          <Input
            label="Mobile Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            placeholder="9876543210"
          />
        </div>
        <div>
          <Input
            label="PAN Number (Optional)"
            name="pan"
            value={formData.pan}
            onChange={handleChange}
            error={errors.pan}
            placeholder="ABCDE1234F"
            helperText="Required for 80G Tax Exemption"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal-700 mb-1">Address (Optional)</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="input-field min-h-[80px] resize-y"
          placeholder="Enter your full address"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isAnonymous"
          name="isAnonymous"
          checked={formData.isAnonymous}
          onChange={handleChange}
          className="h-4 w-4 text-saffron-600 focus:ring-saffron-500 border-gray-300 rounded"
        />
        <label htmlFor="isAnonymous" className="ml-2 block text-sm text-charcoal-700">
          Make this an anonymous donation
        </label>
      </div>

      <button type="submit" className="btn-primary w-full py-3 text-lg font-semibold">
        Continue to Summary
      </button>
    </motion.form>
  );
};

export default DonationForm;
