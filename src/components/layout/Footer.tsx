import {
  Box,
  Container,
  Typography,
  Link,
  Stack,
  Divider,
} from "@mui/material";
import { Link as RouterLink } from "react-router";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderTop: 1,
        borderColor: "divider",
        color: "text.secondary",
        marginTop: "auto",
        paddingTop: 6,
        paddingBottom: 3,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4} sx={{ marginBottom: 4 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "repeat(4, 1fr)",
              },
              gap: 4,
            }}
          >
            {/* Brand Section */}
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                🐻‍❄️ BlogHub
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Your platform for discovering and sharing amazing blog posts.
              </Typography>
            </Box>

            {/* Quick Links */}
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                Quick Links
              </Typography>
              <Stack gap={1}>
                <Link
                  component={RouterLink}
                  to="/"
                  sx={{
                    color: "text.secondary",
                    textDecoration: "none",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  Home
                </Link>
                <Link
                  component={RouterLink}
                  to="/dashboard"
                  sx={{
                    color: "text.secondary",
                    textDecoration: "none",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  Dashboard
                </Link>
              </Stack>
            </Box>

            {/* Resources */}
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                Resources
              </Typography>
              <Stack gap={1}>
                <Link
                  href="#"
                  sx={{
                    color: "text.secondary",
                    textDecoration: "none",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  About
                </Link>
                <Link
                  href="#"
                  sx={{
                    color: "text.secondary",
                    textDecoration: "none",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  Contact
                </Link>
              </Stack>
            </Box>

            {/* Social */}
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                Follow Us
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Link
                  href="#"
                  sx={{
                    fontSize: "1.5rem",
                    "&:hover": { transform: "scale(1.1)" },
                  }}
                >
                  🐻‍❄️
                </Link>
                <Link
                  href="#"
                  sx={{
                    fontSize: "1.5rem",
                    "&:hover": { transform: "scale(1.1)" },
                  }}
                >
                  🐻‍❄️
                </Link>
                <Link
                  href="#"
                  sx={{
                    fontSize: "1.5rem",
                    "&:hover": { transform: "scale(1.1)" },
                  }}
                >
                  🐻‍❄️
                </Link>
              </Box>
            </Box>
          </Box>
        </Stack>

        <Divider sx={{ bgcolor: "divider", margin: "2rem 0" }} />

        {/* Bottom Copyright */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            © {currentYear} BlogHub. All rights reserved. |
            <Link
              href="#"
              sx={{
                color: "primary.main",
                textDecoration: "none",
                marginLeft: 1,
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Privacy Policy
            </Link>{" "}
            |
            <Link
              href="#"
              sx={{
                color: "primary.main",
                textDecoration: "none",
                marginLeft: 1,
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Terms of Service
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
