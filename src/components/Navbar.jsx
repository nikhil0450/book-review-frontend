// Navbar.js
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#2a4874" }}>
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          Book Review App
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!user ? (
              <>
                <li className="nav-item fw-bold"><Link className="nav-link" to="/">Home</Link></li>
                <li className="nav-item fw-bold"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item fw-bold"><Link className="nav-link" to="/register">Register</Link></li>
              </>
            ) : (
              <>
                <li className="nav-item fw-bold"><Link className="nav-link" to="/">Home</Link></li>
                <li className="nav-item fw-bold"><Link className="nav-link" to="/my-reviews">My Reviews</Link></li>
                <li className="nav-item fw-bold"><Link className="nav-link" to="/add-review">Add Review</Link></li>
                <li className="nav-item"><button className="btn btn-danger fw-bold" onClick={handleLogout}>Logout</button></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;