import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable()
export class PdfService {

  constructor(private storage: AngularFireStorage ) { }

  getPdfFile(courseId: string , pdfName: string) {
    return this.storage.ref(courseId + '/' + pdfName).getDownloadURL();
  }
}


