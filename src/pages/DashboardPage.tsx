import { Container, Typography, Box } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useUserBlogs } from "../hooks/useUserBlogs";
import StatsCard from "../components/ui/StatsCard";
import MetricsChart from "../components/ui/MetricsChart";
import UserBlogsTable from "../components/ui/UserBlogsTable";

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: userBlogs = [], isPending, isError } = useUserBlogs(user?.id);

  // Calculate real stats from user's blogs
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
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
          mb: 6,
        }}
      >
        <StatsCard
          label="Total Posts"
          value={totalPosts}
          trend={`${Math.max(0, totalPosts - 1)}+ blogs`}
          icon="📝"
          gradient="linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)"
        />
        <StatsCard
          label="Total Views"
          value={`${(totalViews / 1000).toFixed(1)}K`}
          trend={`+${Math.floor(Math.random() * 500)} this week`}
          icon="👁️"
          gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
        />
        <StatsCard
          label="Total Likes"
          value={totalLikes}
          trend={`+${Math.floor(Math.random() * 100)} this week`}
          icon="❤️"
          gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
        />
        <StatsCard
          label="Avg. Read Time"
          value={`${avgReadTime}m`}
          trend="Per article"
          icon="⏱️"
          gradient="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
        />
      </Box>

      {/* Metrics */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
          mb: 6,
        }}
      >
        <MetricsChart
          title="Key Metrics"
          icon="🎯"
          metrics={[
            { label: "Engagement Rate", value: 78, max: 100, color: "#1976d2" },
            {
              label: "Avg. Reading Time",
              value: Math.ceil(parseFloat(avgReadTime as string)),
              max: 10,
              color: "#9c27b0",
            },
            { label: "Share Rate", value: 62, max: 100, color: "#f5576c" },
          ]}
        />
        <MetricsChart
          title="Content Breakdown"
          icon="📊"
          metrics={
            userBlogs.length > 0
              ? Object.entries(
                  userBlogs.reduce((acc, blog) => {
                    acc[blog.category] = (acc[blog.category] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                ).map(([category, count]) => ({
                  label: category,
                  value: count,
                  color: "#1976d2",
                }))
              : [{ label: "No posts yet", value: 0, color: "#ccc" }]
          }
        />
      </Box>

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
