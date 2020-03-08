import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {PromosService} from '../services/promos.service';
import {Promotion} from '../models/Promotion';
import {User} from '../models/User';
import {UserFirestore} from '../models/firestore/UserFirestore';
import {AngularFirestore, DocumentSnapshot} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';


@Component({
    selector: 'app-tab-list-promos',
    templateUrl: './tab-list-promos.page.html',
    styleUrls: ['./tab-list-promos.page.scss'],
})
export class TabListPromosPage implements OnInit, OnDestroy {
    promos: Array<Promotion>;
    mapPromos: {};
    user: User;
    userId = 'goEdwr6nOpN0oyiAGWvs9vFWaSj1';
    subscriptions: Subscription;

    constructor(private afs: AngularFirestore,
                private authService: AuthService,
                private promosService: PromosService,
                private router: Router) {
    }

    ngOnInit() {
        this.getPromos();
    }

    /**
     * Obtention de la liste des promotions de l'utilisateur ordonnée par date d'expiration
     */
    getPromos() {
        const subscription1 = this.afs.doc<UserFirestore>('users/' + this.userId).valueChanges().subscribe(action => {
            this.mapPromos = action.ownedPromos;
            const subscription2 = this.promosService.getPromos(Object.keys(action.ownedPromos)).pipe(
                map(actions => actions.map(a => {
                    return {
                        code: a.payload.doc.id,
                        dateExpiration: a.payload.doc.data().dateExpiration.toDate(),
                        description: a.payload.doc.data().description
                    };
                }))
            ).subscribe(promos => {
                this.promos = promos;
            });
            this.addToSubsciption(subscription2);
        });
        this.addToSubsciption(subscription1);
    }

    /**
     * Obtention des infos de l'utilisateur depuis Firebase Authentification + Cloud FireStore
     */
    getUser() {
        this.afs.doc('users/' + this.userId).ref.get().then((snapshot: DocumentSnapshot<UserFirestore>) => {
            this.user = {
                uid: this.userId,
                name: snapshot.data().name,
                firstname: snapshot.data().firstname
                // TODO: fusionner avec les infos d'authentification
            } as User;
        });
    }

    addToSubsciption(newSubsciption) {
        this.subscriptions ? this.subscriptions.add(newSubsciption) : this.subscriptions = newSubsciption;
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    logout() {
        this.authService.doLogout();
        this.router.navigate(['login']);
    }
}
