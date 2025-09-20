import {
  Typography,
  Box,
  Container,
  Grid,
  IconButton,
  Paper,
  Fade,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Person,
  Code,
  Speed,
  Palette,
  Psychology,
  GitHub,
  LinkedIn,
  Email,
} from "@mui/icons-material";

export default function About() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Fade in timeout={1000}>
        <Paper elevation={6} sx={{ p: 6, borderRadius: 3 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                mx: "auto",
                mb: 3,
                bgcolor: "primary.main",
                fontSize: "3rem",
              }}
            >
              <Person />
            </Avatar>
            <Typography variant="h3" gutterBottom>
              About the Developer
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Full Stack Developer & Creative Technologist
            </Typography>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Code sx={{ mr: 1 }} /> Tech Stack
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Speed />
                    </ListItemIcon>
                    <ListItemText
                      primary="React & JavaScript"
                      secondary="Building dynamic, responsive web applications"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Palette />
                    </ListItemIcon>
                    <ListItemText
                      primary="Material-UI"
                      secondary="Creating beautiful, accessible interfaces"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Psychology />
                    </ListItemIcon>
                    <ListItemText
                      primary="API Integration"
                      secondary="Seamlessly connecting with external services"
                    />
                  </ListItem>
                </List>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" gutterBottom>
                  About This Project
                </Typography>
                <Typography variant="body1" paragraph>
                  This Library Web Application demonstrates modern React
                  development practices, featuring real-time API integration
                  with Open Library, dynamic routing, and a sophisticated
                  dark/light theme system.
                </Typography>
                <Typography variant="body1" paragraph>
                  Built with performance in mind, it includes skeleton loading
                  states, efficient data fetching, and a responsive Material-UI
                  design that works seamlessly across all devices.
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Connect With Me
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
            >
              <IconButton color="primary" size="large">
                <GitHub />
              </IconButton>
              <IconButton color="primary" size="large">
                <LinkedIn />
              </IconButton>
              <IconButton color="primary" size="large">
                <Email />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
              © 2024 Library App. Built with ❤️ using React and Material-UI
            </Typography>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
}
