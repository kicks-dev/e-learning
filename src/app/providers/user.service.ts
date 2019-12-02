import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserInfo } from '../interface/user-info';
import { map } from 'rxjs/operators';
import { from, Observable, BehaviorSubject } from 'rxjs';
import { OrganizationInfo } from '../interface/organization-info';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userInfo$: Observable<UserInfo>;
  public userInfo: UserInfo;
  readonly EMAIL = 'email';
  constructor(private afs: AngularFirestore) {
  }
  getUserList() {
    return this.afs.collection<UserInfo>('users/').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as UserInfo;
        const email = a.payload.doc.id;
        return { email, ...data };
      }))
    );
  }
  registerUser = (name: string, email: string, uid: string, admin: boolean, organizationId: number) => {
    const userInfo = {name: name, uid: uid, admin: admin, deleted: false, organization_id: organizationId };
    return from(this.afs.collection<UserInfo>('users/').doc(email).set(userInfo));
  }
  deleteUser = (isDelete: boolean, email: string) => {
    this.afs.doc('users/' + email).update({deleted: isDelete});
  }
  getUserInfoByEmail(email: string) {
    console.log('getUserInfo email = ' + email);
    sessionStorage.setItem(this.EMAIL, email);
    this.userInfo$ = this.afs.doc<UserInfo>('users/' + email).valueChanges().pipe(map( userInfo => {
      // organization info
      this.afs.doc<OrganizationInfo>(userInfo.organization_id).valueChanges().pipe( map(organization => {
        userInfo.organization = organization;
        this.userInfo = userInfo;
      })).subscribe();
      return userInfo;
    }));
    return this.userInfo$;
  }
}
