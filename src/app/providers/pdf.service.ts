import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private storage: AngularFireStorage ) { }

  getPdfFile(courseId: string , pdfName: string) {
    const url = this.storage.ref(courseId + '/' + pdfName).getDownloadURL();
    return url;
  }
}


