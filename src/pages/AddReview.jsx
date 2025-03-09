import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const AddReview = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [rating, setRating] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const newReview = { bookTitle, author, reviewContent, rating };

      await axios.post("https://book-review-backend-ie92.onrender.com/api/reviews", newReview, {
        headers: { Authorization: token },
      });

      navigate("/");
    } catch (err) {
      console.error("Error adding review:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card className="p-4 shadow-sm" style={{ width: "100%", maxWidth: "450px" }}>
        <h3 className="text-center mb-3">Add a Review</h3>
        {isSubmitting ? <Loader /> : null}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Book Title</Form.Label>
            <Form.Control
              type="text"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Select value={rating} onChange={(e) => setRating(e.target.value)}>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {"⭐".repeat(num)} ({num})
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddReview;
