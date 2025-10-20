import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Container, Box, Typography, Alert } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { useBlogStore } from '../store/blogStore';
import { useCreateBlogMutation } from '../hooks/useCreateBlogMutation';
import { useUploadImageMutation } from '../hooks/useUploadImageMutation';
import BlogForm from '../components/ui/BlogForm';

export default function CreateBlogPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { imagePreview, error: uiError, setImagePreview, setError, clearError } = useBlogStore();
  const { mutate: uploadImage, isPending: isUploading, error: uploadError } = useUploadImageMutation();
  const { mutate: createBlog, isPending: isCreating, error: createError } = useCreateBlogMutation();

  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'React',
    readTime: '5 min read',
    image: '',
  });

  const error =
    uiError ||
    (uploadError instanceof Error ? uploadError.message : null) ||
    (createError instanceof Error ? createError.message : null);

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    clearError();

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      const preview = event.target?.result as string;
      setImagePreview(preview);
    };
    reader.readAsDataURL(file);

    // Upload to server
    uploadImage(file, {
      onSuccess: (imageUrl) => {
        setFormData((prev) => ({
          ...prev,
          image: imageUrl,
        }));
      },
      onError: () => {
        setImagePreview('');
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSuccess(false);

    // Validate fields
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    if (!formData.excerpt.trim()) {
      setError('Excerpt is required');
      return;
    }

    if (!formData.content?.trim()) {
      setError('Blog content is required');
      return;
    }

    if (!formData.image) {
      setError('Please upload an image');
      return;
    }

    // Create blog
    createBlog(
      {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        readTime: formData.readTime,
        image: formData.image,
        author: user?.name || 'Anonymous',
        authorId: user?.id || '',
        date: new Date().toISOString().split('T')[0],
      },
      {
        onSuccess: () => {
          setSuccess(true);
          setFormData({
            title: '',
            excerpt: '',
            content: '',
            category: 'React',
            readTime: '5 min read',
            image: '',
          });
          setImagePreview('');

          // Redirect after 2 seconds
          setTimeout(() => {
            navigate('/blogs');
          }, 2000);
        },
      }
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Create New Blog Post
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Share your thoughts and ideas with the world
        </Typography>
      </Box>

      {/* Success Alert */}
      {success && (
        <Alert severity="success" sx={{ mb: 4 }}>
          Blog post published successfully! Redirecting...
        </Alert>
      )}

      {/* Form */}
      <BlogForm
        formData={formData}
        imagePreview={imagePreview}
        error={error}
        isUploading={isUploading}
        isSubmitting={isCreating}
        onFormChange={handleFormChange}
        onImageSelect={handleImageSelect}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}
