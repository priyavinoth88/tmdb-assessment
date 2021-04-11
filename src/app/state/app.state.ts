import { Movie } from "../movie-list/movies.model";

export interface AppState {
  movies: ReadonlyArray<Movie>;
}
