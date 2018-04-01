import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable()
export class PdfService {

  constructor(private storage: AngularFireStorage ) { }

  getPdfFile() {

    return this.storage.ref('javascript/testsheet2.pdf').getDownloadURL();
  }
}


