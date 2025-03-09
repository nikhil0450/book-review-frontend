import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, Container, Row, Col, Pagination, Form } from "react-bootstrap";
import Loader from "../components/Loader";

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const fetchReviews = async (page, query) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`https://book-review-backend-ie92.onrender.com/api/reviews?page=${page}&query=${query}`);
      setReviews(res.data.reviews);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center my-3">Books Review</h2>

      <div className="d-flex justify-content-center mb-4">
        <Form.Control
          type="text"
          placeholder="Search Book Title or Author"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-50 text-center"
        />
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <Row>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <Col key={review._id} md={4} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>
                      <Link to={`/reviews/${review._id}`} className="text-primary-emphasis">
                        {review.bookTitle}
                      </Link>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">By {review.author}</Card.Subtitle>
                    <Card.Text>{review.reviewContent.substring(0, 80)}...</Card.Text>
                    <Card.Footer>
                      <small className="text-muted">
                        Review by <br /> {review.reviewerName} | {"⭐".repeat(review.rating)}
                      </small>
                    </Card.Footer>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">No reviews found.</p>
          )}
        </Row>
      )}
      {/* Pagination UI */}
      <Pagination className="justify-content-center mt-4">
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
      </Pagination>
    </Container>
  );
};

export default Home;
