import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Festivity } from 'src/app/models/Festivity';
import { FestivityService } from '../../services/festivity.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-festivities',
  templateUrl: './festivities.component.html',
  styleUrls: ['./festivities.component.scss']
})
export class FestivitiesComponent implements OnInit {

  festivities_ar: Festivity[];
  view_festivity: Festivity;
  closeResult: string;
  modal_title: string;
  festivityForm: FormGroup

  constructor(
    private _builder: FormBuilder,
    private modalService: NgbModal,
    public festivityService: FestivityService,
    private toastr: ToastrService) {

    this.modal_title = "NUEVA FESTIVIDAD";
    this.festivityForm = this._builder.group({
      id: [null],
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required]

    })
  }

  ngOnInit() {
    this.festivityService.getFestivities().subscribe(data => {
      this.festivities_ar = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Festivity;
      })
    });
  }

  resetForm() {
    this.festivityForm.patchValue({
      id: null,
      name: '',
      description: '',
      date: ''
    });
  }

  open(content) {
    this.resetForm();
    this.modal_title = "NUEVA FESTIVIDAD";
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

  saveFestivity(formValues) {
    let data = Object.assign({}, formValues);
    delete data.id;
    //data.fecha = moment(formValues.fecha).format('YYYY-MM-DD');
    //console.log(moment(formValues.fecha).format('YYYY-MM-DD'))
    if (formValues.id == null) {
      this.festivityService.createFestivity(data);
      this.toastr.success('Festividad Creada');
    } else {
      this.festivityService.updateFestivity(formValues.id, data);
      this.toastr.info('Festividad Actualizada');
    }
    this.modalService.dismissAll();
  }

  viewFestivity(festivity: Festivity, view) {
    this.open(view);
    this.view_festivity = Object.assign({}, festivity);
  }

  editFestivity(festivity: Festivity, content) {
    this.open(content);
    this.modal_title = "EDITAR FESTIVIDAD";
    this.festivityForm.patchValue({
      id: festivity.id,
      name: festivity.name,
      description: festivity.description,
      date: festivity.date
    });
  }

  deleteFestivity(festivityId: string) {
    if (confirm("¿Desea eliminar el registro?")) {
      this.festivityService.deleteFestivity(festivityId);
      this.toastr.warning('Festividad Eliminada');
    }
  }

}
