import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link, useRouteMatch, Route } from "react-router-dom";
import s from "../MovieDetailsPage/MovieDetailsPage.module.css";
import { fetchMovieById } from "../../../Service/Service";
import Cast from "../Cast/Cast";

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
      </div>
    );
  }
}

// adult: false
// backdrop_path: "/ck8zSCD4YppPjMbA8h6GDcPJPhH.jpg"
// belongs_to_collection: null
// budget: 0
// genres: [{…}]
// homepage: "https://www.netflix.com/title/80206420"
// id: 785752
// imdb_id: "tt5563324"
// original_language: "en"
// original_title: "Intrusion"
// overview: "When a husband and wife move to a small town, a home invasion leaves the wife traumatized and suspicious that those around her might not be who they seem."
// popularity: 47.922
// poster_path: "/a2Q3yI7E7kmlRW3c6z996JIOw2y.jpg"
// production_companies: (3) [{…}, {…}, {…}]
// production_countries: [{…}]
// release_date: "2021-09-22"
// revenue: 0
// runtime: 93
// spoken_languages: [{…}]
// status: "Released"
// tagline: "The quietest towns hide the darkest secrets."
// title: "Intrusion"
// video: false
// vote_average: 6.3
