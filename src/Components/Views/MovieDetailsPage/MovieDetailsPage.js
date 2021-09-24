import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link, useRouteMatch, Route } from "react-router-dom";
import s from "../MovieDetailsPage/MovieDetailsPage.module.css";
import { fetchMovieById } from "../../../Service/Service";
import Cast from "../Cast/Cast";
import Reviews from "../Reviews/Reviews";

const API_KEY = "ef978c42f38b248eb391638f72cc0144";

export default function MovieDetailsPage() {
  const { path, url } = useRouteMatch();
  const { moviesId } = useParams();
  const [movie, setMovie] = useState([]);
  const [status, setStatus] = useState("pending");

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
  // console.log(movie.genres.map((ganr) => ganr.name));

  if (status === "pending") {
    return <div>Loading...</div>;
  }
  if (status === "resolve") {
    return (
      <div className={s.container}>
        <button type="button" className={s.button}>
          Go back
        </button>
        <div className={s.fieldWhithPoster}>
          <img
            className={s.poster}
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}?api_key=${API_KEY}`}
            alt={movie.title}
          />
          <div className={s.infoAboutFilm}>
            {movie.original_title ? (
              <h1>{movie.original_title}</h1>
            ) : (
              <h1>{movie.title}</h1>
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
        <Route path={`${path}/cast`}>
          <Cast />
        </Route>
        <Route path={`${path}/reviews`}>
          <Reviews />
        </Route>
      </div>
    );
  }
}
