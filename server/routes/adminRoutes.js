import express from 'express';
import { 
  getDashboardStats, getSettings, updateSettings 
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/settings', getSettings); // Public route if needed, otherwise protect

router.use(protect, authorize('admin'));
router.get('/dashboard', getDashboardStats);
router.put('/settings', updateSettings);

export default router;
