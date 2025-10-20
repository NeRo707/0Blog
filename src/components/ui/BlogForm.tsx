import {
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  MenuItem,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const CATEGORIES = ['React', 'TypeScript', 'JavaScript', 'Design', 'Backend', 'CSS', 'Performance', 'AI/ML'];

interface BlogFormProps {
  formData: {
    title: string;
    excerpt: string;
    content?: string;
    category: string;
    readTime: string;
    image: string;
  };
  imagePreview: string | null;
  error: string | null;
  isUploading: boolean;
  isSubmitting: boolean;
  onFormChange: (field: string, value: string) => void;
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function BlogForm({
  formData,
  imagePreview,
  error,
  isUploading,
  isSubmitting,
  onFormChange,
  onImageSelect,
  onSubmit,
}: BlogFormProps) {
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <form onSubmit={onSubmit}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
        {/* Form Fields */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Blog Title"
            value={formData.title}
            onChange={(e) => onFormChange('title', e.target.value)}
            fullWidth
            required
            placeholder="Enter your blog title"
          />

          <TextField
            label="Excerpt"
            value={formData.excerpt}
            onChange={(e) => onFormChange('excerpt', e.target.value)}
            fullWidth
            required
            multiline
            rows={3}
            placeholder="Brief description of your blog"
          />

          <TextField
            select
            label="Category"
            value={formData.category}
            onChange={(e) => onFormChange('category', e.target.value)}
            fullWidth
            required
          >
            {CATEGORIES.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Read Time"
            value={formData.readTime}
            onChange={(e) => onFormChange('readTime', e.target.value)}
            fullWidth
            placeholder="e.g., 5 min read"
          />

          <TextField
            label="Blog Content"
            value={formData.content || ''}
            onChange={(e) => onFormChange('content', e.target.value)}
            fullWidth
            multiline
            rows={6}
            placeholder="Write the full content of your blog post here..."
          />

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
              Blog Image
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={onImageSelect}
              disabled={isUploading}
              style={{ display: 'block', marginBottom: '8px' }}
            />
            <Typography variant="caption" color="textSecondary">
              Max size: 5MB. Formats: JPG, PNG, WebP
            </Typography>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting || isUploading || !formData.title || !formData.excerpt}
            sx={{
              backgroundColor: '#667eea',
              '&:hover': { backgroundColor: '#5568d3' },
              height: '48px',
              fontSize: '1rem',
              fontWeight: 'bold',
            }}
          >
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Publish Blog'}
          </Button>
        </Box>

        {/* Image Preview */}
        <Box>
          {imagePreview ? (
            <Card
              sx={{
                cursor: 'pointer',
                '&:hover': { boxShadow: 3 },
                transition: 'all 0.3s ease',
              }}
              onClick={() => setPreviewOpen(true)}
            >
              <Box
                component="img"
                src={imagePreview}
                alt="Blog preview"
                sx={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                }}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  Click to view full image
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Card sx={{ height: '330px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>
                  📸
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Select an image to preview it here
                </Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>

      {/* Image Preview Modal */}
      {previewOpen && (
        <Box
          onClick={() => setPreviewOpen(false)}
          sx={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1300,
          }}
        >
          <Box
            component="img"
            src={imagePreview || ''}
            alt="Full preview"
            sx={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }}
          />
        </Box>
      )}
    </form>
  );
}
