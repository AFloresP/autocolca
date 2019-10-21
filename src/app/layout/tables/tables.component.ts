import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Alumno } from '../../models/Alumno';
import { AlumnoService } from '../../services/alumno.service';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    animations: [routerTransition()]
})
export class TablesComponent implements OnInit {

    alumnos: Alumno[];

    alumno: Alumno;

    constructor(private service: AlumnoService) { }

    ngOnInit() {
        this.mostrarAlumnos()
    }

    mostrarAlumnos() {
        this.service.getAlumnos().subscribe(data => {
            this.alumnos = data;
        })
    }

    eliminarAlumno(alumno: Alumno) {
        this.service.eliminarAlumno(alumno.id_alumno).subscribe(response => {
            this.mostrarAlumnos();
        }, error => {
            console.log("Error en la conexion");
        });
    }

    crearAlumno(codigo:String, nombres:String, apellidos:String) {
        this.alumno = new Alumno(codigo, nombres, apellidos);
        this.service.crearAlumno(this.alumno).subscribe(data=>{
            this.mostrarAlumnos()
        })
    }

    guardar(codigo:String, nombres:String, apellidos:String) {
        this.crearAlumno(codigo,nombres,apellidos)
    }
}
