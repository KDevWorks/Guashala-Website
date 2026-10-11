import api from './api';
import { causes } from '../data/placeholderData';

export const getCauses = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: causes }), 500);
  });
};

export const getCauseById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const cause = causes.find(c => c.id === id);
      if (cause) resolve({ data: cause });
      else reject(new Error('Cause not found'));
    }, 300);
  });
};

export const createCause = async (causeData) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { id: 'c_' + Date.now(), ...causeData } }), 800);
  });
};

export const updateCause = async (id, causeData) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { id, ...causeData } }), 800);
  });
};

export const deleteCause = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { success: true } }), 500);
  });
};
