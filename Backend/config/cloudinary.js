import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { Readable } from 'stream';
import dotenv from "dotenv";
dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Configure multer to use memory storage
const storage = multer.memoryStorage();

// File filter for security
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  
  // Additional security: check file extension
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
  const fileExtension = file.originalname.split('.').pop().toLowerCase();
  
  if (!allowedExtensions.includes(fileExtension)) {
    return cb(new Error('Invalid file extension!'), false);
  }
  
  cb(null, true);
};

// Configure multer
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  }
});

// Helper function to upload buffer(s) to Cloudinary
export const uploadToCloudinary = (buffers, folder = "miraas") => {
  // Handle both single buffer and array of buffers
  const bufferArray = Array.isArray(buffers) ? buffers : [buffers];
  
  return Promise.all(
    bufferArray.map(buffer => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder,
            transformation: [
              { width: 500, height: 500, crop: 'limit' },
              { quality: 'auto' },
              { fetch_format: 'auto' }
            ],
            resource_type: 'auto'
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        // Create a readable stream from buffer and pipe to Cloudinary
        const readableStream = Readable.from(buffer);
        readableStream.pipe(uploadStream);
      });
    })
  );
};

// Helper function to delete image(s) from Cloudinary
export const deleteFromCloudinary = async (publicIds) => {
  try {
    // Handle both single publicId and array of publicIds
    const publicIdArray = Array.isArray(publicIds) ? publicIds : [publicIds];
    const results = await Promise.all(
      publicIdArray.map(publicId =>
        cloudinary.uploader.destroy(publicId, { invalidate: true })
      )
    );
    return results;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};

// Helper function to extract public_id from Cloudinary URL
export const extractPublicId = (url) => {
  try {
    // Example URL: https://res.cloudinary.com/demo/image/upload/v1234567890/user-profiles/user_123_1234567890.jpg
    const urlParts = url.split('/upload/');
    if (urlParts.length < 2) return null;
    
    const pathAfterUpload = urlParts[1];
    // Remove version (v1234567890/)
    const pathWithoutVersion = pathAfterUpload.replace(/^v\d+\//, '');
    // Remove file extension
    const publicId = pathWithoutVersion.replace(/\.[^/.]+$/, '');
    
    return publicId;
  } catch (error) {
    console.error('Error extracting public_id:', error);
    return null;
  }
};

export default cloudinary;