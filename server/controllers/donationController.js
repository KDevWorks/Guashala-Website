import Razorpay from 'razorpay';
import crypto from 'crypto';
import Donation from '../models/Donation.js';
import Cause from '../models/Cause.js';
import User from '../models/User.js';
import { config } from '../config/config.js';
import { AppError } from '../middleware/errorHandler.js';

let razorpay;
if (config.razorpay.keyId && config.razorpay.keySecret) {
  try {
    razorpay = new Razorpay({ key_id: config.razorpay.keyId, key_secret: config.razorpay.keySecret });
  } catch (e) {
    console.log('Razorpay initialization failed - using mock mode');
  }
}

export const createDonation = async (req, res, next) => {
  try {
    if (req.user) req.body.donor = req.user.id;
    const donation = await Donation.create(req.body);
    res.status(201).json({ success: true, data: donation });
  } catch (error) {
    next(error);
  }
};

export const getDonations = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const total = await Donation.countDocuments();
    const donations = await Donation.find().populate('cause').skip(skip).limit(limit).sort('-createdAt');
    res.status(200).json({ success: true, count: donations.length, pagination: { page, limit, total }, data: donations });
  } catch (error) {
    next(error);
  }
};

export const getDonationById = async (req, res, next) => {
  try {
    const donation = await Donation.findById(req.params.id).populate('cause');
    if (!donation) return next(new AppError('Donation not found', 404));
    res.status(200).json({ success: true, data: donation });
  } catch (error) {
    next(error);
  }
};

export const getUserDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find({ donor: req.user.id }).populate('cause').sort('-createdAt');
    res.status(200).json({ success: true, count: donations.length, data: donations });
  } catch (error) {
    next(error);
  }
};

export const createPaymentOrder = async (req, res, next) => {
  try {
    const { amount } = req.body;
    if (!amount) return next(new AppError('Amount is required', 400));
    if (!razorpay) return res.status(200).json({ success: true, order: { id: `mock_order_${Date.now()}`, amount: amount * 100, currency: 'INR' } });
    const options = { amount: amount * 100, currency: 'INR', receipt: `rcpt_${Date.now()}` };
    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, donationData } = req.body;
    if (razorpay_order_id && razorpay_order_id.startsWith('mock_order_')) {
      if (req.user) donationData.donor = req.user.id;
      donationData.paymentStatus = 'completed';
      donationData.paymentId = `mock_pay_${Date.now()}`;
      donationData.paymentOrderId = razorpay_order_id;
      const donation = await Donation.create(donationData);
      if (donation.cause) {
        await Cause.findByIdAndUpdate(donation.cause, { $inc: { raisedAmount: donation.amount, donorCount: 1 } });
      }
      if (req.user) {
        await User.findByIdAndUpdate(req.user.id, { $push: { donations: donation._id } });
      }
      return res.status(200).json({ success: true, data: donation });
    }
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', config.razorpay.keySecret).update(body.toString()).digest('hex');
    if (expectedSignature !== razorpay_signature) return next(new AppError('Payment verification failed', 400));
    if (req.user) donationData.donor = req.user.id;
    donationData.paymentStatus = 'completed';
    donationData.paymentId = razorpay_payment_id;
    donationData.paymentOrderId = razorpay_order_id;
    const donation = await Donation.create(donationData);
    if (donation.cause) await Cause.findByIdAndUpdate(donation.cause, { $inc: { raisedAmount: donation.amount, donorCount: 1 } });
    if (req.user) await User.findByIdAndUpdate(req.user.id, { $push: { donations: donation._id } });
    res.status(200).json({ success: true, data: donation });
  } catch (error) {
    next(error);
  }
};

export const getReceipt = async (req, res, next) => {
  res.status(200).json({ success: true, message: 'PDF receipt generation pending implementation' });
};

export const getDonationStats = async (req, res, next) => {
  try {
    const stats = await Donation.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, totalAmount: { $sum: '$amount' }, count: { $sum: 1 } } }
    ]);
    res.status(200).json({ success: true, data: stats.length > 0 ? stats[0] : { totalAmount: 0, count: 0 } });
  } catch (error) {
    next(error);
  }
};
