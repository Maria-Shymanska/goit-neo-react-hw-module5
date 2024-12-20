import axios from "axios";
import { useEffect, useState } from "react";
import getApiOptions from "../../Api/ApiConfig.jsx";

import usePagination from "../../utils/usePagination.js";

import css from "./HomePage.module.css";

import MovieList from "../../components/MovieList/MovieList.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const savedPage = JSON.parse(sessionStorage.getItem("page")) || 1;

  const { currentPage, onNextPage, onPrevPage } = usePagination(
    savedPage,
    totalPages
  );

  const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${currentPage}`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(url, getApiOptions);
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, [currentPage]);

  return (
    <section className="section">
      <h1 className={css.homeTitle}>Trending Movies</h1>
      <MovieList movies={movies} />
      <Pagination
        currentPage={currentPage}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
        totalPages={totalPages}
      />
    </section>
  );
};

export default HomePage;
