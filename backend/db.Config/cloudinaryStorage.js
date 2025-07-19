import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'hobbybuddy',
    allowed_formats: ['jpg', 'png', 'jpeg', 'mp4'],
  },
});

const upload = multer({ storage: storage });

export default upload;
