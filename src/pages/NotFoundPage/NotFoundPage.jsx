import { Link } from "react-router-dom";
import css from "./NotFound.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page Not Found</h1>
      <p className={css.message}>
        Oops! The page youre looking for doesnt exist.
      </p>
      <Link to="/" className={css.homeLink}>
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
