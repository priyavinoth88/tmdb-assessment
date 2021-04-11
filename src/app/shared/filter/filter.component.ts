import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TMDBMovieService } from "../../movie-list/movies.service";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output() filterChange = new EventEmitter<any>();
  options: any;
  yearsList: Number[];
  sortByList: any;

  constructor(public DBService: TMDBMovieService) {
    this.options = {};
  }

  ngOnInit() {
    this.yearsList = this.DBService.getYears();
    this.sortByList = this.DBService.sortByList();
  }

  changeSelection() {
    this.filterChange.emit(this.options);
  }
}
