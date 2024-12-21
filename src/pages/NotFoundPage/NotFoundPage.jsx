import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <h1>Oops! Page not found!</h1>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default NotFoundPage;
