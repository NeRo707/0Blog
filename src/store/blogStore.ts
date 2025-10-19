import { create } from 'zustand';

interface BlogStore {
  imagePreview: string;
  error: string | null;
  
  setImagePreview: (preview: string) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  clearImagePreview: () => void;
}

export const useBlogStore = create<BlogStore>((set) => ({
  imagePreview: '',
  error: null,
  
  setImagePreview: (preview: string) => set({ imagePreview: preview }),
  setError: (error: string | null) => set({ error }),
  clearError: () => set({ error: null }),
  clearImagePreview: () => set({ imagePreview: '' }),
}));
