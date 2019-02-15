import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioUrl = 'http://localhost:8080/api/usuarios';
  idUsuario = 1;

  constructor(private http: HttpClient) { }

  buscaIdUsuario() {
    return this.idUsuario;
  }

  buscaSaldoUsuario() {
    return 100;
  }

  listarUsuarioPorId(idUsuario) {
    return this.http.get(this.usuarioUrl + '/' + idUsuario);
  }
}
