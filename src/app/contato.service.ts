import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ContatoService {

contatoUrl = 'http://localhost:8080/api/contato';

  constructor(private http: HttpClient) { }

  
  listar(idusuario) {
    return this.http.get<any[]>(this.contatoUrl + '/' + idusuario);
  }

  atualizar(model: any) {
    this.http.put( this.contatoUrl + '/update/' + model.id  ,model, httpOptions)
    .subscribe(data=> console.log(data),err=>{console.log("error")})
  }

  criar(model: any) {
    this.http.post( this.contatoUrl + '/create'  ,model, httpOptions).subscribe(data=> console.log(data),err=>{console.log("error")})
  }

  deletar(id: number) {
    this.http.delete( this.contatoUrl + '/delete/' +id, httpOptions).subscribe(data=> console.log(data),err=>{console.log("error")})
  }
}
