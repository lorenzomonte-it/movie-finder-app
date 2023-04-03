import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Loader from "./components/Loader/Loader.js";
import Search from "./components/Search/Search.js";
import Movies from "./components/Movies/Movies.js";
import Modal from "./components/Modal/Modal.js";
import Pagination from "./components/Pagination/Pagination.js";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [movieDetail, setMovieDetail] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [totalMovies, setTotalMovies] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState(null);

  // Fetch requests
  const fetchMovies = useCallback(async (title, page) => {
    setErrors(null);
    setMovieList([]);
    setTotalMovies(0);
    setLoader(true);

    await axios
      .get(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_APIKEY}&s=${title}&type=movie&page=${page}`
      )
      .then((res) => {
        if (res.data.Response === "True") {
          setTotalMovies(res.data.totalResults);
          setTotalPages(Math.ceil(res.data.totalResults / 10));
          setMovieList(res.data.Search);
        } else {
          setErrors(res.data.Error);
        }
      })
      .catch(() => {
        setErrors("There was a problem. Retry later.");
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  const fetchMovieDetail = async (imdbID) => {
    setMovieDetail({});
    await axios
      .get(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_APIKEY}&i=${imdbID}`
      )
      .then((res) => {
        setMovieDetail(res.data);
      })
      .catch((err) => {
        console.error("ERR: ", err);
      });
  };

  // Modal
  const handleCloseModal = () => {
    document.body.classList.remove("modal-active");
    setOpenModal(false);
  };

  const getMovieDetail = (imdbID) => {
    document.body.classList.add("modal-active");
    setOpenModal(true);
    fetchMovieDetail(imdbID);
  };

  // Pagination
  const handleChangePage = (count) => {
    setCurrentPage((prevState) => {
      return prevState + count;
    });
  };

  // UseEffects
  useEffect(() => {
    if (searchTerm !== "") {
      fetchMovies(searchTerm, currentPage);
    }
  }, [searchTerm, fetchMovies, currentPage]);

  return (
    <>
      <div className="container">
        <a href="/">
          <h1>Movie finder</h1>
        </a>

        <Search setSearchTerm={setSearchTerm} setCurrentPage={setCurrentPage} />

        <Movies movieList={movieList} getMovieDetail={getMovieDetail} />

        {movieList.length > 0 && (
          <Pagination
            totalMovies={totalMovies}
            totalPages={totalPages}
            currentPage={currentPage}
            handleChangePage={handleChangePage}
          />
        )}

        {loader && <Loader />}

        {errors && <div className="errors">{errors}</div>}
      </div>

      <Modal
        open={openModal}
        close={handleCloseModal}
        movieDetail={movieDetail}
      />
    </>
  );
}

export default App;
