// import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import MoviesPage from "./Components/MoviesPage/MoviesPage";
import Navigation from "./Components/Navigation/Navigation";
import NotFoundView from "./Components/NotFoundView/NotFoundView";
import MovieDetailsPage from "./Components/Views/MovieDetailsPage/MovieDetailsPage";

function App() {
  return (
    <div>
      <Navigation />
      <hr />

      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/movies/:moviesId">
          <MovieDetailsPage />
        </Route>
        <Route path="/movie">
          <MoviesPage />
        </Route>

        <Route>
          <NotFoundView />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
