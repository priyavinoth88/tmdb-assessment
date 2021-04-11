import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  themeName = 'indigo';
  title = 'tmdb-assessment';
  colors = [
    { color: 'purple' },
    { color: 'grey' },
  ];

  changeTheme(color:any) {
    this.themeName = color;
  }

}
