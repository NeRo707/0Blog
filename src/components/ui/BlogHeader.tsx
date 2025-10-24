import { Box, Typography } from "@mui/material";
import type { Blog } from "../../types/blog";

interface BlogHeaderProps {
  blog: Blog;
}

export default function BlogHeader({ blog }: BlogHeaderProps) {
  return (
    <>
      {/* Category Badge */}
      <Box
        sx={{
          display: "inline-block",
          bgcolor: "secondary.main",
          color: "white",
          px: 2,
          py: 0.5,
          borderRadius: 1,
          mb: 2,
          fontSize: { xs: '0.75rem', sm: '0.875rem' },
          fontWeight: "bold",
        }}
      >
        {blog.category}
      </Box>

      {/* Title */}
      <Typography
        variant="h3"
        sx={{ 
          fontWeight: "bold", 
          mb: 2, 
          lineHeight: 1.3,
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }
        }}
      >
        {blog.title}
      </Typography>

      {/* Meta Information */}
      <Box
        sx={{
          display: "flex",
          gap: { xs: 2, sm: 3 },
          mb: 4,
          color: "textSecondary",
          flexWrap: "wrap",
          fontSize: { xs: '0.75rem', sm: '0.875rem' }
        }}
      >
        <Box>
          <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
            Author
          </Typography>
          <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>{blog.author}</Typography>
        </Box>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
            Published
          </Typography>
          <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
            {new Date(blog.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
            Reading Time
          </Typography>
          <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>⏱️ {blog.readTime}</Typography>
        </Box>
      </Box>
    </>
  );
}
