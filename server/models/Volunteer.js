import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please add a name'] },
  email: { type: String, required: [true, 'Please add an email'] },
  phone: { type: String },
  city: { type: String },
  interestArea: { type: String },
  availability: { type: String },
  experience: { type: String },
  referralSource: { type: String },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
}, { timestamps: true });

export default mongoose.model('Volunteer', volunteerSchema);
