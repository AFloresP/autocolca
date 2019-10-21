export class Examen {
    id_examen: number;
    proceso: String;
    fecha:String;
    aciertos: number;
    puntaje: number;
    grupo: String;
    codigo_alumno:String;

    constructor(proceso: String, fecha: String, aciertos: number, puntaje: number, grupo: String, codigo_alumno: String){
        this.proceso = proceso;
        this.fecha = fecha;
        this.aciertos = aciertos;
        this.puntaje = puntaje;
        this.grupo = grupo;
        this.codigo_alumno = codigo_alumno;
    }
}