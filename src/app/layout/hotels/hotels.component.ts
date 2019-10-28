import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HotelService } from '../../services/hotel.service'
import { Hotel } from 'src/app/models/Hotel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {

  hotels_ar: Hotel[];
  view_hotel: Hotel;
  closeResult: string;
  modal_title: string;
  hotelForm: FormGroup

  constructor(
    private _builder: FormBuilder,
    private modalService: NgbModal,
    public hotelService: HotelService,
    private toastr: ToastrService) {

    this.modal_title = "NUEVO HOTEL";
    this.hotelForm = this._builder.group({
      id: [null],
      name: ['', Validators.required],
      services: ['', Validators.required],
      address: ['', Validators.required]

    })
  }

  ngOnInit() {
    this.hotelService.getHotels().subscribe(data => {
      this.hotels_ar = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Hotel;
      })
    });
  }

  resetForm() {
    this.hotelForm.patchValue({
      id: null,
      name: '',
      services: '',
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

  saveHotel(formValues) {
    let data = Object.assign({}, formValues);
    delete data.id;
    if (formValues.id == null) {
      this.hotelService.createHotel(data);
      this.toastr.success('Hotel Creado');
    } else {
      this.hotelService.updateHotel(formValues.id, data);
      this.toastr.info('Hotel Actualizado');
    }
    this.modalService.dismissAll();
  }

  viewHotel(hotel: Hotel, view) {
    this.open(view);
    this.view_hotel = Object.assign({}, hotel);
  }

  editHotel(hotel: Hotel, content) {
    this.open(content);
    this.modal_title = "EDITAR HOTEL";
    this.hotelForm.patchValue({
      id: hotel.id,
      name: hotel.name,
      services: hotel.services,
      address: hotel.address
    });
  }

  deleteHotel(hotelId: string) {
    if (confirm("¿Desea eliminar el registro?")) {
      this.hotelService.deleteHotel(hotelId);
      this.toastr.warning('Hotel Eliminado');
    }
  }

}
