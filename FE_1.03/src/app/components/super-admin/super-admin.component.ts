import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';


import {
  CompanyControlService,
  CompanyData,
  CompanyLogin,
  CompanyPrivilage,
  Country, EvtCaldander,
  States, UpdateCompany
} from '../../services/Company/company-control.service';
import {from} from 'rxjs';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {


  companydata: CompanyData;
  companyLogins: CompanyLogin;
  companyPrivilage: CompanyPrivilage;
  country: Country;
  states: States;
  updatecompany: UpdateCompany;

  randomstring;
  nextCompanyNo;
  countryList;
  state;
  companydataall;

  updateCId;
  updateCName;
  updateCMobile;
  updateCEmail;
  updateCExp;
  updateCStates;

  updatemessage;

  companyNames;
  companyIds;
  countryNames;
  marketingName;

  EmployerUserDataList;

  EvtCalander;

  EvtTable;

  loginDiv;
  dashboardDiv;

  companyCurrentPage;
  eventsCurrentPage;


  constructor(private companycontrolservice: CompanyControlService) {
    this.companydata = new CompanyData();
    this.companyLogins = new CompanyLogin();
    this.companyPrivilage = new CompanyPrivilage();
    this.country = new Country();
    this.states = new States();
    this.updatecompany = new UpdateCompany();
    this.EvtCalander = new EvtCaldander();
  }

  ngOnInit(): void {

    this.randomstring = Math.random().toString(36).slice(-8);
    this.loginDashbprd('', '');

  }

  abc(){
    return this.companycontrolservice.abc();
  }

  loginDashbprd(x, y) {

    if (x === 'locha' && y === '9981') {
      this.dashboardDiv = true;
      this.loginDiv = false;
      this.loardNextCompanyNo();
      this.loardCountry();
      this.loardCompanyDataAll();
      this.loardCompanyName();
      this.loardCountryNames();
      this.loardMarketingNames();
      this.loardEvetDates();
    } else {
      this.dashboardDiv = false;
      this.loginDiv = true;
    }

  }

  saveEvtDates() {

    const eventDate = {
      evtName: this.EvtCalander.evtname,
      evtDate: this.EvtCalander.evtdate,
      evtCountry: this.EvtCalander.evtcountry,
      evtState: this.EvtCalander.evtstates
    };


    this.companycontrolservice.SaveEventDate(eventDate).subscribe(responce => {
      alert(responce.name);
      this.EvtCalander.evtname = '';
      this.EvtCalander.evtdate = '';
      this.EvtCalander.evtcountry = '';
      this.EvtCalander.evtstates = '';
      this.loardEvetDates();
    }, err => {
      console.log(err);
    });
  }

  loardEvetDates() {
    this.companycontrolservice.loardEvetDates().subscribe(responce => {
      this.EvtTable = responce.name;
    }, err => {
      console.log(err);
    });
  }

  sortEvetDates(x, y) {
    this.EvtTable = null;
    this.companycontrolservice.sortEvetDates(x, y).subscribe(responce => {
      if (responce != null) {
        this.EvtTable = responce.name;
      }
    }, err => {
      console.log(err);
    });
  }

  deleteEvtDate(x) {
    this.companycontrolservice.deleteEvtDate(x).subscribe(responce => {
      alert(responce.name);
      this.loardEvetDates();
    }, err => {
      console.log(err);
    });
  }

  loardMarketingNames() {
    this.companycontrolservice.loardMarketingNames().subscribe(responce => {
      this.marketingName = responce.name;
    }, err => {
      console.log(err);
    });
  }

  sortByMarketingNames(x) {
    this.companycontrolservice.sortByMarketingNames(x).subscribe(responce => {
      this.companydataall = responce.name;
    }, err => {
      console.log(err);
    });
  }

  loardCountryNames() {
    this.companycontrolservice.loardCountryNames().subscribe(responce => {
      this.countryNames = responce.name;
    }, err => {
      console.log(err);
    });
  }

  sortByCountryNames(x) {
    this.companycontrolservice.sortByCountryNames(x).subscribe(responce => {
      this.companydataall = responce.name;
    }, err => {
      console.log(err);
    });
  }

  loardCompanyName() {
    this.companycontrolservice.loardCompanyName().subscribe(responce => {
      this.companyNames = responce.name;
      this.companyIds = responce.name;
    }, err => {
      console.log(err);
    });
  }

  sortByCompanyName(x) {
    this.companycontrolservice.sortByCompanyName(x).subscribe(responce => {
      this.companydataall = responce.name;
    }, err => {
      console.log(err);
    });
  }

  sortByCompanyId(x) {
    this.companycontrolservice.sortByCompanyID(x).subscribe(responce => {
      this.companydataall = responce.name;
    }, err => {
      console.log(err);
    });
  }

  sortByExpDate(x, y) {
    this.companydataall = null;
    this.companycontrolservice.sortByExpDate(x, y).subscribe(responce => {
      if (responce != null) {
        this.companydataall = responce.name;
      }

    }, err => {
      console.log(err);
    });
  }

  updateCompany(CompanyNo, Mobil, Emai, Expdate, Statu) {

    const updatedCompanyDetails = {
      Id: CompanyNo,
      Mobile: Mobil,
      Email: Emai,
      ExpDate: Expdate,
      Status: Statu
    };


    this.companycontrolservice.updateCompany(updatedCompanyDetails).subscribe(responce => {
      this.updatemessage = responce.name;
    }, err => {
      console.log(err);
    });
  }

  loardUpdateCompany(Id, Name, Mobile, Email, Exp, Status) {

    this.updateCId = Id;
    this.updateCName = Name;
    this.updateCMobile = Mobile;
    this.updateCEmail = Email;
    this.updateCExp = Exp;
    this.updateCStates = Status;

    this.updatemessage = '';

  }

  loardEmployerUserDetails(x) {
    this.companycontrolservice.loardCompanyEmplAll(x).subscribe(responce => {
      this.EmployerUserDataList = responce.name;
    }, err => {
      console.log(err);
    });
  }

  sortWithCurrentStatus(status) {
    this.companycontrolservice.sortWithCurrentStatus(status).subscribe(responce => {
      this.companydataall = responce.name;
    }, err => {
      console.log(err);
    });
  }


  loardCompanyDataAll() {
    this.companycontrolservice.loardCompanyDataAll().subscribe(responce => {
      this.companydataall = responce.name;
    }, err => {
      console.log(err);
    });
  }

  loardState(id) {

    this.companycontrolservice.loardState(id.control.value).subscribe(responce => {
      this.state = responce.name;
    }, err => {
      console.log(err);
    });
  }

  loardCountry() {
    this.companycontrolservice.loardCountry().subscribe(responce => {
      this.countryList = responce.name;
    }, err => {
      console.log(err);
    });
  }

  loardNextCompanyNo() {
    this.companycontrolservice.loardNextCompanyNo().subscribe(responce => {
      this.nextCompanyNo = responce.name;
    }, err => {
      console.log(err);
    });
  }

  saveCountry() {

    const newCountry = {
      CName: this.country.CName
    };

    this.companycontrolservice.saveCountry(newCountry).subscribe(responce => {
      alert('Successfully Added');
      this.country.CName = '';
      this.loardCountry();
    }, err => {
      console.log(err);
    });
  }

  saveStates() {
    const newStates = {
      CName: this.states.CuName,
      SName: this.states.SName
    };


    this.companycontrolservice.saveStates(newStates).subscribe(responce => {
      alert('Successfully Added');
      this.states.SName = '';
      this.loardCountry();
    }, err => {
      console.log(err);
    });

  }


  addEmployer() {

    const newCompany = {
      No: this.nextCompanyNo,
      Name: this.companydata.companyName,
      Email: this.companydata.companyEmail,
      Mobile: this.companydata.companyMobile,
      LastUpdate: this.companydata.companyLastUpdateDate,
      CreateDate: this.companydata.companyCountry,
      Country: this.companydata.companyCountry,
      States: this.companydata.companyStates,
      Status: this.companydata.companyStatus,
      EXPDate: this.companydata.companyExpDate,
      Web: this.companydata.companyWeb,
      TFN: this.companydata.companyTFN,
      ABN: this.companydata.companyABN,
      ACN: this.companydata.companyACN,
      WorkCov: this.companydata.companyWorkCoverNo,
      PublicCov: this.companydata.companyPublicLibilityNo,
      LabourCov: this.companydata.companyLaboureCoverNo
    };

    const newCompanyLogin = {
      UserName: this.nextCompanyNo,
      Password: this.randomstring
    };

    const newCompanyPrivilage = {
      attendance: this.companyPrivilage.attendance,
      timesheet: this.companyPrivilage.timeSheet,
      payment: this.companyPrivilage.payment,
    };

    this.companycontrolservice.addEmployer(newCompany, newCompanyLogin, newCompanyPrivilage).subscribe(responce => {

      alert('Successfully Added');

      this.companydata.companyName = '';
      this.companydata.companyEmail = '';
      this.companydata.companyMobile = '';
      this.companydata.companyLastUpdateDate = '';
      this.companydata.companyCountry = '';
      this.companydata.companyCountry = '';
      this.companydata.companyStates = '';
      this.companydata.companyStatus = '';
      this.companydata.companyExpDate = '';
      this.companydata.companyWeb = '';
      this.companydata.companyTFN = '';
      this.companydata.companyABN = '';
      this.companydata.companyACN = '';
      this.companydata.companyWorkCoverNo = '';
      this.companydata.companyPublicLibilityNo = '';
      this.companydata.companyLaboureCoverNo = '';

      this.loardNextCompanyNo();

    }, err => {
      console.log(err);
    });

  }


}
