import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {first} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: firebase.User;
  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe( authState => {
      this.authState = authState;
    });
  }
  get isAuthenticated(): boolean {
    return this.authState !== null;
  }
  get isEmailVerified(): boolean {
    return this.isAuthenticated ? this.authState.emailVerified : false;
  }
  get userId(): string {
    return this.isAuthenticated ? this.authState.uid : null;
  }
  get userAuthData(): any {
    if ( !this.isAuthenticated ) {
      return [];
    }
    return [
      {
        id: this.authState.uid,
        displayName: this.authState.displayName,
        email: this.authState.email,
        phoneNumber: this.authState.phoneNumber,
        photoURL: this.authState.photoURL,
      }
    ];
  }
  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
          .then(
              res => resolve(res),
              err => reject(err));
    });
  }

  doLogout() {
    firebase.auth().signOut();
    /*return new Promise((resolve, reject) => {
        this.afAuth.auth.signOut()
            .then(() => {
                this.firebaseService.unsubscribeOnLogOut();
                resolve();
            }).catch((error) => {
            reject();
        });
    });*/

  }

  getUser(): Promise<firebase.User> {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}
