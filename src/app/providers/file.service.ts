import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private storage: AngularFireStorage) { }

  upload(file: File, filePath: string) {
    console.log('filePath = ' + filePath);
    return this.storage.upload(filePath, file);
  }
}
