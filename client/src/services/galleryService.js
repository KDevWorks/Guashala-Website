import api from './api';
import { galleryImages } from '../data/placeholderData';

export const getGalleryImages = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: galleryImages }), 500);
  });
};

export const uploadImage = async (imageData) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { id: 'g_' + Date.now(), ...imageData } }), 1000);
  });
};

export const deleteImage = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { success: true } }), 500);
  });
};

export const getImagesByCategory = async (category) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (category === 'All') resolve({ data: galleryImages });
      else resolve({ data: galleryImages.filter(img => img.category === category) });
    }, 300);
  });
};
