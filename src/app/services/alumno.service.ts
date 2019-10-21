import { Injectable } from '@angular/core';
import { Alumno } from '../models/Alumno';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(
    private _http: HttpClient
  ) { }

  api_url: string = "https://kennedy-web-app.herokuapp.com/alumnos";

  getAlumnos() {
    return this._http.get<Alumno[]>(this.api_url);
  }

  crearAlumno(alumno:Alumno) {
    return this._http.post<Alumno>(this.api_url, alumno);
  }

  eliminarAlumno(id_alumno) {
    return this._http.delete(this.api_url + "/" + id_alumno);
  }
}
