import Gallery from '../models/Gallery.js';
import { AppError } from '../middleware/errorHandler.js';

export const getImages = async (req, res, next) => {
  try {
    const images = await Gallery.find().sort('-createdAt');
    res.status(200).json({ success: true, count: images.length, data: images });
  } catch (error) {
    next(error);
  }
};

export const getImagesByCategory = async (req, res, next) => {
  try {
    const images = await Gallery.find({ category: req.params.category }).sort('-createdAt');
    res.status(200).json({ success: true, count: images.length, data: images });
  } catch (error) {
    next(error);
  }
};

export const uploadImage = async (req, res, next) => {
  try {
    // Basic mock implementation for image upload handling without Cloudinary integration
    const { category, caption, alt } = req.body;
    let url = req.body.url;
    
    // If a file was uploaded, normally we would upload to cloudinary here. 
    // We mock the URL if not provided directly
    if (req.file) {
       url = `https://via.placeholder.com/600x400?text=${caption || 'Gaushala+Image'}`;
    }

    if (!url) {
      return next(new AppError('Please provide an image url or file', 400));
    }

    const image = await Gallery.create({
      url,
      category,
      caption,
      alt,
      uploadedBy: req.user.id
    });

    res.status(201).json({ success: true, data: image });
  } catch (error) {
    next(error);
  }
};

export const deleteImage = async (req, res, next) => {
  try {
    const image = await Gallery.findByIdAndDelete(req.params.id);
    if (!image) return next(new AppError('Image not found', 404));
    // Would normally delete from Cloudinary here
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
