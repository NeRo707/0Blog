// src/routes/index.tsx
import { createBrowserRouter } from "react-router";
import { Box } from "@mui/material";

// Pages
import HomePage from "../pages/HomePage";
import DashboardPage from "../pages/DashboardPage";
import BlogListPage from "../pages/BlogListPage";
import BlogDetailPage from "../pages/BlogDetailPage";
import CreateBlogPage from "../pages/CreateBlogPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import RootLayout from "../components/layout/RootLayout";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "blogs",
        element: <BlogListPage />,
      },
      {
        path: "blogs/:id",
        element: (
            <BlogDetailPage />
        ),
      },
      {
        path: "blogs/create",
        element: (
          <ProtectedRoute>
            <CreateBlogPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "sign-in",
        element: <SignInPage />,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          fontSize: "1.25rem",
        }}
      >
        404 - Page Not Found
      </Box>
    ),
  },
]);
