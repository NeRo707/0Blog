// src/App.tsx
import { RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useMemo } from 'react';
import { AuthInitializer } from './components/auth/AuthInitializer';
import { useBlogStore } from './store/blogStore';
import { router } from './routes';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Create a client for TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 1,
    },
  },
});

function AppContent() {
  const themeMode = useBlogStore((state) => state.themeMode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          ...(themeMode === 'light'
            ? {
                // Light mode colors
                primary: {
                  main: '#1976d2', // Blue
                  light: '#42a5f5',
                  dark: '#1565c0',
                },
                secondary: {
                  main: '#9c27b0', // Purple
                  light: '#ba68c8',
                  dark: '#7b1fa2',
                },
                background: {
                  default: '#fafafa',
                  paper: '#ffffff',
                },
                text: {
                  primary: '#212121',
                  secondary: '#666666',
                },
              }
            : {
                // Dark mode colors
                primary: {
                  main: '#222222', // Lighter blue for dark mode
                  light: '#e3f2fd',
                  dark: '#202020',
                },
                secondary: {
                  main: '#7a3c85ff', // Lighter purple for dark mode
                  light: '#f3e5f5',
                  dark: '#ab47bc',
                },
                background: {
                  default: '#121212',
                  paper: '#1e1e1e',
                },
                text: {
                  primary: '#ffffff',
                  secondary: '#b0b0b0',
                },
              }),
        },
        typography: {
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
          ].join(','),
        },
        components: {
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                borderRadius: 8,
              },
            },
          },
        },
      }),
    [themeMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthInitializer>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthInitializer>
    </ThemeProvider>
  );
}

function App() {
  return <AppContent />;
}

export default App;