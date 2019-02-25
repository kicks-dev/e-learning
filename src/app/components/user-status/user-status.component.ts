import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { UserInfo } from 'firebase';
import { CourseService } from '../../providers/course.service';
import { CourseInfo } from '../../interface/course-info';
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
    private courseService: CourseService) { }

  ngOnInit() {
    this.subRoute = this.activatedRoute.params.subscribe((params: UserInfo) => {
      this.userInfo = params;
      if (this.userInfo == null) {
        this.router.navigate(['']);
      }
      this.courseList = this.courseService.getCourses(params.uid);
    });
  }
  ngOnDestroy() {
    if (this.subRoute) {
      this.subRoute.unsubscribe();
    }
  }

}
