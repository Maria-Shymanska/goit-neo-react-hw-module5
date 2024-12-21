import axios from "axios";
import { Suspense, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import getApiOptions from "../../Api/ApiConfig.jsx";

import css from "./MovieDetailsPage.module.css";

import placeHolderImg from "../../assets/images/placeHolderImg.jpg";
import { BackLink } from "../../components/BackLink/BackLink.jsx";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = `https://api.themoviedb.org/3/movie/${movieId}`;
  const imgBaseUrl = "https://image.tmdb.org/t/p/";
  const location = useLocation();
  const backLinkHref = location.state?.from || "/movies";
  const backSearch = location.state?.search || "";
  const fullBackLink = backSearch
    ? `${backLinkHref}${backSearch}`
    : backLinkHref;
  const castRef = useRef(null);
  const reviewsRef = useRef(null);
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url, getApiOptions);
        setMovie(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [url]);

  const scrollToSection = (ref) => {
    if (ref.current) {
      setTimeout(() => {
        ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 250);
    }
  };
  if (loading) {
    return <div>Loading movie details...</div>;
  }

  if (!movie) {
    return <div>No movie found.</div>;
  }

  return (
    <section className="section">
      <div className="container">
        <h1 className={css.ttl}>{movie.title}</h1>
        <BackLink to={fullBackLink}>Back to movies</BackLink>
        <div className={css.movieDetails}>
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet={`${imgBaseUrl}w300${movie.poster_path}`}
            />
            <source
              media="(min-width: 769px)"
              srcSet={`${imgBaseUrl}w400${movie.poster_path}`}
            />
            <img
              className={css.image}
              src={
                movie.poster_path
                  ? `${imgBaseUrl}w500${movie.poster_path}`
                  : placeHolderImg
              }
              alt={movie.title || "Movie Poster"}
            />
          </picture>
          <div className={css.addDetails}>
            <div>
              <h2 className={css.subTtl}>Description</h2>
              <p>{movie.overview}</p>
            </div>
            <div>
              <h2 className={css.subTtl}>Genres</h2>
              <p>
                {movie.genres && movie.genres.length > 0
                  ? movie.genres.map((genre) => genre.name).join(", ")
                  : "No genres available"}
              </p>
            </div>
            <div>
              <h2 className={css.subTtl}>Popularity</h2>
              <p>{movie.popularity}</p>
            </div>
            <div>
              <h2 className={css.subTtl}>Rating</h2>
              <p>{movie.vote_average}</p>
            </div>
          </div>
        </div>
        <ul className={css.infoList}>
          <li className={css.infoItem} ref={castRef}>
            <Link
              to="cast"
              state={{ from: fullBackLink }}
              className={css.link}
              onClick={() => scrollToSection(castRef)}
            >
              Actors
            </Link>
          </li>
          <li className={css.infoItem} ref={reviewsRef}>
            <Link
              to="reviews"
              state={{ from: fullBackLink }}
              className={css.link}
              onClick={() => scrollToSection(reviewsRef)}
            >
              Reviews
            </Link>
          </li>
        </ul>
        <Suspense fallback={<div>Loading subpage...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </section>
  );
};

export default MovieDetailsPage;
