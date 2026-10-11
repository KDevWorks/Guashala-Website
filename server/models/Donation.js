import mongoose from 'mongoose';
import { generateReceipt } from '../utils/generateReceipt.js';

const donationSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.ObjectId, ref: 'User' },
  donorName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  amount: { type: Number, required: [true, 'Please add a donation amount'] },
  cause: { type: mongoose.Schema.ObjectId, ref: 'Cause' },
  causeName: { type: String },
  paymentId: { type: String },
  paymentOrderId: { type: String },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  paymentMethod: { type: String },
  donationDate: { type: Date, default: Date.now },
  receiptNumber: { type: String, unique: true },
  panNumber: { type: String },
  address: { type: String },
  isAnonymous: { type: Boolean, default: false },
  notes: { type: String },
}, { timestamps: true });

donationSchema.pre('save', function (next) {
  if (!this.receiptNumber) {
    this.receiptNumber = generateReceipt();
  }
  next();
});

export default mongoose.model('Donation', donationSchema);
