import { useMemo } from "react";
import {
  Typography,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Chip,
  Grow,
} from "@mui/material";
import { TrendingUp } from "@mui/icons-material";
import api from "../api/openLibrary";

export default function BookCard({
  book,
  onClick,
  showRank = false,
  rank = null,
  highlightSubject,
}) {
  const rating = useMemo(() => Math.random() * 5, [book.key]);
  const coverUrl = api.getCoverUrl(book.cover_i || book.cover_id);

  // Priority subjects from RandomBooks component
  const prioritySubjects = [
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

  const rawSubjects = book.subject || book.subject_facet || [];

  // Sort subjects with priority logic
  const subjects = useMemo(() => {
    return [...rawSubjects].sort((a, b) => {
      const aLower = a.toLowerCase();
      const bLower = b.toLowerCase();

      // First priority: exact match with highlightSubject
      if (highlightSubject) {
        const highlightLower = highlightSubject.toLowerCase();
        if (aLower === highlightLower && bLower !== highlightLower) return -1;
        if (bLower === highlightLower && aLower !== highlightLower) return 1;
      }

      // Second priority: subjects from the priority list
      const aInPriority = prioritySubjects.some(
        (ps) => aLower.includes(ps) || ps.includes(aLower)
      );
      const bInPriority = prioritySubjects.some(
        (ps) => bLower.includes(ps) || ps.includes(bLower)
      );

      if (aInPriority && !bInPriority) return -1;
      if (bInPriority && !aInPriority) return 1;

      // If both or neither are in priority, maintain original order
      return 0;
    });
  }, [rawSubjects, highlightSubject, prioritySubjects]);

  return (
    <Grow in={true} timeout={500}>
      <Card
        elevation={4}
        sx={{
          width: 200,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: 8,
          },
        }}
      >
        <CardActionArea onClick={() => onClick(book)} sx={{ height: "100%" }}>
          <CardMedia
            component="img"
            height="250"
            image={
              coverUrl || "https://via.placeholder.com/200x300?text=No+Cover"
            }
            alt={book.title}
            sx={{ objectFit: "cover" }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h6" component="div" noWrap>
              {book.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {book.author_name ? book.author_name[0] : "Unknown Author"}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {book.first_publish_year
                ? " Published: " + book.first_publish_year
                : "N/A"}
            </Typography>
            <Box
              sx={{
                mt: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {showRank && rank && (
                <Chip
                  icon={<TrendingUp />}
                  label={`#${rank} Trending`}
                  size="small"
                />
              )}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                ⭐{rating.toFixed(1)}
              </Typography>
            </Box>

            {subjects.length > 0 && (
              <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {subjects.slice(0, 3).map((subj, index) => (
                  <Chip
                    key={`${subj}-${index}`}
                    label={subj}
                    size="small"
                    color={
                      highlightSubject &&
                      subj.toLowerCase() === highlightSubject.toLowerCase()
                        ? "primary"
                        : "default"
                    }
                    variant={
                      highlightSubject &&
                      subj.toLowerCase() === highlightSubject.toLowerCase()
                        ? "filled"
                        : "outlined"
                    }
                  />
                ))}
              </Box>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </Grow>
  );
}
