import { NavLink } from "react-router-dom";
import s from "../Navigation/Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={s.navigation}>
      <NavLink to="/" exact className={s.items} activeClassName={s.activeLink}>
        Home
      </NavLink>
      <NavLink to="/movies" className={s.items} activeClassName={s.activeLink}>
        Movie
      </NavLink>
    </nav>
  );
}
