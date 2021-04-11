import { HttpClient,HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Movie } from "./movies.model";
import { environment } from '../../environments/environment';

@Injectable({ providedIn: "root" })
export class TMDBMovieService {
    API_BASE = environment.API_BASE;
    API_KEY = environment.API_KEY;
    body: any;
    err: any;
  constructor(private http: HttpClient) {}

  formatParams(options) {
    let params = new HttpParams()
      .set('api_key', this.API_KEY);

    if (options) {
      Object.keys(options).forEach(function (key) {
        params = params.append(key, options[key]);
      });
    }
    return { params };
  }
  sortByList(): Array<any> {
    return [
      { key: 'popularity.desc', value: 'Popularity Descending' },
      { key: 'popularity.asc', value: 'Popularity Ascending' },
      { key: 'vote_count.asc', value: 'Rating Ascending' },
      { key: 'vote_count.desc', value: 'Rating Descending' },
      { key: 'primary_release_date.desc', value: 'Release Date Descending' },
      { key: 'primary_release_date.asc', value: 'Release Date Ascending' }
    ];
  }

  getYears(): Array<number> {
    const year = new Date().getFullYear();
    const yearList = [];
    for (let i = 0; i < 10; i++) {
      yearList.push(year - i);
    }
    return yearList;
  }
  getMovies(options): Observable<Array<Movie>> {
    const discoverUrl = `${this.API_BASE}discover/movie?api_key=${this.API_KEY}`;
    return this.http
      .get<{ results: Movie[] }>(discoverUrl, this.formatParams(options)).pipe(
        map(movies => movies.results || []),
        catchError(this.handleError)
      );
  }
  getMovieDetails(movieId): Observable<Response> {
    const movieDetilasUrl = `${this.API_BASE}movie/${movieId}`;
    return this.http.get(movieDetilasUrl, this.formatParams({})).pipe(
      map((res: Response) => res),
      catchError(this.handleError)
    );
  }
  getCastMovie(movie_id): Observable<Response> {
    const castUrl = `${this.API_BASE}movie/${movie_id}/credits?api_key=${this.API_KEY
      }`;
    return this.http.get(castUrl).pipe(
      map((res: Response) => res),
      catchError(this.handleError)
    );
  }
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      this.body = error || '';
      this.err = this.body.error || JSON.stringify(this.body);
      errMsg = `${error.status} - ${error.statusText || ''} ${this.err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
