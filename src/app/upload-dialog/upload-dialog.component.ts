import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FileService } from '../providers/file.service';
import { AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})
export class UploadDialogComponent implements OnInit {

  uploadPercent: Observable<number>;
  showComment: boolean;

  constructor(
    public dialogRef: MatDialogRef<UploadDialogComponent>,
    private fileService: FileService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.showComment = false;
    }

  ngOnInit() {

    const uploadTask = this.fileService.upload(this.data.uploadFile, this.data.filePath);
    this.uploadPercent = uploadTask.percentageChanges();
    uploadTask.snapshotChanges().pipe(
      finalize(() =>  this.showComment)
   )
  .subscribe();
  }

}
