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
        color="info"
        onClick={onEdit}
      >
        ✏️ Edit Post
      </Button>
      <Button
        variant="outlined"
        color="error"
        onClick={onDelete}
      >
        🗑️ Delete Post
      </Button>
    </Box>
  );
}
