import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CartaoCreditoService {

  cartaoCreditoUrl = 'http://localhost:8080/api/cartaoCredito';

  constructor(private http: HttpClient) { }

  listar(idusuario) {
    return this.http.get<any[]>(this.cartaoCreditoUrl + '/' + idusuario);
  }

  atualizar(model: any) {
    this.http.put( this.cartaoCreditoUrl + '/update/' + model.id  ,model, httpOptions)
    .subscribe(data=> console.log(data),err=>{console.log("error")})
  }

  criar(model: any) {
    this.http.post( this.cartaoCreditoUrl + '/create'  ,model, httpOptions).subscribe(data=> console.log(data),err=>{console.log("error")})
  }

  deletar(id: number) {
    this.http.delete( this.cartaoCreditoUrl + '/delete/' +id, httpOptions).subscribe(data=> console.log(data),err=>{console.log("error")})
  }
}
