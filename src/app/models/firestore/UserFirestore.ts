import * as firebase from 'firebase';
export interface UserFirestore {
    name: string;
    firstname: string;
    ownedPromos: { unknown: { range: number, used: boolean }};
}
