import SearchForm from "../SearchForm/SearchForm";
import { useState, useEffect } from "react";
import { fetchMoviesBySearch } from "../../Service/Service";
import { NavLink, useRouteMatch } from "react-router-dom";
import s from "../MoviesPage/MoviesPage.module.css";

export default function MoviesPage() {
  const [search, setSearch] = useState("");
  const [searchMovie, setSearchMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("idle");
  const { url } = useRouteMatch();

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
    fetchMoviesBySearch(search, page)
      .then((response) => {
        setSearchMovie(response.results);
        setStatus("searching");
      })
      .catch((error) => {
        console.log(`error: ${error}`);
      });
  }
  function onChange(e) {
    const query = e.target.value.trim();
    setSearch(query);
  }
  async function onLoadMore() {
    await fetchMoviesBySearch(search, page)
      .then((response) => {
        setSearchMovie((prevState) => [...prevState, ...response.results]);
        setStatus("searching");
      })
      .catch((error) => {
        console.log(`error: ${error}`);
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
      <>
        <SearchForm onClick={onSubmitForm} onChange={onChange} />
        <div className={s.container}>
          <ul className={s.filmsList}>
            {searchMovie &&
              searchMovie.map((film) => (
                <li key={film.id}>
                  <NavLink to={`${url}/${film.id}`}>
                    {film.original_title} ({film.release_date})
                  </NavLink>
                </li>
              ))}
          </ul>
          <button type="button" onClick={nextPage} className={s.button}>
            Load more
          </button>
        </div>
      </>
    );
  }
}
