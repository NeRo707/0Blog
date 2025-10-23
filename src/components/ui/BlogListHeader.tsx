import { Box, Typography, TextField, MenuItem } from "@mui/material";

interface BlogListHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}

const CATEGORIES = [
  "All",
  "React",
  "TypeScript",
  "JavaScript",
  "Design",
  "Backend",
  "CSS",
  "Performance",
  "AI/ML",
];

export default function BlogListHeader({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: BlogListHeaderProps) {
  return (
    <>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          Discover Amazing Blogs
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
          Explore articles about web development, design, and technology trends
        </Typography>
      </Box>

      {/* Search and Filter */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "flex-end",
        }}
      >
        <TextField
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{
            flex: 1,
            minWidth: 250,
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "secondary.main",
              },
              "&.Mui-focused fieldset": {
                borderColor: "secondary.main",
              },
            },
          }}
        />
        <TextField
          select
          label="Category"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          sx={{
            minWidth: 200,
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "secondary.main",
              },
              "&.Mui-focused fieldset": {
                borderColor: "secondary.main",
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "secondary.main",
            },
          }}
        >
          {CATEGORIES.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </>
  );
}
