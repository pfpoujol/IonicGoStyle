import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {PromosService} from '../services/promos.service';
import {Promotion} from '../models/Promotion';
import {User} from '../models/User';
import {UserFirestore} from '../models/firestore/UserFirestore';
import {AngularFirestore, DocumentChangeAction, DocumentSnapshot} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';
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
        // this.loadPromos();
        const timerid = setTimeout(() => {
            // console.log(this.promos);
        }, 5000);
    }

    /*    getAllPromos(): void {
            this.promosService.getPromos().subscribe(data => {
                this.promos = data.map(e => {
                    return {
                        code: e.payload.doc.id,
                        ...e.payload.doc.data()
                    } as Promotion;
                });
            });
        }*/

    getPromos() {
        const subscription1 = this.afs.doc<UserFirestore>('users/goEdwr6nOpN0oyiAGWvs9vFWaSj1').valueChanges().subscribe(action => {
            this.mapPromos = action.ownedPromos;
            const subscription2 = this.promosService.getPromos(Object.keys(action.ownedPromos)).pipe(
                map(actions => actions.map(a => {
                    return {
                        code: a.payload.doc.id,
                        dateExpiration: a.payload.doc.data().dateExpiration.toDate(),
                        description: a.payload.doc.data().description
                    };
                }))
            ).subscribe(promo => console.log(promo));
            this.addToSubsciption(subscription2);
        });
        this.addToSubsciption(subscription1);
    }

    getUser() {
        this.afs.doc('users/goEdwr6nOpN0oyiAGWvs9vFWaSj1').ref.get().then((snapshot: DocumentSnapshot<UserFirestore>) => {
            this.user = {
                uid: 'goEdwr6nOpN0oyiAGWvs9vFWaSj1',
                name: snapshot.data().name,
                firstname: snapshot.data().firstname
            } as User;
        });
    }

    logout() {
        this.authService.doLogout();
        this.router.navigate(['login']);
    }

    addToSubsciption(newSubsciption) {
        this.subscriptions ? this.subscriptions.add(newSubsciption) : this.subscriptions = newSubsciption;
    }

    OnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
