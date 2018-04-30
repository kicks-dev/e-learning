import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CourseService } from '../providers/course.service';
import { CourseInfo } from '../interface/course-info';
import { PhaseInfo } from '../interface/phase-info';
import { PageInfo } from '../interface/page-info';
import { PdfService } from '../providers/pdf.service';
import { PDFProgressData, PDFDocumentProxy } from 'pdfjs-dist';

export enum KEY_CODE {

  SHIFT = 16,
}
export enum ZOOM {
  IN = 'zoom-in',
  OUT = 'zoom-out'
}

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent implements OnInit, OnDestroy {

  public course: Observable<CourseInfo>;
  public phase: Observable<PhaseInfo>;
  public pageInfo: PageInfo;
  public zoomInOut: string;
  private courseId: string;
  private phaseId: string;
  private sub: any;
  private progress: number;
  private pdfSrc: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private pdfService: PdfService
  ) { }

  ngOnInit() {
    console.log('ngOnInit');
    this.pageInfo = {currentPage: 1, totalPages: 1, hidden: true, zoomLevel: 1};
    this.activatedRoute.params.subscribe(params => {
      this.phaseId = params['phaseId'];
      this.activatedRoute.queryParams.subscribe(queryParams => {
        this.courseId = queryParams['courseId'];
        console.log('params phaseId = ' + this.phaseId);
        console.log('params courseId = ' + this.courseId);
        this.courseService.getPhaseById(
          this.phaseId).map(c => this.pdfService.getPdfFile(c.courseId, c.pdfName).subscribe(src => this.pdfSrc = src)).subscribe();
      });
    });
    this.zoomInOut = ZOOM.IN;
  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onLoadPdf(pdf) {
    console.log('onLoad called');
    this.pageInfo.totalPages = pdf.pdfInfo.numPages;
  }
  onProgress(progressData: PDFProgressData) {
    this.progress = progressData.loaded / progressData.total * 100;
    console.log( 'progress = ' + this.progress);
  }
  afterLoadComplete(pdf: PDFDocumentProxy) {
    console.log('afterLoadComplete');
    this.pageInfo.hidden = false;
  }
  @HostListener('window:keydown', ['$event'])
  keyDownEvent(event: KeyboardEvent) {
    console.log('key down ' + event.keyCode);
    if (event.keyCode === KEY_CODE.SHIFT) {
      console.log('shift key ');
      this.zoomInOut = ZOOM.OUT;
      console.log('zoom in out = ' + this.zoomInOut);
    }
  }
  @HostListener('window:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    console.log('key up ' + event.keyCode);
    if (event.keyCode === KEY_CODE.SHIFT) {
      this.zoomInOut = ZOOM.IN;
      console.log('zoom in out = ' + this.zoomInOut);
    }
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
  onClick() {
    console.log('click pdf');
    if (this.zoomInOut === ZOOM.IN) {
      this.pageInfo.zoomLevel += 0.1;
    } else {
      this.pageInfo.zoomLevel -= 0.1;
    }
  }
}
