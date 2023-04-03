import "./module.style.css";

const Pagination = ({
  totalMovies,
  totalPages,
  currentPage,
  handleChangePage,
}) => {
  return (
    <div className="pagination-container">
      <span>Total movies: {totalMovies}</span>

      {totalPages > 1 && (
        <ul className="pagination">
          <li className="pagination__item">
            <button
              type="button"
              className="btn btn-primary"
              disabled={currentPage === 1}
              onClick={() => handleChangePage(-1)}
            >
              <span className="pagination__arrow pagination__arrow--left"></span>
            </button>
          </li>

          <li className="pagination__item pagination__pages">
            {currentPage} of {totalPages}
          </li>

          <li className="pagination__item">
            <button
              type="button"
              className="btn btn-primary"
              disabled={currentPage === totalPages ? true : false}
              onClick={() => handleChangePage(1)}
            >
              <span className="pagination__arrow pagination__arrow--right"></span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Pagination;
