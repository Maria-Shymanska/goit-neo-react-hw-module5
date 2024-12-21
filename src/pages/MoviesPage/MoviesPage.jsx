import { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaCaretRight } from "react-icons/fa";
import { searchMovie } from "../../Api/apiMovie.js";
import css from "./MoviesPage.module.css";
import Loader from "../../components/Loader/Loader";

function MoviesPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  const [searchQuery, setSearchQuery] = useState(location.state?.query || "");
  const [movies, setMovies] = useState(location.state?.results || []);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(!!location.state?.query);

  const notify = () => {
    MySwal.fire({
      icon: "error",
      title: "Oops...",
      text: "The search query must be at least 2 characters long",
      didOpen: () => {
        const confirmButton = MySwal.getConfirmButton();
        confirmButton.style.backgroundColor = "#a4496d";
        confirmButton.style.color = "white";
        confirmButton.style.borderRadius = "5px";
        confirmButton.style.padding = "10px 20px";
      },
    });
  };

  const handleSubmit = (values, actions) => {
    const query = values.query.trim().toLowerCase();
    if (query.length < 2) {
      notify();
    } else {
      setSearchQuery(query);
      setHasSearched(true);
      actions.resetForm();
    }
  };

  useEffect(() => {
    if (!searchQuery) return;

    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const data = await searchMovie(searchQuery);
        setMovies(data.results);
        navigate("/movies", {
          state: { query: searchQuery, results: data.results },
        });
      } catch {
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch movies. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery, navigate]);

  return (
    <div className={css.formContainer}>
      <Formik initialValues={{ query: "" }} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <Field
            className={css.inputSearch}
            name="query"
            type="text"
            placeholder="Search movies"
          />
          <button className={css.buttonSearch} type="submit">
            Search
          </button>
        </Form>
      </Formik>

      <ul className={css.moviesList}>
        {isLoading ? (
          <Loader />
        ) : movies.length > 0 ? (
          movies.map((movie) => (
            <li key={movie.id}>
              <FaCaretRight className={css.iconMovieList} />
              <Link
                to={`/movies/${movie.id}`}
                state={{ query: searchQuery, results: movies }}
              >
                {movie.title}
              </Link>
            </li>
          ))
        ) : (
          hasSearched && <p className={css.noResults}>No movies found</p>
        )}
      </ul>
    </div>
  );
}

export default MoviesPage;
