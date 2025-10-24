import { Box } from "@mui/material";
import { MetricsChart } from "../../../components/ui";
import type { Blog } from "../../../types/blog";

const Metrics = ({
  userBlogs,
  avgReadTime,
}: {
  userBlogs: Blog[];
  avgReadTime: string | number;
}) => {
  return (
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
  );
};

export default Metrics;
