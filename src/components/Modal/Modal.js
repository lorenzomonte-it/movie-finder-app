import Loader from "../Loader/Loader";
import "./module.style.css";

const movieImgPlaceholder =
  "https://www.reggiofilmfestival.it/wp-content/themes/virtue/assets/img/placeholder-min.jpg";

function Modal({ open, close, movieDetail }) {
  const isLoading = Object.keys(movieDetail).length === 0;
  const movieImg =
    movieDetail.Poster === "N/A" ? movieImgPlaceholder : movieDetail.Poster;
  const moviePlot = movieDetail.Plot === "N/A" ? "..." : movieDetail.Plot;

  return (
    <div className={open ? "modal-container open" : "modal-container"}>
      <div className={isLoading ? "modal loader" : "modal"}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <button
              type="button"
              className="btn btn-primary modal-btn-close"
              onClick={close}
            >
              &#215;
            </button>

            <img src={movieImg} alt={movieDetail.Title} />

            <div className="modal__info">
              <h2>{movieDetail.Title}</h2>

              <ul className="modal__info__summary">
                <li>
                  Duration: <strong>{movieDetail.Runtime}</strong>
                </li>
                <li>
                  Genre: <strong>{movieDetail.Genre}</strong>
                </li>
                <li>
                  Language: <strong>{movieDetail.Language}</strong>
                </li>
                <li>
                  Released: <strong>{movieDetail.Released}</strong>
                </li>
              </ul>

              <p className="modal__info__plot">{moviePlot}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Modal;
