import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeadImportsComponent} from './components/head-imports/head-imports.component';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {SideBarComponent} from './components/side-bar/side-bar.component';
import {MainTemplateComponent} from './components/main-template/main-template.component';
import {CompanyProfileComponent} from './components/company-profile/company-profile.component';
import {WorkersComponent} from './components/workers/workers.component';
import {SitesComponent} from './components/sites/sites.component';
import {TimeSheetsComponent} from './components/time-sheets/time-sheets.component';
import {PaymentsComponent} from './components/payments/payments.component';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {EventEmitterService} from './services/event-emitter.service';
import {SuperAdminComponent} from './components/super-admin/super-admin.component';

import {AgmCoreModule} from '@agm/core';
import {HttpClientModule} from '@angular/common/http';

import {FullCalendarModule} from '@fullcalendar/angular';
import {LoginComponent} from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeadersComponent} from '../../../../ClientSide/Test/Angular1/1App/src/app/headers/headers.component';
import {RequiredmsgComponent} from './components/errormsg/requiredmsg/requiredmsg.component'; // for FullCalendar!

import {NgxPaginationModule} from 'ngx-pagination';

import {NgxWebstorageModule} from 'ngx-webstorage';
import {InvalideMsgComponent} from './components/errormsg/Invalide/invalide-msg/invalide-msg.component';
import {UpdatesuccessfullymsgComponent} from './components/errormsg/updatesuccessfullymsg/updatesuccessfullymsg.component';
// import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({


  declarations: [
    AppComponent,
    HeadImportsComponent,
    NavBarComponent,
    SideBarComponent,
    MainTemplateComponent,
    CompanyProfileComponent,
    WorkersComponent,
    SitesComponent,
    TimeSheetsComponent,
    PaymentsComponent,
    NotificationsComponent,
    SuperAdminComponent,
    LoginComponent,
    HeadersComponent,
    RequiredmsgComponent,
    InvalideMsgComponent,
    UpdatesuccessfullymsgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxWebstorageModule.forRoot(),
    // MatAutocompleteModule,
    FullCalendarModule,
    RouterModule.forRoot([
      {path: '', component: LoginComponent, data: {name: 'login'}},
      {path: 'login', component: LoginComponent, data: {name: 'login'}},
      {path: 'dashboard', component: MainTemplateComponent, data: {name: 'Dashboard'}},
      {path: 'company-profile', component: CompanyProfileComponent, data: {name: 'Company-Profile'}},
      {path: 'workers', component: WorkersComponent, data: {name: 'Workers'}},
      {path: 'sites', component: SitesComponent, data: {name: 'Sites'}},
      {path: 'time-sheets', component: TimeSheetsComponent, data: {name: 'Time-Sheets'}},
      {path: 'payments', component: PaymentsComponent, data: {name: 'Payments'}},
      {path: 'notifications', component: NotificationsComponent, data: {name: 'Notifications'}},
      {path: '@drpcsoft-teacher-190228-320501-grandma', component: SuperAdminComponent, data: {name: 'Super-Admin'}}

    ]),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAaA4obdcri_zmQpPzgT6CKozz2lKMLcHI ',
      libraries: ['places']
    })

  ],
  providers: [{provide: APP_BASE_HREF, useValue: ''},
    EventEmitterService,

  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
