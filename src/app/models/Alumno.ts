export class Alumno {
    id_alumno: number;
    codigo_alumno:String;
    nombres:String;
    apellidos:String;
    id_cuenta:number;

    constructor(codigo_alumno: String, nombres: String, apellidos: String){
        this.codigo_alumno = codigo_alumno;
        this.nombres = nombres;
        this.apellidos = apellidos;
    }
}