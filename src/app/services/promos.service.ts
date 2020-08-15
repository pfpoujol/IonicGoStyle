import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {Promotion} from '../models/Promotion';

@Injectable({
    providedIn: 'root'
})

export class PromosService {

    constructor(private http: HttpClient) {
    }
    getPromos(uid: string): Observable<Array<Promotion>> {
        const url = 'https://europe-west1-mspr-gostyleapp.cloudfunctions.net/webServices/v1/users/' + uid + '/promotions';
        return this.http.get<Array<Promotion>>(url);
    }
    addPromoToUser(promo: string, uid: string) {
        const url = 'https://europe-west1-mspr-gostyleapp.cloudfunctions.net/webServices/v1/users/' + uid;
        return this.http.put(url, {promo});
    }
}
