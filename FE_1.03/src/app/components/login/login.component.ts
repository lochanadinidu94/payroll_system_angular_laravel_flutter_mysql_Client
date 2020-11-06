import {Component, OnInit} from '@angular/core';
import {LoginDetails, LoginService} from '../../services/login/login.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
 export class LoginComponent implements OnInit {

  loginRecode;

  uname: string;
  pword: string;
  isRemember: boolean;

  public logedEmpId;
  public logedUsrId;
  public logedUsrName;
  public logedUsrCountry;
  public logedUsrStatus;

  public logIn;

  constructor(private loginservices: LoginService, public sessionSt: SessionStorageService, public localSt: LocalStorageService,
              private router: Router) {
    this.loginRecode = new LoginDetails();

    this.logIn = true;

    this.checkLoginStates();
  }

  ngOnInit(): void {
  }

  login() {
    this.uname = this.loginRecode.username;
    this.pword = this.loginRecode.password;
    this.isRemember = this.loginRecode.remember;

    if (this.isRemember === undefined) {
      this.isRemember = false;
    }

    this.loginservices.loginCheck(this.uname, this.pword, this.isRemember).subscribe(responce => {
      if (responce != null) {

        this.logedEmpId = this.uname;
        this.logedUsrId = responce.name[0].Id;
        this.logedUsrName = responce.name[0].Name;


        this.logIn = true;

        if (this.isRemember === true) {

          this.localSt.store('logedEmpId', this.logedEmpId);
          this.localSt.store('logedUsrId', this.logedUsrId);
          this.localSt.store('logedUsrName', this.logedUsrName);

          this.sessionSt.store('logedEmpId', '');
          this.sessionSt.store('logedUsrId', '');
          this.sessionSt.store('logedUsrName', '');

        } else {
          this.localSt.store('logedEmpId', '');
          this.localSt.store('logedUsrId', '');
          this.localSt.store('logedUsrName', '');

          this.sessionSt.store('logedEmpId', this.logedEmpId);
          this.sessionSt.store('logedUsrId', this.logedUsrId);
          this.sessionSt.store('logedUsrName', this.logedUsrName);
        }

        this.router.navigate(['/dashboard']);

      } else {
        this.logIn = false;
      }
    }, err => {
      this.logIn = false;
      console.log(err);
    });


  }

  checkLoginStates() {
    if (this.sessionSt.retrieve('logedUsrName') === '' && this.localSt.retrieve('logedUsrName') === '') {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

}
