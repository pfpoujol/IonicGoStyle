import {Component, OnInit} from '@angular/core';
import {BarcodeScannerOptions, BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import {PromosService} from '../services/promos.service';
import {Promotion} from '../models/Promotion';
import {PromotionFirestore} from '../models/firestore/PromotionFirestore';
import * as firebase from 'firebase';
import {AngularFirestore, DocumentSnapshot} from '@angular/fire/firestore';
import * as moment from 'moment';

@Component({
    selector: 'app-tab-barcode-scanner',
    templateUrl: './tab-barcode-scanner.page.html',
    styleUrls: ['./tab-barcode-scanner.page.scss'],
})
export class TabBarcodeScannerPage implements OnInit {
    scannedData: {};
    newPromo: Promotion;
    constructor(private firestore: AngularFirestore, private barcodeScanner: BarcodeScanner, private promosService: PromosService) {
    }
    ionViewWillEnter() {
        // this.scanCode();
    }
    ngOnInit() {
        // this.getScannedPromo('dsgdh');
        // this.getScannedPromo('EXPIRED');
        this.getScannedPromo('KADO20');
    }

    scanCode() {
        this.barcodeScanner
            .scan()
            .then(barcodeData => {
                if ( barcodeData.format === 'QR_CODE' ) {
                    this.getScannedPromo(barcodeData.text);
                }
            })
            .catch(err => {
                console.log('Error', err);
            });
    }

    /**
     * recupère le text du qrcode, vérifie s'il exite en bdd et s'il n'est pas expiré
     * si c'est OK assigne l'objet à this.newPromo
     */
    getScannedPromo(txtCode: string) {
        this.promosService.getPromo(txtCode).get().then((snapshot: DocumentSnapshot<PromotionFirestore>) => {
            if (snapshot.exists && moment(snapshot.data().dateExpiration.toDate()).isAfter()) {
                this.newPromo = {
                    code: snapshot.id,
                    dateExpiration: snapshot.data().dateExpiration.toDate(),
                    description: snapshot.data().description
                } as Promotion;
            } else {
                console.log(snapshot.data());
                this.newPromo = undefined;
            }
            return this.newPromo;
        }).then(snapshot => {
            console.log(snapshot);
        });
    }
}
