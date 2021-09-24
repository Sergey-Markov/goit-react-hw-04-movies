const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "ef978c42f38b248eb391638f72cc0144";

export async function fetchWithErrorFilms(url = "") {
  const response = await fetch(url);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error("Это ошибка, её нужно как-то решить"));
}

export function fetchTrendFilms() {
  return fetchWithErrorFilms(
    `${BASE_URL}trending/movie/day?api_key=${API_KEY}`
  );
}

export function fetchMoviesBySearch(search, page) {
  return fetchWithErrorFilms(
    `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false&query=${search}`
  );
}

export function fetchMovieById(id) {
  return fetchWithErrorFilms(
    `${BASE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`
  );
}

export function fetchMovieCasts(id) {
  return fetchWithErrorFilms(
    `${BASE_URL}movie/${id}/credits?api_key=${API_KEY}&language=en-US`
  );
}

export function fetchMovieReviews(id) {
  return fetchWithErrorFilms(
    `${BASE_URL}movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );
}
