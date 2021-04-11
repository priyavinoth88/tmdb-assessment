import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Location } from '@angular/common';
import { TMDBMovieService } from "../movie-list/movies.service";
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movieId: string;
  movie: any;
  imageurl: any;
  constructor(
    private route: ActivatedRoute,
    private dbService: TMDBMovieService,
    public domSanitizer: DomSanitizer,
    private titleService: Title,
    private location: Location,
    private router: Router
  ) {
    this.domSanitizer = domSanitizer;
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      this.getMovieDetails(this.movieId);
    });
  }

  ngOnInit() {}

  getMovieDetails(id) {
    this.dbService.getMovieDetails(id).subscribe((res: any) => {
      this.movie = res;
      this.getCast();
      this.titleService.setTitle(res.title);
      if(this.movie.poster_path != null)  {
      this.movie.poster_path = `${environment.imgUrl}${this.movie.poster_path}`;
      this.movie.backdrop_path = `https://image.tmdb.org/t/p/original${
        this.movie.backdrop_path
      }`;
      this.imageurl="url('"+this.movie.backdrop_path+"')";
    } else {
      this.imageurl="linear-gradient(to top right, #000000, #0d0d0d)";
    }
    });
  }

  goToMovieDetails(movie) {
    this.router.navigate(['/movie', movie.id]);
  }

  getCast() {
    this.dbService.getCastMovie(this.movieId).subscribe(res => {
      this.movie.cast = res['cast'].slice(0, 10).map(cast => {
        cast.imgUrl = `${environment.imgUrl}${cast.profile_path}`;
        return cast;
      });
    });
  }

  back() {
    this.location.back();
  }

}
