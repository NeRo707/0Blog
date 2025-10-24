import { useState } from "react";
import { useUpdateBlogMutation } from "../hooks/useUpdateBlogMutation";
import { useUploadImageMutation } from "../hooks/useUploadImageMutation";
import type { Blog } from "../types/blog";

export function useBlogEditForm() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Blog>>({});
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);

  const { mutate: updateBlog, isPending: isUpdating } = useUpdateBlogMutation();
  const { mutate: uploadImage, isPending: isUploadingImage } = useUploadImageMutation();

  const openEdit = (blog: Blog) => {
    setEditingId(blog.id);
    setEditFormData(blog);
    setEditImagePreview(blog.image);
  };

  const closeEdit = () => {
    setEditingId(null);
    setEditFormData({});
    setEditImagePreview(null);
  };

  const handleFieldChange = (field: keyof Blog, value: string) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setEditImagePreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    uploadImage(file, {
      onSuccess: (imageUrl) => {
        setEditFormData((prev) => ({ ...prev, image: imageUrl }));
      },
    });
  };

  const saveEdit = (
    onSuccess: () => void,
    onError: (error: unknown) => void
  ) => {
    if (!editingId) return;

    const updates = {
      title: editFormData.title,
      excerpt: editFormData.excerpt,
      content: editFormData.content,
      category: editFormData.category,
      readTime: editFormData.readTime,
      image: editFormData.image,
      author: editFormData.author,
      authorId: editFormData.authorId,
      date: editFormData.date,
    } as Partial<Omit<Blog, "id">>;

    updateBlog(
      { blogId: editingId, updates },
      {
        onSuccess: () => {
          closeEdit();
          onSuccess();
        },
        onError,
      }
    );
  };

  return {
    editingId,
    editFormData,
    editImagePreview,
    isUpdating,
    isUploadingImage,
    openEdit,
    closeEdit,
    handleFieldChange,
    handleImageSelect,
    saveEdit,
  };
}