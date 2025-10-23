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
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useBlogStore } from "../../store/blogStore";
import { useUploadImageMutation } from "../../hooks/useUploadImageMutation";

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

interface EditBlogDialogProps {
  isUpdating: boolean;
  onSave: () => void;
}

export default function EditBlogDialog({
  isUpdating,
  onSave,
}: EditBlogDialogProps) {
  const {
    isEditDialogOpen: open,
    editFormData,
    editImagePreview,
    error,
    closeEditDialog,
    setEditFormField,
    setEditImagePreview,
    clearError,
  } = useBlogStore();
  
  const { mutate: uploadImage, isPending: isUploadingImage } = useUploadImageMutation();

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    clearError();

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      const preview = event.target?.result as string;
      setEditImagePreview(preview);
    };
    reader.readAsDataURL(file);

    // Upload to server
    uploadImage(file, {
      onSuccess: (imageUrl) => {
        setEditFormField('image', imageUrl);
      },
      onError: () => {
        setEditImagePreview('');
      },
    });
  };

  return (
    <Dialog open={open} onClose={closeEditDialog} maxWidth="md" fullWidth>
      <DialogTitle>Edit Blog Post</DialogTitle>
      <DialogContent
        sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}

        <TextField
          label="Title"
          value={editFormData.title || ""}
          onChange={(e) => setEditFormField("title", e.target.value)}
          fullWidth
        />

        <TextField
          label="Excerpt"
          value={editFormData.excerpt || ""}
          onChange={(e) => setEditFormField("excerpt", e.target.value)}
          fullWidth
          multiline
          rows={3}
        />

        <TextField
          label="Content"
          value={editFormData.content || ""}
          onChange={(e) => setEditFormField("content", e.target.value)}
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
            color="info"
          >
            {isUploadingImage ? "Uploading..." : "Choose Image"}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageSelect}
            />
          </Button>
        </Box>

        <TextField
          select
          label="Category"
          value={editFormData.category || ""}
          onChange={(e) => setEditFormField("category", e.target.value)}
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
          value={editFormData.readTime || ""}
          onChange={(e) => setEditFormField("readTime", e.target.value)}
          fullWidth
          placeholder="e.g., 5 min read"
        />
      </DialogContent>

      <DialogActions>
        <Button color="error" onClick={closeEditDialog}>Cancel</Button>
        <Button
          onClick={onSave}
          variant="contained"
          color="info"
          disabled={isUpdating}
        >
          {isUpdating ? <CircularProgress size={20} /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
