import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders, HttpParams} from '@angular/common/http';
import {RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {BaseurlService} from '../BaseUrl/baseurl.service';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {

  constructor(private http: HttpClient, private configurl: BaseurlService) {
  }

  loradBankByCountry(Id) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'webClient/loradBankByCountry', {id: Id});
  }
  addNewEmployee(Id) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'webClient/addNewEmployee', {id: Id});
  }
  searchexsistingemployee(Id) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'webClient/searchexsistingemployee', {id: Id});
  }
}

export class NewEmployee {
  eid: string;
  ename: string;
  dob: string;
  gender: string;
  mobile: string;
  email: string;
  address: string;
  paymentby: string;
  abn: string;
  taxpur: string;
  taxfree: string;
  paymentcircle: string;
  weekdayrate: string;
  holidayrate: string;
  saturadayrate: string;
  sundayrate: string;
  bankid: string;
  accountname: string;
  bsb: string;
  accountno: string;
  status: string;
}
