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

  createRestaurant(data) {
    //console.log(data)
    this.db.collection('restaurants').add(data);
  }

  updateRestaurant(r_id, data) {
    this.db.doc('restaurants/' + r_id).update(data);
  }

  /*createRestaurant(restaurant: Restaurant) {
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
  }*/

  /*createRestaurant(values) {
    return this.db.collection("restaurants").add(
      {
        name: values.nombre,
        typeFoods: values.comidas,
        address: values.direccion
      }
    ).then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }*/
  /*
  updateRestaurant(restaurant: Restaurant) {
    this.db.doc('restaurants/' + restaurant.id).update(
      {
        name: restaurant.name,
        typeFoods: restaurant.typeFoods,
        address: restaurant.address
      }
    );
  }
  
 updateRestaurant(values) {
  this.db.doc('restaurants/' + values.id).update(
    {
      name: values.nombre,
      typeFoods: values.comidas,
      address: values.direccion
    }
  );
} */

  deleteRestaurant(restaurantId: string) {
    this.db.doc('restaurants/' + restaurantId).delete();
  }
}
