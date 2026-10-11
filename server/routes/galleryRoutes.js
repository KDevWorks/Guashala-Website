import express from 'express';
import { 
  getImages, getImagesByCategory, 
  uploadImage, deleteImage 
} from '../controllers/galleryController.js';
import { protect, authorize } from '../middleware/auth.js';
import { uploadSingle } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getImages);
router.get('/category/:category', getImagesByCategory);

router.use(protect, authorize('admin'));
router.post('/', uploadSingle('image'), uploadImage);
router.delete('/:id', deleteImage);

export default router;
