// src/components/layout/RootLayout.tsx
import { Outlet } from 'react-router';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

export default function RootLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}