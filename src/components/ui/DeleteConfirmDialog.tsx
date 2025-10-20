import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useBlogStore } from "../../store/blogStore";

interface DeleteConfirmDialogProps {
  isDeleting: boolean;
  onConfirm: () => void;
}

export default function DeleteConfirmDialog({
  isDeleting,
  onConfirm,
}: DeleteConfirmDialogProps) {
  const { isDeleteDialogOpen: open, closeDeleteDialog } = useBlogStore();
  
  return (
    <Dialog open={open} onClose={closeDeleteDialog}>
      <DialogTitle>Delete Blog Post?</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete this blog post? This action cannot be
          undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDeleteDialog}>Cancel</Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
