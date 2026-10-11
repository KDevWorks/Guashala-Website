import mongoose from 'mongoose';

const visitRequestSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please add a name'] },
  email: { type: String, required: [true, 'Please add an email'] },
  phone: { type: String },
  visitDate: { type: Date, required: [true, 'Please add a visit date'] },
  numberOfVisitors: { type: Number, default: 1 },
  purpose: { type: String },
  message: { type: String },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending'
  },
  adminNotes: { type: String },
}, { timestamps: true });

export default mongoose.model('VisitRequest', visitRequestSchema);
