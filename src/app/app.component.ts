import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from './providers/auth.service';
import { DisplayService } from './providers/display.service';
import { UserService } from './providers/user.service';
import { CourseService } from './providers/course.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  userInfoSubscription: Subscription;
  constructor(
    private router: Router,
    private authService: AuthService,
    public userService: UserService,
    private courseService: CourseService,
    public displayService: DisplayService) {
      console.log('appcomponent constructor called');
  }
  ngOnInit() {
    // if (!this.authService.auth) {
    //   this.router.navigate(['login']);
    // } else {
    //   this.userInfoSubscription = this.userService.getUserInfoByEmail(this.authService.auth.email).subscribe( user => {
    //     if (user && user.deleted) {
    //       alert('このユーザは削除されています。');
    //       this.authService.logout();
    //     } else {
    //       this.courseService.getCourses(user.uid);
    //     }
    //   });
    // }
  }
  ngOnDestroy() {
    this.userInfoSubscription.unsubscribe();
  }
  onClickManageUser() {
    this.router.navigate(['manage-user']);
    this.displayService.presentDisplayMode = this.displayService.displayMode.USER_MANAGE;
  }
  onClickManageOrganization() {
    this.router.navigate(['manage-organization']);
    this.displayService.presentDisplayMode = this.displayService.displayMode.ORGANAZATION_MANAGE;
  }
  onClickStudy() {
    this.router.navigate(['']);
    this.displayService.presentDisplayMode = this.displayService.displayMode.STUDY;
  }
  onClickStat() {
    this.router.navigate(['stat']);
    this.displayService.presentDisplayMode = this.displayService.displayMode.STAT;
  }
  onClickLogout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}

