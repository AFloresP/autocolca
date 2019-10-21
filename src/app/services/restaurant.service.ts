import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { Restaurant } from '../models/Restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private db: AngularFirestore) { }

  getRestaurants() {
    return this.db.collection('restaurants').snapshotChanges();
  }

  createRestaurant(restaurant: Restaurant) {
    return this.db.collection("restaurants").add(
      {
        name: restaurant.name,
        typeFoods: restaurant.typeFoods,
        address: restaurant.address
      }
    ).then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  updateRestaurant(restaurant: Restaurant) {
    this.db.doc('restaurants/' + restaurant.id).update(
      {
        name: restaurant.name,
        typeFoods: restaurant.typeFoods,
        address: restaurant.address
      }
    );
  }

  deleteRestaurant(restaurantId: string) {
    this.db.doc('restaurants/' + restaurantId).delete();
  }
}
