import AdminSettings from '../models/AdminSettings.js';
import Donation from '../models/Donation.js';
import Volunteer from '../models/Volunteer.js';
import Cause from '../models/Cause.js';
import Contact from '../models/Contact.js';
import { AppError } from '../middleware/errorHandler.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const totalDonations = await Donation.countDocuments({ paymentStatus: 'completed' });
    const donationAmounts = await Donation.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalAmount = donationAmounts.length > 0 ? donationAmounts[0].total : 0;
    
    const pendingVolunteers = await Volunteer.countDocuments({ status: 'pending' });
    const activeCauses = await Cause.countDocuments({ isActive: true });
    const unreadMessages = await Contact.countDocuments({ isRead: false });

    const recentDonations = await Donation.find({ paymentStatus: 'completed' })
      .sort('-createdAt')
      .limit(5)
      .populate('cause', 'title');

    res.status(200).json({
      success: true,
      data: {
        totalDonations,
        totalAmount,
        pendingVolunteers,
        activeCauses,
        unreadMessages,
        recentDonations
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getSettings = async (req, res, next) => {
  try {
    const settings = await AdminSettings.getSettings();
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    let settings = await AdminSettings.findOne();
    if (!settings) {
      settings = await AdminSettings.create(req.body);
    } else {
      settings = await AdminSettings.findByIdAndUpdate(settings._id, req.body, { new: true, runValidators: true });
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};
