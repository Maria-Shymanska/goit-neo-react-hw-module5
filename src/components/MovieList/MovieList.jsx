import MovieCard from "../MovieCard/MovieCard";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  return (
    <div className="container">
      <ul className={css.movieList}>
        {movies.map((movie) => (
          <li key={movie.id} className={css.movieItem}>
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MovieList;
