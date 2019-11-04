import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GalleryService } from 'src/app/services/gallery.service';
import { GalleryImage } from 'src/app/models/GalleryImage';
import * as _ from 'lodash';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  files: FileList;

  uploadPercent: Observable<number>;
  urlImage: string;

  gallery_ar: GalleryImage[];
  view_image: GalleryImage;
  closeResult: string;
  modal_title: string;
  imageForm: FormGroup
  image_selected: any;

  constructor(private galleryService: GalleryService,
    private storage: AngularFireStorage,
    private _builder: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService) {

    this.modal_title = "NUEVA FOTO";
    this.imageForm = this._builder.group({
      id: [null],
      name: ['', Validators.required],
      file: [null, Validators.required],
      url: [''],
      file_name: ['']
    })
  }

  ngOnInit() {
    this.galleryService.getImages().subscribe(data => {
      this.gallery_ar = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as GalleryImage;
      })
    });
  }

  handleFiles(event) {
    this.files = event.target.files;
  }

  resetForm() {
    this.imageForm.patchValue({
      id: null,
      name: '',
      url: '',
      file_name: '',
      file: null
    });
  }

  open(content) {
    this.resetForm();
    this.modal_title = "NUEVA FOTO";
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

  saveImage(formValues) {
    const id = Math.random().toString(36).substring(2);
    const file = this.files[0];
    const file_name = `gallery_${formValues.name}_${id}`
    const filePath = `uploads/${file_name}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe((url) => {
          formValues['url'] = url;
          formValues['file_name'] = file_name;
          let data = Object.assign({}, formValues);
          delete data.id;
          if (formValues.id == null) {
            this.galleryService.createImage(data);
            this.toastr.success('Foto creada');
          }
          this.modalService.dismissAll();
        })
      })
    ).subscribe();
    

    //this.uploadPercent = task.percentageChanges();
    //task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();

    //onsole.log(this.urlImage)
    /*let data = Object.assign({}, formValues);
    delete data.id;
    if (formValues.id == null) {
      this.hotelService.createHotel(data);
      this.toastr.success('Hotel Creado');
    } else {
      this.hotelService.updateHotel(formValues.id, data);
      this.toastr.info('Hotel Actualizado');
    }
    this.modalService.dismissAll();*/
  }

  viewImage(image: GalleryImage, view) {
    this.open(view);
    this.view_image = Object.assign({}, image);
  }

  deleteImage(image: GalleryImage) {
    if (confirm("¿Desea eliminar el registro?")) {
      console.log(image.file_name);
      this.galleryService.deleteImage(image.id);
      const filePath = `uploads/${image.file_name}`;
      this.storage.ref(filePath).delete();
      this.toastr.warning('Foto eliminada');
    }
  }

}
