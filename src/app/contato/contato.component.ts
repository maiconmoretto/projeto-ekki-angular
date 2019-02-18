import { Component, OnInit } from '@angular/core';
import { Contato } from '../contato';
import { ContatoService } from '../contato.service';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  constructor(
    private contatoService: ContatoService,
    private usuarioService: UsuarioService
  ) { }

  contatos: Array<any>;
  conta;
  nome;
  ngOnInit() {
    this.listar();
  }

  listar() {
    this.contatoService.listar(this.usuarioService.buscaIdUsuario()).subscribe(dados => this.contatos = dados);
  }

  onNomeKeyUp(event: any) {
    this.nome = event.target.value;
  }

  onContaKeyUp(event: any) {
    this.conta = event.target.value;
  }


  salvar() {
    let id = document.getElementById("id").value;

    if (id) {
      this.model = new Contato(
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
      this.model = new Contato(
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

  carregaCamposEditarFormulario(contato: any) {
    this.preencheCamposEditar(contato);
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
