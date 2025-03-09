import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import Loader from "../components/Loader";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [currentReview, setCurrentReview] = useState({
    id: "",
    bookTitle: "",
    author: "",
    reviewContent: "",
    rating: 1,
  });

  useEffect(() => {
    const fetchMyReviews = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://book-review-backend-ie92.onrender.com/api/reviews/my-reviews", {
          headers: { Authorization: token },
        });
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching user reviews:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyReviews();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://book-review-backend-ie92.onrender.com/api/reviews/${id}`, {
        headers: { Authorization: token },
      });

      setReviews(reviews.filter((review) => review._id !== id));
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  const handleEdit = (review) => {
    setCurrentReview({
      id: review._id,
      bookTitle: review.bookTitle,
      author: review.author,
      reviewContent: review.reviewContent,
      rating: review.rating,
    });
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const updatedReview = {
        bookTitle: currentReview.bookTitle,
        author: currentReview.author,
        reviewContent: currentReview.reviewContent,
        rating: currentReview.rating,
      };

      await axios.put(`https://book-review-backend-ie92.onrender.com/api/reviews/${currentReview.id}`, updatedReview, {
        headers: { Authorization: token },
      });

      setReviews(reviews.map((rev) => (rev._id === currentReview.id ? { ...rev, ...updatedReview } : rev)));
      setShowModal(false);
    } catch (err) {
      console.error("Error updating review:", err);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">My Reviews</h2>
      {isLoading ? (
              <Loader />
            ) : ( <Row>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Col key={review._id} md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>{review.bookTitle}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">By {review.author}</Card.Subtitle>
                  <Card.Text>{review.reviewContent}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="primary" className="fw-semibold" onClick={() => handleEdit(review)}>Edit</Button>
                    <Button variant="danger" className="fw-semibold" onClick={() => handleDelete(review._id)}>Delete</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">You have not added any reviews yet.</p>
        )}
      </Row>
            )}

      {/* Edit Review Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Book Title</Form.Label>
              <Form.Control
                type="text"
                value={currentReview.bookTitle}
                onChange={(e) => setCurrentReview({ ...currentReview, bookTitle: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                value={currentReview.author}
                onChange={(e) => setCurrentReview({ ...currentReview, author: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentReview.reviewContent}
                onChange={(e) => setCurrentReview({ ...currentReview, reviewContent: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Select
                value={currentReview.rating}
                onChange={(e) => setCurrentReview({ ...currentReview, rating: e.target.value })}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                    {"⭐".repeat(num)} ({num})
                </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Review
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default MyReviews;
