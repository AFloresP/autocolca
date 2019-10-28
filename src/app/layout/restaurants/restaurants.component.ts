import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantService } from '../../services/restaurant.service'
import { Restaurant } from 'src/app/models/Restaurant';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
  animations: [routerTransition()]
})
export class RestaurantsComponent implements OnInit {

  restaurants_ar: Restaurant[];
  view_restaurant: Restaurant;
  closeResult: string;
  modal_title: string;
  restaurantForm: FormGroup

  constructor(
    private _builder: FormBuilder,
    private modalService: NgbModal,
    public restaurantService: RestaurantService,
    private toastr: ToastrService) {

    this.modal_title = "NUEVO RESTAURANT";
    this.restaurantForm = this._builder.group({
      id: [null],
      name: ['', Validators.required],
      typeFoods: ['', Validators.required],
      address: ['', Validators.required]

    })
  }

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe(data => {
      this.restaurants_ar = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Restaurant;
      })
    });
  }

  resetForm() {
    this.restaurantForm.patchValue({
      id: null,
      name: '',
      typeFoods: '',
      address: ''
    });
  }

  open(content) {
    this.resetForm();
    this.modal_title = "NUEVO RESTAURANT";
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }

  saveRestaurant(formValues) {
    let data = Object.assign({}, formValues);
    delete data.id;
    if (formValues.id == null) {
      this.restaurantService.createRestaurant(data);
      this.toastr.success('Restaurant Creado');
    } else {
      this.restaurantService.updateRestaurant(formValues.id, data);
      this.toastr.info('Restaurant Actualizado');
    }
    this.modalService.dismissAll();
  }

  viewRestaurant(rest: Restaurant, view) {
    this.open(view);
    this.view_restaurant = Object.assign({}, rest);
  }

  editRestaurant(rest: Restaurant, content) {
    this.open(content);
    this.modal_title = "EDITAR RESTAURANT";
    this.restaurantForm.patchValue({
      id: rest.id,
      name: rest.name,
      typeFoods: rest.typeFoods,
      address: rest.address
    });
  }

  deleteRestaurant(restaurantId: string) {
    if (confirm("¿Desea eliminar el registro?")) {
      this.restaurantService.deleteRestaurant(restaurantId);
      this.toastr.warning('Restaurant Eliminado');
    }
  }

}
