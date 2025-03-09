import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card } from "react-bootstrap";
import Loader from "./Loader";

const ReviewDetails = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReview();
  }, []);

  const fetchReview = async () => {
    try {
      const res = await axios.get(`https://book-review-backend-ie92.onrender.com/reviews/${id}`);
      setReview(res.data);
    } catch (err) {
      console.error("Error fetching review:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container className="mt-4">
      {isLoading ? (
        <Loader />
      ) : review ? (
        <Card className="p-4">
          <div className="d-flex justify-content-between align-items-center">
            <Card.Title>{review.bookTitle}</Card.Title>
            <small className="text-muted">{formatDate(review.createdAt)}</small>
          </div>
          <Card.Subtitle className="mb-3 text-muted">By {review.author}</Card.Subtitle>
          <Card.Text>{review.reviewContent}</Card.Text>
          <Card.Footer>
            <small className="text-muted">
              Reviewed by <br /> {review.reviewerName} | {"⭐".repeat(review.rating)}
            </small>
          </Card.Footer>
        </Card>
      ) : (
        <p>No review found.</p>
      )}
    </Container>
  );
};

export default ReviewDetails;
