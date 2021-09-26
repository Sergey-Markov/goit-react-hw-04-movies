// import "./App.css";
import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
// import HomePage from "./Components/HomePage/HomePage";
// import MoviesPage from "./Components/MoviesPage/MoviesPage";
import Navigation from "./Components/Navigation/Navigation";
// import NotFoundView from "./Components/NotFoundView/NotFoundView";
// import MovieDetailsPage from "./Components/Views/MovieDetailsPage/MovieDetailsPage";

const HomePage = lazy(() =>
  import("./Components/HomePage/HomePage" /*webpackChunkName: "HomePage" */)
);
const MoviesPage = lazy(() =>
  import(
    "./Components/MoviesPage/MoviesPage" /*webpackChunkName: "MoviesPage" */
  )
);
const NotFoundView = lazy(() =>
  import(
    "./Components/NotFoundView/NotFoundView" /*webpackChunkName: "NotFoundView" */
  )
);
const MovieDetailsPage = lazy(() =>
  import(
    "./Components/Views/MovieDetailsPage/MovieDetailsPage" /*webpackChunkName: "MovieDetailsPage" */
  )
);

function App() {
  return (
    <div>
      <Navigation />
      <hr />

      <Suspense fallback={<h1>LOADING...</h1>}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies/:moviesId">
            <MovieDetailsPage />
          </Route>
          <Route path="/movies/">
            <MoviesPage />
          </Route>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
