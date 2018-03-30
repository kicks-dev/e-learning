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
  private selectedPhase: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private courseService: CourseService) {}

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      const id: string = params['id'];
      this.course = this.courseService.getCourseById(id);
      this.phases = this.courseService.getPhasesByCourseId(id);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onChange(value: string ) {
    console.log('selected phaseId = ' + value);
    this.selectedPhase = value;
  }

  onClick() {
    this.router.navigate(['study', this.selectedPhase]);
  }

   onClickBack() {
    this.router.navigate(['']);
  };
}
