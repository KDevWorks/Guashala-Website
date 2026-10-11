import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/helpers';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const DonationSummary = ({ formData, onConfirm, onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="bg-white border border-cream-200 rounded-xl shadow-sm overflow-hidden">
        <div className="bg-cream-50 p-6 text-center border-b border-cream-200">
          <p className="text-charcoal-600 mb-2">Total Donation Amount</p>
          <h2 className="text-4xl font-heading font-bold text-saffron-600">
            {formatCurrency(formData.amount)}
          </h2>
          {formData.cause && (
            <p className="mt-2 text-sm text-charcoal-700 font-medium">
              Supporting: <span className="text-forest-700">{formData.cause.title}</span>
            </p>
          )}
        </div>
        
        <div className="p-6 space-y-4">
          <h3 className="font-heading font-semibold text-lg text-charcoal-900 border-b pb-2">Donor Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
            <div>
              <p className="text-charcoal-500 mb-1">Name</p>
              <p className="font-medium text-charcoal-900">{formData.isAnonymous ? 'Anonymous Donor' : formData.fullName}</p>
            </div>
            <div>
              <p className="text-charcoal-500 mb-1">Email</p>
              <p className="font-medium text-charcoal-900">{formData.email}</p>
            </div>
            <div>
              <p className="text-charcoal-500 mb-1">Phone</p>
              <p className="font-medium text-charcoal-900">+91 {formData.phone}</p>
            </div>
            {formData.pan && (
              <div>
                <p className="text-charcoal-500 mb-1">PAN Number</p>
                <p className="font-medium text-charcoal-900 uppercase">{formData.pan}</p>
              </div>
            )}
          </div>
          
          {formData.pan ? (
            <div className="mt-4 bg-green-50 text-green-800 p-3 rounded-lg flex items-start gap-2 text-sm border border-green-200">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-green-600" />
              <p>Your donation is eligible for 80G tax exemption. A receipt will be sent to your email.</p>
            </div>
          ) : (
            <div className="mt-4 bg-amber-50 text-amber-800 p-3 rounded-lg flex items-start gap-2 text-sm border border-amber-200">
              <AlertCircle size={18} className="mt-0.5 shrink-0 text-amber-600" />
              <p>No PAN provided. This donation will not be eligible for 80G tax benefits.</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button 
          onClick={onBack}
          className="btn-outline flex-1 py-3"
        >
          Back to Edit
        </button>
        <button 
          onClick={onConfirm}
          className="btn-primary flex-1 py-3 text-lg"
        >
          Proceed to Payment
        </button>
      </div>
    </motion.div>
  );
};

export default DonationSummary;
