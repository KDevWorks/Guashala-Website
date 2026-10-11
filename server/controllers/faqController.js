import FAQ from '../models/FAQ.js';
import { AppError } from '../middleware/errorHandler.js';

export const getFAQs = async (req, res, next) => {
  try {
    const faqs = await FAQ.find({ isActive: true }).sort('order');
    res.status(200).json({ success: true, count: faqs.length, data: faqs });
  } catch (error) {
    next(error);
  }
};

export const createFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.create(req.body);
    res.status(201).json({ success: true, data: faq });
  } catch (error) {
    next(error);
  }
};

export const updateFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!faq) return next(new AppError('FAQ not found', 404));
    res.status(200).json({ success: true, data: faq });
  } catch (error) {
    next(error);
  }
};

export const deleteFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) return next(new AppError('FAQ not found', 404));
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

export const reorderFAQs = async (req, res, next) => {
  try {
    const { faqs } = req.body;
    for (let i = 0; i < faqs.length; i++) {
      await FAQ.findByIdAndUpdate(faqs[i], { order: i });
    }
    const updatedFaqs = await FAQ.find().sort('order');
    res.status(200).json({ success: true, data: updatedFaqs });
  } catch (error) {
    next(error);
  }
};
