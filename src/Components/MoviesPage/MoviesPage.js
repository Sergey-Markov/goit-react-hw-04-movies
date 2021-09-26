import SearchForm from "../SearchForm/SearchForm";
import { useState, useEffect } from "react";
import { fetchMoviesBySearch } from "../../Service/Service";
import {
  NavLink,
  useRouteMatch,
  useLocation,
  useHistory,
} from "react-router-dom";
import s from "../MoviesPage/MoviesPage.module.css";

export default function MoviesPage() {
  const [search, setSearch] = useState("");
  const [searchMovie, setSearchMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("idle");
  const { url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const subSearch = history.location.search.substr(1);

  useEffect(() => {
    if (!subSearch) {
      return;
    }
    fetchMoviesBySearch(subSearch, page)
      .then((response) => {
        setSearchMovie(response.results);
        setStatus("searching");
      })
      .catch((error) => {
        console.log(`error: ${error}`);
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (page > 1) onLoadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // function onSubSearch(search) {
  //   fetchMoviesBySearch(search, page)
  //     .then((response) => {
  //       setSearchMovie(response.results);
  //       setStatus("searching");
  //     })
  //     .catch((error) => {
  //       console.log(`error: ${error}`);
  //     });
  // }

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
    history.push({
      pathname: url,
      search: `?${search}`,
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
  function nextPage() {
    setPage((prevState) => prevState + 1);
  }

  if (status === "idle") {
    return <SearchForm onClick={onSubmitForm} onChange={onChange} />;
  }
  if (status === "pending") {
    return <h1>LOADING...</h1>;
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
                  <NavLink
                    to={{
                      pathname: `${url}/${film.id}`,
                      state: {
                        from: location,
                      },
                    }}
                  >
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
