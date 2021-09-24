import * as fetchFilmsAPI from "../../../Service/Service";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import s from "../Cast/Cast.module.css";

export default function Cast() {
  const { moviesId } = useParams();
  const [movie, setMovie] = useState([]);
  const [status, setStatus] = useState("pending");
  useEffect(() => {
    if (!moviesId) {
      return;
    }
    getCasts();
    // eslint-disable-next-line
  }, [moviesId]);

  function getCasts() {
    setStatus("pending");
    fetchFilmsAPI
      .fetchMovieCasts(moviesId)
      .then((respons) => {
        setMovie(respons.cast);
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
    console.log(movie);
    return (
      <ul>
        {movie.map((actor) => {
          if (!actor.profile_path) {
            // eslint-disable-next-line
            return;
          } else {
            return (
              <li key={actor.id} className={s.actorItems}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.original_name ? actor.original_name : actor.name}
                />
                {actor.original_name ? (
                  <p className={s.infoAboutActor}>{actor.original_name}</p>
                ) : (
                  <p className={s.infoAboutActor}>{actor.name}</p>
                )}
                <p className={s.infoAboutActor}>character: {actor.character}</p>
              </li>
            );
          }
        })}
      </ul>
    );
  }
}

// adult: false
// cast_id: 0
// character: "Dominic Toretto"
// credit_id: "58433f95c3a3684813001d9f"
// gender: 2
// id: 12835
// known_for_department: "Acting"
// name: "Vin Diesel"
// order: 0
// original_name: "Vin Diesel"
// popularity: 27.967
// profile_path: "/9uxTwqB8anAiPomB6Kqm6A73VTV.jpg"
