import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AppBar, Toolbar, Button, Box, Container, Menu, MenuItem } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user, signout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    await signout();
    handleMenuClose();
    navigate('/');
  };

  return (
    <AppBar position="sticky" sx={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <Box sx={{ 
              fontSize: '1.8rem', 
              fontWeight: 'bold', 
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              📚 BlogHub
            </Box>
          </Link>

          {/* Navigation Links */}
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button sx={{ color: 'white', '&:hover': { opacity: 0.8 } }}>
                Home
              </Button>
            </Link>

            <Link to="/blogs" style={{ textDecoration: 'none' }}>
              <Button sx={{ color: 'white', '&:hover': { opacity: 0.8 } }}>
                Blogs
              </Button>
            </Link>
            
            {isAuthenticated && (
              <>
                <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                  <Button sx={{ color: 'white', '&:hover': { opacity: 0.8 } }}>
                    Dashboard
                  </Button>
                </Link>
                <Link to="/blogs/create" style={{ textDecoration: 'none' }}>
                  <Button sx={{ color: 'white', '&:hover': { opacity: 0.8 } }}>
                    ✏️ New Post
                  </Button>
                </Link>
              </>
            )}

            {/* Auth Buttons */}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              {isAuthenticated ? (
                <>
                  <Button
                    onClick={handleMenuOpen}
                    sx={{
                      color: 'white',
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' },
                      textTransform: 'none',
                      fontSize: '1rem'
                    }}
                  >
                    {user?.name}
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem disabled>
                      {user?.email}
                    </MenuItem>
                    <MenuItem onClick={handleSignOut}>
                      Sign Out
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Link to="/sign-in" style={{ textDecoration: 'none' }}>
                    <Button variant="outlined" sx={{ 
                      color: 'white', 
                      borderColor: 'white',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                    }}>
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/sign-up" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" sx={{ 
                      backgroundColor: 'white', 
                      color: '#667eea',
                      fontWeight: 'bold',
                      '&:hover': { backgroundColor: '#f0f0f0' }
                    }}>
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
