import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CourseService } from '../providers/course.service';
import { CourseInfo } from '../interface/course-info';
import { PhaseInfo } from '../interface/phase-info';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent implements OnInit {

  course: Observable<CourseInfo>;
  phase: Observable<PhaseInfo>
  private sub: any;
  pdfSrc: string = '../../assets/testsheet2.pdf';

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private courseService: CourseService) { }

  ngOnInit() {

    this.sub = this.activatedRoute.params.subscribe(params => {
      const id: string = params['id'];
      this.course = this.courseService.getCourseById(id);
      this.phase = this.courseService.getPhaseById(id);
    });

  }

}
