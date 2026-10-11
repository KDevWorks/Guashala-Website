import VisitRequest from '../models/VisitRequest.js';
import { AppError } from '../middleware/errorHandler.js';

export const createVisitRequest = async (req, res, next) => {
  try {
    const visit = await VisitRequest.create(req.body);
    res.status(201).json({ success: true, data: visit });
  } catch (error) {
    next(error);
  }
};

export const getVisitRequests = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    let query = {};
    if (req.query.status) {
      query.status = req.query.status;
    }

    const total = await VisitRequest.countDocuments(query);
    const visits = await VisitRequest.find(query).skip(skip).limit(limit).sort('-visitDate');

    res.status(200).json({ success: true, count: visits.length, pagination: { page, limit, total }, data: visits });
  } catch (error) {
    next(error);
  }
};

export const updateVisitStatus = async (req, res, next) => {
  try {
    const visit = await VisitRequest.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status, adminNotes: req.body.adminNotes }, 
      { new: true, runValidators: true }
    );
    if (!visit) return next(new AppError('Visit request not found', 404));
    res.status(200).json({ success: true, data: visit });
  } catch (error) {
    next(error);
  }
};
