import { Box, Container, Typography, Link, Stack, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={{ 
      backgroundColor: '#1a1a2e', 
      color: 'white', 
      marginTop: 'auto',
      paddingTop: 6,
      paddingBottom: 3
    }}>
      <Container maxWidth="lg">
        <Stack spacing={4} sx={{ marginBottom: 4 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 4 }}>
            {/* Brand Section */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                📚 BlogHub
              </Typography>
              <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                Your platform for discovering and sharing amazing blog posts.
              </Typography>
            </Box>

            {/* Quick Links */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Quick Links
              </Typography>
              <Stack gap={1}>
                <Link component={RouterLink} to="/" sx={{ color: '#b0b0b0', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                  Home
                </Link>
                <Link component={RouterLink} to="/dashboard" sx={{ color: '#b0b0b0', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                  Dashboard
                </Link>
              </Stack>
            </Box>

            {/* Resources */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Resources
              </Typography>
              <Stack gap={1}>
                <Link href="#" sx={{ color: '#b0b0b0', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                  About
                </Link>
                <Link href="#" sx={{ color: '#b0b0b0', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                  Contact
                </Link>
              </Stack>
            </Box>

            {/* Social */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Link href="#" sx={{ fontSize: '1.5rem', '&:hover': { transform: 'scale(1.1)' } }}>
                  𝕏
                </Link>
                <Link href="#" sx={{ fontSize: '1.5rem', '&:hover': { transform: 'scale(1.1)' } }}>
                  📘
                </Link>
                <Link href="#" sx={{ fontSize: '1.5rem', '&:hover': { transform: 'scale(1.1)' } }}>
                  💼
                </Link>
              </Box>
            </Box>
          </Box>
        </Stack>

        <Divider sx={{ backgroundColor: '#444', margin: '2rem 0' }} />

        {/* Bottom Copyright */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#888' }}>
            © {currentYear} BlogHub. All rights reserved. | 
            <Link href="#" sx={{ color: '#667eea', textDecoration: 'none', marginLeft: 1, '&:hover': { textDecoration: 'underline' } }}>
              Privacy Policy
            </Link>
            {' '}| 
            <Link href="#" sx={{ color: '#667eea', textDecoration: 'none', marginLeft: 1, '&:hover': { textDecoration: 'underline' } }}>
              Terms of Service
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
