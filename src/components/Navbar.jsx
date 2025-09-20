import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  BrightnessAuto,
  Menu,
} from "@mui/icons-material";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export default function Navbar() {
  const { themeMode, handleThemeChange } = useContext(ThemeContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const navItems = [
    { label: "Trending", path: "/trending" },
    { label: "Browse", path: "/browse" },
    { label: "Random", path: "/random" },
    { label: "About", path: "/about" },
  ];

  const drawer = (
    <Box
      sx={{
        width: 240,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={handleDrawerToggle}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ display: "flex", justifyContent: "center", py: 1 }}>
          <ToggleButtonGroup
            value={themeMode}
            exclusive
            onChange={handleThemeChange}
            size="small"
          >
            <ToggleButton value="light">
              <Brightness7 fontSize="small" />
            </ToggleButton>
            <ToggleButton value="system">
              <BrightnessAuto fontSize="small" />
            </ToggleButton>
            <ToggleButton value="dark">
              <Brightness4 fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Box sx={{ textAlign: "center", p: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Esteban, Jerome | React
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" elevation={2}>
        <Toolbar>
          <MenuBookIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            BOOK SHELF
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, ml: 3 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{ textTransform: "none" }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <ToggleButtonGroup
            value={themeMode}
            exclusive
            onChange={handleThemeChange}
            size="small"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          >
            <ToggleButton value="light">
              <Brightness7 fontSize="small" />
            </ToggleButton>
            <ToggleButton value="system">
              <BrightnessAuto fontSize="small" />
            </ToggleButton>
            <ToggleButton value="dark">
              <Brightness4 fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>

          <IconButton
            color="inherit"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
