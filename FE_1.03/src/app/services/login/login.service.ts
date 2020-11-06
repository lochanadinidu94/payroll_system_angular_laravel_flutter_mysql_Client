import {Injectable} from '@angular/core';


import {HttpClient, HttpClientModule, HttpHeaders, HttpParams} from '@angular/common/http';
import {BaseurlService} from '../BaseUrl/baseurl.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, private configurl: BaseurlService) {
  }

  loginCheck(username, password, isRemember) {
    const Indata = {date1: username, date2: password};
    return this.http.post<any>(this.configurl.configUrlLoard() + 'webClient/webLogin', {id: Indata});
  }


}

export class LoginDetails {
  username: string;
  password: string;
  remember: string;
}
