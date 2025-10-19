import {
  Container,
  Card,
  CardContent,
  Typography,
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
import { useAuth } from "../hooks/useAuth";

const recentPosts = [
  {
    id: 1,
    title: "Getting Started with React 19",
    views: 1234,
    likes: 89,
    status: "Published",
  },
  {
    id: 2,
    title: "TypeScript Best Practices",
    views: 987,
    likes: 76,
    status: "Published",
  },
  {
    id: 3,
    title: "Web Design Trends 2025",
    views: 456,
    likes: 42,
    status: "Draft",
  },
];

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4">
          Please sign in to access the dashboard
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          Welcome back, {user?.name || "User"}! 👋
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Here's your blogging dashboard overview <span>(this is a sample data)</span>
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
          mb: 4,
        }}
      >
        <Card
          sx={{
            backgroundColor:
              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          <CardContent>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Total Posts
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
              24
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>
              +2 this month
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            backgroundColor:
              "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          }}
        >
          <CardContent>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Total Views
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
              8.2K
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>
              +1.2K this week
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            backgroundColor:
              "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          }}
        >
          <CardContent>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Total Likes
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
              542
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>
              +87 this week
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            backgroundColor:
              "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
          }}
        >
          <CardContent>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Avg. Read Time
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
              4.2m
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.7 }}>
              Per article
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Stats Visualization */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
          mb: 4,
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              📈 Views Trend
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "flex-end",
                height: 200,
              }}
            >
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, i) => (
                <Box key={month} sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      height: `${(i + 1) * 30}px`,
                      width: 30,
                      backgroundColor: "#667eea",
                      borderRadius: "4px 4px 0 0",
                      mb: 1,
                    }}
                  />
                  <Typography variant="caption">{month}</Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              🎯 Key Metrics
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2">Engagement Rate</Typography>
                <Box
                  sx={{
                    width: "60%",
                    height: 8,
                    backgroundColor: "#eee",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      width: "78%",
                      backgroundColor: "#667eea",
                    }}
                  />
                </Box>
                <Typography variant="caption" sx={{ ml: 1 }}>
                  78%
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2">Avg. Reading Time</Typography>
                <Box
                  sx={{
                    width: "60%",
                    height: 8,
                    backgroundColor: "#eee",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      width: "85%",
                      backgroundColor: "#764ba2",
                    }}
                  />
                </Box>
                <Typography variant="caption" sx={{ ml: 1 }}>
                  4.2m
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2">Share Rate</Typography>
                <Box
                  sx={{
                    width: "60%",
                    height: 8,
                    backgroundColor: "#eee",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      width: "62%",
                      backgroundColor: "#f5576c",
                    }}
                  />
                </Box>
                <Typography variant="caption" sx={{ ml: 1 }}>
                  62%
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Recent Posts Table */}
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
              Recent Posts
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#667eea",
                "&:hover": { backgroundColor: "#5568d3" },
              }}
            >
              + New Post
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Views
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    Likes
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Status
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentPosts.map((post) => (
                  <TableRow
                    key={post.id}
                    sx={{ "&:hover": { backgroundColor: "#f9f9f9" } }}
                  >
                    <TableCell>{post.title}</TableCell>
                    <TableCell align="right">
                      {post.views.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">{post.likes}</TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "inline-block",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          backgroundColor:
                            post.status === "Published" ? "#e8f5e9" : "#fff3e0",
                          color:
                            post.status === "Published" ? "#2e7d32" : "#e65100",
                          fontSize: "0.875rem",
                          fontWeight: 500,
                        }}
                      >
                        {post.status}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Button size="small" sx={{ color: "#667eea", mr: 1 }}>
                        Edit
                      </Button>
                      <Button size="small" sx={{ color: "#d32f2f" }}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );
}
