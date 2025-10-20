import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import type { Blog } from "../../types/blog";

interface EditBlogDialogProps {
  open: boolean;
  editFormData: Partial<Blog>;
  editImagePreview: string | null;
  isUpdating: boolean;
  isUploadingImage: boolean;
  updateError: Error | null;
  onClose: () => void;
  onFormChange: (field: string, value: string) => void;
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

export default function EditBlogDialog({
  open,
  editFormData,
  editImagePreview,
  isUpdating,
  isUploadingImage,
  updateError,
  onClose,
  onFormChange,
  onImageSelect,
  onSave,
}: EditBlogDialogProps) {
  const CATEGORIES = [
    "React",
    "TypeScript",
    "JavaScript",
    "Design",
    "Backend",
    "CSS",
    "Performance",
    "AI/ML",
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Blog Post</DialogTitle>
      <DialogContent
        sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        {updateError && (
          <Alert severity="error">
            {updateError instanceof Error
              ? updateError.message
              : "An error occurred"}
          </Alert>
        )}

        <TextField
          label="Title"
          value={editFormData.title || ""}
          onChange={(e) => onFormChange("title", e.target.value)}
          fullWidth
        />

        <TextField
          label="Excerpt"
          value={editFormData.excerpt || ""}
          onChange={(e) => onFormChange("excerpt", e.target.value)}
          fullWidth
          multiline
          rows={3}
        />

        <TextField
          label="Content"
          value={editFormData.content || ""}
          onChange={(e) => onFormChange("content", e.target.value)}
          fullWidth
          multiline
          rows={6}
          placeholder="Full blog post content"
        />

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Blog Image
          </Typography>
          {editImagePreview && (
            <Box
              component="img"
              src={editImagePreview}
              alt="Preview"
              sx={{
                width: "100%",
                maxHeight: 250,
                objectFit: "cover",
                borderRadius: 1,
                mb: 1,
                backgroundColor: "#f0f0f0",
              }}
            />
          )}
          <Button
            component="label"
            variant="outlined"
            fullWidth
            sx={{ textTransform: "none", mb: 1 }}
            disabled={isUploadingImage}
          >
            {isUploadingImage ? "Uploading..." : "Choose Image"}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={onImageSelect}
            />
          </Button>
        </Box>

        <TextField
          select
          label="Category"
          value={editFormData.category || ""}
          onChange={(e) => onFormChange("category", e.target.value)}
          fullWidth
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </TextField>

        <TextField
          label="Read Time"
          value={editFormData.readTime || ""}
          onChange={(e) => onFormChange("readTime", e.target.value)}
          fullWidth
          placeholder="e.g., 5 min read"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={onSave}
          variant="contained"
          disabled={isUpdating}
          sx={{
            backgroundColor: "#667eea",
            "&:hover": { backgroundColor: "#5568d3" },
          }}
        >
          {isUpdating ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
