import { createReducer, on, Action } from "@ngrx/store";

import { retrievedMovieList } from "./movies.actions";
import { Movie } from "../movie-list/movies.model";

export const initialState: ReadonlyArray<Movie> = [];

export const moviesReducer = createReducer(
  initialState,
  on(retrievedMovieList, (state, { Movie }) => [...Movie])
);
