import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users } from 'lucide-react';
import { useDonation } from '../../context/DonationContext';
import { formatCurrency } from '../../utils/helpers';

const CauseCard = ({ cause }) => {
  const { openDonationModal } = useDonation();

  const percentRaised = Math.min(100, Math.round((cause.raised / cause.goal) * 100)) || 0;

  return (
    <motion.div 
      className="card card-hover overflow-hidden rounded-xl bg-white shadow-md flex flex-col h-full"
      whileHover={{ y: -5 }}
    >
      <div className="relative h-48 overflow-hidden group">
        <motion.img 
          src={cause.image} 
          alt={cause.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 to-transparent flex flex-col justify-end p-4">
          <span className="text-white text-xs font-semibold bg-saffron-600 px-2 py-1 rounded w-max mb-2">
            {cause.category || 'Cause'}
          </span>
          <h3 className="text-xl font-heading font-bold text-white leading-tight">
            {cause.title}
          </h3>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <p className="text-charcoal-600 text-sm mb-4 line-clamp-2">
          {cause.description}
        </p>
        
        <div className="mb-4">
          <div className="flex justify-between text-xs font-medium mb-1">
            <span className="text-forest-700">Raised: {formatCurrency(cause.raised)}</span>
            <span className="text-charcoal-500">Goal: {formatCurrency(cause.goal)}</span>
          </div>
          <div className="h-2 w-full bg-cream-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-saffron-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percentRaised}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-5 text-sm text-charcoal-600 mt-auto">
          <div className="flex items-center gap-1">
            <Users size={16} className="text-saffron-500" />
            <span>{cause.donorCount} Donors</span>
          </div>
          <div className="font-semibold text-charcoal-800 bg-cream-100 px-2 py-1 rounded">
            Suggested: {formatCurrency(cause.suggestedAmount)}
          </div>
        </div>
        
        <button 
          onClick={() => openDonationModal(cause)}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <Heart size={18} />
          Donate Now
        </button>
      </div>
    </motion.div>
  );
};

export default CauseCard;
