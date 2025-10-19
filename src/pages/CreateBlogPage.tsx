import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Container, Box, TextField, Button, Typography, Card, Alert, CircularProgress } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { useBlogStore } from '../store/blogStore';
import { useCreateBlogMutation } from '../hooks/useCreateBlogMutation';
import { useUploadImageMutation } from '../hooks/useUploadImageMutation';

const CATEGORIES = ['React', 'TypeScript', 'JavaScript', 'Design', 'Backend', 'CSS', 'Performance', 'AI/ML'];

export default function CreateBlogPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useAuth();
  const { imagePreview, error: uiError, setImagePreview, setError, clearError } = useBlogStore();
  const { mutate: uploadImage, isPending: isUploading, error: uploadError } = useUploadImageMutation();
  const { mutate: createBlog, isPending: isCreating, error: createError } = useCreateBlogMutation();
  
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: 'React',
    readTime: '5 min read',
    image: '',
  });

  const error = uiError || (uploadError instanceof Error ? uploadError.message : null) || (createError instanceof Error ? createError.message : null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
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
        setFormData(prev => ({
          ...prev,
          image: imageUrl,
        }));
      },
      onError: () => {
        setImagePreview('');
      },
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      category: e.target.value,
    }));
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
    if (!formData.image.trim()) {
      setError('Please upload an image');
      return;
    }

    // Create blog using React Query mutation
    createBlog(
      {
        title: formData.title,
        excerpt: formData.excerpt,
        image: formData.image,
        category: formData.category,
        readTime: formData.readTime,
        author: user?.name || 'Anonymous',
        date: new Date().toISOString().split('T')[0],
      },
      {
        onSuccess: () => {
          setSuccess(true);
          setFormData({
            title: '',
            excerpt: '',
            category: 'React',
            readTime: '5 min read',
            image: '',
          });
          setImagePreview('');

          // Redirect to blogs page after 2 seconds
          setTimeout(() => {
            navigate('/blogs');
          }, 2000);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!isAuthenticated) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Authentication Required
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
            Please sign in to create blog posts
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/sign-in')}
            sx={{
              backgroundColor: '#667eea',
              '&:hover': { backgroundColor: '#5568d3' },
            }}
          >
            Sign In
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Card sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
          Create New Blog Post
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Blog post created successfully! Redirecting to blogs...
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Blog Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            fullWidth
            placeholder="Enter blog post title"
            disabled={isCreating}
          />

          <TextField
            label="Excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            required
            fullWidth
            multiline
            rows={3}
            placeholder="Enter blog post excerpt (short description)"
            disabled={isCreating}
          />

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
              Blog Image *
            </Typography>
            <Box
              sx={{
                border: '2px dashed',
                borderColor: '#667eea',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                backgroundColor: 'rgba(102, 126, 234, 0.05)',
                cursor: isCreating || isUploading ? 'not-allowed' : 'pointer',
                opacity: isCreating || isUploading ? 0.6 : 1,
              }}
              component="label"
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                disabled={isCreating || isUploading}
                style={{ display: 'none' }}
              />
              {isUploading ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={40} />
                  <Typography variant="body2" color="textSecondary">
                    Uploading image...
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                    Click to upload or drag and drop
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    PNG, JPG, GIF up to 5MB
                  </Typography>
                </Box>
              )}
            </Box>

            {imagePreview && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                  Preview
                </Typography>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: 300,
                    borderRadius: 8,
                    border: '1px solid #e0e0e0',
                  }}
                />
              </Box>
            )}
          </Box>

          <TextField
            select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleSelectChange}
            fullWidth
            disabled={isCreating}
            SelectProps={{
              native: true,
            }}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </TextField>

          <TextField
            label="Read Time"
            name="readTime"
            value={formData.readTime}
            onChange={handleChange}
            fullWidth
            placeholder="e.g., 5 min read"
            disabled={isCreating}
          />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isCreating}
              sx={{
                backgroundColor: '#667eea',
                '&:hover': { backgroundColor: '#5568d3' },
                minWidth: 200,
              }}
            >
              {isCreating ? <CircularProgress size={24} /> : 'Create Blog Post'}
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={() => navigate('/blogs')}
              disabled={isCreating}
              sx={{ minWidth: 200 }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Card>
    </Container>
  );
}
