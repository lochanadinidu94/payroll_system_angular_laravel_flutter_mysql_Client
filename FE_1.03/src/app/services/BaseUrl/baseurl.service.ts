import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders, HttpParams} from '@angular/common/http';
import {RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class BaseurlService {

  configUrl: string;

  headers: Headers = new Headers();
  Options: any;

  constructor() {
    this.configUrl = 'http://localhost:8000/';

    this.headers.append('enctype', 'multipart/form-data');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('X-Requested-With', 'XMLHttpRequest');

    // @ts-ignore
    this.Options = new RequestOptions({headers: this.headers});
  }

  configUrlLoard() {
    return this.configUrl;
  }

}
