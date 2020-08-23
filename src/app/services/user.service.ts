import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {UserFirestore} from '../models/firestore/UserFirestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore) { }
  getUserDoc(uid: string): Observable<UserFirestore | undefined> {
    return this.afs.doc<UserFirestore>(`users/${uid}`).valueChanges();
  }
  updateUserDoc(uid: string, name: string, firstname: string): Promise<void> {
    return this.afs.doc<UserFirestore>(`users/${uid}`).set({
      name,
      firstname,
      ownedPromos: {}
    } as UserFirestore);
  }
}
