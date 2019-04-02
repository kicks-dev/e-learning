import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CourseInfo } from '../../interface/course-info';
import { CourseService } from '../../providers/course.service';
import { UserInfo } from '../../interface/user-info';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  courses: Observable<CourseInfo[]>;
  private userInfo: UserInfo;
  private getUserSubscription: Subscription;

  constructor(private router: Router, private courseService: CourseService, private authService: AuthService) {
    this.getUserSubscription = this.authService.setGetUserObserver(this.getCourses);
  }

  ngOnInit() {
    // フェーズから戻った場合
    const userInfo = this.authService.userInfo;
    if ( userInfo ) {
      this.userInfo = userInfo;
      this.courses = this.courseService.getCourses(userInfo.uid);
    }
  }
  ngOnDestroy = () => {
    this.getUserSubscription.unsubscribe();
  }
  getCourses = () => {
    console.log('getCourses called');
    this.userInfo = this.authService.userInfo;
    this.courses = this.courseService.getCourses(this.userInfo.uid);
  }
  onClick(course: CourseInfo) {
    console.log('selected course = ' + course.title);
    this.router.navigate(['/phase', course.id]);

  }
}
