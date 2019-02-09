import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
