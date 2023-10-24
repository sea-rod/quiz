import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import "./Navbar.css";
import "./Form.css";
function Navbar() {
  const [token, settoken] = useState("");
  useEffect(() => {
    function handleTokenUpdate() {
      settoken(localStorage.getItem("accessToken"));
    }
    settoken(localStorage.getItem("accessToken"));
    window.addEventListener("addedToken", handleTokenUpdate);
  }, []);
  
  const logout = (h)=>{
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    settoken(null)
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark flex-row justify-content-between ">
      <div className="container-fluid">
        <Link className="navbar-brand ms-4" to="/">
          Quizzy
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <div className="col-5 mx-lg-auto ps-2">
            <ul className="nav nav-underline flex flex-column flex-lg-row justify-content-between">
              <li className="nav-item">
                <Link to="/" className="nav-link" id="h">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="questionlist" className="nav-link">
                  Questions
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          {!token && (
            <div className="d-flex flex-lg-row flex-column justify-content-lg-end align-items-start ms-4">
              <button className="btn btn-plain me-lg-2 mb-2 mb-lg-0">
                <Link to="login">Login</Link>
              </button>
              <button className="btn btn-blue">
                <Link to="signup">Sign Up</Link>
              </button>
            </div>
          )}
          {token && (
            <div className="d-flex flex-lg-row flex-column justify-content-lg-end align-items-start ms-4">
              <button
                className="btn btn-danger me-lg-2 mb-2 mb-lg-0"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
