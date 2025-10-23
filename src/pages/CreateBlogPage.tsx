import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Container, Box, Typography, Alert } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { useBlogStore } from '../store/blogStore';
import { useCreateBlogMutation } from '../hooks/useCreateBlogMutation';
import BlogForm from '../components/ui/BlogForm';

export default function CreateBlogPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    createFormData: formData,
    success,
    setError,
    clearError,
    setSuccess,
    resetCreateForm,
  } = useBlogStore();
  const { mutate: createBlog, isPending: isCreating, error: createError } = useCreateBlogMutation();

  // Set error from mutation if it occurs
  useEffect(() => {
    if (createError instanceof Error) {
      setError(createError.message);
    }
  }, [createError, setError]);

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

    if (!formData.content.trim()) {
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
          resetCreateForm();

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
        isSubmitting={isCreating}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}
