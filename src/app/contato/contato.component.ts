import { Component, OnInit } from '@angular/core';
import { Contato } from '../contato';
import { ContatoService } from '../contato.service';
import { UsuarioService } from '../usuario.service';
import { ContaService } from '../conta.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  constructor(
    private contatoService: ContatoService,
    private usuarioService: UsuarioService,
    private contaService: ContaService,
  ) { }

  contatos: Array<any>;
  conta;
  nome;
  model;
  dadosContaDestinatario;

  ngOnInit() {
    this.listar();
  }

  onNomeKeyUp(event: any) {
    this.nome = event.target.value;
  }

  onContaKeyUp(event: any) {
    this.conta = event.target.value;
  }

  listar() {
    this.contatoService.listar(this.usuarioService.buscaIdUsuario()).subscribe(dados => this.contatos = dados);
  }

  buscaUsuarioPorConta() {
    this.contaService.listarDadosPorNumeroConta(this.conta).subscribe(dados => {
      this.dadosContaDestinatario = dados;
      console.log('data', dados);
      if (Object.keys(dados).length == 0) {
        alert('nao existe usuário com está conta!');
      }
    });
  }
  salvar() {
    let id = document.getElementById("id").value;

    if (id) {
      this.model = new Contato(
        id,
        this.usuarioService.buscaIdUsuario(),
        this.dadosContaDestinatario[0].idUsuario,
        this.nome,
        this.conta
      );
      this.contatoService.atualizar(this.model);
      alert('Contato autalizado com sucesso!');
      window.location.reload();
    } else {
      this.model = new Contato(
        null,
        this.usuarioService.buscaIdUsuario(),
        this.dadosContaDestinatario[0].idUsuario,
        this.nome,
        this.conta
      );
      console.log(this.model)
      this.contatoService.criar(this.model);
      alert('Contato salvo com sucesso!');
      window.location.reload();
    }
  }

  carregaCamposEditarFormulario(contato: any) {
    this.preencheCamposEditar(contato);
  }

  preencheCamposEditar(contato: any) {
    document.getElementById('nome').value = contato.nomeContato;
    document.getElementById('conta').value = contato.numeroConta;
    document.getElementById("id").value = contato.id;
  }

  deletar(contato: any) {
    if (confirm("Tem certeza que deseja deletar o Contato?")) {
      this.contatoService.deletar(contato.id);
      alert('Contato deletado com sucesso!');
      window.location.reload();
    }
  }

}
