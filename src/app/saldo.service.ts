import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SaldoService {

  saldosUrl = 'http://localhost:8080/api/saldos';

  constructor(private http: HttpClient) { }

  listar(idusuario) {
    return this.http.get(this.saldosUrl + '/' + idusuario);
  }

  update(model: any) {
    this.http.put( this.saldosUrl + '/update/' + model.idusuario  ,model, httpOptions).subscribe(data=> console.log(data),err=>{console.log("error")})
  }
}
