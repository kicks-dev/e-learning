import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseInfo } from '../../interface/course-info';
import { CourseService } from '../../providers/course.service';
import { UserInfo } from '../../interface/user-info';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  courses: Observable<CourseInfo[]>;
  private userInfo: UserInfo;

  constructor(private router: Router, private courseService: CourseService, private authService: AuthService) {}

  ngOnInit() {
    this.userInfo = this.authService.userInfo;
      if (!this.userInfo) {
        this.router.navigate(['']);
      }
      this.courses = this.courseService.getCourses(this.userInfo.uid);
  }
  onClick(course: CourseInfo) {
    console.log('selected course = ' + course.title);
    this.router.navigate(['/phase', course.id]);

  }
}
