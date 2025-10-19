import { useMutation } from '@tanstack/react-query';
import { uploadImage as uploadImageToStorage } from '../services/storageService';

const validateImageFile = (file: File) => {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please select a valid image file');
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error('Image file size must be less than 5MB');
  }
};

export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      validateImageFile(file);
      return uploadImageToStorage(file);
    },
  });
};
