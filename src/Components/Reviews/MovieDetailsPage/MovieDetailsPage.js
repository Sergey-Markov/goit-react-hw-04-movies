import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMovieById } from "../../../Service/Service";

export default function MovieDetailsPage() {
  const { moviesId } = useParams();
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetchMovieById(moviesId).then((respons) => {
      setMovie(respons);
    });
  }, [moviesId]);
  console.log(movie);
  return (
    <div>
      {/* {moviesId && <>
                <img src={}
            </>} */}
    </div>
  );
}
