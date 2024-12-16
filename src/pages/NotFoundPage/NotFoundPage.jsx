import { NavLink } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={styles.notFoundPage}>
      <h1 className={styles.pageTitle}>Page Not Found</h1>
      <NavLink className={styles.homeLink} to="/">
        Go Back to Home
      </NavLink>
    </div>
  );
}

export default NotFoundPage;
