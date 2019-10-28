import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FestivityService {

  constructor(private db: AngularFirestore) { }

  getFestivities() {
    return this.db.collection('festivities').snapshotChanges();
  }

  createFestivity(data) {
    this.db.collection('festivities').add(data);
  }

  updateFestivity(f_id, data) {
    this.db.doc('festivities/' + f_id).update(data);
  }

  deleteFestivity(festivityId: string) {
    this.db.doc('festivities/' + festivityId).delete();
  }
}
