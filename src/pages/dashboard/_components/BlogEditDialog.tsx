import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
} from "@mui/material";
import type { Blog } from "../../../types/blog";

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

interface BlogEditDialogProps {
  open: boolean;
  formData: Partial<Blog>;
  imagePreview: string | null;
  isUpdating: boolean;
  isUploadingImage: boolean;
  onClose: () => void;
  onFieldChange: (field: keyof Blog, value: string) => void;
  onImageSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

export default function BlogEditDialog({
  open,
  formData,
  imagePreview,
  isUpdating,
  isUploadingImage,
  onClose,
  onFieldChange,
  onImageSelect,
  onSave,
}: BlogEditDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Blog Post</DialogTitle>
      <DialogContent
        sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Title"
          value={formData.title || ""}
          onChange={(e) => onFieldChange("title", e.target.value)}
          fullWidth
        />
        <TextField
          label="Excerpt"
          value={formData.excerpt || ""}
          onChange={(e) => onFieldChange("excerpt", e.target.value)}
          fullWidth
          multiline
          rows={3}
        />
        <TextField
          label="Content"
          value={formData.content || ""}
          onChange={(e) => onFieldChange("content", e.target.value)}
          fullWidth
          multiline
          rows={6}
          placeholder="Full blog post content"
        />
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Blog Image
          </Typography>
          {imagePreview && (
            <Box
              component="img"
              src={imagePreview}
              alt="Preview"
              sx={{
                width: "100%",
                maxHeight: 250,
                objectFit: "cover",
                borderRadius: 1,
                mb: 1,
                bgcolor: "action.hover",
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
          {!imagePreview && (
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              No image selected
            </Typography>
          )}
        </Box>
        <TextField
          select
          label="Category"
          value={formData.category || ""}
          onChange={(e) => onFieldChange("category", e.target.value)}
          fullWidth
        >
          {CATEGORIES.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Read Time"
          value={formData.readTime || ""}
          onChange={(e) => onFieldChange("readTime", e.target.value)}
          fullWidth
          placeholder="e.g., 5 min read"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={onSave}
          variant="contained"
          color="primary"
          disabled={isUpdating}
        >
          {isUpdating ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}