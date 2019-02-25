import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from './providers/auth.service';
import { DisplayService } from './providers/display.service';
import { UserInfo } from './interface/user-info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  userInfo: Observable<UserInfo>;
  constructor(private router: Router, private authService: AuthService, public displayService: DisplayService) {

  }

  ngOnInit() {
    this.authService.hasAuth().subscribe(auth => {
      if (!auth) {
        this.router.navigate(['login']);
        this.userInfo = null;
      } else {
        this.userInfo = this.authService.getUserInfoByEmail(auth.email);
        this.userInfo.subscribe( user => {
          if (user.deleted) {
            alert('このユーザは削除されています。');
            this.authService.logout();
          }
        });
      }
    });
  }
  onClickManageUser() {
    this.router.navigate(['manage-user']);
    this.displayService.presentDisplayMode = this.displayService.displayMode.USER_MANAGE;
  }
  onClickStudy() {
    this.router.navigate(['']);
    this.displayService.presentDisplayMode = this.displayService.displayMode.STUDY;
  }
  onClickLogout() {
    this.authService.logout();
  }
}

