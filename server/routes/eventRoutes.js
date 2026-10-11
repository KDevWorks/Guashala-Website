import express from 'express';
import { 
  getEvents, getEventById, createEvent, 
  updateEvent, deleteEvent 
} from '../controllers/eventController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getEvents)
  .post(protect, authorize('admin'), createEvent);

router.route('/:id')
  .get(getEventById)
  .put(protect, authorize('admin'), updateEvent)
  .delete(protect, authorize('admin'), deleteEvent);

export default router;
