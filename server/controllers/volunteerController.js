import Volunteer from '../models/Volunteer.js';
import { AppError } from '../middleware/errorHandler.js';

export const registerVolunteer = async (req, res, next) => {
  try {
    const volunteer = await Volunteer.create(req.body);
    res.status(201).json({ success: true, data: volunteer });
  } catch (error) {
    next(error);
  }
};

export const getVolunteers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    let query = {};
    if (req.query.status) {
      query.status = req.query.status;
    }

    const total = await Volunteer.countDocuments(query);
    const volunteers = await Volunteer.find(query).skip(skip).limit(limit).sort('-createdAt');

    res.status(200).json({ success: true, count: volunteers.length, pagination: { page, limit, total }, data: volunteers });
  } catch (error) {
    next(error);
  }
};

export const updateVolunteerStatus = async (req, res, next) => {
  try {
    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status }, 
      { new: true, runValidators: true }
    );
    if (!volunteer) return next(new AppError('Volunteer not found', 404));
    res.status(200).json({ success: true, data: volunteer });
  } catch (error) {
    next(error);
  }
};
