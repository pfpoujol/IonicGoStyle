import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
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
import { ToastController } from '@ionic/angular';
import {AlertController} from '@ionic/angular';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
    promos: Array<Promotion> = [];
    mapPromos: { [_: string]: { range: number, used: boolean } } = {};
    user: User;
    userId: string;
    subscriptions: Subscription;
    msgArrIsEmpty: string;

    constructor(private afs: AngularFirestore,
                private authService: AuthService,
                private promosService: PromosService,
                private barcodeScanner: BarcodeScanner,
                private clipboard: Clipboard,
                public alertController: AlertController,
                private toastController: ToastController) {
    }
    ionViewWillEnter() {
        this.msgArrIsEmpty = '';
        // this.checkAccount();
    }
    ngOnInit() {
        this.authService.getPromisedUser().then(user => {
            this.userId = user.uid;
            return user;
        }).then(user => this.getPromos(user.uid));
    }

    /**
     * Obtention de la liste des promotions de l'utilisateur ordonnée par date d'expiration
     */
    getPromos(uid: string) {
        this.subscriptions = this.afs.doc<UserFirestore>('users/' + uid).valueChanges().subscribe(action => {
            if (action !== undefined) {
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
                    this.msgArrIsEmpty = 'Vous ne possédez aucune promotion.';
                    this.promos = [];
                }
            } else {
                this.msgArrIsEmpty = 'Vous ne possédez aucune promotion.';
                this.presentAlertPrompt(this.userId);
            }

        });
    }

    /**
     * Obtention des infos de l'utilisateur depuis Firebase Authentification + Cloud FireStore
     */
    checkAccount() {
        this.afs.doc('users/' + this.userId).ref.get().then((snapshot: DocumentSnapshot<UserFirestore>) => {
            if ( !snapshot.exists ) {
                this.presentAlertPrompt(this.userId);
            }
        });
    }

    scanCode() {
        this.barcodeScanner
            .scan()
            .then(barcodeData => {
                if (!barcodeData.cancelled) {
                    if (barcodeData.format === 'QR_CODE') {
                        this.getScannedPromo(barcodeData.text);
                    } else {
                        alert('Désolé, je ne scanne que les QR codes.');
                    }
                }
            })
            .catch(err => {
                console.log('Error', err);
                // TODO: remove
                // this.getScannedPromo('KISSKISS');
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
        const newRange = arrRanges.length === 0 ? 0 : Math.max(...arrRanges) + 1;
        this.afs.doc<UserFirestore>('users/' + this.userId).set({
            ownedPromos: {[ref.id]: {range: newRange, used: false}}
        } as UserFirestore, {merge: true});
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    logout() {
        this.subscriptions.unsubscribe();
        this.authService.doLogout();
        // this.router.navigate(['login']);
    }

    copyCode(index: number) {
        this.clipboard.copy(this.promos[index].code).then(() =>
            this.presentToast('<ion-icon name="copy"></ion-icon>   Code promo copié dans le press-papier'));
    }
    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 2000
        });
        toast.present();
    }
    async presentAlertPrompt(userId: string) {
        const alert = await this.alertController.create({
            backdropDismiss: false,
            header: 'Bienvenue chez GoStyle !',
            subHeader: 'Veuillez compléter votre profile.',
            inputs: [
                {
                    name: 'name',
                    type: 'text',
                    placeholder: 'Votre nom'
                },
                {
                    name: 'firstname',
                    type: 'text',
                    placeholder: 'Votre prénom'
                }
            ],
            buttons: [
                {
                    text: 'Déconnexion',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        this.logout();
                    }
                }, {
                    text: 'Enregistrer',
                    handler: (data) => {
                        this.afs.doc<UserFirestore>('users/' + this.userId).set({
                            name: data.name,
                            firstname: data.firstname,
                            ownedPromos: {}
                        } as UserFirestore);
                    }
                }
            ]
        });

        await alert.present();
    }
}
