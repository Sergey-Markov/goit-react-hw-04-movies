import SearchForm from "../SearchForm/SearchForm";
import { useState, useEffect } from "react";
import { fetchMoviesBySearch } from "../../Service/Service";
import { NavLink } from "react-router-dom";
import s from "../MoviesPage/MoviesPage.module.css";

export default function MoviesPage() {
  const [search, setSearch] = useState("");
  const [searchMovie, setSearchMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!search) {
      setStatus("idle");
      return;
    }
  }, [search]);

  useEffect(() => {
    if (page > 1) onLoadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function onSubmitForm() {
    if (!search) {
      alert("Please, enter yours title of film for searching");
      return;
    }
    fetchMoviesBySearch(search, page).then((response) => {
      setSearchMovie(response.results);
      setStatus("searching");
    });
  }
  function onChange(e) {
    const query = e.target.value.trim();
    setSearch(query);
  }
  async function onLoadMore() {
    await fetchMoviesBySearch(search, page).then((response) => {
      setSearchMovie((prevState) => [...prevState, ...response.results]);
      setStatus("searching");
    });
  }
  function nextPage(page) {
    setPage((prevState) => prevState + 1);
  }

  if (status === "idle") {
    return <SearchForm onClick={onSubmitForm} onChange={onChange} />;
  }
  if (status === "searching") {
    return (
      <div className={s.container}>
        <ul className={s.filmsList}>
          {searchMovie &&
            searchMovie.map((film) => (
              <li key={film.id}>
                <NavLink to="/films/:movie">
                  {film.original_title} ({film.release_date})
                </NavLink>
              </li>
            ))}
        </ul>
        <button type="button" onClick={nextPage} className={s.button}>
          Load more
        </button>
      </div>
    );
  }
}
// adult: false
// backdrop_path: "/mCaolOVQ5Y9Hfv3R2izakXo6UJg.jpg"
// genre_ids: (2) [27, 53]
// id: 565028
// original_language: "en"
// original_title: "Candyman"
// overview: "Anthony and his partner move into a loft in the now gentrified Cabrini-Green, and after a chance encounter with an old-timer exposes Anthony to the true story behind Candyman, he unknowingly opens a door to a complex past that unravels his own sanity and unleashes a terrifying wave of violence."
// popularity: 657.385
// poster_path: "/dqoshZPLNsXlC1qtz5n34raUyrE.jpg"
// release_date: "2021-08-25"
// title: "Candyman"
// video: false
// vote_average: 6.6
// vote_count: 258
