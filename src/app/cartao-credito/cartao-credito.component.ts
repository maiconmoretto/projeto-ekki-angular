import { Component, OnInit } from '@angular/core';
import { CartaoCredito } from '../cartao-credito';
import { CartaoCreditoService } from '../cartao-credito.service';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-cartao-credito',
  templateUrl: './cartao-credito.component.html',
  styleUrls: ['./cartao-credito.component.css']
})
export class CartaoCreditoComponent implements OnInit {
  model;
  constructor(private cartaoCreditoService: CartaoCreditoService,
    private usuarioService: UsuarioService) { }

  validadeCartao;
  nomeUsuarioCartao;
  numeroCartao;
  codigoSeguranca;

  cartoes;

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.cartaoCreditoService.listar(this.usuarioService.buscaIdUsuario()).subscribe(dados => this.cartoes = dados );
  }

  onValidadeCartaoKeyUp(event: any) {
    this.validadeCartao = event.target.value;
  }

  onNomeUsuarioCartaoKeyUp(event: any) {
    this.nomeUsuarioCartao = event.target.value;
  }

  onNumeroCartaoKeyUp(event: any) {
    this.numeroCartao = event.target.value;
  }

  onCodigoSegurancaKeyUp(event: any) {
    this.codigoSeguranca = event.target.value;
  }

  salvar() {
    this.model = new CartaoCredito(
      null, 
      this.usuarioService.buscaIdUsuario(),
      this.validadeCartao,
      this.nomeUsuarioCartao,
      this.numeroCartao, 
      this.codigoSeguranca
    );
    this.cartaoCreditoService.criar(this.model);
  }

}
