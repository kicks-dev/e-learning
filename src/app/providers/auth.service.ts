import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginInfo } from '../interface/login-info';
import { UserInfo } from '../interface/user-info';
import * as firebase from 'firebase/app';

const EMAIL = 'email';

@Injectable()
export class AuthService {

  public email: string;
  public userInfo: UserInfo;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {}

  hasAuth() {
    return this.afAuth.authState;
  }

  async loginWithEmail(loginInfo: LoginInfo) {

    console.log('loginInfo.email = ' + loginInfo.email);
    sessionStorage.setItem(EMAIL, loginInfo.email);
    this.email = loginInfo.email;
    const persistence = await this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    const login = await this.afAuth.auth.signInWithEmailAndPassword(loginInfo.email, loginInfo.password);
    return login;
  }

  logout() {
    console.log('logout called');
    this.afAuth.auth.signOut();
  }

  getUserInfoByEmail(email: string) {
    console.log('getUserInfo email = ' + email);
    sessionStorage.setItem(EMAIL, email);
    this.email = email;
    return this.afs.doc<UserInfo>('users/' + email).valueChanges().map(user => {
      this.userInfo = user;
      return user;
    });
  }
}
