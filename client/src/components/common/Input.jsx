import React from 'react';
import { classNames } from '../../utils/helpers';

const Input = ({ 
  label, name, type = 'text', value, onChange, error, 
  placeholder, required, icon: Icon, textarea = false, rows = 4, className = '', ...props 
}) => {
  const InputComponent = textarea ? 'textarea' : 'input';
  
  return (
    <div className={classNames('w-full mb-4', className)}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-charcoal-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative rounded-md shadow-sm">
        {Icon && !textarea && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        )}
        <InputComponent
          id={name}
          name={name}
          type={textarea ? undefined : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={textarea ? rows : undefined}
          className={classNames(
            'block w-full rounded-lg border bg-white px-4 py-2.5 text-charcoal-900 focus:outline-none focus:ring-2 sm:text-sm transition-shadow',
            Icon ? 'pl-10' : '',
            error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
              : 'border-gray-300 focus:border-saffron-500 focus:ring-saffron-500/20',
            textarea ? 'resize-y' : ''
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 animate-fade-in">{error}</p>
      )}
    </div>
  );
};

export default Input;
