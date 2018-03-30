import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CourseInfo } from '../interface/course-info';
import { CourseService } from '../providers/course.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  courses: Observable<CourseInfo[]>;

  constructor(private router: Router, private courseService: CourseService) {}

  ngOnInit() {
    this.courses = this.courseService.getCourses();
  }
  onClick(course: CourseInfo) {
    console.log('selected course = ' + course.title);
    this.router.navigate(['phase', course.id]);

  }
}
