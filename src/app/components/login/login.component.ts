import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import { LoginInfo } from '../../interface/login-info';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginInfo: LoginInfo = { email: '', password: '', invalid: false };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
  }
  // onClickLogin event
  onClickLogin() {
    console.log('clickLogin');
    this.authService.setPersisitence().then( res => {
      this.authService.loginWithEmail(this.loginInfo).then(result => {
        this.router.navigate(['']);
      }).catch(error => {
        console.log('login fail : ' + error);
        this.loginInfo.invalid = true;
      });
    });
  }

  onFocus() {
    this.loginInfo.invalid = false;
  }
}
