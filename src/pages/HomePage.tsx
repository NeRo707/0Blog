// src/pages/HomePage.tsx
import { Link as RouterLink } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { Container, Box, Typography, Button, Card, CardContent } from '@mui/material';
import BlogCard from '../components/layout/BlogCard';

const FEATURED_BLOGS = [
  {
    id: '1',
    title: 'Getting Started with React 19: A Complete Guide',
    excerpt: 'Learn the latest features and best practices for building modern web applications with React 19.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
    author: 'Sarah Chen',
    date: '2025-03-15',
    category: 'React',
    readTime: '8 min read'
  },
  {
    id: '2',
    title: 'TypeScript Best Practices for 2025',
    excerpt: 'Master TypeScript with these proven patterns and practices used by leading companies.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    author: 'John Davis',
    date: '2025-03-14',
    category: 'TypeScript',
    readTime: '12 min read'
  },
  {
    id: '3',
    title: 'Web Design Trends Shaping 2025',
    excerpt: 'Discover the cutting-edge design trends that are transforming how we build user interfaces.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
    author: 'Emma Wilson',
    date: '2025-03-13',
    category: 'Design',
    readTime: '6 min read'
  },
];

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* Hero Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        py: { xs: 10, md: 14 },
        mb: 8
      }}>
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
            gap: 4,
            alignItems: 'center'
          }}>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, lineHeight: 1.2 }}>
                Welcome to BlogHub
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.95, fontWeight: 300 }}>
                Discover amazing articles about web development, design, and technology trends. Share your knowledge with the world.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button 
                  component={RouterLink}
                  to="/blogs"
                  variant="contained" 
                  size="large"
                  sx={{ 
                    backgroundColor: 'white', 
                    color: '#667eea',
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: '#f0f0f0' }
                  }}
                >
                  Read Articles
                </Button>
                {!isAuthenticated && (
                  <Button 
                    component={RouterLink}
                    to="/sign-up"
                    variant="outlined" 
                    size="large"
                    sx={{ 
                      borderColor: 'white', 
                      color: 'white',
                      fontWeight: 'bold',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                    }}
                  >
                    Get Started
                  </Button>
                )}
                {isAuthenticated && (
                  <Button 
                    component={RouterLink}
                    to="/dashboard"
                    variant="outlined" 
                    size="large"
                    sx={{ 
                      borderColor: 'white', 
                      color: 'white',
                      fontWeight: 'bold',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                    }}
                  >
                    Dashboard
                  </Button>
                )}
              </Box>
            </Box>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop"
              alt="Hero"
              sx={{ width: '100%', borderRadius: 2, display: { xs: 'none', md: 'block' } }}
            />
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Why Choose BlogHub?
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
            Your one-stop platform for all things web development
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, 
          gap: 3 
        }}>
          <Card sx={{ 
            height: '100%',
            transition: 'all 0.3s ease',
            '&:hover': { 
              transform: 'translateY(-8px)',
              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)'
            }
          }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h3" sx={{ mb: 2 }}>📚</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Rich Content</Typography>
              <Typography variant="body2" color="textSecondary">
                Quality articles about web development, design, and technology
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ 
            height: '100%',
            transition: 'all 0.3s ease',
            '&:hover': { 
              transform: 'translateY(-8px)',
              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)'
            }
          }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h3" sx={{ mb: 2 }}>🚀</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Easy to Share</Typography>
              <Typography variant="body2" color="textSecondary">
                Share your thoughts and knowledge with a growing community
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ 
            height: '100%',
            transition: 'all 0.3s ease',
            '&:hover': { 
              transform: 'translateY(-8px)',
              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)'
            }
          }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h3" sx={{ mb: 2 }}>💡</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Learn & Grow</Typography>
              <Typography variant="body2" color="textSecondary">
                Expand your knowledge with insights from industry experts
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>

      {/* Featured Articles */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Featured Articles
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Check out our latest and greatest content
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, 
          gap: 3, 
          mb: 4 
        }}>
          {FEATURED_BLOGS.map((blog) => (
            <BlogCard {...blog} key={blog.id} />
          ))}
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Button 
            component={RouterLink}
            to="/blogs"
            variant="contained"
            size="large"
            sx={{ 
              backgroundColor: '#667eea',
              '&:hover': { backgroundColor: '#5568d3' }
            }}
          >
            View All Articles
          </Button>
        </Box>
      </Container>

      {/* CTA Section */}
      {!isAuthenticated && (
        <Box sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 10,
          textAlign: 'center',
          mb: 4
        }}>
          <Container maxWidth="md">
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              Ready to Start Writing?
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, opacity: 0.95 }}>
              Join thousands of writers and share your insights with the community
            </Typography>
            <Button 
              component={RouterLink}
              to="/sign-up"
              variant="contained"
              size="large"
              sx={{ 
                backgroundColor: 'white', 
                color: '#667eea',
                fontWeight: 'bold',
                '&:hover': { backgroundColor: '#f0f0f0' }
              }}
            >
              Create Account
            </Button>
          </Container>
        </Box>
      )}
    </>
  );
}