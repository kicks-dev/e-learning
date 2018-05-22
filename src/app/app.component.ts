import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from './providers/auth.service';
import { UserInfo } from './interface/user-info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  userInfo: Observable<UserInfo>;

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
   this.authService.hasAuth().subscribe(auth => {
     if (!auth) {
       this.router.navigate(['login']);
       this.userInfo = null;
     } else {
        this.userInfo = this.authService.getUserInfoByEmail(auth.email);
     }
   });
  }
  onClickLogout() {
    this.authService.logout();
  }
}

