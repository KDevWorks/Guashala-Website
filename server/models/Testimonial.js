import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please add a name'] },
  location: { type: String },
  avatar: { type: String },
  text: { type: String, required: [true, 'Please add testimonial text'] },
  rating: { type: Number, min: 1, max: 5 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);
