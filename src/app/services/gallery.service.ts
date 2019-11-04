import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
 
@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private db: AngularFirestore) { }

  getImages() {
    return this.db.collection('gallery').snapshotChanges();
  }

  createImage(data) {
    this.db.collection('gallery').add(data);
  }

  deleteImage(imageId: string) {
    this.db.doc('gallery/' + imageId).delete();
  }

}
