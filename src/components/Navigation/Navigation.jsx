import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          isActive ? css.activeLink : css.inactiveLink
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) =>
          isActive ? css.activeLink : css.inactiveLink
        }
      >
        Movies
      </NavLink>
    </nav>
  );
}

export default Navigation;
