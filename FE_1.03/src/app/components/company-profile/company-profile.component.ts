import {Component, OnInit} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {
  BanakCards,
  CompanyProfileService,
  CurrentCompanyDetails,
  NewSystemUser, PayPeriod,
  UpdateNewSystemUser
} from '../../services/company-profile/company-profile.service';


@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  navName;
  month;
  years;

  calendarPlugins = [dayGridPlugin];

  firstdate;
  secondate;
  totdates;
  payperiodname;

  companyDetals;

  logedUserId;

  ClientNo;
  ClientName;
  Email;
  Mobile;
  Country;
  States;
  UpdatecDate;
  CreatedDate;
  ActiveStatus;
  ExpDate;
  ABN;
  MarketingOfficer;
  TFN;
  WCNo;
  PLNo;
  LCNo;
  Web;

  UserPriviladge = false;

  usertype;

  NewSystemUser;
  UpdateNewSystemUser;

  companyPv;
  workersPv;
  sitePv;
  paymentPv;

  systemdataall;
  systemusercurrentpage;


  systemusremail;
  systemusrmobile;
  systemusrid;
  systemusrname;

  successupdatedmsg;

  banklist;

  BanakCards;

  BankCardDetails;

  CvvShow;

  PayPeriod;

  PayPeriodsDetails;

  PayPeriodTablePages;

  EventsByClientCountry;

  arry;

  calendarOptions = {
    height: 'auto',
    contentHeight: 'auto',
    fixedWeekCount: false,
    editable: true,
    eventLimit: true,
    defaultView: 'agendaWeek',
    slotDuration: '01:00:00',
    firstDay: 1,
    header: {
      right: 'today prev,next'
    },
    events: []
  };

  // tslint:disable-next-line:max-line-length
  constructor(private companyProfileService: CompanyProfileService, public sessionSt: SessionStorageService, public localSt: LocalStorageService) {
    this.navName = 'Company-Profile';

    this.loradDateAndMonth();

    this.companyDetals = new CurrentCompanyDetails();
    this.NewSystemUser = new NewSystemUser();
    this.UpdateNewSystemUser = new UpdateNewSystemUser();
    this.BanakCards = new BanakCards();

    this.getLogedUserId();
    this.getCurrentCompanyDetails();
    this.loardSystmeUsers();
    this.loradBankByCountry();
    this.loardBankCardsDetailsByClientNo();

    this.CvvShow = false;

    this.PayPeriod = new PayPeriod();

    this.loardPayPeriodsDetails();

    this.loardEventsByClientCountry();
    // this.loardEventstoCalander();

  }

  loardEventstoCalander() {

    this.arry = [];

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.EventsByClientCountry.length; i++) {
      this.arry.push({
        title: this.EventsByClientCountry[i].Name,
        start: this.EventsByClientCountry[i].Date
      });
    }

  }

  // Have to loard to Calander
  loardEventsByClientCountry() {
    this.companyProfileService.loardEventsByClientCountry(this.logedUserId).subscribe(responce => {
      this.EventsByClientCountry = responce.name;
    }, err => {
      console.log(err);
    });
  }

  changepayperiodststus(id, ststes) {
    this.companyProfileService.changepayperiodststus(id, ststes).subscribe(responce => {
      this.loardPayPeriodsDetails();
    }, err => {
      console.log(err);
    });
  }

  loardPayPeriodsDetails() {
    this.companyProfileService.loardPayPeriodsDetails(this.logedUserId).subscribe(responce => {
      this.PayPeriodsDetails = responce.name;
    }, err => {
      console.log(err);
    });
  }

  loardPayPeriodsDetailsByName(text) {
    this.companyProfileService.loardPayPeriodsDetailsByName(this.logedUserId, text).subscribe(responce => {
      this.PayPeriodsDetails = responce.name;
    }, err => {
      console.log(err);
    });
  }

  AddNewPayPeriod() {

    const AddNewPayPeriod = {
      clientNo: this.logedUserId,
      startDate: this.PayPeriod.StartDate,
      endDate: this.PayPeriod.EndDate,
      payName: this.payperiodname,
      status: this.PayPeriod.Status,
      totDate: this.totdates
    };

    this.companyProfileService.AddNewPayPeriod(AddNewPayPeriod).subscribe(responce => {
      alert(responce.name);
      this.loardPayPeriodsDetails();
      this.PayPeriod.StartDate = '';
      this.PayPeriod.EndDate = '';
      this.PayPeriod.StartDate = '';
      this.PayPeriod.TotDate = '';
    }, err => {
      console.log(err);
    });

  }


  HideCVV() {
    this.CvvShow = false;
  }

  ShowCVV() {
    this.CvvShow = true;
  }

  removeBankCard(id) {
    this.companyProfileService.removeBankCard(id).subscribe(responce => {
      alert(responce.name);
      this.loardBankCardsDetailsByClientNo();
    }, err => {
      console.log(err);
    });
  }

  loardBankCardsDetailsByClientNo() {
    this.companyProfileService.loardBankCardsDetailsByClientNo(this.logedUserId).subscribe(responce => {
      this.BankCardDetails = responce.name;
    }, err => {
      console.log(err);
    });
  }

  loradDateAndMonth() {
    this.month = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}, {id: 11}, {id: 12}];

    this.years =
      [
        {id: 2020},
        {id: 2021},
        {id: 2022},
        {id: 2023},
        {id: 2024},
        {id: 2025},
        {id: 2026},
        {id: 2027},
        {id: 2028},
        {id: 2029},
        {id: 2030},
        {id: 2031}
      ];
  }

  SaveNewBankCard() {

    const expdate = this.BanakCards.CardXDateM + '-' + this.BanakCards.CardXDateY;

    const NewBankCard = {
      clientNo: this.logedUserId,
      BankName: this.BanakCards.BankName,
      BankCardName: this.BanakCards.CardName,
      BankCardNo: this.BanakCards.CardNo,
      BankExpDate: expdate,
      CVVNo: this.BanakCards.CvvNo
    };
    this.companyProfileService.SaveNewBankCard(NewBankCard).subscribe(responce => {
      alert(responce.name);
      this.BanakCards.CardName = '';
      this.BanakCards.CardNo = '';
      this.BanakCards.CvvNo = '';
      this.loradBankByCountry();
      this.loradDateAndMonth();

    }, err => {
      console.log(err);
    });
  }

  loradBankByCountry() {
    this.companyProfileService.loradBankByCountry(this.logedUserId).subscribe(responce => {
      this.banklist = responce.name;
    }, err => {
      console.log(err);
    });
  }

  firstDateSelect(val1) {
    this.firstdate = val1;
  }

  secondDateSelect(val1) {
    const d2 = new Date(this.firstdate);
    const d = new Date(val1);

    if (d.getMonth() === 10 || d.getMonth() === 11 || d.getMonth() === 12) {
      this.secondate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate() + 1);
    } else {
      this.secondate = d.getFullYear() + '-0' + (d.getMonth() + 1) + '-' + (d.getDate() + 1);
    }

    this.totdates = (d.getDate() - d2.getDate()) + 1;

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // tslint:disable-next-line:max-line-length
    this.payperiodname = d.getFullYear() + '-' + d2.getFullYear() + '-' + monthNames[d.getMonth()] + ' -' + d2.getDate() + ' to ' + d.getDate() + ' | ' + this.totdates + ' Days';

  }

  getLogedUserId() {
    if (this.sessionSt.retrieve('logedUsrName') === '') {
      this.logedUserId = this.localSt.retrieve('logedEmpId');
    }

    if (this.localSt.retrieve('logedUsrName') === '') {
      this.logedUserId = this.sessionSt.retrieve('logedEmpId');
    }
  }

  getCurrentCompanyDetails() {
    this.companyProfileService.getCurrentCompanyDetails(this.logedUserId).subscribe(responce => {
      this.ClientNo = responce.name[0].ClientNo;
      this.ClientName = responce.name[0].ClientName;
      this.Email = responce.name[0].Email;
      this.Mobile = responce.name[0].Mobile;
      this.Country = responce.name[0].Country;
      this.States = responce.name[0].States;
      this.UpdatecDate = responce.name[0].UpdatecDate;
      this.CreatedDate = responce.name[0].CreatedDate;
      this.ActiveStatus = responce.name[0].ActiveStatus;
      this.ExpDate = responce.name[0].ExpDate;
      this.ABN = responce.name[0].ABN;
      this.MarketingOfficer = responce.name[0].MarketingOfficer;
      this.TFN = responce.name[0].TFN;
      this.WCNo = responce.name[0].WCNo;
      this.PLNo = responce.name[0].PLNo;
      this.LCNo = responce.name[0].LCNo;
      this.Web = responce.name[0].Web;

    }, err => {
      console.log(err);
    });
  }

  updateCurrentCompany(tfnd, wco, plco, lco, webx) {

    const employeeData = {
      clientNo: this.logedUserId,
      tfn: tfnd,
      wcno: wco,
      plno: plco,
      lcno: lco,
      web: webx
    };


    this.companyProfileService.updateCurrentCompany(employeeData).subscribe(responce => {
      alert(responce.name);

      this.getCurrentCompanyDetails();
    }, err => {
      console.log(err);
    });
  }

  getSystemUserType(value) {


    if (value === '2') {
      this.UserPriviladge = true;
      this.usertype = 1;
    } else {
      this.UserPriviladge = false;
      this.usertype = 2;
    }
  }

  loardSystmeUsers() {
    this.companyProfileService.loardSystmeUsers(this.logedUserId).subscribe(responce => {
      this.systemdataall = responce.name;
    }, err => {
      console.log(err);
    });
  }

  loardSystmeUsersbyName(txt) {
    this.companyProfileService.loardSystmeUsersbyName(this.logedUserId, txt).subscribe(responce => {
      this.systemdataall = responce.name;
    }, err => {
      console.log(err);
    });
  }

  saveNewSystemUser(Name, Mobile, Email, Company, Workers, Sites, Payment) {

    if (Company === true) {
      this.companyPv = 1;
    } else {
      this.companyPv = 0;
    }

    if (Workers === true) {
      this.workersPv = 1;
    } else {
      this.workersPv = 0;
    }

    if (Sites === true) {
      this.sitePv = 1;
    } else {
      this.sitePv = 0;
    }

    if (Payment === true) {
      this.paymentPv = 1;
    } else {
      this.paymentPv = 0;
    }

    const systemUserSave = {
      clientNo: this.logedUserId,
      name: Name,
      mobile: Mobile,
      email: Email,
      usertype: this.usertype,
      company: this.companyPv,
      workers: this.workersPv,
      sites: this.sitePv,
      payment: this.paymentPv
    };

    this.companyProfileService.saveNewSystemUser(systemUserSave).subscribe(responce => {
      alert(responce.name);
      this.NewSystemUser.Name = '';
      this.NewSystemUser.Mobile = '';
      this.NewSystemUser.Email = '';
      this.NewSystemUser.Name = '';
      this.getSystemUserType('2');
    }, err => {
      console.log(err);
    });

  }

  viewSystemUsers(id, name, mobile, email) {

    this.successupdatedmsg = false;

    this.systemusrid = id;
    this.systemusremail = email;
    this.systemusrmobile = mobile;
    this.systemusrname = name;
  }

  updateSystemUser(mobile, email, company, worker, sites, payment, status) {
    const systemUserSave = {
      LogUserNo: this.systemusrid,
      Mobile: mobile,
      Email: email,
      Company: company,
      Workers: worker,
      Sites: sites,
      Payment: payment,
      Status: status
    };

    this.companyProfileService.UpdateSystmeUsers(systemUserSave).subscribe(responce => {
      this.successupdatedmsg = true;
      this.loardSystmeUsers();
    }, err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
    this.getCurrentCompanyDetails();
    this.getSystemUserType('2');
  }

}

