import { createSelector } from "@ngrx/store";
import { AppState } from "./app.state";
import { Movie } from "../movie-list/movies.model";

export const selectMovies = createSelector(
  (state: AppState) => state.movies,
  (movies: Array<Movie>) => movies
);

