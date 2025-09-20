import { useState } from "react";
import About from "./pages/About";
import BrowseBooks from "./pages/BrowseBooks";
import Navbar from "./components/Navbar";
import RandomBooks from "./pages/RandomBooks";
import ThemeContextProvider from "./context/ThemeContextProvider";
import TrendingBooks from "./pages/TrendingBooks";
import { Box } from "@mui/material";

export default function App() {
  const [currentPage, setCurrentPage] = useState("trending");

  const renderPage = () => {
    switch (currentPage) {
      case "trending":
        return <TrendingBooks />;
      case "browse":
        return <BrowseBooks />;
      case "random":
        return <RandomBooks />;
      case "about":
        return <About />;
      default:
        return <TrendingBooks />;
    }
  };

  return (
    <ThemeContextProvider>
      <Box
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
        <Box sx={{ flexGrow: 1 }}>{renderPage()}</Box>
      </Box>
    </ThemeContextProvider>
  );
}
