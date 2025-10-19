import { useParams, useNavigate } from 'react-router';
import { Container, Box, Typography, Button, CircularProgress, Card, CardMedia, CardContent } from '@mui/material';
import { databases } from '../lib/appwrite';
import { useQuery } from '@tanstack/react-query';
import { APPWRITE_CONFIG } from '../config/constants';
import type { Blog } from '../types/blog';

const fetchBlog = async (blogId: string): Promise<Blog> => {
  const doc = await databases.getDocument(
    APPWRITE_CONFIG.databaseId,
    APPWRITE_CONFIG.blogsCollectionId,
    blogId
  );

  return {
    id: doc.$id,
    title: doc.title as string,
    excerpt: doc.excerpt as string,
    image: doc.image as string,
    author: doc.author as string,
    date: doc.date as string,
    category: doc.category as string,
    readTime: doc.readTime as string,
  };
};

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: blog, isPending, isError, error } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => fetchBlog(id!),
    enabled: !!id,
  });

  if (isPending) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          Loading blog post...
        </Typography>
      </Container>
    );
  }

  if (isError || !blog) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'error.main' }}>
            {error instanceof Error ? error.message : 'Blog post not found'}
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/blogs')}
            sx={{
              backgroundColor: '#667eea',
              '&:hover': { backgroundColor: '#5568d3' },
            }}
          >
            Back to Blogs
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Back Button */}
      <Button
        onClick={() => navigate('/blogs')}
        sx={{ mb: 4, textTransform: 'none', fontSize: '1rem' }}
      >
        ← Back to Blogs
      </Button>

      {/* Blog Card */}
      <Card sx={{ boxShadow: 3 }}>
        {/* Blog Image */}
        <CardMedia
          component="img"
          height="400"
          image={blog.image}
          alt={blog.title}
          sx={{ objectFit: 'cover' }}
        />

        {/* Blog Content */}
        <CardContent sx={{ p: 4 }}>
          {/* Category Badge */}
          <Box
            sx={{
              display: 'inline-block',
              backgroundColor: '#667eea',
              color: 'white',
              px: 2,
              py: 0.5,
              borderRadius: 1,
              mb: 2,
              fontSize: '0.875rem',
              fontWeight: 'bold',
            }}
          >
            {blog.category}
          </Box>

          {/* Title */}
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2, lineHeight: 1.3 }}>
            {blog.title}
          </Typography>

          {/* Meta Information */}
          <Box sx={{ display: 'flex', gap: 3, mb: 4, color: 'textSecondary', flexWrap: 'wrap' }}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Author
              </Typography>
              <Typography variant="body2">{blog.author}</Typography>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Published
              </Typography>
              <Typography variant="body2">
                {new Date(blog.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Reading Time
              </Typography>
              <Typography variant="body2">⏱️ {blog.readTime}</Typography>
            </Box>
          </Box>

          {/* Excerpt */}
          <Typography variant="h6" sx={{ mb: 4, color: 'textSecondary', lineHeight: 1.6 }}>
            {blog.excerpt}
          </Typography>

          {/* Divider */}
          <Box sx={{ borderTop: '2px solid #eee', my: 4 }} />

          {/* Content Placeholder */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'textSecondary', mb: 2 }}>
              This is a blog post preview. The full content would be displayed here in a real blog application.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'textSecondary', mb: 2 }}>
              Category: <strong>{blog.category}</strong>
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'textSecondary' }}>
              Read time: <strong>{blog.readTime}</strong>
            </Typography>
          </Box>

          {/* Back Button */}
          <Button
            variant="contained"
            onClick={() => navigate('/blogs')}
            sx={{
              backgroundColor: '#667eea',
              '&:hover': { backgroundColor: '#5568d3' },
              mt: 4,
            }}
          >
            ← Back to All Blogs
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
