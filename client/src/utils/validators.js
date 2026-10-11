export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
  const re = /^[6-9]\d{9}$/;
  const cleanPhone = phone.replace(/\D/g, '');
  return re.test(cleanPhone) || cleanPhone.length === 10;
};

export const validateName = (name) => {
  return name && name.trim().length >= 2;
};

export const validateAmount = (amount) => {
  const num = Number(amount);
  return !isNaN(num) && num > 0;
};

export const validatePAN = (pan) => {
  const re = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return re.test(String(pan).toUpperCase());
};

export const validateForm = (fields, rules) => {
  const errors = {};
  let isValid = true;

  Object.keys(rules).forEach((key) => {
    const value = fields[key];
    const ruleSet = rules[key];

    if (ruleSet.required && (!value || String(value).trim() === '')) {
      errors[key] = 'This field is required';
      isValid = false;
    } else if (value) {
      if (ruleSet.type === 'email' && !validateEmail(value)) {
        errors[key] = 'Invalid email address';
        isValid = false;
      }
      if (ruleSet.type === 'phone' && !validatePhone(value)) {
        errors[key] = 'Invalid Indian phone number';
        isValid = false;
      }
      if (ruleSet.type === 'pan' && !validatePAN(value)) {
        errors[key] = 'Invalid PAN format';
        isValid = false;
      }
      if (ruleSet.type === 'amount' && !validateAmount(value)) {
        errors[key] = 'Amount must be greater than 0';
        isValid = false;
      }
      if (ruleSet.minLength && String(value).length < ruleSet.minLength) {
        errors[key] = `Must be at least ${ruleSet.minLength} characters`;
        isValid = false;
      }
    }
  });

  return { isValid, errors };
};

// Aliases for alternative import naming
export const isValidEmail = validateEmail;
export const isValidPhone = validatePhone;
export const isValidPAN = validatePAN;
export const isValidName = validateName;
export const isValidAmount = validateAmount;
