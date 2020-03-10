import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentChangeAction, DocumentReference} from '@angular/fire/firestore';
import {AuthService} from './auth.service';
import {Promotion} from '../models/Promotion';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';
import FieldPath = firebase.firestore.FieldPath;
// import {FieldPath} from '@angular/fire/firestore/interfaces';
import {PromotionFirestore} from '../models/firestore/PromotionFirestore';


@Injectable({
    providedIn: 'root'
})
export class PromosService {

    constructor(private firestore: AngularFirestore) {
    }

    getPromo(codePromo: string): DocumentReference {
        return this.firestore.collection('promotions').doc(codePromo).ref;
    }

    /**
     * TODO: Ordonner par user range
     */
    getPromos(array: Array<string>): Observable<DocumentChangeAction<PromotionFirestore>[]> {
        return (array.length === 0 ? undefined :
            this.firestore.collection<PromotionFirestore>('promotions', ref => ref
                .orderBy('dateExpiration', 'asc')
                .where('code', 'in', array)).snapshotChanges());
    }

    /*  getUser(): DocumentReference {
        return this.firestore.collection('users').doc('goEdwr6nOpN0oyiAGWvs9vFWaSj1').ref;
      }*/
}
