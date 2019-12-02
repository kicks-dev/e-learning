import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CourseInfo } from '../../interface/course-info';
import { CourseService } from '../../providers/course.service';
import { UserInfo } from '../../interface/user-info';
import { AuthService } from '../../providers/auth.service';
import { UserService } from '../../providers/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {


  userInfoSubscription: Subscription;
  constructor(
    private router: Router,
    private courseService: CourseService,
    private authService: AuthService,
    private userService: UserService) {
  }

  ngOnInit() {
    console.log('main.component ngOnInit called');
    if (!this.authService.auth) {
      this.router.navigate(['login']);
    } else {
      this.userInfoSubscription = this.userService.getUserInfoByEmail(this.authService.auth.email).subscribe( user => {
        if (user && user.deleted) {
          alert('このユーザは削除されています。');
          this.authService.logout();
        } else {
          this.courseService.getCourses(user.uid);
        }
      });
    }
  }
  ngOnDestroy = () => {
    this.userInfoSubscription.unsubscribe();
  }
  onClick(course: CourseInfo) {
    console.log('selected course = ' + course.title);
    this.router.navigate(['/phase', course.id]);

  }
}
