import css from "./MovieList.module.css";

import { Link, useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";

function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.moviesList}>
      {movies.map((movie) => (
        <li className={css.item} key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={movie.title}
              className={css.poster}
            />
          </Link>
          <div className={css.content}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              <h4 className={css.title}>{movie.title}</h4>
            </Link>
            <div className={css.meta}>
              <p>Release date: {movie.release_date || "Unknown"}</p>
              <p>
                <FaStar className={css.ratingIcon} /> Rating:{" "}
                {movie.vote_average || "N/A"}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
