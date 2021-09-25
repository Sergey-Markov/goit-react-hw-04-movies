import * as fetchFilmsAPI from "../../../Service/Service";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// import s from "../Cast/Cast.module.css";

export default function Reviews() {
  const { moviesId } = useParams();
  const [movie, setMovie] = useState([]);
  const [status, setStatus] = useState("pending");
  const avtorArray = movie.results;
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
      .fetchMovieReviews(moviesId)
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
  if (status === "resolve" && movie.total_results !== 0) {
    return (
      <ul>
        {avtorArray.map((author) => {
          return (
            <li key={author.id} className="">
              <h4 className="">Author: {author.author}</h4>
              <p>{author.content}</p>
            </li>
          );
        })}
      </ul>
    );
  }
  return <p>There is no reviews about watching this movie yet.</p>;
}
