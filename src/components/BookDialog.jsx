import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  Chip,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import api from "../api/openLibrary";

export default function BookDialog({ open, onClose, book }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && book) {
      setLoading(true);
      api
        .getBookDetails(book.key)
        .then(setDetails)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [open, book]);

  if (!book) return null;

  const coverUrl = api.getCoverUrl(book.cover_i || book.cover_id);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{book.title}</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box sx={{ p: 3 }}>
            <LinearProgress />
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: 3, mt: 2 }}>
            {coverUrl && (
              <Box sx={{ minWidth: 200 }}>
                <img
                  src={coverUrl}
                  alt={book.title}
                  style={{ width: "100%", borderRadius: 8 }}
                />
              </Box>
            )}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom>
                {book.author_name
                  ? book.author_name.join(", ")
                  : "Unknown Author"}
              </Typography>
              {book.first_publish_year && (
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  First Published: {book.first_publish_year}
                </Typography>
              )}
              {details?.description && (
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {typeof details.description === "string"
                    ? details.description
                    : details.description.value || "No description available"}
                </Typography>
              )}
              {book.subject && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Subjects:
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {book.subject.slice(0, 5).map((subj, idx) => (
                      <Chip
                        key={idx}
                        label={subj}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
