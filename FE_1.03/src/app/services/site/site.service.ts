import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders, HttpParams} from '@angular/common/http';
import {RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {BaseurlService} from '../BaseUrl/baseurl.service';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(private http: HttpClient, private configurl: BaseurlService) {
  }

  saveNewSite(Id) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'webClient/saveNewSite', {id: Id});
  }

  loardAllSites(Id) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'webClient/loardAllSites', {id: Id});
  }
  loardAllSitesforShift(Id) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'webClient/loardAllSitesforShift', {id: Id});
  }

  loardSiteById(Id) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'webClient/loardSiteById', {id: Id});
  }
  updatedata(Id) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'webClient/updatedata', {id: Id});
  }
  addnewShift(Id) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'webClient/addnewShift', {id: Id});
  }
  loardShiftData(Id) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'webClient/loardShiftData', {id: Id});
  }
  updateShiftbyId(Id) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'webClient/updateShiftbyId', {id: Id});
  }
  serachShift(Id) {
    return this.http.post<any>(this.configurl.configUrlLoard() + 'webClient/serachShift', {id: Id});
  }
}

export class NewSite {
  SiteName: string;
  SiteAddress: string;
  SiteLati: string;
  SiteLong: string;
  SiteStates: string;
}
