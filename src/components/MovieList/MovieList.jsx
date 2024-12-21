import css from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";

function MovieList({ movies }) {
  const location = useLocation();

  return (
    <div>
      {movies.map((movie) => (
        <li className={css.item} key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
          </Link>
          <div className={css.content}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              <h4 className={css.title}>{movie.title}</h4>
            </Link>
            <div className={css.meta}>
              <p>Release date: {movie.release_date}</p>
              <p>
                <FaStar /> Rating:{movie.vote_average}
              </p>
            </div>
          </div>
        </li>
      ))}
    </div>
  );
}

export default MovieList;
