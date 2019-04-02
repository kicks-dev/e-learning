import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CourseService } from '../../providers/course.service';
import { CourseInfo } from '../../interface/course-info';
import { PhaseInfo } from '../../interface/phase-info';
import { UserInfo } from '../../interface/user-info';
import { AuthService } from '../../providers/auth.service';
@Component({
  selector: 'app-user-phase',
  templateUrl: './user-phase.component.html',
  styleUrls: ['./user-phase.component.css']
})
export class UserPhaseComponent implements OnInit {

  course: Observable<CourseInfo>;
  phases: Observable<PhaseInfo[]>;
  private sub: Subscription;
  private courseId: string;
  private selectedPhase: PhaseInfo;
  private userInfo: UserInfo;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private authService: AuthService) {}


  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      if (this.authService.userInfo == null) {
        this.router.navigate(['']);
      } else {
        this.courseId = params.courseId;
        this.userInfo = {admin: params.admin, uid: params.uid, name: params.name, email: params.email, deleted: params.deleted};
        this.course = this.courseService.getCourseById(this.courseId);
        this.phases = this.courseService.getPhasesByCourseId(this.courseId, this.userInfo.uid) as Observable<PhaseInfo[]>;
      }
    });
  }
  onClickBack() {
    this.router.navigate(['user-status', this.userInfo]);
  }
}
