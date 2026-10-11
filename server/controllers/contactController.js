import Contact from '../models/Contact.js';
import { AppError } from '../middleware/errorHandler.js';

export const submitContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

export const getContacts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    let query = {};
    if (req.query.isRead !== undefined) {
      query.isRead = req.query.isRead === 'true';
    }

    const total = await Contact.countDocuments(query);
    const contacts = await Contact.find(query).skip(skip).limit(limit).sort('-createdAt');

    res.status(200).json({ success: true, count: contacts.length, pagination: { page, limit, total }, data: contacts });
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id, 
      { isRead: true }, 
      { new: true, runValidators: true }
    );
    if (!contact) return next(new AppError('Contact message not found', 404));
    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};
