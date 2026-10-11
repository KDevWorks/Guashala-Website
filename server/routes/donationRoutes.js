import express from 'express';
import { 
  createDonation, getDonations, getDonationById, 
  getUserDonations, createPaymentOrder, verifyPayment, 
  getReceipt, getDonationStats 
} from '../controllers/donationController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/create-order', createPaymentOrder);
router.post('/verify-payment', verifyPayment);

// Allow anonymous donations, but attach user if logged in (middleware optional here if frontend handles it)
router.post('/', createDonation);

router.get('/stats', getDonationStats);
router.get('/my-donations', protect, getUserDonations);
router.get('/:id/receipt', getReceipt);
router.get('/:id', protect, getDonationById);

// Admin only routes
router.use(protect, authorize('admin'));
router.get('/', getDonations);

export default router;
