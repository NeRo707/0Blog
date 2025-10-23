import { useParams, useNavigate } from "react-router";
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { useBlogStore } from "../store/blogStore";
import { useUpdateBlogMutation } from "../hooks/useUpdateBlogMutation";
import { useDeleteBlogMutation } from "../hooks/useDeleteBlogMutation";
import {
  BlogHeader,
  BlogContent,
  BlogActions,
  EditBlogDialog,
  DeleteConfirmDialog,
} from "../components/ui";
import type { Blog } from "../types/blog";
import { fetchBlogById } from "../services/blogService";

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    editFormData,
    openEditDialog,
    openDeleteDialog,
  } = useBlogStore();

  const {
    mutate: updateBlog,
    isPending: isUpdating,
  } = useUpdateBlogMutation();
  const { mutate: deleteBlog, isPending: isDeleting } = useDeleteBlogMutation();

  const {
    data: blog,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogById(id!),
    enabled: !!id,
  });

  const isOwner = user?.id === blog?.authorId;

  const handleEditClick = () => {
    if (!blog) return;
    openEditDialog(blog);
  };

  const handleSaveEdit = () => {
    if (!id || !blog) return;
    const updates = {
      title: editFormData.title,
      excerpt: editFormData.excerpt,
      content: editFormData.content,
      category: editFormData.category,
      readTime: editFormData.readTime,
      image: editFormData.image,
      author: editFormData.author,
      authorId: editFormData.authorId,
      date: editFormData.date,
    } as Partial<Omit<Blog, "id">>;

    updateBlog({ blogId: id, updates });
  };

  const handleDeleteConfirm = () => {
    if (!id) return;
    deleteBlog(id, {
      onSuccess: () => {
        navigate("/blogs");
      },
    });
  };

  if (isPending) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          Loading blog post...
        </Typography>
      </Container>
    );
  }

  if (isError || !blog) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", mb: 2, color: "error.main" }}
          >
            {error instanceof Error ? error.message : "Blog post not found"}
          </Typography>
          <Button
            variant="contained"
            color="info"
            onClick={() => navigate("/blogs")}
          >
            Back to Blogs
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Back Button */}
      <Button
        onClick={() => navigate("/blogs")}
        sx={{ mb: 4, textTransform: "none", fontSize: "1rem" }}
        color="info"
      >
        ← Back to Blogs
      </Button>

      {/* Blog Card */}
      <Card sx={{ boxShadow: 3 }}>
        {/* Blog Image */}
        <CardMedia
          component="img"
          height="400"
          image={blog.image}
          alt={blog.title}
          sx={{ objectFit: "cover" }}
        />

        {/* Blog Content */}
        <CardContent sx={{ p: 4 }}>
          <BlogHeader blog={blog} />
          <BlogActions
            isOwner={isOwner}
            onEdit={handleEditClick}
            onDelete={openDeleteDialog}
          />
          <BlogContent blog={blog} />

          {/* Back Button */}
          <Button
            variant="contained"
            onClick={() => navigate("/blogs")}
            sx={{ mt: 4 }}
            color="info"
          >
            ← Back to All Blogs
          </Button>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <EditBlogDialog
        isUpdating={isUpdating}
        onSave={handleSaveEdit}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
      />
    </Container>
  );
}
