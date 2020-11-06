import {Component, OnInit} from '@angular/core';
import {NavBarComponent} from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  navName;

  constructor() {
    this.navName = 'Payments';
  }

  ngOnInit(): void {
  }

}
