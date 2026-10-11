import React from 'react';
import { motion } from 'framer-motion';
import { Check, Download, Share2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';

const ThankYou = ({ donationData, onReset }) => {
  return (
    <div className="text-center py-8">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <motion.div
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Check className="w-12 h-12 text-green-600" strokeWidth={3} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-3xl font-heading font-bold text-charcoal-900 mb-2">
          Thank You for Supporting Gau Seva!
        </h2>
        <p className="text-charcoal-600 mb-8 max-w-md mx-auto">
          Your generous contribution of {formatCurrency(donationData.amount)} helps us provide better care and shelter for our cows.
        </p>

        <div className="bg-cream-50 border border-cream-200 rounded-xl p-6 max-w-sm mx-auto text-left mb-8 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 p-3 opacity-10">
            <svg className="w-24 h-24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
          </div>
          
          <h3 className="text-sm uppercase tracking-wider text-charcoal-500 font-semibold mb-4 border-b pb-2">Donation Receipt</h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-charcoal-500">Receipt No:</span>
              <span className="font-medium text-charcoal-900">{donationData.receiptNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-500">Date:</span>
              <span className="font-medium text-charcoal-900">{donationData.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-500">Name:</span>
              <span className="font-medium text-charcoal-900">{donationData.isAnonymous ? 'Anonymous' : donationData.fullName}</span>
            </div>
            {donationData.cause && (
              <div className="flex justify-between">
                <span className="text-charcoal-500">Cause:</span>
                <span className="font-medium text-charcoal-900">{donationData.cause.title}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t mt-2">
              <span className="text-charcoal-800 font-bold">Amount:</span>
              <span className="font-bold text-saffron-600 text-lg">{formatCurrency(donationData.amount)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
          <button className="btn-outline flex items-center justify-center gap-2">
            <Download size={18} /> Download Receipt
          </button>
          <button className="btn-outline flex items-center justify-center gap-2">
            <Share2 size={18} /> Share
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button onClick={onReset} className="text-saffron-600 font-medium hover:text-saffron-700 underline underline-offset-2">
            Donate Again
          </button>
          <Link to="/" className="flex items-center gap-1 text-charcoal-600 hover:text-charcoal-900 font-medium">
            Go to Home <ArrowRight size={16} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ThankYou;
