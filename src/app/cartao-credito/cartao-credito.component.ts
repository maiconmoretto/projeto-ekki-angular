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
  constructor(
    private cartaoCreditoService: CartaoCreditoService,
    private usuarioService: UsuarioService
  ) { }

  validadeCartao;
  nomeUsuarioCartao;
  numeroCartao;
  codigoSeguranca;

  cartoes: Array<any>;

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.cartaoCreditoService.listar(this.usuarioService.buscaIdUsuario()).subscribe(dados => this.cartoes = dados);
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
    let id = document.getElementById("id").value;

    if (id) {
      this.model = new CartaoCredito(
        id,
        this.usuarioService.buscaIdUsuario(),
        document.getElementById('validadeCartao').value,
        document.getElementById('nomeUsuarioCartao').value,
        document.getElementById('numeroCartao').value,
        document.getElementById('codigoSeguranca').value
      );
      this.cartaoCreditoService.atualizar(this.model);
      alert('Cartão autalizado com sucesso!');
      window.location.reload();
    } else {
      this.model = new CartaoCredito(
        null,
        this.usuarioService.buscaIdUsuario(),
        this.validadeCartao,
        this.nomeUsuarioCartao,
        this.numeroCartao,
        this.codigoSeguranca
      );
      this.cartaoCreditoService.criar(this.model);
      alert('Cartão salvo com sucesso!');
      window.location.reload();
    }
  }

  carregaCamposEditarFormulario(cartao: any) {
    this.preencheCamposEditar(cartao);
  }

  preencheCamposEditar(cartao: any) {
    document.getElementById('validadeCartao').value = cartao.validadeCartao;
    document.getElementById('nomeUsuarioCartao').value = cartao.nomeUsuarioCartao;
    document.getElementById('numeroCartao').value = cartao.numeroCartao;
    document.getElementById('codigoSeguranca').value = cartao.codigoSeguranca;
    document.getElementById("id").value = cartao.id;
  }

  deletar(cartao: any) {
    if (confirm("Tem certeza que deseja deletar o cartão?")) {
      this.cartaoCreditoService.deletar(cartao.id);
      alert('Cartão de crédito deletado com sucesso!');
      window.location.reload();
    }
  }
}
