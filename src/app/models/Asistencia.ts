export class Asistencia {
    id_asistencia: number;
    fecha:String;
    valor:boolean;
    codigo_alumno:String;

    constructor(fecha: String, valor:boolean, codigo_alumno: String){
        
        this.fecha = fecha;
        this.valor = valor;
        this.codigo_alumno = codigo_alumno;
    }
}