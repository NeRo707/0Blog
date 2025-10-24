import { Container, Box, Typography, CircularProgress } from '@mui/material';
import { useState, useMemo } from 'react';
import BlogCard from '../components/layout/BlogCard';
import { useBlogs } from '../hooks/useBlogs';
import BlogListHeader from '../components/ui/BlogListHeader';

export default function BlogListPage() {
  const { data: blogs = [], isPending, isError, error } = useBlogs();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs = useMemo(() => {
    if (!blogs) return [];

    return blogs.filter((blog) => {
      const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [blogs, selectedCategory, searchQuery]);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4, md: 6 }, px: { xs: 2, sm: 3 } }}>
      {/* Header with Search & Filter */}
      <BlogListHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

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
          <Typography 
            variant="body2" 
            color="textSecondary" 
            sx={{ 
              mb: { xs: 2, sm: 3 },
              fontSize: { xs: '0.8rem', sm: '0.875rem' }
            }}
          >
            Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'}
          </Typography>

          {/* Blog Grid */}
          {filteredBlogs.length > 0 ? (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                gap: { xs: 2, sm: 2.5, md: 3 },
              }}
            >
              {filteredBlogs.map((blog) => (
                <BlogCard {...blog} key={blog.id} />
              ))}
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: { xs: 6, sm: 8 }, px: 2 }}>
              <Typography 
                variant="h6" 
                color="textSecondary"
                sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
              >
                No blogs found matching your criteria
              </Typography>
              <Typography 
                variant="body2" 
                color="textSecondary" 
                sx={{ 
                  mt: 1,
                  fontSize: { xs: '0.8rem', sm: '0.875rem' }
                }}
              >
                Try adjusting your search or category filter
              </Typography>
            </Box>
          )}
        </>
      )}
    </Container>
  );
}
