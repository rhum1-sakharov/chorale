import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
/**
 * PrimeNG COMPONENT
 * */
import {
  ButtonModule,
  CalendarModule,
  CarouselModule,
  DataViewModule,
  DialogModule,
  DropdownModule,
  EditorModule,
  FileUploadModule,
  GalleriaModule,
  InputSwitchModule,
  InputTextModule,
  LightboxModule,
  ListboxModule,
  ToastModule,
  PanelModule,
  RadioButtonModule,
  SelectButtonModule,
  SharedModule,
  TableModule,
  TabViewModule, MessageService, BlockUIModule, CardModule
} from 'primeng';
/**
 * Custom components
 * */
import {AppComponent} from './app.component';
import {FeedsService} from "./services/feeds/feeds.service";
import {SongsService} from "./services/songs/songs.service";
import {AdminFeedsComponent} from './admin/admin-feeds/admin-feeds.component';
import {AdminComponent} from "./admin/admin.component";
import {AdminSongsComponent} from "./admin/admin-songs/admin-songs.component";
import {TrombiComponent} from './front/trombi/trombi.component';
import {SanitizeHtmlPipe} from './pipes/sanitize.pipe';
import {SongsComponent} from "./front/songs/songs.component";
import {HistoryComponent} from "./front/history/history.component";
import {EventsComponent} from "./front/events/events.component";
import {NewsComponent} from "./front/news/news.component";
import {AppRoutingModule} from "./app-routing.module";
import {PageNotFoundComponent} from "./not-found.component";
import {AdminMiscComponent} from "./admin/admin-misc/admin-misc.component";
import {AuthGuardService} from "./services/auth/auth-guard.service";
import {AuthService} from "./services/auth/auth.service";
import {LoginComponent} from "./login/login.component";
import {DiversComponent} from "./admin/divers/divers.component";
import {DiversService} from "./services/divers/divers.service";
import {VisitorsService} from "./services/visitors/visitors.service";
import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {AUTH} from "./constants";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

registerLocaleData(localeFr, 'fr');

export function tokenGetter() {
  return localStorage.getItem(AUTH.token);
}


@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    EventsComponent,
    HistoryComponent,
    SongsComponent,
    AdminFeedsComponent,
    AdminSongsComponent,
    AdminComponent,
    AdminFeedsComponent,
    AdminMiscComponent,
    TrombiComponent,
    SanitizeHtmlPipe,
    PageNotFoundComponent,
    LoginComponent,
    DiversComponent

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,

    FormsModule,
    ReactiveFormsModule,

    HttpClientModule,
    InputTextModule,
    ButtonModule,
    SharedModule,
    TableModule,
    TabViewModule,
    LightboxModule,
    DialogModule,
    CalendarModule,
    EditorModule,
    FileUploadModule,
    RadioButtonModule,
    DropdownModule,
    GalleriaModule,
    CarouselModule,
    PanelModule,
    AppRoutingModule,
    SelectButtonModule,
    ListboxModule,
    InputSwitchModule,
    DataViewModule,
    ToastModule,
    BlockUIModule,
    CardModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

  ],
  exports:[

  ],
  providers: [DiversService,VisitorsService, FeedsService, SongsService, AuthGuardService,AuthService,JwtHelperService, {provide: LOCALE_ID, useValue: "fr-FR"}, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
