import { useState } from "react";
import BookCard from "../components/BookCard";
import BookDialog from "../components/BookDialog";
import LoadingSkeleton from "../components/LoadingSkeleton";
import {
  Box,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import api from "../api/openLibrary";

export default function BrowseBooks() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const data = await api.searchBooks(query);
      setBooks(data.docs || []);
    } catch (error) {
      console.error("Search error:", error);
      setBooks([]);
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
          Browse Books
        </Typography>
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSearch} disabled={loading}>
                  <Search />
                </IconButton>
              ),
            }}
          />
        </Box>
      </Box>

      {loading && <LinearProgress sx={{ mb: 2 }} />}

      {searched && !loading && books.length === 0 && (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary">
            No results found for "{query}"
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Try searching with different keywords
          </Typography>
        </Paper>
      )}

      <Grid container spacing={3}>
        {loading
          ? Array.from(new Array(12)).map((_, idx) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                <LoadingSkeleton />
              </Grid>
            ))
          : books.map((book, idx) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={book.key || idx}>
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
