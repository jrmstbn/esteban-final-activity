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
              src="/profile.png"
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
              Jerome R. Esteban
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Full Stack Developer
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
                      primary="React & Next.js"
                      secondary="Building scalable, performant web applications with React ecosystem"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Palette />
                    </ListItemIcon>
                    <ListItemText
                      primary="System Architecture"
                      secondary="Outling components and structure that aligns with business goals"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Psychology />
                    </ListItemIcon>
                    <ListItemText
                      primary="Backend Development"
                      secondary="Designing robust APIs and database architectures for scalable applications"
                    />
                  </ListItem>
                </List>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" gutterBottom>
                  About Me
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  An aspiring web developer passionate about exploring new
                  technologies, experimenting with fresh ideas, and turning
                  creative concepts into functional, user-friendly experiences.
                </Typography>
                <Typography variant="body1">
                  I love coding with a hot coffee, jamming to lo-fi beats while
                  chasing that 'aha'! moment, and tinkering with new stacks just
                  to see what's possible. Always down for late-night hack
                  sessions and brainstorming the next big idea. - says ChatGPT
                </Typography>

                {/* OPTIONAL: Add achievements, certifications, or highlights */}
                {/*
                <Typography variant="body1" sx={{ mt: 2, fontStyle: 'italic' }}>
                  [ACHIEVEMENTS_OR_HIGHLIGHTS]
                  // e.g., "Featured developer on TechCrunch | 50+ satisfied clients | 100k+ lines of code"
                </Typography>
                */}
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Find Me Online
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
            >
              <IconButton
                color="primary"
                size="large"
                href="https://github.com/jrmstbn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHub />
              </IconButton>
              <IconButton
                color="primary"
                size="large"
                href="www.linkedin.com/in/jerome-esteban"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedIn />
              </IconButton>
              <IconButton
                color="primary"
                size="large"
                href="mailto:jersmurfing@gmail.com"
              >
                <Email />
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
              © 2025 Jerome Esteban. Built with ❤️ using React and Material-UI{" "}
            </Typography>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
}
