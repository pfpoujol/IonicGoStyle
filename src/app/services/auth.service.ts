import {Injectable, NgZone} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {first, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {User} from 'firebase';
import {Router} from '@angular/router';
import {NavController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(public afAuth: AngularFireAuth,
                private router: Router,
                public ngZone: NgZone,
                public navController: NavController
    ) {
    }

    doLogin(value) {
        return this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password)
            .then((result) => {
                this.ngZone.run(() => {
                    this.router.navigate(['home']);
                });
                // this.SetUserData(result.user);
            }).catch((error) => {
                window.alert(error.message);
            });
    }

    doLogout() {
        // window.localStorage.removeItem('firebase:session::<host-name>');
        // firebase.auth().signOut();
        return this.afAuth.auth.signOut().then(() => {
            // localStorage.removeItem('user');
            this.navController.navigateRoot(['login']);
            /*then(() => this.router.routeReuseStrategy.shouldReuseRoute = function() {
                return false;
            });*/
        });
    }

    registerUser(value) {
        return this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
            .then((result) => {
                /* Call the SendVerificaitonMail() function when new user sign
                up and returns promise */
                // this.SendVerificationMail();
                // this.SetUserData(result.user);
            }).catch((error) => {
                window.alert(error.message);
            });
    }

    getPromisedUser(): Promise<firebase.User> {
        return this.afAuth.authState.pipe(first()).toPromise();
    }
}

// https://www.positronx.io/full-angular-7-firebase-authentication-system/
// https://github.com/SinghDigamber/angularfirebase-authentication/blob/master/src/app/shared/services/auth.service.ts
// https://stackoverflow.com/questions/52389376/angular-6-how-to-reload-current-page?answertab=votes#tab-top
