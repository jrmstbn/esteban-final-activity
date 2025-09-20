import { useState, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeContext } from "./ThemeContext";

export default function ThemeContextProvider({ children }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeMode, setThemeMode] = useState("dark");

  const theme = useMemo(() => {
    let mode = "dark";
    if (themeMode === "system") {
      mode = prefersDarkMode ? "dark" : "light";
    } else {
      mode = themeMode;
    }

    return createTheme({
      palette: {
        mode,
        primary: { main: mode === "dark" ? "#90caf9" : "#736334" },
        secondary: { main: mode === "dark" ? "#f48fb1" : "#dc004e" },
        background: {
          default: mode === "dark" ? "#121212" : "#D9D9D9",
          paper: mode === "dark" ? "#1e1e1e" : "#F2F2F2",
        },
      },
      typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h4: { fontWeight: 600 },
        h6: { fontWeight: 500 },
      },
      shape: { borderRadius: 12 },
    });
  }, [themeMode, prefersDarkMode]);

  const handleThemeChange = (event, newMode) => {
    if (newMode !== null) {
      setThemeMode(newMode);
    }
  };

  return (
    <ThemeContext.Provider value={{ themeMode, handleThemeChange }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
