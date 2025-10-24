import { Box } from "@mui/material";
import { StatsCard } from "../../../components/ui";

const StatsCards = ({
  totalPosts,
  totalViews,
  totalLikes,
  avgReadTime,
}: {
  totalPosts: number;
  totalViews: number;
  totalLikes: number;
  avgReadTime: string;
}) => {
  return (
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
  );
};

export default StatsCards;
