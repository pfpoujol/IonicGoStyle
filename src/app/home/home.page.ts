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
import {Clipboard} from '@ionic-native/clipboard/ngx';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import * as moment from 'moment';
import {PromotionFirestore} from '../models/firestore/PromotionFirestore';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
    promos: Array<Promotion> = [
        {
            code: 'SUPER50',
            dateExpiration: new Date(2020, 3, 9),
            description: '30% de réduction sur Sneakers Adidas'
        },
        {
            code: 'KADO20',
            dateExpiration: new Date(2020, 3, 7),
            description: '20% de réduction sur Jean Levi\'s'
        }
    ];
    mapPromos: { [_: string]: { range: number, used: boolean } };
    user: User;
    userId = 'goEdwr6nOpN0oyiAGWvs9vFWaSj1';
    subscriptions: Subscription;
    CopyTextAreaText = this.promos[0].code;
    PasteTextAreaText = 'Paste here!';

    constructor(private afs: AngularFirestore,
                private authService: AuthService,
                private promosService: PromosService,
                private barcodeScanner: BarcodeScanner,
                private clipboard: Clipboard,
                private router: Router) {
    }

    ngOnInit() {
        // TODO: fix get userId
        // this.userId = this.authService.userId;
        // this.getPromos();
    }

    /**
     * Obtention de la liste des promotions de l'utilisateur ordonnée par date d'expiration
     */
    getPromos() {
        this.subscriptions = this.afs.doc<UserFirestore>('users/' + this.userId).valueChanges().subscribe(action => {
            this.mapPromos = action.ownedPromos;
            const arrPromos = Object.keys(action.ownedPromos);
            if (arrPromos.length > 0) {
                const subscription = this.promosService.getPromos(arrPromos).pipe(
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
                this.subscriptions.add(subscription);
            } else {
                this.promos = [];
            }
        });
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
        this.barcodeScanner
            .scan()
            .then(barcodeData => {
                if (!barcodeData.cancelled) {
                    if (barcodeData.format === 'QR_CODE') {
                        // this.getScannedPromo(barcodeData.text);
                    } else {
                        alert('Désolé, je ne scanne que les QR codes.');
                    }
                }
            })
            .catch(err => {
                console.log('Error', err);
                // TODO: remove
                // this.getScannedPromo('EXISTEPAS');
                // this.getScannedPromo('Extrda10');
                // this.getScannedPromo('KADO20');
            });
    }

    /**
     * recupère le text du qrcode, vérifie s'il exite en bdd, s'il n'est pas expiré et s'il n'a pas déjà été scanné par l'utilisateur.
     * Si c'est OK, appel la fonction suivante addScannedPromo()
     */
    getScannedPromo(txtCode: string) {
        this.promosService.getPromo(txtCode).get().then((snapshot: DocumentSnapshot<PromotionFirestore>) => {
            if (snapshot.exists) {
                if (Object.keys(this.mapPromos).includes(snapshot.id)) {
                    alert('Vous détenez déjà cette promotion.');
                } else if (moment(snapshot.data().dateExpiration.toDate()).isSameOrBefore()) {
                    alert('Cette promotion est expirée.');
                } else {
                    this.addScannedPromo(snapshot.ref);
                }
            } else {
                alert('Cette promotion n\'existe pas.');
            }
        });
    }

    /**
     * Ajout de la promotion à l'utilisateur, en tant qu'attribut supplémentaire de l'objet ownedPromos (data type Map)
     */
    addScannedPromo(ref: DocumentReference) {
        const arrKeys: Array<string> = Object.keys(this.mapPromos);
        // @ts-ignore
        const arrRanges: Array<number> = arrKeys.flatMap(key => [this.mapPromos[key].range]);
        console.log(Math.max(...arrRanges));
        const newRange = arrRanges.length === 0 ? 0 : Math.max(...arrRanges) + 1;
        this.afs.doc<UserFirestore>('users/' + this.userId).set({
            ownedPromos: {[ref.id]: {range: newRange, used: false}}
        } as UserFirestore, {merge: true});
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    logout() {
        this.authService.doLogout();
        this.router.navigate(['login']);
    }
    // Copy Event
    copyText() {
        this.clipboard.copy(this.CopyTextAreaText);
    }

    // Paste Event
    pasteText() {
        this.clipboard.paste().then(
            (resolve: string) => {
                this.PasteTextAreaText = resolve;
                console.log(resolve);
            },
            (reject: string) => {
                console.error('Error: ' + reject);
            }
        );
    }

    // Clear Event
    clearClipboard() {
        this.clipboard.clear();
    }

}
