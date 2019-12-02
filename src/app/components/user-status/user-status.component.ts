import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { CourseService } from '../../providers/course.service';
import { CourseInfo } from '../../interface/course-info';
import { UserService } from '../../providers/user.service';
import { UserInfo } from '../../interface/user-info';
import { AuthService } from '../../providers/auth.service';
@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent implements OnInit, OnDestroy {

  private subRoute: Subscription;
  private userInfo: UserInfo;
  public courseList: Observable<CourseInfo[]>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private userService: UserService,
    private authService: AuthService ) { }

  ngOnInit() {
    this.subRoute = this.activatedRoute.params.subscribe(params => {
      if (this.userService.userInfo == null) {
        this.router.navigate(['']);
      } else {
        this.userInfo = params as UserInfo;
        if (this.userInfo == null) {
          this.router.navigate(['manage-user']);
        } else {
          this.courseService.getCourses(params.uid);
        }
      }
    });
  }
  ngOnDestroy() {
    if (this.subRoute) {
      this.subRoute.unsubscribe();
    }
  }
  onClickBack() {
    this.router.navigate(['manage-user']);
  }
  onClick(course) {
    console.log('selected course = ' + course.title);
    this.router.navigate(['/user-phase', course.id, this.userInfo]);
  }

}
