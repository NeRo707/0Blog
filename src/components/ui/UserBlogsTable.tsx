import {
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useUpdateBlogMutation } from '../../hooks/useUpdateBlogMutation';
import { useDeleteBlogMutation } from '../../hooks/useDeleteBlogMutation';
import { useUploadImageMutation } from '../../hooks/useUploadImageMutation';
import type { Blog } from '../../types/blog';

const CATEGORIES = ['React', 'TypeScript', 'JavaScript', 'Design', 'Backend', 'CSS', 'Performance', 'AI/ML'];

interface UserBlogsTableProps {
  blogs: Blog[];
  isLoading?: boolean;
}

export default function UserBlogsTable({ blogs, isLoading = false }: UserBlogsTableProps) {
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Blog>>({});
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const { mutate: updateBlog, isPending: isUpdating, error: updateError } = useUpdateBlogMutation();
  const { mutate: deleteBlog, isPending: isDeleting, error: deleteError } = useDeleteBlogMutation();
  const { mutate: uploadImage, isPending: isUploadingImage } = useUploadImageMutation();

  const handleEditClick = (blog: Blog) => {
    setEditingId(blog.id);
    setEditFormData(blog);
    setEditImagePreview(blog.image);
  };

  const handleEditChange = (field: keyof Blog, value: string) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      const preview = event.target?.result as string;
      setEditImagePreview(preview);
    };
    reader.readAsDataURL(file);

    // Upload to server
    uploadImage(file, {
      onSuccess: (imageUrl) => {
        setEditFormData((prev) => ({
          ...prev,
          image: imageUrl,
        }));
      },
    });
  };

  const handleSaveEdit = () => {
    if (!editingId) return;
    
    // Create updates object without id field
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
    } as Partial<Omit<Blog, 'id'>>;
    
    updateBlog(
      { blogId: editingId, updates },
      {
        onSuccess: () => {
          setEditingId(null);
          setEditFormData({});
        },
      }
    );
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    deleteBlog(deleteConfirmId, {
      onSuccess: () => {
        setDeleteConfirmId(null);
      },
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <CircularProgress />
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            Loading your blogs...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (blogs.length === 0) {
    return (
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
            No blogs yet
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Start creating your first blog post!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/blogs/create')}
          >
            + Create Blog
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Your Posts ({blogs.length})
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/blogs/create')}
            >
              + New Post
            </Button>
          </Box>

          {(updateError || deleteError) && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {updateError instanceof Error ? updateError.message : deleteError instanceof Error ? deleteError.message : 'An error occurred'}
            </Alert>
          )}

          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ bgcolor: 'action.hover' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', width: '120px' }}>Image</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blogs.map((blog) => (
                  <TableRow key={blog.id} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                    <TableCell>
                      {blog.image ? (
                        <Box
                          component="img"
                          src={blog.image}
                          alt={blog.title}
                          sx={{
                            width: '100px',
                            height: '70px',
                            objectFit: 'cover',
                            borderRadius: 1,
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: '100px',
                            height: '70px',
                            bgcolor: 'action.disabledBackground',
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'text.disabled',
                            fontSize: '12px',
                          }}
                        >
                          No image
                        </Box>
                      )}
                    </TableCell>
                    <TableCell>{blog.title}</TableCell>
                    <TableCell>{blog.category}</TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        color="info"
                        onClick={() => handleEditClick(blog)}
                        sx={{ mr: 1 }}
                        disabled={isUpdating || isDeleting}
                        variant='contained'
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        onClick={() => setDeleteConfirmId(blog.id)}
                        color='error'
                        disabled={isUpdating || isDeleting}
                        variant='outlined'
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingId} onClose={() => setEditingId(null)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Blog Post</DialogTitle>
        <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Title"
            value={editFormData.title || ''}
            onChange={(e) => handleEditChange('title', e.target.value)}
            fullWidth
          />
          <TextField
            label="Excerpt"
            value={editFormData.excerpt || ''}
            onChange={(e) => handleEditChange('excerpt', e.target.value)}
            fullWidth
            multiline
            rows={3}
          />
          <TextField
            label="Content"
            value={editFormData.content || ''}
            onChange={(e) => handleEditChange('content', e.target.value)}
            fullWidth
            multiline
            rows={6}
            placeholder="Full blog post content"
          />
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Blog Image
            </Typography>
            {editImagePreview && (
              <Box
                component="img"
                src={editImagePreview}
                alt="Preview"
                sx={{
                  width: '100%',
                  maxHeight: 250,
                  objectFit: 'cover',
                  borderRadius: 1,
                  mb: 1,
                  bgcolor: 'action.hover',
                }}
              />
            )}
            <Button
              component="label"
              variant="outlined"
              fullWidth
              sx={{ textTransform: 'none', mb: 1 }}
              disabled={isUploadingImage}
            >
              {isUploadingImage ? 'Uploading...' : 'Choose Image'}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleEditImageSelect}
              />
            </Button>
            {!editImagePreview && (
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                No image selected
              </Typography>
            )}
          </Box>
          <TextField
            select
            label="Category"
            value={editFormData.category || ''}
            onChange={(e) => handleEditChange('category', e.target.value)}
            fullWidth
          >
            {CATEGORIES.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Read Time"
            value={editFormData.readTime || ''}
            onChange={(e) => handleEditChange('readTime', e.target.value)}
            fullWidth
            placeholder="e.g., 5 min read"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingId(null)}>Cancel</Button>
          <Button
            onClick={handleSaveEdit}
            variant="contained"
            color="primary"
            disabled={isUpdating}
          >
            {isUpdating ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirmId} onClose={() => setDeleteConfirmId(null)}>
        <DialogTitle>Delete Blog Post?</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this blog post? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmId(null)}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
