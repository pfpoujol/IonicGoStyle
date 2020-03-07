import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';

export interface PromotionFirestore {
    code: string;
    dateExpiration: Timestamp;
    description: string;
}
