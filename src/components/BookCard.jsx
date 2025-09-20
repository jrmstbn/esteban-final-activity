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
  Rating,
} from "@mui/material";
import { TrendingUp } from "@mui/icons-material";
import api from "../api/openLibrary";

export default function BookCard({
  book,
  onClick,
  showRank = false,
  rank = null,
}) {
  const rating = useMemo(() => Math.random() * 5, [book.key]);
  const coverUrl = api.getCoverUrl(book.cover_i || book.cover_id);

  return (
    <Grow in={true} timeout={500}>
      <Card
        elevation={4}
        sx={{
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
        {showRank && rank && (
          <Chip
            icon={<TrendingUp />}
            label={`#${rank}`}
            color="primary"
            size="small"
            sx={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}
          />
        )}
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
            <Box sx={{ mt: 1 }}>
              <Rating value={rating} readOnly size="small" precision={0.5} />
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grow>
  );
}
