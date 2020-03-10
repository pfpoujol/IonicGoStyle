import * as firebase from 'firebase';
export interface UserFirestore {
    name: string;
    firstname: string;
    ownedPromos: { [_: string]: { range: number, used: boolean }};
}
