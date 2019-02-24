import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HistoricoTransferenciaService {

  historicoTransferenciaUrl = 'http://localhost:8080/api/historicoTransferencia';

  constructor(private http: HttpClient) { }

  listar(idusuario) {
    return this.http.get(this.historicoTransferenciaUrl + '/' + idusuario);
  }

  deletar(id) {
    this.http.delete( this.historicoTransferenciaUrl + '/delete/' +id, httpOptions).subscribe(data=> console.log(data),err=>{console.log("error")})
 
  }
  

  criar(model: any) {
    this.http.post(this.historicoTransferenciaUrl + '/create', model, httpOptions).subscribe(data => console.log(data), err => { console.log("error") })
  }
}
