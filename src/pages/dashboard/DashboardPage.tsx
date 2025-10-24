import { Container, Typography, Box } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { useUserBlogs } from "../../hooks/useUserBlogs";
import UserBlogsTable from "./_components/UserBlogsTable";
import Metrics from "./_components/Metrics";
import StatsCards from "./_components/StatsCards";

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: userBlogs = [], isPending, isError } = useUserBlogs(user?.id);

  // Calculate fake stats from user's blogs
  const totalPosts = userBlogs.length;
  const totalViews = Math.floor(Math.random() * 10000) + userBlogs.length * 100; // Mock calculation
  const totalLikes = Math.floor(Math.random() * 1000) + userBlogs.length * 10;
  const avgReadTime =
    userBlogs.length > 0
      ? (
          userBlogs.reduce((sum, blog) => {
            const minutes = parseInt(blog.readTime) || 5;
            return sum + minutes;
          }, 0) / userBlogs.length
        ).toFixed(1)
      : "5.0";

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          Welcome back, {user?.name}! 👋
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Here's your blogging dashboard overview
        </Typography>
      </Box>

      {/* Stats Cards */}
      <StatsCards
        totalPosts={totalPosts}
        totalViews={totalViews}
        totalLikes={totalLikes}
        avgReadTime={avgReadTime}
      />

      {/* Metrics */}
      <Metrics userBlogs={userBlogs} avgReadTime={avgReadTime} />

      {/* User's Blog Posts */}
      <UserBlogsTable blogs={userBlogs} isLoading={isPending} />

      {isError && (
        <Box sx={{ mt: 2, p: 2, bgcolor: "error.light", borderRadius: 1 }}>
          <Typography color="error">
            Failed to load your blogs. Please try again.
          </Typography>
        </Box>
      )}
    </Container>
  );
}
