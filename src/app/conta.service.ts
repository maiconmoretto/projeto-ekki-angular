import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ContaService {
  contaUrl = 'http://localhost:8080/api/conta';

  constructor(private http: HttpClient) { }

  listarDadosPorNumeroConta(numeroConta) {
    return this.http.get(this.contaUrl + '/' + numeroConta);
  }
}