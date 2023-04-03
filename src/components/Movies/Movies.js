import "./module.style.css";

const movieImgPlaceholder =
  "https://www.reggiofilmfestival.it/wp-content/themes/virtue/assets/img/placeholder-min.jpg";

function Movies({ movieList, getMovieDetail }) {
  return (
    movieList.length > 0 && (
      <>
        <div className="movie-list">
          {movieList.map((movie) => {
            const movieImg =
              movie.Poster === "N/A" ? movieImgPlaceholder : movie.Poster;
            return (
              <div
                key={movie.imdbID}
                className="movie-card"
                onClick={() => getMovieDetail(movie.imdbID)}
              >
                <img src={movieImg} alt={movie.Title} />
                <div className="movie-card__title">{movie.Title}</div>
              </div>
            );
          })}
        </div>
      </>
    )
  );
}

export default Movies;
