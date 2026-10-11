import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, trendDirection, color = 'saffron' }) => {
  const colorMap = {
    saffron: 'text-saffron-500 bg-saffron-50',
    forest: 'text-forest-600 bg-forest-50',
    blue: 'text-blue-500 bg-blue-50',
    purple: 'text-purple-500 bg-purple-50',
    golden: 'text-golden-500 bg-golden-50',
    red: 'text-red-500 bg-red-50'
  };

  const style = colorMap[color] || colorMap.saffron;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className={`p-2 rounded-lg ${style}`}>
          <Icon size={20} />
        </div>
      </div>
      
      <div className="flex items-baseline space-x-2">
        <p className="text-2xl sm:text-3xl font-bold text-gray-800 font-heading">{value}</p>
        
        {trend && (
          <span className={`flex items-center text-sm font-medium ${trendDirection === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trendDirection === 'up' ? <ArrowUp size={16} className="mr-1" /> : <ArrowDown size={16} className="mr-1" />}
            {trend}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
