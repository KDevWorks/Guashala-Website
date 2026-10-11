import api from './api';

export const getDashboardStats = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ 
      data: {
        totalDonations: 150000,
        activeCows: 1250,
        volunteers: 45,
        upcomingEvents: 3,
        recentDonations: []
      }
    }), 500);
  });
};

export const updateSettings = async (settings) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { success: true, settings } }), 800);
  });
};

export const getSettings = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { maintenanceMode: false, currentCampaign: null } }), 300);
  });
};

export const getAllDonors = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: [] }), 500);
  });
};

export const exportDonations = async (format = 'csv') => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { url: `/downloads/export_${Date.now()}.${format}` } }), 1000);
  });
};
