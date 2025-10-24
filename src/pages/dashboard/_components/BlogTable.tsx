import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import type { Blog } from "../../../types/blog";

type BlogTableProps = {
  blogs: Blog[];
  openEdit: (blog: Blog) => void;
  setDeleteConfirmId: (id: string) => void;
  isUpdating: boolean;
  isDeleting: boolean;
};

const BlogTable = ({
  blogs,
  openEdit,
  setDeleteConfirmId,
  isUpdating,
  isDeleting,
}: BlogTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ bgcolor: "action.hover" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", width: "120px" }}>
              Image
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow
              key={blog.id}
              sx={{ "&:hover": { bgcolor: "action.hover" } }}
            >
              <TableCell>
                {blog.image ? (
                  <Box
                    component="img"
                    src={blog.image}
                    alt={blog.title}
                    sx={{
                      width: "100px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: 1,
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100px",
                      height: "70px",
                      bgcolor: "action.disabledBackground",
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "text.disabled",
                      fontSize: "12px",
                    }}
                  >
                    No image
                  </Box>
                )}
              </TableCell>
              <TableCell>{blog.title}</TableCell>
              <TableCell>{blog.category}</TableCell>
              <TableCell align="center">
                <Button
                  size="small"
                  color="info"
                  onClick={() => openEdit(blog)}
                  sx={{ mr: 1 }}
                  disabled={isUpdating || isDeleting}
                  variant="contained"
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  onClick={() => setDeleteConfirmId(blog.id)}
                  color="error"
                  disabled={isUpdating || isDeleting}
                  variant="outlined"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BlogTable;
