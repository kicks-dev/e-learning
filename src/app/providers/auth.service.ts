import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginInfo } from '../interface/login-info';
import { UserInfo } from '../interface/user-info';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { from, Subscription, Observable, Subject } from 'rxjs';
import { AUTOCOMPLETE_PANEL_HEIGHT } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private secondaryApp: firebase.app.App;

  private getUserSubject: Subject<any>;
  private getUserObservable: Observable<any>;
  public auth;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    console.log('authservice constructor called');
    this.secondaryApp = firebase.initializeApp(environment.firebase, 'Secondary');
    this.getUserSubject = new Subject();
    this.getUserObservable = this.getUserSubject.asObservable();
  }

  hasAuth() {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe( auth => {
        this.auth = auth;
        resolve();
      });
    });
  }

  setGetUserObserver = (observer) => {
    return this.getUserObservable.subscribe( {next: () => {
      observer(); }});
  }

  loginWithEmail(loginInfo: LoginInfo) {
    console.log('loginInfo.email = ' + loginInfo.email);
    sessionStorage.setItem('email', loginInfo.email);
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

}
