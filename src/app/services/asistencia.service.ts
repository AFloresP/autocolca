import { Injectable } from '@angular/core';
import { Asistencia } from '../models/Asistencia';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  constructor(
    private _http: HttpClient
  ) { }

  api_url: string = "https://kennedy-web-app.herokuapp.com/asistencias";

  getAsistencias() {
    return this._http.get<Asistencia[]>(this.api_url);
  }

  crearAsistencia(asistencia:Asistencia) {
    return this._http.post<Asistencia>(this.api_url, asistencia);
  }

  eliminarAsistencia(id_asistencia) {
    return this._http.delete(this.api_url + "/" + id_asistencia);
  }
}
