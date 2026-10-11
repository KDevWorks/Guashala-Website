import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please add a name'] },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email'],
    lowercase: true,
  },
  phone: { type: String, maxlength: [20, 'Phone number can not be longer than 20 characters'] },
  password: { type: String, required: [true, 'Please add a password'], minlength: 8, select: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  avatar: { type: String },
  address: { type: String },
  donations: [{ type: mongoose.Schema.ObjectId, ref: 'Donation' }],
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, config.jwt.secret, {
    expiresIn: config.jwt.expire
  });
};

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.virtual('donationCount').get(function () {
  return this.donations ? this.donations.length : 0;
});

export default mongoose.model('User', userSchema);
