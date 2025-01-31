import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import fallbackImage from "../assets/fallbackImage.png";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Container,
  Button,
  Stack,
} from "@mui/material";

const Book = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <CircularProgress sx={{ display: "block", margin: "50px auto" }} />;
  }

  if (!book) {
    return (
      <Typography variant="h5" align="center" color="error">
        Book not found
      </Typography>
    );
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 5,
      }}
    >
      <Card sx={{ maxWidth: 500, boxShadow: 3 }}>
        <CardMedia
          component="img"
          height="300"
          src={book.img ? book.img : fallbackImage}
          alt={book.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
        />
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            {book.name}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Author: {book.author}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Genres:</strong> {book.genres?.join(", ") || "N/A"}
          </Typography>
          <Typography variant="body1">
            <strong>Completed:</strong> {book.completed ? "Yes" : "No"}
          </Typography>
          <Typography variant="body1">
            <strong>Rating:</strong> {book.stars || "No rating"}
          </Typography>
        </CardContent>
      </Card>
      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </Stack>
    </Container>
  );
};

export default Book;
