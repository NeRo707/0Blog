import { Container, Typography, Box, TextField, MenuItem, Button, CircularProgress } from '@mui/material';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import BlogCard from '../components/layout/BlogCard';
import { useBlogs } from '../hooks/useBlogs';
import { useAuth } from '../hooks/useAuth';

const CATEGORIES = ['All', 'React', 'TypeScript', 'JavaScript', 'Design', 'Backend', 'CSS', 'Performance', 'AI/ML'];

export default function BlogListPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { data: blogs = [], isPending, isError, error } = useBlogs();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs = useMemo(() => {
    if (!blogs) return [];
    
    return blogs.filter(blog => {
      const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
      const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [blogs, selectedCategory, searchQuery]);

  // Show authentication required message
  if (authLoading) {
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
            Please sign in to view blogs
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
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Discover Amazing Blogs
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
          Explore articles about web development, design, and technology trends
        </Typography>
      </Box>

      {/* Search and Filter */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'flex-end' }}>
        <TextField
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flex: 1, minWidth: 250 }}
          InputProps={{
            startAdornment: <span style={{ marginRight: 8 }}>🔍</span>,
          }}
        />
        <TextField
          select
          label="Category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          {CATEGORIES.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </TextField>
        <Button variant="contained" sx={{ 
          backgroundColor: '#667eea', 
          '&:hover': { backgroundColor: '#5568d3' },
          height: 56
        }}>
          Filter
        </Button>
      </Box>

      {/* Loading State */}
      {isPending && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <CircularProgress />
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            Loading blogs...
          </Typography>
        </Box>
      )}

      {/* Error State */}
      {isError && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="error" sx={{ mb: 1 }}>
            Error loading blogs
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {error instanceof Error ? error.message : 'An error occurred while fetching blogs'}
          </Typography>
        </Box>
      )}

      {/* Results info */}
      {!isPending && !isError && (
        <>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'}
          </Typography>

          {/* Blog Grid */}
          {filteredBlogs.length > 0 ? (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
              {filteredBlogs.map((blog) => (
                <BlogCard {...blog} key={blog.id} />
              ))}
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="textSecondary">
                No blogs found matching your criteria
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Try adjusting your search or category filter
              </Typography>
            </Box>
          )}
        </>
      )}
    </Container>
  );
}
