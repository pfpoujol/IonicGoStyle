import {DocumentReference} from '@angular/fire/firestore';

export interface User {
    uid: string;
    email: string;
    name: string;
    firstname: string;
    ownedPromos: Array<DocumentReference>;
}
