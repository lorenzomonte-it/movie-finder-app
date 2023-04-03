import { useState } from "react";
import "../Search/module.style.css";

function Search({ setSearchTerm, setCurrentPage }) {
  const [term, setTerm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleClickHint = (value) => {
    setTerm(value);
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <div className="search-form-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="search"
          name="search"
          placeholder="Search movie by title..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      <div className="search-form-hint">
        Try to search by:{" "}
        <button
          type="button"
          className="btn btn-link"
          onClick={() => handleClickHint("Harry potter")}
        >
          Harry potter
        </button>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => handleClickHint("Iron man")}
        >
          Iron man
        </button>
        <button
          type="button"
          className="btn btn-link"
          onClick={() => handleClickHint("Captain america")}
        >
          Captain america
        </button>
      </div>
    </div>
  );
}

export default Search;
