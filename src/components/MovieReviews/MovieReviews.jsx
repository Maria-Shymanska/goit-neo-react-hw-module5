import { getReviews } from "../../Api/apiMovie.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;

    const fetchReviews = async (id) => {
      try {
        const data = await getReviews(id);
        if (data && data.results) {
          setReviews(data.results);
          console.log("Fetched movie reviews:", data.results);
        } else {
          console.warn("No reviews found.");
        }
      } catch (error) {
        console.error("Failed to fetch movie reviews:", error);
      }
    };

    fetchReviews(movieId);
  }, [movieId]);

  if (!reviews.length) return <p>No reviews available for this movie.</p>;

  return (
    <div>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <h4>Author: {review.author}</h4>
            <p>Review: {review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieReviews;
