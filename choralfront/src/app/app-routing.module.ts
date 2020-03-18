import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PageNotFoundComponent} from "./not-found.component";
import {NewsComponent} from "./front/news/news.component";
import {HistoryComponent} from "./front/history/history.component";
import {EventsComponent} from "./front/events/events.component";
import {SongsComponent} from "./front/songs/songs.component";
import {TrombiComponent} from "./front/trombi/trombi.component";
import {AdminComponent} from "./admin/admin.component";
import {AuthGuardService} from "./services/auth/auth-guard.service";
import {LoginComponent} from "./login/login.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const appRoutes: Routes = [
  {
    path: 'news',
    component: NewsComponent,
    data: {title: "Actualités"}
  },
  {
    path: 'history',
    component: HistoryComponent,
    data: {title: "Historique"}
  },
  {
    path: 'events',
    component: EventsComponent,
    data: {title: "Evénements"}
  },
  {
    path: 'songs',
    component: SongsComponent,
    data: {title: "Chansons"}
  },
  {
    path: 'trombi',
    component: TrombiComponent,
    data: {title: "Trombinoscope"}
  },
  {
    path: 'admin',
    component: AdminComponent,
    data: {title: "Administration", role:"ADMIN"},
    canActivate:[AuthGuardService]
  },
  {
    path: '',
    redirectTo: '/news',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  {
    path: '**', component: PageNotFoundComponent,
    data: {title: "URL non connue"}
  }
];

@NgModule({
  imports: [

    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule {
}

