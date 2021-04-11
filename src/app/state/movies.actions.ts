import { createAction, props } from '@ngrx/store';
 
 
export const retrievedMovieList = createAction(
  '[Movie List/API] Retrieve Movie List Success',
  props<{ Movie }>()
);