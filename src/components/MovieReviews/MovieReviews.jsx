import axios from "axios";
import { useEffect, useState } from "react";
import getApiOptions from "../../utils/apiConfig.js";

import { useParams } from "react-router-dom";

import css from "./MovieReviews.module.css";
import ReviewCard from "../ReviewCard/ReviewCard";

const MovieReviews = () => {
  const movieId = useParams().movieId;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovies = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews`;
        const response = await axios.get(url, getApiOptions);
        setReviews(response.data.results);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMovies();
  }, [movieId]);

  return (
    <div className="container">
      <ul>
        {reviews.map((review) => (
          <li key={review.id} className={css.reviewItem}>
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
