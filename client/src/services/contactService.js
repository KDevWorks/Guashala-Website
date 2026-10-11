import api from './api';

export const submitContactForm = async (contactData) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { success: true, message: 'Message sent successfully!' } }), 1000);
  });
};

export const getContacts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: [] }), 500);
  });
};
