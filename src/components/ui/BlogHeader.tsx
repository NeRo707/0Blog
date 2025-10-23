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
          bgcolor: "primary.main",
          color: "white",
          px: 2,
          py: 0.5,
          borderRadius: 1,
          mb: 2,
          fontSize: "0.875rem",
          fontWeight: "bold",
        }}
      >
        {blog.category}
      </Box>

      {/* Title */}
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", mb: 2, lineHeight: 1.3 }}
      >
        {blog.title}
      </Typography>

      {/* Meta Information */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          mb: 4,
          color: "textSecondary",
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Author
          </Typography>
          <Typography variant="body2">{blog.author}</Typography>
        </Box>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Published
          </Typography>
          <Typography variant="body2">
            {new Date(blog.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Reading Time
          </Typography>
          <Typography variant="body2">⏱️ {blog.readTime}</Typography>
        </Box>
      </Box>
    </>
  );
}
