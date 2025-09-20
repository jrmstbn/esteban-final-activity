import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  Chip,
  LinearProgress,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import api from "../api/openLibrary";

export default function BookDialog({ open, onClose, book }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

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
  const description =
    typeof details?.description === "string"
      ? details.description
      : details?.description?.value || "No description available";
  const maxLength = 200;
  const displayText =
    expanded || description.length <= maxLength
      ? description
      : description.slice(0, maxLength) + "...";

  const subjects = details?.subjects || book.subject || [];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      scroll="body"
      PaperProps={{
        sx: {
          width: 800,
          height: 480,
          position: "relative",
          p: 2,
          overflow: "hidden",
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        sx={{
          overflow: "auto",
          height: "100%",
          p: 0,
          "&::-webkit-scrollbar": {
            width: 6,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: 3,
          },
        }}
      >
        {loading ? (
          <Box sx={{ p: 3 }}>
            <LinearProgress />
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: 3, height: "100%", p: 2 }}>
            {coverUrl && (
              <Box
                sx={{
                  minWidth: 200,
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <img
                  src={coverUrl}
                  alt={book.title}
                  style={{
                    width: "100%",
                    maxWidth: 180,
                    height: "auto",
                    borderRadius: 8,
                    objectFit: "cover",
                  }}
                />
              </Box>
            )}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                {book.title}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Author:{" "}
                {book.author_name
                  ? book.author_name.join(", ")
                  : "Unknown Author"}
              </Typography>
              {book.rating && (
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  Rating: {book.rating}
                </Typography>
              )}
              {book.first_publish_year && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1.5 }}
                >
                  Publish Year: {book.first_publish_year}
                </Typography>
              )}
              {subjects.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Subjects:
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {subjects.slice(0, 5).map((subj, idx) => (
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
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  {displayText}
                </Typography>
                {description.length > maxLength && (
                  <Button
                    size="small"
                    onClick={() => setExpanded((prev) => !prev)}
                    sx={{ mt: 1, p: 0, minWidth: "auto" }}
                  >
                    {expanded ? "Read less" : "Read more..."}
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
