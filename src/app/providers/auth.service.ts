import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginInfo } from '../interface/login-info';
import { UserInfo } from '../interface/user-info';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { from } from 'rxjs';

const EMAIL = 'email';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public email: string;
  public userInfo: UserInfo;
  private secondaryApp: firebase.app.App;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.secondaryApp = firebase.initializeApp(environment.firebase, 'Secondary');
  }

  hasAuth() {
    return this.afAuth.authState;
  }

  loginWithEmail(loginInfo: LoginInfo) {

    console.log('loginInfo.email = ' + loginInfo.email);
    sessionStorage.setItem(EMAIL, loginInfo.email);
    this.email = loginInfo.email;
    return this.afAuth.auth.signInWithEmailAndPassword(loginInfo.email, loginInfo.password);
  }
  setPersisitence() {
    return this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
  }
  createUser(email: string, password: string) {
    console.log('createUser');
    return from(this.secondaryApp.auth().createUserWithEmailAndPassword(email, password));
  }

  logout() {
    console.log('logout called');
    this.afAuth.auth.signOut();
  }

  getUserInfoByEmail(email: string) {
    console.log('getUserInfo email = ' + email);
    sessionStorage.setItem(EMAIL, email);
    this.email = email;
    return this.afs.doc<UserInfo>('users/' + email).valueChanges().pipe(map(user => {
      this.userInfo = user;
      return user;
    }));
  }
}
