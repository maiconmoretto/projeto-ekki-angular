import { Component, OnInit } from '@angular/core';
import { HistoricoTransferenciaService } from '../historico-transferencia.service';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-historico-transferencia',
  templateUrl: './historico-transferencia.component.html',
  styleUrls: ['./historico-transferencia.component.css']
})
export class HistoricoTransferenciaComponent implements OnInit {


  historicoTransferencias;
  constructor(private historicoTransferenciaService: HistoricoTransferenciaService,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.historicoTransferenciaService.listar(this.usuarioService.buscaIdUsuario()).subscribe(dados => {
      this.historicoTransferencias = dados;
    });
  }
}
