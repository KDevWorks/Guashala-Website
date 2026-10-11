import express from 'express';
import { 
  submitContact, getContacts, markAsRead 
} from '../controllers/contactController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', submitContact);

router.use(protect, authorize('admin'));
router.get('/', getContacts);
router.put('/:id/read', markAsRead);

export default router;
