import { Box, Typography } from "@mui/material";
import type { Blog } from "../../types/blog";

interface BlogContentProps {
  blog: Blog;
}

export default function BlogContent({ blog }: BlogContentProps) {
  return (
    <Box sx={{ mb: 4 }}>
      {/* Excerpt */}
      <Typography
        variant="h6"
        sx={{ mb: 4, color: "textSecondary", lineHeight: 1.6 }}
      >
        {blog.excerpt}
      </Typography>

      {/* Divider */}
      <Box sx={{ borderTop: "2px solid #eee", my: 4 }} />

      {/* Blog Content */}
      {blog.content ? (
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, mb: 4, whiteSpace: "pre-wrap" }}
        >
          {blog.content}
        </Typography>
      ) : (
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ mb: 4, fontStyle: "italic" }}
        >
          No content available for this blog post.
        </Typography>
      )}

      {/* Additional Info */}
      <Box
        sx={{
          bgcolor: "action.hover",
          p: 2,
          borderRadius: 1,
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography variant="caption" sx={{ fontWeight: "bold" }}>
            CATEGORY
          </Typography>
          <Typography variant="body2">{blog.category}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" sx={{ fontWeight: "bold" }}>
            READ TIME
          </Typography>
          <Typography variant="body2">⏱️ {blog.readTime}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
