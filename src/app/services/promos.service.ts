import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentChangeAction, DocumentReference} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {PromotionFirestore} from '../models/firestore/PromotionFirestore';
import {Promotion} from '../models/Promotion';

@Injectable({
    providedIn: 'root'
})

export class PromosService {

    constructor(private http: HttpClient, private firestore: AngularFirestore) {
    }

    getPromo(codePromo: string): DocumentReference {
        return this.firestore.collection('promotions').doc(codePromo).ref;
    }

    getPromosAFS(array: Array<string>): Observable<DocumentChangeAction<PromotionFirestore>[]> {
        return this.firestore.collection<PromotionFirestore>('promotions', ref => ref
            .where('dateExpiration', '>', new Date())
            .where('code', 'in', array))
            .snapshotChanges();
    }

    getPromosAPI(uid: string): Observable<Array<Promotion>> {
        const url = 'https://europe-west1-mspr-gostyleapp.cloudfunctions.net/webServices/v1/users/' + uid + '/promotions';
        return this.http.get<Array<Promotion>>(url);
    }
    addPromoToUserAPI(promo: string, uid: string) {
        // https://europe-west1-mspr-gostyleapp.cloudfunctions.net/webServices/v1/users/goEdwr6nOpN0oyiAGWvs9vFWaSj1
        const url = 'https://europe-west1-mspr-gostyleapp.cloudfunctions.net/webServices/v1/users/' + uid;
        return this.http.put(url, {promo});
    }
}
