import { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
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

  useEffect(() => {
    const fetchMovies = async () => {
      if (!searchQuery) return;

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

  const validationSchema = Yup.object().shape({
    query: Yup.string()
      .trim()
      .min(2, "Search query must be at least 2 characters long")
      .required("Search query is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    setSearchQuery(values.query.trim().toLowerCase());
    setHasSearched(true);
    resetForm();
  };

  return (
    <div className={css.formContainer}>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
            <Field
              className={css.inputSearch}
              name="query"
              type="text"
              placeholder="Search movies"
            />
            {errors.query && touched.query && (
              <p className={css.errorText}>{errors.query}</p>
            )}
            <button className={css.buttonSearch} type="submit">
              Search
            </button>
          </Form>
        )}
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
