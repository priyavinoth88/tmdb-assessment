import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Movie } from "./movies.model";
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Component({
  selector: "app-movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrls: ["./movie-list.component.scss"]
})
export class MovieListComponent {
  @Input() movies: Array<Movie>;
  imgURL : any;
  placeholderImg : any;
  constructor(
    private router: Router
  ){
    this.imgURL = environment.imgUrl;
    this.placeholderImg = environment.placeholderImg;
  }

  goToMovieDetails(movie) {
    this.router.navigate(['/movie', movie.id]);
  }
}
