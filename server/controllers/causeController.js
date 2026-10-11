import Cause from '../models/Cause.js';
import { AppError } from '../middleware/errorHandler.js';

export const getCauses = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    
    let query = {};
    if (req.query.isActive !== undefined) {
      query.isActive = req.query.isActive === 'true';
    }

    const total = await Cause.countDocuments(query);
    const causes = await Cause.find(query).skip(skip).limit(limit).sort('-createdAt');

    res.status(200).json({ success: true, count: causes.length, pagination: { page, limit, total }, data: causes });
  } catch (error) {
    next(error);
  }
};

export const getCauseById = async (req, res, next) => {
  try {
    const cause = await Cause.findById(req.params.id);
    if (!cause) return next(new AppError('Cause not found', 404));
    res.status(200).json({ success: true, data: cause });
  } catch (error) {
    next(error);
  }
};

export const createCause = async (req, res, next) => {
  try {
    const cause = await Cause.create(req.body);
    res.status(201).json({ success: true, data: cause });
  } catch (error) {
    next(error);
  }
};

export const updateCause = async (req, res, next) => {
  try {
    const cause = await Cause.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!cause) return next(new AppError('Cause not found', 404));
    res.status(200).json({ success: true, data: cause });
  } catch (error) {
    next(error);
  }
};

export const deleteCause = async (req, res, next) => {
  try {
    const cause = await Cause.findByIdAndDelete(req.params.id);
    if (!cause) return next(new AppError('Cause not found', 404));
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

export const toggleCauseStatus = async (req, res, next) => {
  try {
    const cause = await Cause.findById(req.params.id);
    if (!cause) return next(new AppError('Cause not found', 404));
    cause.isActive = !cause.isActive;
    await cause.save();
    res.status(200).json({ success: true, data: cause });
  } catch (error) {
    next(error);
  }
};
