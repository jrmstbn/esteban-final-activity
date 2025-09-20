import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import BookDialog from "../components/BookDialog";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { Box, Container, Grid, Typography } from "@mui/material";
import { Book, History, Science, TrendingUp } from "@mui/icons-material";
import api from "../api/openLibrary";

export default function TrendingBooks() {
  const [trending, setTrending] = useState([]);
  const [fiction, setFiction] = useState([]);
  const [science, setScience] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const [trendingData, fictionData, scienceData, historyData] =
          await Promise.all([
            api.getTrending(),
            api.searchBySubject("fiction", 6),
            api.searchBySubject("science", 6),
            api.searchBySubject("history", 6),
          ]);

        setTrending(trendingData.works?.slice(0, 12) || []);
        setFiction(fictionData.docs || []);
        setScience(scienceData.docs || []);
        setHistory(historyData.docs || []);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
      setLoading(false);
    };

    fetchBooks();
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setDialogOpen(true);
  };

  const renderSection = (title, books, icon, showRank = false) => (
    <Box sx={{ mb: 6 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        {icon}
        <Typography variant="h4" sx={{ ml: 2 }}>
          {title}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {loading
          ? Array.from(new Array(title === "Trending Books" ? 12 : 6)).map(
              (_, idx) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={title === "Trending Books" ? 3 : 4}
                  key={idx}
                >
                  <LoadingSkeleton />
                </Grid>
              )
            )
          : books.map((book, idx) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={title === "Trending Books" ? 3 : 4}
                key={book.key || idx}
              >
                <BookCard
                  book={book}
                  onClick={handleBookClick}
                  showRank={showRank}
                  rank={showRank ? idx + 1 : null}
                />
              </Grid>
            ))}
      </Grid>
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {renderSection(
        "Trending Books",
        trending,
        <TrendingUp fontSize="large" color="primary" />,
        true
      )}
      {renderSection(
        "Popular Fiction",
        fiction,
        <Book fontSize="large" color="secondary" />
      )}
      {renderSection(
        "Science & Technology",
        science,
        <Science fontSize="large" color="info" />
      )}
      {renderSection(
        "History & Biography",
        history,
        <History fontSize="large" color="warning" />
      )}

      <BookDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        book={selectedBook}
      />
    </Container>
  );
}
