import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CourseService } from '../../providers/course.service';
import { CourseInfo } from '../../interface/course-info';
import { PhaseInfo } from '../../interface/phase-info';
import { PageInfo } from '../../interface/page-info';
import { PdfService } from '../../providers/pdf.service';
import { AuthService } from '../../providers/auth.service';

import { PDFProgressData, PDFDocumentProxy } from 'pdfjs-dist';
import { MatDialog } from '@angular/material';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';
import { finalize, map } from 'rxjs/operators';

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
  public pdfSrc: Observable<String | null>;
  private showFileUpload: any;
  public uploadFile: File;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private pdfService: PdfService,
    private authService: AuthService,

    public dialog: MatDialog
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
          // tslint:disable-next-line:max-line-length
          this.phaseId).pipe(map((c) =>
          this.pdfService.getPdfFile(c.courseId, c.pdfName).subscribe(
            src => this.pdfSrc = src
            )
          )).subscribe();
      });
      this.course = this.courseService.getCourseById(this.courseId);
      this.phase = this.courseService.getPhaseById(this.phaseId);
    });
    this.zoomInOut = ZOOM.IN;
    this.showFileUpload = false;
    this.uploadFile = null;
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
    if (this.showFileUpload) {
      this.showFileUpload = false;
      return;
    }
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
      this.showFileUpload = true;
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
  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.uploadFile = fileList[0];
    } else {
      this.uploadFile = null;
      console.log('file canged to null');
    }
  }
  onClickUpload() {
    console.log('onClickUpload called.');
    const filePath = this.authService.userInfo.uid + '/' + this.courseId + '/' + this.phaseId + '.zip';
    const dialogRef = this.dialog.open(UploadDialogComponent,
      {height: '250px', width: '400px',
      data: {uploadFile: this.uploadFile, filePath: filePath}});
    dialogRef.afterClosed().pipe( finalize(() => {
      console.log('upload completed');
      this.onClickBack();
      this.courseService.completePhase(this.courseId, this.phaseId, this.authService.userInfo.uid);
    })).subscribe();
  }
}
