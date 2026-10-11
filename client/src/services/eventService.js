import api from './api';
import { events } from '../data/placeholderData';

export const getEvents = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: events }), 500);
  });
};

export const getEventById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const event = events.find(e => String(e.id) === String(id));
      if (event) resolve({ data: event });
      else reject(new Error('Event not found'));
    }, 300);
  });
};

export const createEvent = async (eventData) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { id: 'e_' + Date.now(), ...eventData } }), 800);
  });
};

export const updateEvent = async (id, eventData) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { id, ...eventData } }), 800);
  });
};

export const deleteEvent = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { success: true } }), 500);
  });
};
