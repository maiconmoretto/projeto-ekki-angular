import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { SaldoService } from './saldo.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioUrl = 'http://localhost:8080/api/usuarios';
  idUsuario = 1;
  saldo;
  constructor(private http: HttpClient,
    private saldoService: SaldoService) { }

  buscaIdUsuario() {
    return this.idUsuario;
  }

  listarUsuarioPorId(idUsuario) {
    return this.http.get(this.usuarioUrl + '/' + idUsuario);
  }
}
