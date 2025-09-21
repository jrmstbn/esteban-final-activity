import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import BrowseBooks from "./pages/BrowseBooks";
import Navbar from "./components/Navbar";
import RandomBooks from "./pages/RandomBooks";
import ThemeContextProvider from "./context/ThemeContextProvider";
import TrendingBooks from "./pages/TrendingBooks";
import { Box } from "@mui/material";

export default function App() {
  return (
    <ThemeContextProvider>
      <Router>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <Navbar />
          <Box
            sx={{
              flexGrow: 1,
              p: 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Routes>
              <Route path="/" element={<TrendingBooks />} />
              <Route path="/trending" element={<TrendingBooks />} />
              <Route path="/browse" element={<BrowseBooks />} />
              <Route path="/random" element={<RandomBooks />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeContextProvider>
  );
}
