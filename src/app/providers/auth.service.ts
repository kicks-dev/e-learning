import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginInfo } from '../interface/login-info';
import { UserInfo } from '../interface/user-info';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {}

  hasAuth() {
    return this.afAuth.authState;

  }

  async loginWithEmail(loginInfo: LoginInfo) {

    console.log('loginInfo.email = ' + loginInfo.email);
    const persistence = await this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

    const login = await this.afAuth.auth.signInWithEmailAndPassword(loginInfo.email, loginInfo.password);

    return login;
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
