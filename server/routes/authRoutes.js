import express from 'express';
import { 
  register, login, logout, getMe, 
  forgotPassword, resetPassword, 
  updateProfile, updatePassword 
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

router.use(protect);
router.get('/me', getMe);
router.put('/profile', updateProfile);
router.put('/password', updatePassword);

export default router;
