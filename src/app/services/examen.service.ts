import { Injectable } from '@angular/core';
import { Examen } from '../models/Examen';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  constructor(
    private _http: HttpClient
  ) { }

  api_url: string = "https://kennedy-web-app.herokuapp.com/examenes";

  getExamenes() {
    return this._http.get<Examen[]>(this.api_url);
  }

  crearExamen(examen:Examen) {
    return this._http.post<Examen>(this.api_url, examen);
  }

  eliminarExamen(id_examen) {
    return this._http.delete(this.api_url + "/" + id_examen);
  }
}
