import { useParams, useLocation, useHistory } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { Link, useRouteMatch, Route } from "react-router-dom";
import s from "../MovieDetailsPage/MovieDetailsPage.module.css";
import { fetchMovieById } from "../../../Service/Service";
// import Cast from "../Cast/Cast";
// import Reviews from "../Reviews/Reviews";

const Cast = lazy(() => import("../Cast/Cast" /*webpackChunkName: "Cast"*/));
const Reviews = lazy(() =>
  import("../Reviews/Reviews" /*webpackChunkName: "Reviews"*/)
);

export default function MovieDetailsPage() {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const { moviesId } = useParams();
  const [movie, setMovie] = useState([]);
  const [status, setStatus] = useState("pending");
  const location = useLocation();

  // console.log("location:MovieDetailsPage", location);
  // console.log("history:MovieDetailsPage", history);

  function onGoBack() {
    // history.goBack();
    history.push(location?.state?.from ?? "/");
  }

  useEffect(() => {
    if (!moviesId) {
      return;
    }
    getMovieById();
    // eslint-disable-next-line
  }, []);

  function getMovieById() {
    setStatus("pending");
    fetchMovieById(moviesId)
      .then((respons) => {
        setMovie(respons);
        setStatus("resolve");
      })
      .catch((error) => {
        console.log(`error: ${error}`);
      });
  }

  if (status === "pending") {
    return <div>Loading...</div>;
  }
  if (status === "resolve") {
    return (
      <div className={s.container}>
        <button type="button" className={s.button} onClick={onGoBack}>
          Go back
        </button>
        <div className={s.fieldWhithPoster}>
          <img
            className={s.poster}
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
          />
          <div className={s.infoAboutFilm}>
            {movie.original_title ? (
              <h1>
                {movie.original_title}(
                {new Date(movie.release_date).getFullYear()})
              </h1>
            ) : (
              <h1>
                {movie.title}({new Date(movie.release_date).getFullYear()})
              </h1>
            )}
            <p>User Score: {Math.round(movie.vote_average)}%</p>
            <h2 className={s.titles}>Overview</h2>
            <p className={s.genresList}>{movie.overview}</p>
            <h2 className={s.titles}>Genres</h2>
            <p className={s.genresList}>
              {movie.genres.map((genre) => (
                <span key={genre.id}>{genre.name} </span>
              ))}
            </p>
          </div>
        </div>
        <div className={s.additionalInfo}>
          <h3>Additional information</h3>
          <ul>
            <li>
              <Link to={`${url}/cast`}>Cast</Link>
            </li>
            <li>
              <Link to={`${url}/reviews`}>Reviews</Link>
            </li>
          </ul>
        </div>
        <Suspense fallback={<h1>LOADING...</h1>}>
          <Route path={`${path}/cast`}>
            <Cast />
          </Route>
          <Route path={`${path}/reviews`}>
            <Reviews />
          </Route>
        </Suspense>
      </div>
    );
  }
}
