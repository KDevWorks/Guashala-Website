import api from './api';

export const requestVisit = async (visitData) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { success: true, message: 'Visit requested successfully!' } }), 1000);
  });
};

export const getVisitRequests = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: [] }), 500);
  });
};

export const updateVisitStatus = async (id, status) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { id, status } }), 800);
  });
};
