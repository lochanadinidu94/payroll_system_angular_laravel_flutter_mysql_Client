import {Component, ElementRef, OnInit, ViewChild, NgZone} from '@angular/core';
import {MapsAPILoader, MouseEvent} from '@agm/core';
import {NewEmployee, WorkersService} from '../../services/workers/workers.service';
import {CompanyProfileService} from '../../services/company-profile/company-profile.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';


@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {


  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  actStates;

  payby;
  paybycash;
  paybytfn;

  banklist;

  logedUserId;


  NewEmployee;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    // tslint:disable-next-line:max-line-length
    private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private workersservices: WorkersService, public sessionSt: SessionStorageService, public localSt: LocalStorageService) {

    this.payby = 'ABN';
    this.paybycash = 'block';
    this.paybytfn = 'none';

    this.getLogedUserId();
    this.loradBankByCountry();

    this.NewEmployee = new NewEmployee();

  }

  ngOnInit(): void {
    this.lordMap();
  }

  searchexsistingemployee(text) {

    this.workersservices.searchexsistingemployee(text).subscribe(responce => {
      if (responce.name[0].Name != null || responce.name[0].Name !== '') {
        this.NewEmployee.eid = responce.name[0].ID;
        this.NewEmployee.ename = responce.name[0].Name;
        this.NewEmployee.dob = responce.name[0].DOB;
        this.NewEmployee.gender = responce.name[0].Gender;
        this.NewEmployee.mobile = responce.name[0].Mobile;
        this.NewEmployee.email = responce.name[0].Email;
        this.NewEmployee.address = responce.name[0].Address;
      } else {
        this.NewEmployee.eid = '';
        this.NewEmployee.ename = '';
        this.NewEmployee.dob = '';
        this.NewEmployee.gender = '';
        this.NewEmployee.mobile = '';
        this.NewEmployee.email = '';
        this.NewEmployee.address = '';
      }
    }, err => {
      console.log(err);
    });

  }

  addNewEmployee(addre) {

    const addnewemployee = {
      logedid: this.logedUserId,
      id: this.NewEmployee.eid,
      name: this.NewEmployee.ename,
      dob: this.NewEmployee.dob,
      gender: this.NewEmployee.gender,
      mobile: this.NewEmployee.mobile,
      email: this.NewEmployee.email,
      address: addre,
      paymentby: this.NewEmployee.paymentby,
      abn: this.NewEmployee.abn,
      taxpur: this.NewEmployee.taxpur,
      taxfree: this.NewEmployee.taxfree,
      paymentcircle: this.NewEmployee.paymentcircle,
      weekdayrate: this.NewEmployee.weekdayrate,
      holidayrate: this.NewEmployee.holidayrate,
      sundayrate: this.NewEmployee.sundayrate,
      saturdayrate: this.NewEmployee.saturadayrate,
      bank: this.NewEmployee.bankid,
      accountname: this.NewEmployee.accountname,
      bsb: this.NewEmployee.bsb,
      accountno: this.NewEmployee.accountno,
      states: this.NewEmployee.status,
    };


    this.workersservices.addNewEmployee(addnewemployee).subscribe(responce => {
      alert(responce.name);
      this.NewEmployee.eid = '';
      this.NewEmployee.ename = '';
      this.NewEmployee.dob = '';
      this.NewEmployee.gender = '';
      this.NewEmployee.mobile = '';
      this.NewEmployee.email = '';
      this.NewEmployee.address = '';
      this.NewEmployee.paymentby = '';
      this.NewEmployee.abn = '';
      this.NewEmployee.taxpur = '';
      this.NewEmployee.taxfree = '';
      this.NewEmployee.paymentcircle = '';
      this.NewEmployee.weekdayrate = '';
      this.NewEmployee.holidayrate = '';
      this.NewEmployee.saturadayrate = '';
      this.NewEmployee.sundayrate = '';
      this.NewEmployee.bankid = '';
      this.NewEmployee.accountname = '';
      this.NewEmployee.bsb = '';
      this.NewEmployee.accountno = '';
      this.NewEmployee.status = '';
    }, err => {
      console.log(err);
    });

  }

  paymentBy(id) {
    if (id === 'ABN') {
      // ABN
      this.payby = 'ABN';
      this.paybycash = 'block';
      this.paybytfn = 'none';
    } else if (id === 'TFN') {
      // TFN
      this.payby = 'TFN';
      this.paybycash = 'block';
      this.paybytfn = 'block';
    } else {
      this.paybycash = 'none';
      this.paybytfn = 'none';
    }
  }

  loradBankByCountry() {
    this.workersservices.loradBankByCountry(this.logedUserId).subscribe(responce => {
      this.banklist = responce.name;
    }, err => {
      console.log(err);
    });
  }

  getLogedUserId() {
    if (this.sessionSt.retrieve('logedUsrName') === '') {
      this.logedUserId = this.localSt.retrieve('logedEmpId');
    }

    if (this.localSt.retrieve('logedUsrName') === '') {
      this.logedUserId = this.sessionSt.retrieve('logedEmpId');
    }
  }

  lordMap() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = google.maps.Geocoder;

      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        // this.getAddress(this.latitude, this.longitude);
      });
    }
  }
}
