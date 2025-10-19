import { storage } from '../lib/appwrite';
import { ID } from 'appwrite';
import { APPWRITE_CONFIG } from '../config/constants';

/**
 * Upload an image file to Appwrite storage
 * Returns the public URL of the uploaded image
 */
export const uploadImage = async (file: File): Promise<string> => {
  try {
    // Upload file to storage bucket
    const response = await storage.createFile(
      APPWRITE_CONFIG.bucketId,
      ID.unique(),
      file
    );

    // Generate public URL
    const imageUrl = storage.getFileView(APPWRITE_CONFIG.bucketId, response.$id);
    
    return imageUrl.href;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to upload image');
  }
};

/**
 * Delete an image from storage
 */
export const deleteImage = async (fileId: string): Promise<void> => {
  try {
    await storage.deleteFile(APPWRITE_CONFIG.bucketId, fileId);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

/**
 * Get public URL for an image
 */
export const getImageUrl = (fileId: string): string => {
  return storage.getFileView(APPWRITE_CONFIG.bucketId, fileId).href;
};
