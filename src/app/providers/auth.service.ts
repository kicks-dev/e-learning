import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginInfo } from '../interface/login-info';
import { UserInfo } from '../interface/user-info';

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {}

  hasAuth() {
    return this.afAuth.authState;

  }

  loginWithEmail(loginInfo: LoginInfo) {
    console.log('loginInfo.email = ' + loginInfo.email);
    return this.afAuth.auth.signInWithEmailAndPassword(loginInfo.email, loginInfo.password);
  }
  logout() {
    console.log('logout called');
    this.afAuth.auth.signOut();
  }

  getUserInfo(uid: String) {
    console.log('getUserInfo uid = ' + uid);
    return this.afs.collection<UserInfo>('users', ref => ref.where('uid', '==', uid)).valueChanges().map(list => list[0]);
  }
}
