import { create } from 'zustand';
import type { Blog } from '../types/blog';
import type { PaletteMode } from '@mui/material';

interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  image: string;
}

interface BlogStore {
  // Theme State
  themeMode: PaletteMode;
  toggleTheme: () => void;
  
  // Create Blog Form State
  createFormData: BlogFormData;
  createImagePreview: string;
  
  // Edit Blog Form State
  editFormData: Partial<Blog>;
  editImagePreview: string;
  isEditDialogOpen: boolean;
  
  // Delete Confirmation
  isDeleteDialogOpen: boolean;
  
  // UI State
  error: string | null;
  success: boolean;
  
  // Create Form Actions
  setCreateFormField: (field: keyof BlogFormData, value: string) => void;
  setCreateImagePreview: (preview: string) => void;
  resetCreateForm: () => void;
  
  // Edit Form Actions
  setEditFormData: (data: Partial<Blog>) => void;
  setEditFormField: (field: string, value: string) => void;
  setEditImagePreview: (preview: string) => void;
  openEditDialog: (blog: Blog) => void;
  closeEditDialog: () => void;
  
  // Delete Actions
  openDeleteDialog: () => void;
  closeDeleteDialog: () => void;
  
  // UI Actions
  setError: (error: string | null) => void;
  clearError: () => void;
  setSuccess: (success: boolean) => void;
}

const initialCreateFormData: BlogFormData = {
  title: '',
  excerpt: '',
  content: '',
  category: 'React',
  readTime: '5 min read',
  image: '',
};

export const useBlogStore = create<BlogStore>((set) => ({
  // Theme State
  themeMode: (localStorage.getItem('theme-mode') as PaletteMode) || 'light',
  toggleTheme: () =>
    set((state) => {
      const newMode = state.themeMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme-mode', newMode);
      return { themeMode: newMode };
    }),
  
  // Create Blog State
  createFormData: initialCreateFormData,
  createImagePreview: '',
  
  // Edit Blog State
  editFormData: {},
  editImagePreview: '',
  isEditDialogOpen: false,
  
  // Delete State
  isDeleteDialogOpen: false,
  
  // UI State
  error: null,
  success: false,
  
  // Create Form Actions
  setCreateFormField: (field, value) =>
    set((state) => ({
      createFormData: { ...state.createFormData, [field]: value },
    })),
  setCreateImagePreview: (preview) => set({ createImagePreview: preview }),
  resetCreateForm: () =>
    set({
      createFormData: initialCreateFormData,
      createImagePreview: '',
      error: null,
      success: false,
    }),
  
  // Edit Form Actions
  setEditFormData: (data) => set({ editFormData: data }),
  setEditFormField: (field, value) =>
    set((state) => ({
      editFormData: { ...state.editFormData, [field]: value },
    })),
  setEditImagePreview: (preview) => set({ editImagePreview: preview }),
  openEditDialog: (blog) =>
    set({
      editFormData: blog,
      editImagePreview: blog.image,
      isEditDialogOpen: true,
      error: null,
    }),
  closeEditDialog: () =>
    set({
      isEditDialogOpen: false,
      editFormData: {},
      editImagePreview: '',
      error: null,
    }),
  
  // Delete Actions
  openDeleteDialog: () => set({ isDeleteDialogOpen: true }),
  closeDeleteDialog: () => set({ isDeleteDialogOpen: false }),
  
  // UI Actions
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  setSuccess: (success) => set({ success }),
}));
