import express from 'express';
import { 
  getCauses, getCauseById, createCause, 
  updateCause, deleteCause, toggleCauseStatus 
} from '../controllers/causeController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getCauses)
  .post(protect, authorize('admin'), createCause);

router.route('/:id')
  .get(getCauseById)
  .put(protect, authorize('admin'), updateCause)
  .delete(protect, authorize('admin'), deleteCause);

router.put('/:id/toggle-status', protect, authorize('admin'), toggleCauseStatus);

export default router;
