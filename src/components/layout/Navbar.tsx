import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AppBar, Toolbar, Button, Box, Container, Menu, MenuItem, IconButton } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { useBlogStore } from '../../store/blogStore';

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user, signout } = useAuth();
  const { themeMode, toggleTheme } = useBlogStore();
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
      bgcolor: 'primary.main',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: '100%',
      overflowX: 'hidden'
    }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Toolbar 
          disableGutters 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            minHeight: { xs: '56px', sm: '64px' },
            gap: { xs: 1, sm: 2 },
            flexWrap: 'nowrap'
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Box sx={{ 
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' }, 
              fontWeight: 'bold', 
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 0.5, sm: 1 },
              whiteSpace: 'nowrap'
            }}>
              📚 BlogHub
            </Box>
          </Link>

          {/* Navigation Links */}
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 0.5, sm: 1, md: 2 }, 
            alignItems: 'center',
            flexShrink: 1,
            minWidth: 0
          }}>
            <Link to="/blogs" style={{ textDecoration: 'none' }}>
              <Button 
                sx={{ 
                  color: 'white', 
                  '&:hover': { opacity: 0.8 },
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  px: { xs: 1, sm: 2 },
                  minWidth: 'auto'
                }}
              >
                Blogs
              </Button>
            </Link>
            
            {isAuthenticated && (
              <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <Button 
                  sx={{ 
                    color: 'white', 
                    '&:hover': { opacity: 0.8 },
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    px: { xs: 1, sm: 2 },
                    minWidth: 'auto',
                    display: { xs: 'none', sm: 'inline-flex' }
                  }}
                >
                  Dashboard
                </Button>
              </Link>
            )}

            {/* Auth Buttons */}
            <Box sx={{ 
              display: 'flex', 
              gap: { xs: 0.5, sm: 1 }, 
              alignItems: 'center',
              flexShrink: 0
            }}>
              {/* Theme Toggle Button */}
              <IconButton
                onClick={toggleTheme}
                size="small"
                sx={{ 
                  color: 'white',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                  padding: { xs: '6px', sm: '8px' }
                }}
                title={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}
              >
                {themeMode === 'light' ? '🌙' : '☀️'}
              </IconButton>
              
              {isAuthenticated ? (
                <>
                  <Button
                    onClick={handleMenuOpen}
                    sx={{
                      color: 'white',
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' },
                      textTransform: 'none',
                      fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                      px: { xs: 1, sm: 2 },
                      minWidth: 'auto',
                      maxWidth: { xs: '100px', sm: '150px' },
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
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
                    <Button 
                      variant="outlined" 
                      sx={{ 
                        color: 'white', 
                        borderColor: 'white',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                        fontSize: { xs: '0.7rem', sm: '0.875rem' },
                        px: { xs: 1, sm: 2 },
                        minWidth: 'auto'
                      }}
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/sign-up" style={{ textDecoration: 'none' }}>
                    <Button 
                      variant="contained" 
                      sx={{ 
                        backgroundColor: 'white', 
                        color: 'primary.main',
                        fontWeight: 'bold',
                        '&:hover': { backgroundColor: '#f0f0f0' },
                        fontSize: { xs: '0.7rem', sm: '0.875rem' },
                        px: { xs: 1, sm: 2 },
                        minWidth: 'auto'
                      }}
                    >
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
