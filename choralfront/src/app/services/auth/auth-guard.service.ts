import {Injectable} from "@angular/core";
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras} from "@angular/router";
import {AuthService} from "./auth.service";
import {AUTH} from "../../constants";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let data:any = route.data;

    if (this.auth.checkUserAccess(data.role)) {
      return true;
    } else {
      localStorage.setItem(AUTH.redirectUrl, state.url);
      localStorage.setItem(AUTH.redirectRole, data.role);

      this.router.navigate(['/login']);
      return false;
    }
  }


}
