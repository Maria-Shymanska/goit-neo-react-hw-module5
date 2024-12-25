import { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MovieList from "../../components/MovieList/MovieList.jsx";

import { searchMovie } from "../../Api/apiMovie.js";
import css from "./MoviesPage.module.css";
import Loader from "../../components/Loader/Loader";

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(!!queryParam);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!queryParam) return;

      setIsLoading(true);
      try {
        const data = await searchMovie(queryParam);
        setMovies(data.results);
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
  }, [queryParam]);

  const validationSchema = Yup.object().shape({
    query: Yup.string()
      .trim()
      .min(2, "Search query must be at least 2 characters long")
      .required("Search query is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const query = values.query.trim().toLowerCase();
    setSearchQuery(query);
    setSearchParams({ query });
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

      {isLoading ? (
        <Loader />
      ) : movies.length > 0 ? (
        <MovieList movies={movies} searchQuery={searchQuery} />
      ) : (
        hasSearched && <p className={css.noResults}>No movies found</p>
      )}
    </div>
  );
}

export default MoviesPage;
