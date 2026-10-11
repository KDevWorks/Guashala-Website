import express from 'express';
import { 
  createVisitRequest, getVisitRequests, updateVisitStatus 
} from '../controllers/visitController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createVisitRequest);

router.use(protect, authorize('admin'));
router.get('/', getVisitRequests);
router.put('/:id/status', updateVisitStatus);

export default router;
