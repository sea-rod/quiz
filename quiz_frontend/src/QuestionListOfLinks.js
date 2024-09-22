import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

function QuestionListOfLinks({ links }) {
  const location = useLocation();
  const [count, setCount] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle window resizing to determine screen size
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    let path = location.pathname.split("/");
    const currentPage = parseInt(path[path.length - 1]) || 1;
    setCount(currentPage);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [location.pathname]);

  const handleNext = () => {
    if (count < links.length) {
      setCount(count + 1);
    }
  };

  const handlePrevious = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handlePageClick = (page) => {
    setCount(page);
  };

  // Render pagination based on screen size
  const renderPageLinks = () => {
    if (windowWidth <= 576) {
      // Small screens (mobile) - show first, current, last, with ellipsis
      return (
        <>
          <li className={`page-item ${count === 1 ? "active" : ""}`}>
            <Link
              className="page-link"
              to={`quest/1`}
              onClick={() => handlePageClick(1)}
            >
              1
            </Link>
          </li>
          {count > 2 && (
            <li className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          )}
          {count > 1 && count < links.length && (
            <li className={`page-item active`}>
              <Link
                className="page-link"
                to={`quest/${count}`}
                onClick={() => handlePageClick(count)}
              >
                {count}
              </Link>
            </li>
          )}
          {count < links.length - 1 && (
            <li className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          )}
          <li className={`page-item ${count === links.length ? "active" : ""}`}>
            <Link
              className="page-link"
              to={`quest/${links.length}`}
              onClick={() => handlePageClick(links.length)}
            >
              {links.length}
            </Link>
          </li>
        </>
      );
    } else {
      // Larger screens - show all page numbers
      return links.map((val, i) => (
        <li key={i} className={`page-item ${count === i + 1 ? "active" : ""}`}>
          <Link
            className="page-link"
            to={`quest/${i + 1}`}
            onClick={() => handlePageClick(i + 1)}
          >
            {i + 1}
          </Link>
        </li>
      ));
    }
  };

  return (
    <div
      aria-label="Pagination Navigation"
      className="d-flex justify-content-center"
    >
      <ul className="pagination">
        {/* Previous button */}
        <li className={`page-item ${count === 1 ? "disabled" : ""}`}>
          <Link
            className="page-link"
            to={`quest/${count - 1}`}
            onClick={handlePrevious}
            aria-label="Previous"
          >
            Previous
          </Link>
        </li>

        {/* Page links (responsive) */}
        {renderPageLinks()}

        {/* Next button */}
        <li className={`page-item ${count === links.length ? "disabled" : ""}`}>
          <Link
            className="page-link"
            to={`quest/${count + 1}`}
            onClick={handleNext}
            aria-label="Next"
          >
            Next
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default QuestionListOfLinks;
