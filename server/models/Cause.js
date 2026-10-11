import mongoose from 'mongoose';

const causeSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Please add a title'] },
  description: { type: String },
  image: { type: String },
  suggestedAmount: { type: Number },
  goalAmount: { type: Number },
  raisedAmount: { type: Number, default: 0 },
  donorCount: { type: Number, default: 0 },
  category: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Cause', causeSchema);
