import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  url: { type: String, required: [true, 'Please add image URL'] },
  publicId: { type: String },
  category: { type: String },
  alt: { type: String },
  caption: { type: String },
  uploadedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Gallery', gallerySchema);
