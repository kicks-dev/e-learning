import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CourseService } from '../providers/course.service';
import { CourseInfo } from '../interface/course-info';
import { PhaseInfo } from '../interface/phase-info';
import { PageInfo } from '../interface/page-info';
import { PdfService } from '../providers/pdf.service';
import { PDFProgressData } from 'pdfjs-dist';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent implements OnInit, OnDestroy {

  public course: Observable<CourseInfo>;
  public phase: Observable<PhaseInfo>;
  public pageInfo: PageInfo;
  private courseId: string;
  private phaseId: string;
  private sub: any;
  private progress: number;
  // pdfSrc = '../../assets/testsheet2.pdf';
  pdfSrc: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private pdfService: PdfService
  ) { }

  ngOnInit() {
    console.log('ngOnInit');
    this.pageInfo = {currentPage: 1, totalPages: 1, hidden: true};
    this.activatedRoute.params.subscribe(params => {
      this.phaseId = params['phaseId'];
      this.activatedRoute.queryParams.subscribe(queryParams => {
        this.courseId = queryParams['courseId'];
        console.log('params phaseId = ' + this.phaseId);
        console.log('params courseId = ' + this.courseId);
        this.phase = this.courseService.getPhaseById(this.phaseId);
        this.pdfService.getPdfFile().subscribe(src => {
          this.pdfSrc = src;
        });
      });
    });
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onLoadPdf(pdf) {
    console.log('onLoad called');
    this.pageInfo.totalPages = pdf.pdfInfo.numPages;
    this.pageInfo.hidden = false;
  }
  onProgress(progressData: PDFProgressData) {
    this.progress = progressData.loaded / progressData.total * 100;

  }

  onClickLeft() {
    console.log('onClickLeft called');
    if (this.pageInfo.currentPage > 1) {
      console.log('though');
      this.pageInfo.currentPage --;
      console.log('current page = ' + this.pageInfo.currentPage);
    }
  }
  onClickRight() {
    console.log('onClickRight called');
    if (this.pageInfo.currentPage < this.pageInfo.totalPages ) {

      this.pageInfo.currentPage ++;
      console.log('current page = ' + this.pageInfo.currentPage);
    } else {

      // 完了時のアップロード画面を出す。
    }
  }
  onClickBack() {
    this.router.navigate(['phase', this.courseId]);
  }
}
