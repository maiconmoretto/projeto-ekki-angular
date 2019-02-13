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

  saldosUrl = 'http://localhost:8080/api/saldos/1';

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get(this.saldosUrl);
    //this.http.get<any[]>(`${this.saldosUrl}`);
  }

  update(model: any) {
    this.http.put( 'http://localhost:8080/api/saldos/update/1',model, httpOptions).subscribe(data=> console.log(data),err=>{console.log("error")})
  }
}
