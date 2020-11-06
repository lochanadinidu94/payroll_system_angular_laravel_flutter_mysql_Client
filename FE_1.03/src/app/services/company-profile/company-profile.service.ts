import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders, HttpParams} from '@angular/common/http';
import {RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {BaseurlService} from '../BaseUrl/baseurl.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyProfileService {

  constructor(private http: HttpClient, private configurl: BaseurlService) {
  }

  getCurrentCompanyDetails(ClientNo) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'webClient/getCurrentCompanyDetails', {id: ClientNo});
  }

  updateCurrentCompany(allDetails) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'webClient/updateCurrentCompany', {id: allDetails});
  }

  saveNewSystemUser(allDetails) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'webClient/saveNewSystemUser', {id: allDetails});
  }

  loardSystmeUsers(Id) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'webClient/loardSystmeUsers', {id: Id});
  }

  loardSystmeUsersbyName(Id, Txt) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'webClient/loardSystmeUsersbyName', {id: Id, txt: Txt});
  }

  UpdateSystmeUsers(Id) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'webClient/UpdateSystmeUsers', Id);
  }

  loradBankByCountry(Id) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'webClient/loradBankByCountry', {id: Id});
  }

  SaveNewBankCard(Id) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'webClient/SaveNewBankCard', {id: Id});
  }

  loardBankCardsDetailsByClientNo(Id) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'webClient/loardBankCardsDetailsByClientNo', {id: Id});
  }

  removeBankCard(Id) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'webClient/removeBankCard', {id: Id});
  }

  AddNewPayPeriod(Id) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'webClient/AddNewPayPeriod', {id: Id});
  }

  loardPayPeriodsDetails(Id) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'webClient/loardPayPeriodsDetails', {id: Id});
  }

  changepayperiodststus(Id, States) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'webClient/changepayperiodststus', {id: Id, states: States});
  }

  loardPayPeriodsDetailsByName(Id, Text) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'webClient/loardPayPeriodsDetailsByName', {id: Id, text: Text});
  }
  loardEventsByClientCountry(Id) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'webClient/loardEventsByClientCountry', {id: Id});
  }
}

export class CurrentCompanyDetails {
  companyNo: string;
  companyName: string;
  companyEmail: string;
  companyMobile: string;
  companyCountry: string;
  companyStates: string;
  companyLastUpdateDate: string;
  companyCreateDate: string;
  companyStatus: string;
  companyExpDate: string;
  companyWeb: string;
  companyTFN: string;
  companyABN: string;
  companyACN: string;
  companyWorkCoverNo: string;
  companyPublicLibilityNo: string;
  companyLaboureCoverNo: string;
  companylastupdatedate: string;
  companycreatedate: string;
}

export class NewSystemUser {
  Name: string;
  Mobile: string;
  Email: string;
  UserRoll: string;
  Company: string;
  Workers: string;
  Sites: string;
  Payments: string;
}

export class UpdateNewSystemUser {
  Id: string;
  Mobile: string;
  Email: string;
  Company: string;
  Workers: string;
  Sites: string;
  Payments: string;
  status: string;
}

export class BanakCards {

  BankName: string;
  CardNo: string;
  CardName: string;
  CardXDateM: string;
  CardXDateY: string;
  CvvNo: string;

}

export class PayPeriod {
  StartDate: string;
  EndDate: string;
  PayName: string;
  Status: string;
  TotDate: string;
}
