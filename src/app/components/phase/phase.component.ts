import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CourseService } from '../../providers/course.service';
import { CourseInfo } from '../../interface/course-info';
import { PhaseInfo } from '../../interface/phase-info';
import { UserInfo } from '../../interface/user-info';
import { AuthService } from '../../providers/auth.service';
import { UserService } from '../../providers/user.service';

@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.css']
})
export class PhaseComponent implements OnInit, OnDestroy {

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
    private userService: UserService,
    private authService: AuthService) {}

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.userInfo = this.userService.userInfo;
      if (this.userInfo == null) {
        console.log('ngOnInit userInfo === null');
        this.router.navigate(['']);
      } else {
        this.courseId = params['courseId'];
        this.course = this.courseService.getCourseById(this.courseId);
        this.phases = this.courseService.getPhasesByCourseId(this.courseId, this.userInfo.uid) as Observable<PhaseInfo[]>;
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onChange(value: PhaseInfo ) {
    console.log('selected phase id = ' + value.id);
    this.selectedPhase = value;
  }

  onClick() {
    this.courseService.startPhase(this.userInfo.uid, this.selectedPhase);
    this.router.navigate(['study', this.selectedPhase.id], {queryParams: {courseId: this.courseId}});
  }

  onClickBack() {
    this.router.navigate(['']);
  }
}
