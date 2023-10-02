import { Component } from '@angular/core';
import { SrollHelper } from 'ngx-many-sticky';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ngx-multi-sticky';

  srollHelper = SrollHelper;

  testRows: number[] = [];
  subTestRows: number[] = [];
  constructor() {
    for (let index = 0; index < 250; index++) {
      this.testRows.push(index);
    }
    for (let index = 0; index < 5; index++) {
      this.subTestRows.push(index);
    }
  }
}
