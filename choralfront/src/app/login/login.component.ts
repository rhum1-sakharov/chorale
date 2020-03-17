import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {Credentials} from "../services/auth/credentials";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {Message} from 'primeng/primeng';
import {NavigationExtras, Router, ActivatedRoute, Params} from "@angular/router";
import {AUTH} from "../constants";
import 'rxjs/add/operator/switchMap';
import {tokenNotExpired, JwtHelper} from 'angular2-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  submitted: boolean;
  userform: FormGroup;
  msgs: Message[];

  constructor(private jwtHelper: JwtHelper, private route: ActivatedRoute, private auth: AuthService, private builder: FormBuilder, private router: Router) {
    this.userform = builder.group({
      'username': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  ngOnInit(): void {

  }

  onLogin() {

    this.auth.login(this.userform.value).subscribe(
      data => {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = localStorage.getItem(AUTH.redirectUrl);
        let role = localStorage.getItem(AUTH.redirectRole);

        if (role && redirect) {
          if (this.auth.checkUserAccess(role)) {
            this.router.navigate([redirect]);
          } else {
            this.msgs = [];
            this.msgs.push({
              severity: 'warn',
              summary: '',
              detail: `Le rôle ${role} n\'existe pas pour cet utilisateur.`
            });
          }
        } else {

          let token : any = localStorage.getItem(AUTH.token);
          token = this.jwtHelper.decodeToken(token);
          let roles : string = '';
          console.log(token.sub);
          for (var i=0;i<token.sub.authorities.length;i++){
            roles += token.sub.authorities[i].authority+ ', ';
          }
          roles = roles.substring(0,roles.lastIndexOf(','));
          if(token.sub.authorities.length==1){
            roles = "le rôle "+roles;
          }else {
            roles = 'les rôles '+roles;
          }
          token.sub.authorities.map(authority=>roles)
          this.msgs = [];
          this.msgs.push({
            severity: 'success',
            summary: '',
            detail: `Authentification réussie. Vous avez ${roles}.`
          });
        }

      },
      error => {
        console.log(error);
        this.msgs = [];
        this.msgs.push({severity: 'warn', summary: '', detail: 'Identifiant ou mot de passe invalide.'});
      });
  }

}
