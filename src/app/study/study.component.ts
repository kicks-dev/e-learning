import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CourseService } from '../providers/course.service';
import { CourseInfo } from '../interface/course-info';
import { PhaseInfo } from '../interface/phase-info';
import { PageInfo } from '../interface/page-info';
import { PdfService } from '../providers/pdf.service';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent implements OnInit {

  course: Observable<CourseInfo>;
  phase: Observable<PhaseInfo>;
  pageInfo: PageInfo;
  private sub: any;
  //pdfSrc = '../../assets/testsheet2.pdf';
  pdfSrc: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private courseService: CourseService, private pdfService: PdfService) { }

  ngOnInit() {

    this.sub = this.activatedRoute.params.subscribe(params => {
      const id: string = params['id'];
      this.course = this.courseService.getCourseById(id);
      this.phase = this.courseService.getPhaseById(id);
      this.pageInfo = {currentPage:1, totalPages: 1, hidden: true};
      this.pdfService.getPdfFile().subscribe(src =>{
        debugger;
         this.pdfSrc = src;
      });
    });

  }
  onLoadPdf(pdf) {
    console.log('onLoad called');
    this.pageInfo.totalPages = pdf.pdfInfo.numPages;
    this.pageInfo.hidden = false;
  }

  onClickLeft() {
    if(this.pageInfo.currentPage > 0){

      this.pageInfo.currentPage --;
    }
  }

  onClickRight() {

    if(this.pageInfo.currentPage < this.pageInfo.totalPages){

      this.pageInfo.currentPage ++;
    }

  }
}
