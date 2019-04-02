import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginInfo } from '../interface/login-info';
import { UserInfo } from '../interface/user-info';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { from, Subscription, Observable, Subject } from 'rxjs';

const EMAIL = 'email';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public email: string;
  public userInfo: UserInfo;
  private secondaryApp: firebase.app.App;

  private getUserSubject: Subject<any>;
  private getUserObservable: Observable<any>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.secondaryApp = firebase.initializeApp(environment.firebase, 'Secondary');
    this.getUserSubject = new Subject();
    this.getUserObservable = this.getUserSubject.asObservable();
  }

  hasAuth() {
    return this.afAuth.authState;
  }

  setGetUserObserver = (observer) => {
    return this.getUserObservable.subscribe( {next: () => {
      observer(); }});
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
      console.log('call getUser next');
      this.getUserSubject.next();
      return user;
    }));
  }
}
