import { useState } from "react";
import BookCard from "../components/BookCard";
import BookDialog from "../components/BookDialog";
import LoadingSkeleton from "../components/LoadingSkeleton";
import {
  Box,
  Button,
  Container,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import { Shuffle } from "@mui/icons-material";
import api from "../api/openLibrary";

export default function RandomBooks() {
  const subjects = [
    "fiction",
    "science",
    "history",
    "mystery",
    "romance",
    "fantasy",
    "biography",
    "adventure",
    "thriller",
    "comedy",
    "drama",
    "poetry",
  ];

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
  const [selectedBook, setSelectedBook] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSurpriseMe = async () => {
    setLoading(true);
    const subject = subjects[currentSubjectIndex];

    try {
      const data = await api.searchBySubject(subject, 12);
      setBooks(data.docs || []);
      setCurrentSubjectIndex((currentSubjectIndex + 1) % subjects.length);
    } catch (error) {
      console.error("Error fetching random books:", error);
    }
    setLoading(false);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setDialogOpen(true);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          Discover Random Books
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Click the button to explore {subjects[currentSubjectIndex]} books!
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<Shuffle />}
          onClick={handleSurpriseMe}
          disabled={loading}
          sx={{ mt: 3, px: 4, py: 1.5 }}
        >
          Surprise Me!
        </Button>
      </Box>

      {loading && <LinearProgress sx={{ mb: 2 }} />}

      <Grid container spacing={3}>
        {loading
          ? Array.from(new Array(12)).map((_, idx) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                <LoadingSkeleton />
              </Grid>
            ))
          : books.map((book, idx) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={book.key || idx}>
                <BookCard book={book} onClick={handleBookClick} />
              </Grid>
            ))}
      </Grid>

      <BookDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        book={selectedBook}
      />
    </Container>
  );
}
