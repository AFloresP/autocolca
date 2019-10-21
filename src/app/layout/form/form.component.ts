import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Asistencia } from 'src/app/models/Asistencia';
import { AsistenciaService } from 'src/app/services/asistencia.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    animations: [routerTransition()]
})
export class FormComponent implements OnInit {
    
    asistencias: Asistencia[];

    asistencia: Asistencia;

    model: any;
    
    constructor(private service: AsistenciaService) {}

    ngOnInit() {
        this.mostrarAsistencias()
    }

    mostrarAsistencias() {
        this.service.getAsistencias().subscribe(data => {
            this.asistencias = data;
        })
    }

    eliminarAsistencia(asistencia: Asistencia) {
        this.service.eliminarAsistencia(asistencia.id_asistencia).subscribe(response => {
            this.mostrarAsistencias()
        }, error => {
            console.log("Error en la conexion");
        });
    }

    crearAsistencia(fecha:String, valor:boolean, codigo:String) {
        
        this.asistencia = new Asistencia(fecha, valor,codigo);
        this.service.crearAsistencia(this.asistencia).subscribe(data=>{
            this.mostrarAsistencias()
        })
    }

    guardar(fecha:String, codigo:String) {
        this.crearAsistencia(fecha,true,codigo)
    }
}
