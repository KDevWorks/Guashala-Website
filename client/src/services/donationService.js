import api from './api';

export const createDonation = async (donationData) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { id: 'don_' + Date.now(), ...donationData, status: 'completed' } }), 1000);
  });
};

export const getDonations = async (params) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { donations: [], total: 0 } }), 500);
  });
};

export const getDonationById = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { id, amount: 1001, status: 'completed' } }), 500);
  });
};

export const getUserDonations = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: [] }), 500);
  });
};

export const createPaymentOrder = async (amount) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { orderId: 'order_' + Date.now(), amount } }), 800);
  });
};

export const verifyPayment = async (paymentData) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { success: true, receipt: 'GSH-12345' } }), 800);
  });
};
