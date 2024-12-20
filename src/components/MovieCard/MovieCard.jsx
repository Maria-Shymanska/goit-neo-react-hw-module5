import css from "./MovieCard.module.css";
import { AiFillVideoCamera } from "react-icons/ai";
import { NavLink, useLocation } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const imgBaseUrl = "https://image.tmdb.org/t/p/w300";
  const location = useLocation();
  return (
    <NavLink
      to={`/movies/${movie.id}`}
      state={{ from: location.pathname, search: location.search }}
    >
      <h2 className={css.title}>{movie.title} </h2>
      <img
        className={css.image}
        src={
          movie.poster_path
            ? `${imgBaseUrl}${movie.poster_path}`
            : AiFillVideoCamera
        }
        alt={movie.title || "Image not available"}
      />
    </NavLink>
  );
};

export default MovieCard;
