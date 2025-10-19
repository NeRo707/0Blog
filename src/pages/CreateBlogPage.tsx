import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Container, Box, TextField, Button, Typography, Card, Alert, CircularProgress } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { databases } from '../lib/appwrite';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const BLOGS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_BLOGS_COLLECTION_ID;

const CATEGORIES = ['React', 'TypeScript', 'JavaScript', 'Design', 'Backend', 'CSS', 'Performance', 'AI/ML'];

export default function CreateBlogPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: 'React',
    readTime: '5 min read',
    image: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      category: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsSubmitting(true);

    try {
      // Validate fields
      if (!formData.title.trim()) {
        throw new Error('Title is required');
      }
      if (!formData.excerpt.trim()) {
        throw new Error('Excerpt is required');
      }
      if (!formData.image.trim()) {
        throw new Error('Image URL is required');
      }

      // Create blog document
      await databases.createDocument(
        DATABASE_ID,
        BLOGS_COLLECTION_ID,
        'unique()',
        {
          title: formData.title,
          excerpt: formData.excerpt,
          image: formData.image,
          category: formData.category,
          readTime: formData.readTime,
          author: user?.name || 'Anonymous',
          date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
        }
      );

      setSuccess(true);
      setFormData({
        title: '',
        excerpt: '',
        category: 'React',
        readTime: '5 min read',
        image: '',
      });

      // Redirect to blogs page after 2 seconds
      setTimeout(() => {
        navigate('/blogs');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create blog post');
    } finally {
      setIsSubmitting(false);
    }
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
          />

          <TextField
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            fullWidth
            placeholder="https://example.com/image.jpg"
            disabled={isSubmitting}
            helperText="Recommended size: 500x300px"
          />

          <TextField
            select
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleSelectChange}
            fullWidth
            disabled={isSubmitting}
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
            disabled={isSubmitting}
          />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{
                backgroundColor: '#667eea',
                '&:hover': { backgroundColor: '#5568d3' },
                minWidth: 200,
              }}
            >
              {isSubmitting ? <CircularProgress size={24} /> : 'Create Blog Post'}
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={() => navigate('/blogs')}
              disabled={isSubmitting}
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
