import api from './api';

export const registerVolunteer = async (volunteerData) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { success: true, message: 'Registration successful!' } }), 1000);
  });
};

export const getVolunteers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: [] }), 500);
  });
};

export const updateVolunteerStatus = async (id, status) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { id, status } }), 800);
  });
};
