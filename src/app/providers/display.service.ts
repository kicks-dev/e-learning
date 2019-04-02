import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  displayMode = {
    STUDY : 1,
    USER_MANAGE : 2,
    STAT: 3
  };
  presentDisplayMode = this.displayMode.STUDY;
  constructor() { }

}
