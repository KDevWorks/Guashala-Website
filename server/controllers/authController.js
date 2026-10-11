import User from '../models/User.js';
import { AppError } from '../middleware/errorHandler.js';
import { config } from '../config/config.js';

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(Date.now() + config.jwt.cookieExpire * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  if (config.nodeEnv === 'production') {
    options.secure = true;
  }
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    const user = await User.create({ name, email, password, phone });
    sendTokenResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return next(new AppError('Please provide an email and password', 400));
    const user = await User.findOne({ email }).select('+password');
    if (!user) return next(new AppError('Invalid credentials', 401));
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return next(new AppError('Invalid credentials', 401));
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie('token', 'none', { expires: new Date(Date.now() + 10 * 1000), httpOnly: true });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('donations');
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const fieldsToUpdate = { name: req.body.name, phone: req.body.phone, address: req.body.address };
    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  res.status(200).json({ success: true, message: 'Password reset functionality pending implementation' });
};

export const resetPassword = async (req, res, next) => {
  res.status(200).json({ success: true, message: 'Password reset functionality pending implementation' });
};

export const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');
    if (!(await user.matchPassword(req.body.currentPassword))) return next(new AppError('Password incorrect', 401));
    user.password = req.body.newPassword;
    await user.save();
    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};
