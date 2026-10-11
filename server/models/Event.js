import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Please add a title'] },
  description: { type: String },
  date: { type: Date, required: [true, 'Please add an event date'] },
  endDate: { type: Date },
  location: { type: String },
  image: { type: String },
  category: { type: String },
  organizer: { type: String },
  contactEmail: { type: String },
  contactPhone: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
