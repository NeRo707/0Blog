import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDeleteBlogMutation } from "../../../hooks/useDeleteBlogMutation";
import { useBlogEditForm } from "../../../hooks/useBlogEditForm";
import { useSnackbar } from "../../../hooks/useSnackbar";
import BlogEditDialog from "./BlogEditDialog";

import type { Blog } from "../../../types/blog";
import BlogDeleteDialog from "./BlogDeleteDialog";
import BlogTable from "./BlogTable";

interface UserBlogsTableProps {
  blogs: Blog[];
  isLoading?: boolean;
}

export default function UserBlogsTable({
  blogs,
  isLoading = false,
}: UserBlogsTableProps) {
  const navigate = useNavigate();
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const { snackbar, showSuccess, showError, hideSnackbar } = useSnackbar();

  const {
    editingId,
    editFormData,
    editImagePreview,
    isUpdating,
    isUploadingImage,
    openEdit,
    closeEdit,
    handleFieldChange,
    handleImageSelect,
    saveEdit,
  } = useBlogEditForm();

  const {
    mutate: deleteBlog,
    isPending: isDeleting,
    error: deleteError,
  } = useDeleteBlogMutation();

  const handleSaveEdit = () => {
    saveEdit(
      () => showSuccess("Blog updated successfully!"),
      (error: unknown) => {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        showError(`Failed to update blog: ${errorMessage}`);
      }
    );
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmId) return;
    deleteBlog(deleteConfirmId, {
      onSuccess: () => {
        setDeleteConfirmId(null);
        showSuccess("Blog deleted successfully!");
      },
      onError: (error: unknown) => {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        showError(`Failed to delete blog: ${errorMessage}`);
      },
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent sx={{ textAlign: "center", py: 4 }}>
          <CircularProgress />
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            Loading your blogs...
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (blogs.length === 0) {
    return (
      <Card>
        <CardContent sx={{ textAlign: "center", py: 6 }}>
          <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
            No blogs yet
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Start creating your first blog post!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/blogs/create")}
          >
            + Create Blog
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Your Posts ({blogs.length})
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/blogs/create")}
            >
              + New Post
            </Button>
          </Box>

          {deleteError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {deleteError instanceof Error
                ? deleteError.message
                : "An error occurred"}
            </Alert>
          )}

          <BlogTable
            blogs={blogs}
            openEdit={openEdit}
            setDeleteConfirmId={setDeleteConfirmId}
            isUpdating={isUpdating}
            isDeleting={isDeleting}
          />
        </CardContent>
      </Card>

      <BlogEditDialog
        open={!!editingId}
        formData={editFormData}
        imagePreview={editImagePreview}
        isUpdating={isUpdating}
        isUploadingImage={isUploadingImage}
        onClose={closeEdit}
        onFieldChange={handleFieldChange}
        onImageSelect={handleImageSelect}
        onSave={handleSaveEdit}
      />

      <BlogDeleteDialog
        open={!!deleteConfirmId}
        isDeleting={isDeleting}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={handleDeleteConfirm}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={hideSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}//test
