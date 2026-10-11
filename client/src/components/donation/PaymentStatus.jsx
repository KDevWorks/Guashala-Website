import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ShieldCheck, CreditCard, Smartphone, Building2 } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const PaymentStatus = ({ status, formData, onSuccess, onFail, onRetry }) => {
  const [mockGatewayState, setMockGatewayState] = useState('initializing'); // initializing, ready, processing
  const [activeTab, setActiveTab] = useState('upi');

  useEffect(() => {
    if (status === 'processing' && mockGatewayState === 'initializing') {
      const timer = setTimeout(() => {
        setMockGatewayState('ready');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status, mockGatewayState]);

  const handlePay = () => {
    setMockGatewayState('processing');
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  const handleCancel = () => {
    onFail();
  };

  if (status === 'pending' || mockGatewayState === 'initializing') {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-center">
        <Loader2 className="w-12 h-12 text-saffron-500 animate-spin mb-4" />
        <h3 className="text-xl font-heading font-semibold text-charcoal-900 mb-2">Connecting to Secure Payment Gateway</h3>
        <p className="text-charcoal-500">Please do not close this window or click back.</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-8 flex flex-col items-center justify-center text-center space-y-6"
      >
        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-2">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-heading font-bold text-charcoal-900 mb-2">Payment Failed</h3>
          <p className="text-charcoal-600 max-w-sm mx-auto">We couldn't process your payment. Your account has not been charged.</p>
        </div>
        <div className="flex gap-4 w-full">
          <button onClick={handleCancel} className="btn-outline flex-1">Cancel</button>
          <button onClick={onRetry} className="btn-primary flex-1">Try Again</button>
        </div>
      </motion.div>
    );
  }

  // Mock Gateway UI
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
    >
      <div className="bg-slate-50 p-4 border-b flex justify-between items-center">
        <div className="flex items-center gap-2 text-slate-700 font-medium">
          <ShieldCheck className="text-green-600" />
          Secure Checkout
        </div>
        <div className="text-xl font-bold">{formatCurrency(formData.amount)}</div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 border-r bg-slate-50 flex flex-row md:flex-col p-2 gap-2 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('upi')}
            className={`flex items-center gap-3 p-3 text-left rounded-lg transition-colors whitespace-nowrap ${activeTab === 'upi' ? 'bg-white shadow-sm border border-slate-200 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <Smartphone size={20} /> UPI
          </button>
          <button 
            onClick={() => setActiveTab('card')}
            className={`flex items-center gap-3 p-3 text-left rounded-lg transition-colors whitespace-nowrap ${activeTab === 'card' ? 'bg-white shadow-sm border border-slate-200 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <CreditCard size={20} /> Card
          </button>
          <button 
            onClick={() => setActiveTab('netbanking')}
            className={`flex items-center gap-3 p-3 text-left rounded-lg transition-colors whitespace-nowrap ${activeTab === 'netbanking' ? 'bg-white shadow-sm border border-slate-200 font-medium' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <Building2 size={20} /> Net Banking
          </button>
        </div>

        {/* Content */}
        <div className="w-full md:w-2/3 p-6 min-h-[300px] flex flex-col">
          {mockGatewayState === 'processing' ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
              <p className="text-slate-600 font-medium">Processing payment with bank...</p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="flex-1 mb-6">
                <h4 className="font-semibold text-slate-800 mb-4 uppercase text-sm tracking-wider">
                  {activeTab === 'upi' && 'Enter UPI ID'}
                  {activeTab === 'card' && 'Enter Card Details'}
                  {activeTab === 'netbanking' && 'Select Bank'}
                </h4>
                
                {/* Mock Inputs based on tab */}
                {activeTab === 'upi' && (
                  <input type="text" placeholder="example@upi" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" defaultValue="donor@okbank" />
                )}
                {activeTab === 'card' && (
                  <div className="space-y-3">
                    <input type="text" placeholder="Card Number" className="w-full p-3 border rounded-lg outline-none" defaultValue="4111 1111 1111 1111" />
                    <div className="flex gap-3">
                      <input type="text" placeholder="MM/YY" className="w-1/2 p-3 border rounded-lg outline-none" defaultValue="12/25" />
                      <input type="text" placeholder="CVV" className="w-1/2 p-3 border rounded-lg outline-none" defaultValue="123" />
                    </div>
                  </div>
                )}
                {activeTab === 'netbanking' && (
                  <select className="w-full p-3 border rounded-lg outline-none">
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                  </select>
                )}
              </div>
              
              <div className="flex gap-4 mt-auto">
                <button onClick={handleCancel} className="px-6 py-3 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">
                  Cancel
                </button>
                <button onClick={handlePay} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-md transition-colors">
                  Pay {formatCurrency(formData.amount)}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentStatus;
