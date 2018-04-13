import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CourseService } from '../providers/course.service';
import { CourseInfo } from '../interface/course-info';
import { PhaseInfo } from '../interface/phase-info';

@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.css']
})
export class PhaseComponent implements OnInit, OnDestroy {

  course: Observable<CourseInfo>;
  phases: Observable<PhaseInfo[]>;
  private sub: any;
  private courseId: string;
  private selectedPhase: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private courseService: CourseService) {}

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.courseId = params['courseId'];
      this.course = this.courseService.getCourseById(this.courseId);
      this.phases = this.courseService.getPhasesByCourseId(this.courseId);
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onChange(value: string ) {
    console.log('selected phaseId = ' + value);
    this.selectedPhase = value;
  }

  onClick() {
    this.router.navigate(['study', this.selectedPhase], {queryParams: {courseId: this.courseId}});
  }

   onClickBack() {
    this.router.navigate(['']);
  }
}
