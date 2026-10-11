import express from 'express';
import { 
  registerVolunteer, getVolunteers, updateVolunteerStatus 
} from '../controllers/volunteerController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', registerVolunteer);

router.use(protect, authorize('admin'));
router.get('/', getVolunteers);
router.put('/:id/status', updateVolunteerStatus);

export default router;
