import {Component, ElementRef, OnInit, ViewChild, NgZone} from '@angular/core';
import {MapsAPILoader, MouseEvent} from '@agm/core';
import {NewSite, SiteService} from '../../services/site/site.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {

  navName;

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  sitepages;
  shiftpage;

  NewSite;

  logedUserId;

  allsites;

  allsitesforshift;

  sitebyid;

  updatestates;
  updatestatesmsg;

  sitebyidtoId;

  sitebyidtoName;

  allshifts;

  selectedshiftid;

  maxhorsvisiable;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  // tslint:disable-next-line:max-line-length
  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private siteservice: SiteService, public sessionSt: SessionStorageService, public localSt: LocalStorageService) {
    this.NewSite = new NewSite();
    this.getLogedUserId();
    this.loardAllSites();
    this.loardAllSitesforShift();
    this.loardShiftData();

    this.maxhorsvisiable = 'block';
  }

  ngOnInit(): void {
    this.lordMap();
  }

  visiableMaxhourstextfield(val) {

    if (val === '2') {
      this.maxhorsvisiable = 'none';
    } else {
      this.maxhorsvisiable = 'block';
    }

  }

  serachShift(Text) {

    const data = {
      id: this.logedUserId,
      text: Text
    };

    this.siteservice.serachShift(data).subscribe(responce => {
      this.allshifts = responce.name;
    }, err => {
      console.log(err);
    });
  }

  updateShiftbyId(Name, States) {

    const updatedshift = {
      id: this.selectedshiftid,
      name: Name,
      states: States
    };

    this.siteservice.updateShiftbyId(updatedshift).subscribe(responce => {
      this.loardShiftData();
      this.updatestatesmsg = true;
    }, err => {
      console.log(err);
    });

  }

  getSelectedShiftId(id) {
    this.selectedshiftid = id;
    this.updatestatesmsg = false;
  }

  loardShiftData() {
    this.siteservice.loardShiftData(this.logedUserId).subscribe(responce => {
      this.allshifts = responce.name;
    }, err => {
      console.log(err);
    });
  }

  addnewShift(siteId, shiftName, shiftHoursType, shiftHours) {

    let mHours;

    if (shiftHoursType === '2') {
      mHours = 0;
    } else {
      mHours = shiftHours;
    }

    const newShift = {
      id: siteId,
      sName: shiftName,
      sHType: shiftHoursType,
      sH: mHours
    };

    this.siteservice.addnewShift(newShift).subscribe(responce => {
      alert(responce.name);
      this.loardShiftData();
    }, err => {
      console.log(err);
    });

  }


  loardSiteByIdtoShifts(id) {
    this.siteservice.loardSiteById(id).subscribe(responce => {
      this.sitebyidtoId = responce.name[0].Id;
      this.sitebyidtoName = responce.name[0].Name;
    }, err => {
      console.log(err);
    });
  }

  updatesiteByid(Id, Name, Status) {

    console.log(Status);

    const updatedata = {
      id: Id,
      name: Name,
      ststus: Status
    };

    this.siteservice.updatedata(updatedata).subscribe(responce => {
      if (responce.name === 'Successfully Updated') {
        this.updatestates = true;
      }
      this.loardAllSites();
      this.loardAllSitesforShift();
    }, err => {
      console.log(err);
    });

  }

  loardSiteById(id) {

    this.sitebyid = id;
    this.updatestates = false;
  }

  loardAllSites() {
    this.siteservice.loardAllSites(this.logedUserId).subscribe(responce => {
      this.allsites = responce.name;
    }, err => {
      console.log(err);
    });
  }

  loardAllSitesforShift() {
    this.siteservice.loardAllSitesforShift(this.logedUserId).subscribe(responce => {
      this.allsitesforshift = responce.name;
    }, err => {
      console.log(err);
    });
  }

  saveNewSite(name, address, states) {

    const newSite = {
      LogedUserId: this.logedUserId,
      Name: name,
      Address: address,
      Lati: this.latitude,
      Long: this.longitude,
      States: states
    };

    this.siteservice.saveNewSite(newSite).subscribe(responce => {
      alert(responce.name);
      this.loardAllSites();
      this.loardAllSitesforShift();
      this.NewSite.SiteName = '';
      this.NewSite.SiteAddress = '';
      this.NewSite.SiteLati = '';
      this.NewSite.SiteLong = '';
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
          this.zoom = 20;
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

  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    // this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({location: {lat: latitude, lng: longitude}}, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

}
