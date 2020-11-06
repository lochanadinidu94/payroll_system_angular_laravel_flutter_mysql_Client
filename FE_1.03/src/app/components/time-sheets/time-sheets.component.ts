import {Component, OnInit} from '@angular/core';
import {NavBarComponent} from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-time-sheets',
  templateUrl: './time-sheets.component.html',
  styleUrls: ['./time-sheets.component.css']
})
export class TimeSheetsComponent implements OnInit {

  navName;

  constructor() {
    this.navName = 'Time-Sheets';
  }

  ngOnInit(): void {
  }

}
