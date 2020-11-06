import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders, HttpParams} from '@angular/common/http';
import {RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {BaseurlService} from '../BaseUrl/baseurl.service';

@Injectable({
  providedIn: 'root'
})


export class CompanyControlService {


  constructor(private http: HttpClient, private configurl: BaseurlService) {
  }

  loardMarketingNames() {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'employer/loardMarketingNames', 'Active');
  }

  sortByMarketingNames(x) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'employer/sortByMarketingNames', {id: x});
  }

  loardCountryNames() {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'employer/loardCountryNames', 'Active');
  }

  sortByCountryNames(x) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'employer/sortByloardCountryNames', {id: x});
  }

  loardCompanyName() {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'employer/loardCompanyName', 'Active');
  }

  sortByCompanyName(x) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'employer/sortByloardCompanyName', {id: x});
  }

  sortByCompanyID(x) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'employer/sortByloardCompanyID', {id: x});
  }

  sortByExpDate(x, y) {

    const Indata = {date1: x, date2: y};

    return this.http.post<any>(this.configurl.configUrlLoard() + 'employer/sortByExpDate', Indata);
  }

  loardState(x) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'employer/loardState', {id: x});
  }

  sortWithCurrentStatus(x) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'employer/sortWithStatus', {id: x});
  }

  loardCountry() {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'employer/loardCountry', 'Active');
  }

  loardNextCompanyNo() {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'employer/nextCompanyNo', 'Active');
  }

  updateCompany(x) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'employer/updateRec', {id: x});
  }

  loardCompanyDataAll() {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'employer/abc', 'Active');
  }

  loardCompanyEmplAll(x) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'employer/loardEmployerUserDetails', {id: x});
  }

  addEmployer(x, y, z) {

    const Indata = {company: x, login: y, privilage: z};

    return this.http.post<any>(this.configurl.configUrlLoard() + 'employer/add', Indata);
  }

  saveCountry(x) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'county/addCountry', x);
  }

  saveStates(x) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'county/addStates', x);
  }

  SaveEventDate(x) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'employer/addEventDate', x);
  }

  loardEvetDates() {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'employer/loardEventDate', 'Active');
  }

  sortEvetDates(x, y) {

    const Indata = {date1: x, date2: y};

    return this.http.post<any>(this.configurl.configUrlLoard() + 'employer/sortEventDate', Indata);
  }

  deleteEvtDate(x) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'employer/deleteEvtDate', {id: x});
  }

  abc() {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'employer/deleteEvtDate', '{id: Indata}');
  }

}

export class CompanyData {
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

export class CompanyLogin {
  companyUserName: string;
  companyPassword: string;
}

export class CompanyPrivilage {
  attendance: string;
  timeSheet: string;
  payment: string;

}

export class Country {
  CName: string;
}

export class States {
  CuName: string;
  SName: string;
}

export class UpdateCompany {
  CompanyNo: string;
  Mobile: string;
  Email: string;
  Expdate: string;
  Status: string;
}

export class EvtCaldander {
  evtname: string;
  evtdate: string;
  evtcountry: string;
  evtstates: string;
}
