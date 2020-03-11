import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentChangeAction, DocumentReference} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
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
        return this.firestore.collection<PromotionFirestore>('promotions', ref => ref
                .where('dateExpiration', '>', new Date())
                .where('code', 'in', array))
                .snapshotChanges();
    }

    /*  getUser(): DocumentReference {
        return this.firestore.collection('users').doc('goEdwr6nOpN0oyiAGWvs9vFWaSj1').ref;
      }*/
}
