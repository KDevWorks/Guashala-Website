import express from 'express';
import { 
  getFAQs, createFAQ, updateFAQ, 
  deleteFAQ, reorderFAQs 
} from '../controllers/faqController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getFAQs)
  .post(protect, authorize('admin'), createFAQ);

router.post('/reorder', protect, authorize('admin'), reorderFAQs);

router.route('/:id')
  .put(protect, authorize('admin'), updateFAQ)
  .delete(protect, authorize('admin'), deleteFAQ);

export default router;
