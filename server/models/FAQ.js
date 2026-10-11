import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  question: { type: String, required: [true, 'Please add a question'] },
  answer: { type: String, required: [true, 'Please add an answer'] },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('FAQ', faqSchema);
