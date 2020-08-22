import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {PromosService} from '../services/promos.service';
import {Promotion} from '../models/Promotion';
import {User} from '../models/User';
import {UserFirestore} from '../models/firestore/UserFirestore';
import {AngularFirestore} from '@angular/fire/firestore';
import {Subscription} from 'rxjs';
import {Clipboard} from '@ionic-native/clipboard/ngx';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import * as moment from 'moment';
import {ToastController} from '@ionic/angular';
import {AlertController} from '@ionic/angular';
import {HttpErrorResponse} from '@angular/common/http';


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
    itInit: boolean;
    promiseCompletUser: Promise<boolean>;

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
    }

    ngOnInit() {
        this.promiseCompletUser = Promise.resolve(true);
        this.itInit = true;
        this.authService.getPromisedUser().then(user => {
            this.userId = user.uid;
            return user;
        }).then(user => {
            this.initUserPromos(user.uid);
        });
    }

    /**
     * Affichage message de bienvenue, et chargement des promos si infos utilisateur completés.
     */
    initUserPromos(uid: string) {
        this.subscriptions = this.afs.doc<UserFirestore>('users/' + uid).valueChanges().subscribe(action => {
            if (this.itInit && action !== undefined) {
                this.presentToast(`<ion-icon name="happy"></ion-icon>   Bienvenue ${action.firstname} ${action.name} !`);
            }
            if (action !== undefined) {
                this.itInit = false;
                this.mapPromos = action.ownedPromos;
                this.promiseCompletUser.then(isComplet => {
                    if (isComplet) {
                        const subscription = this.promosService.getPromos(uid).subscribe((promotions) => {
                            const promosEnCours = promotions.filter(promo => moment(promo.dateExpiration).isAfter());
                            if (promosEnCours.length === 0) {
                                this.promos = [];
                                this.msgArrIsEmpty = 'Vous ne possédez aucune promotion en cours.';
                            } else {
                                this.promos = promosEnCours.sort((a, b) => {
                                    return new Date(a.dateExpiration).getTime() - new Date(b.dateExpiration).getTime();
                                });
                            }
                        }, (response) => {
                            console.log(response);
                            this.presentAlert(response.error);
                        });
                        this.subscriptions.add(subscription);
                    }
                });
            } else {
                this.promiseCompletUser = Promise.resolve(false);
                this.msgArrIsEmpty = 'Vous devez compléter votre compte.';
                this.presentAlertPrompt(this.userId);
            }
        });
    }

    scanCode() {
        this.barcodeScanner
            .scan()
            .then(barcodeData => {
                if (!barcodeData.cancelled) {
                    if (barcodeData.format === 'QR_CODE' && barcodeData.text !== '') {
                        // this.getScannedPromo(barcodeData.text);
                        const subscription = this.promosService.addPromoToUser(barcodeData.text, this.userId).subscribe(() => {
                            this.presentToast('<ion-icon name="checkmark-done-circle"></ion-icon>' +
                                '   Code promo ajouté avec succès !', 'success');
                        }, (response: HttpErrorResponse) => {
                            console.log(response);
                            this.presentAlert(response.error);
                        });
                        this.subscriptions.add(subscription);
                    } else if (barcodeData.text === '') {
                        this.presentAlert('QR codes ilisible.');
                    } else {
                        this.presentAlert('Seul les QR codes sont autorisés.');
                    }
                }
            })
            .catch(err => {
                console.log('Error', err);
            });
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }

    logout() {
        this.subscriptions.unsubscribe();
        this.authService.doLogout();
    }

    copyCode(index: number) {
        this.clipboard.copy(this.promos[index].code).then(() =>
            this.presentToast('<ion-icon name="copy"></ion-icon>   Code promo copié dans le press-papier', 'success'));
    }

    async presentToast(message: string, color?: string) {
        const toast = await this.toastController.create({
            message,
            color,
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
                        if (data.name.trim() !== '' && data.firstname.trim() !== '') {
                            this.promiseCompletUser = this.afs.doc<UserFirestore>('users/' + this.userId).set({
                                name: data.name.trim(),
                                firstname: data.firstname.trim(),
                                ownedPromos: {}
                            } as UserFirestore).then(() => true);
                        } else {
                            this.presentAlertPrompt(this.userId);
                        }

                    }
                }
            ]
        });

        await alert.present();
    }

    async presentAlert(message: string) {
        const alert = await this.alertController.create({
            header: 'Erreur',
            message,
            buttons: ['OK']
        });

        await alert.present();
    }
}
