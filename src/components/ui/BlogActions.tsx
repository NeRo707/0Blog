import { Box, Button } from "@mui/material";

interface BlogActionsProps {
  isOwner: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export default function BlogActions({
  isOwner,
  onEdit,
  onDelete,
}: BlogActionsProps) {
  if (!isOwner) return null;

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
      <Button
        variant="contained"
        onClick={onEdit}
        sx={{
          backgroundColor: "#667eea",
          "&:hover": { backgroundColor: "#5568d3" },
        }}
      >
        ✏️ Edit Post
      </Button>
      <Button
        variant="outlined"
        onClick={onDelete}
        sx={{
          color: "#d32f2f",
          borderColor: "#d32f2f",
          "&:hover": { backgroundColor: "#ffebee" },
        }}
      >
        🗑️ Delete Post
      </Button>
    </Box>
  );
}
