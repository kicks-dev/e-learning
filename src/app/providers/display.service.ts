import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  displayMode = {
    STUDY : 1,
    USER_MANAGE : 2
  };
  presentDisplayMode = this.displayMode.STUDY;
  constructor() { }

}
