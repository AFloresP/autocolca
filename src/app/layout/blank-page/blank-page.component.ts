import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { RestaurantService } from '../../services/restaurant.service'
import { Restaurant } from 'src/app/models/Restaurant';

@Component({
    selector: 'app-blank-page',
    templateUrl: './blank-page.component.html',
    styleUrls: ['./blank-page.component.scss']
})
export class BlankPageComponent implements OnInit {

    restaurants_ar: Restaurant[];

    th_restaurant: Restaurant;
    view_restaurant: Restaurant;

    save_state: number;

    closeResult: string;

    modal_title: string;

    constructor(private modalService: NgbModal, public restaurantService: RestaurantService) {
      this.th_restaurant = new Restaurant("","","");
      this.view_restaurant = new Restaurant("","","");
      this.save_state = 0;
      this.modal_title = "NUEVO RESTAURANT";
    }

    ngOnInit() {
        /*this.restaurantService.getRestaurants().subscribe( restaurants => {
            this.restaurants_ar = restaurants
        })*/
        this.restaurantService.getRestaurants().subscribe(data => {
          this.restaurants_ar = data.map(e => {
            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data()
            } as Restaurant;
          })
        });
    }

    reset_th_restaurant() {
      this.th_restaurant.id = null;
      this.th_restaurant.name = "";
      this.th_restaurant.typeFoods = "";
      this.th_restaurant.address = "";
    }

    open(content) {
      this.reset_th_restaurant();
      this.modal_title = "NUEVO RESTAURANT";
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }

      private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return  `with: ${reason}`;
        }
      }

    /*createRestaurant(restaurantName:string, typesFood:string, restaurantAddress:string) {
      this.th_restaurant = new Restaurant(restaurantName, typesFood, restaurantAddress);
      console.log(this.th_restaurant)
      //this.restaurantService.createRestaurant(this.th_restaurant);
      this.modalService.dismissAll()
    }*/

    createRestaurant() {
      this.saveRestaurant();
    }

    saveRestaurant(){
      if(this.th_restaurant.id == null) {
        this.restaurantService.createRestaurant(this.th_restaurant);
      } else {
        this.restaurantService.updateRestaurant(this.th_restaurant);
      }
      this.modalService.dismissAll();
    }

    /*deleteRestaurant(restaurantId:string){
        this.restaurantService.deleteRestaurant(restaurantId)
        .then(
          res => {
          },
          err => {
            console.log(err);
          }
        )
    }*/

    /*update(restaurant: Policy) {
      this.policyService.updatePolicy(policy);
    }*/
    viewRestaurant(rest: Restaurant, view) {
      this.open(view);
      this.view_restaurant.id = rest.id;
      this.view_restaurant.name = rest.name;
      this.view_restaurant.typeFoods = rest.typeFoods;
      this.view_restaurant.address = rest.address;
    }

    editRestaurant(rest: Restaurant, content) {
      this.open(content);
      this.modal_title = "EDITAR RESTAURANT";
      this.th_restaurant.id = rest.id;
      this.th_restaurant.name = rest.name;
      this.th_restaurant.typeFoods = rest.typeFoods;
      this.th_restaurant.address = rest.address;
    }

    updateRestaurant() {
      
    }

    deleteRestaurant(restaurantId:string){
      if (confirm("¿Desea eliminar el registro?")) {
        this.restaurantService.deleteRestaurant(restaurantId);
      }
    }

}
