import { useLocation, useNavigate } from "react-router-dom";

const MovieDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Попереднє місцезнаходження або шлях за замовчуванням
  const backLink = location.state?.from || "/movies";

  const handleGoBack = () => {
    navigate(backLink);
  };

  return (
    <div>
      <h1>Movie Details</h1>
      {}

      <button onClick={handleGoBack}>Go back</button>
    </div>
  );
};

export default MovieDetails;
