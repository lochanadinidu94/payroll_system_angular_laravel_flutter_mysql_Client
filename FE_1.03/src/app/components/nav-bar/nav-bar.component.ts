import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  navName;
  navUser;
  navClient;

  logedUserName;
  logedUserId;

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, public sessionSt: SessionStorageService, public localSt: LocalStorageService, private router: Router) {
  }


  ngOnInit(): void {
    this.renderNavName();
    this.checkLoginStates();
  }


  renderNavName() {
    this.route.data.subscribe(data => {
      this.navName = data.name;
      console.log(this.navName);
    });
  }

  LoginStates() {
    if (this.sessionSt.retrieve('logedUsrName') === '') {
      this.logedUserName = this.localSt.retrieve('logedUsrName');
      this.logedUserId = this.localSt.retrieve('logedEmpId');
    }

    if (this.localSt.retrieve('logedUsrName') === '') {
      this.logedUserName = this.sessionSt.retrieve('logedUsrName');
      this.logedUserId = this.sessionSt.retrieve('logedEmpId');
    }
    this.navUser = this.logedUserName;
    this.navClient = this.logedUserId;

  }


  logOut() {
    this.sessionSt.store('logedEmpId', '');
    this.sessionSt.store('logedUsrId', '');
    this.sessionSt.store('logedUsrName', '');

    this.localSt.store('logedEmpId', '');
    this.localSt.store('logedUsrId', '');
    this.localSt.store('logedUsrName', '');

    this.checkLoginStates();
  }

  checkLoginStates() {
    if (this.sessionSt.retrieve('logedUsrName') === '' && this.localSt.retrieve('logedUsrName') === '') {
      this.router.navigate(['/login']);
    } else {
      this.LoginStates();
    }
  }

}
