import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {PromosService} from '../services/promos.service';
import {Promotion} from '../models/Promotion';
import {User} from '../models/User';
import {UserFirestore} from '../models/firestore/UserFirestore';
import {AngularFirestore, DocumentReference, DocumentSnapshot} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import * as moment from 'moment';
import {PromotionFirestore} from '../models/firestore/PromotionFirestore';


@Component({
    selector: 'app-tab-list-promos',
    templateUrl: './tab-list-promos.page.html',
    styleUrls: ['./tab-list-promos.page.scss'],
})
export class TabListPromosPage implements OnInit, OnDestroy {
    promos: Array<Promotion>;
    mapPromos: { unknown: { range: number, used: boolean }};
    user: User;
    userId = 'goEdwr6nOpN0oyiAGWvs9vFWaSj1';
    subscriptions: Subscription;

    constructor(private afs: AngularFirestore,
                private authService: AuthService,
                private promosService: PromosService,
                private barcodeScanner: BarcodeScanner,
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

    scanCode() {
        // this.getScannedPromo('EXISTEPAS');
        // this.getScannedPromo('EXPIRED');
        // this.getScannedPromo('KADO20');
        this.barcodeScanner
            .scan()
            .then(barcodeData => {
                if (barcodeData.format === 'QR_CODE') {
                    this.getScannedPromo(barcodeData.text);
                } else {
                    alert('Désolé, je ne scanne que les QR codes.');
                }
            })
            .catch(err => {
                console.log('Error', err);
                // TODO: remove
                // this.getScannedPromo('EXISTEPAS');
                this.getScannedPromo('EXPIRED');
                // this.getScannedPromo('KADO20');
            });
    }

    /**
     * recupère le text du qrcode, vérifie s'il exite en bdd, s'il n'est pas expiré et s'il n'a pas déjà été scanné par l'utilisateur.
     * Si c'est OK, appel la fonction suivante addScannedPromo()
     */
    getScannedPromo(txtCode: string) {
        this.promosService.getPromo(txtCode).get().then((snapshot: DocumentSnapshot<PromotionFirestore>) => {
            let newPromo;
            if (snapshot.exists && moment(snapshot.data().dateExpiration.toDate()).isAfter()) {
                newPromo = {
                    code: snapshot.id,
                    dateExpiration: snapshot.data().dateExpiration.toDate(),
                    description: snapshot.data().description
                } as Promotion;
            }
            return snapshot.ref;
        }).then(promoRef => {
            if (promoRef) {
                if (!Object.keys(this.mapPromos).includes(promoRef.id)) {
                    this.addScannedPromo(promoRef);
                } else {
                    alert('QR code déjà scanné');
                }
            } else {
                alert('Promo expirée ou non trouvée');
            }
        });
    }

    /**
     * Ajout de la promotion à l'utilisateur, en tant qu'attribut supplémentaire de l'objet ownedPromos (data type Map)
     */
    addScannedPromo(ref: DocumentReference) {
        const arr = Object.keys(this.mapPromos).map(key => {
            return [this.mapPromos[key].range];
            // @ts-ignore
        }).flat();
        const range = Math.max(...arr) + 1;
        this.afs.doc<UserFirestore>('users/' + this.userId).set({
            ownedPromos: {[ref.id]: {range, used: false}}
        } as UserFirestore, { merge: true });
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
