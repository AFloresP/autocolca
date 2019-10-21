import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Examen } from 'src/app/models/Examen';
import { ExamenService } from 'src/app/services/examen.service';
import { Alumno } from 'src/app/models/Alumno';
import { AlumnoService } from 'src/app/services/alumno.service';

@Component({
    selector: 'app-bs-element',
    templateUrl: './bs-element.component.html',
    styleUrls: ['./bs-element.component.scss'],
    animations: [routerTransition()]
})
export class BsElementComponent implements OnInit {
    examenes: Examen[];
    alumnos: Alumno[];

    examen: Examen;
    alumno: Alumno;

    model: any;
    
    constructor(private service: ExamenService, private service_a: AlumnoService) {}

    ngOnInit() {
        this.mostrarExamenes()
        this.mostrarAlumnos()
    }

    mostrarExamenes() {
        this.service.getExamenes().subscribe(data => {
            this.examenes = data;
        })
    }

    mostrarAlumnos() {
        this.service_a.getAlumnos().subscribe(data => {
            this.alumnos = data;
        })
    }

    eliminarExamen(examen: Examen) {
        this.service.eliminarExamen(examen.id_examen).subscribe(response => {
            this.mostrarExamenes()
            this.mostrarAlumnos()
        }, error => {
            console.log("Error en la conexion");
        });
    }

    crearExamen(proceso:String,fecha:String, aciertos:number, puntaje:number, grupo:String, codigo:String) {
        
        this.examen = new Examen(proceso,fecha,aciertos,puntaje,grupo,codigo);
        this.service.crearExamen(this.examen).subscribe(data=>{
            this.mostrarExamenes()
        })
    }

    guardar(proceso:String,fecha:String, aciertos:number, puntaje:number, grupo:String) {
        this.crearExamen(proceso,fecha,aciertos,puntaje,grupo,this.alumno.codigo_alumno)
        
    }
}
