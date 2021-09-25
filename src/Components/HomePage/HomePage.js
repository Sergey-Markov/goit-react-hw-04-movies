import { useEffect, useState } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import * as fetchFilmsAPI from "../../Service/Service";
import s from "../HomePage/HomePage.module.css";

export default function HomePage() {
  const [trendFilms, setTrendFilms] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const { url } = useRouteMatch();
  useEffect(() => {
    fetchFilmsAPI.fetchTrendFilms().then((response) => {
      setTrendFilms(response.results);
    });
  }, []);

  // trendFilms.map(film=> console.log(film.original_title));
  return (
    <>
      <h1 className={s.title}>Trending today:</h1>
      <ul className={s.filmsList}>
        {trendFilms &&
          trendFilms.map((film) => (
            <li key={film.id}>
              <NavLink to={`${url}movies/${film.id}`}>
                {film.original_title}
              </NavLink>
            </li>
          ))}
      </ul>
    </>
  );
}

// adult: false
// backdrop_path: "/byflnwPMumyvrCW9SfO5Miq3647.jpg"
// genre_ids: (2) [28, 53]
// id: 597891
// media_type: "movie"
// original_language: "en"
// original_title: "Kate"
// overview: "After she's irreversibly poisoned, a ruthless criminal operative has less than 24 hours to exact revenge on her enemies and in the process forms an unexpected bond with the daughter of one of her past victims."
// popularity: 1170.508
// poster_path: "/uQWgSRXeYRWCvGIX9LDNBW6XBYD.jpg"
// release_date: "2021-09-10"
// title: "Kate"
// video: false
// vote_average: 6.7
// vote_count: 301
