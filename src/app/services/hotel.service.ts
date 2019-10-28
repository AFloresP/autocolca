import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private db: AngularFirestore) { }

  getHotels() {
    return this.db.collection('hotels').snapshotChanges();
  }

  createHotel(data) {
    this.db.collection('hotels').add(data);
  }

  updateHotel(h_id, data) {
    this.db.doc('hotels/' + h_id).update(data);
  }

  deleteHotel(hotelId: string) {
    this.db.doc('hotels/' + hotelId).delete();
  }
}
