import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddReview from "./pages/AddReview";
import MyReviews from "./pages/MyReviews";
import ReviewDetails from "./components/ReviewDetails";

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-review" element={<AddReview />} />
          <Route path="/reviews/:id" element={<ReviewDetails/>} />
          <Route path="/my-reviews" element={<MyReviews />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
