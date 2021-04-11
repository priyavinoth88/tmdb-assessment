import { Component } from "@angular/core";
import { Store, select } from "@ngrx/store";

import { selectMovies } from "./state/movies.selectors";
import { retrievedMovieList } from "./state/movies.actions";
import { TMDBMovieService } from "./movie-list/movies.service";

@Component({
  selector: "app-movies",
  template: `
  <div class="container">
  <h2>New Movies</h2>
    <app-filter (filterChange)="changeSelection($event)"></app-filter>
  </div>
  <app-movie-list
  [movies]="movies$ | async">
  </app-movie-list>
  `,
  styleUrls: ['./app.component.scss']
})
export class MoviesComponent {
  options = { page:1 };  
  movies$ = this.store.pipe(select(selectMovies));

  constructor(private moviesService: TMDBMovieService, private store: Store) {
    this.getDiscover(this.options);
  }
  getDiscover(options) {
    this.moviesService
      .getMovies(options)
      .subscribe(Movie => this.store.dispatch(retrievedMovieList({ Movie })));
  }
  changeSelection(options) {
    this.getDiscover(options);
  }
  ngOnInit() {
    
  }
}
