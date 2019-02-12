import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserInfo } from '../interface/user-info';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore) { }
  getUserList() {
    return this.afs.collection<UserInfo>('users/').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as UserInfo;
        const email = a.payload.doc.id;
        return { email, ...data };
      }))
    );
  }
  registerUser() {
    
  }
}
