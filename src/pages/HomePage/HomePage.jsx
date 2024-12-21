import { useState, useEffect } from "react";
import { getMoviesList } from "../../Api/apiMovie.js";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import css from "./HomePage.module.css";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMoviesList = async () => {
      setIsLoading(true);
      try {
        const data = await getMoviesList();
        if (data && data.results) {
          setMovies(data.results);
          console.log("Movies:", data.results);
        } else {
          console.warn("No results found in API response:", data);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoviesList();
  }, []);

  return (
    <div className={css.homePage}>
      <h1 className={css.today}>Trending today</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <ul>
          {movies.length > 0 ? (
            <MovieList movies={movies} />
          ) : (
            <p>No movies available.</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default HomePage;
