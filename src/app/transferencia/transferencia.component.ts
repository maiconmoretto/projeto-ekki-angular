import { Component, OnInit } from '@angular/core';
import { Saldo } from '../saldo';
import { SaldoService } from '../saldo.service';
import { ContaService } from '../conta.service';
import { UsuarioService } from '../usuario.service';
import { HistoricoTransferenciaService } from '../historico-transferencia.service';
import { HistoricoTransferencia } from '../historico-transferencia';
import { CartaoCreditoService } from '../cartao-credito.service';


@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {

  model = new Saldo(1, 200, 1);
  submitted = false;

  conta: string = '';
  valor: string = '';
  dadosContaDestinatario;
  dadosDestinatario;
  saldoDestinatario;
  saldoSolicitante;
  modelHistorico;
  cartoes;
  numeroCartao;
  historicoTransferencias;

  constructor(private saldoService: SaldoService,
    private contaService: ContaService,
    private usuarioService: UsuarioService,
    private historicoTransferenciaService: HistoricoTransferenciaService,
    private cartaoCreditoService: CartaoCreditoService
  ) { }

  ngOnInit() {

  }



  onContaKeyUp(event: any) {
    this.conta = event.target.value;
  }

  onValorKeyUp(event: any) {
    this.valor = event;
  }

  buscaUsuarioPorConta() {
    this.contaService.listarDadosPorNumeroConta(this.conta).subscribe(dados => {
      this.dadosContaDestinatario = dados;
      if (Object.keys(dados).length == 0) {
        alert('nao existe usuário com está conta!');
      } else {
        document.getElementById('confirmacao-dados').style.display = "block";
        this.usuarioService.listarUsuarioPorId(this.dadosContaDestinatario[0].idUsuario).subscribe(dados => {
          this.dadosDestinatario = dados;
          if (Object.keys(dados).length == 0) {
            alert('Não existe usuário com este id!');
          }
        });
      }
    });
  }

  transferir() {
     let senhaIncorreta = false;
    if (Number(this.valor) > 1000) {
      let senha = prompt("Por favor digite a senha");
      if (senha == null) {
        alert('digite a senha!');
        senhaIncorreta = true;
        return;
      }
      if (senha != '123') {
        senhaIncorreta = true;
        alert('senha errada!');
        return;
      }
    }
    if (senhaIncorreta){
      return false;
    }
    this.saldoService.listar(this.usuarioService.buscaIdUsuario()).subscribe(dados => {
      this.saldoSolicitante = dados;
      this.saldoSolicitante = dados[0].saldo;
      if (Number(this.valor) > Number(this.saldoSolicitante)) {
        let msg = "Saldo insuficiente! \n saldo atual= R$ " + this.saldoSolicitante + ", valor solicitado= R$ " + this.valor;
        msg += "\n Para completar o valor da transação, será utilizado o cartão de crédito."
        alert(msg);
        this.cartaoCreditoService.listar(this.usuarioService.buscaIdUsuario())
          .subscribe(
            dados => {
              this.cartoes = dados;
              if (Object.keys(dados).length == 0) {
                alert("Não existe cartão cadastrado! \n É necessário cadastrar um cartão!");
                window.location = '/cartaoCredito';
              } else {
                this.verifiacaTransferenciaDuplicada();
                this.numeroCartao = this.cartoes[0].numeroCartao;
                this.adicionaSaldoDestinatario();
                this.salvaHistoricoTransferencia();
                alert('transferencia efetuada!');
                window.location.reload();
              }
            });

      } else {
        this.verifiacaTransferenciaDuplicada();
        this.removeSaldoSolicitante();
        this.adicionaSaldoDestinatario();
        this.salvaHistoricoTransferencia();
        alert('transferencia efetuada!');
        window.location.reload();
      }
    })

  }

  verifiacaTransferenciaDuplicada() {
    let self = this;
    this.historicoTransferenciaService.listar(this.usuarioService.buscaIdUsuario())
      .subscribe(dados => {
        this.historicoTransferencias = dados;
        Object.keys(dados).forEach(function (key) {
          let dataCadastro = new Date(dados[key].dataCadastro),
            dataCadastroLimite = new Date(dataCadastro);
          dataCadastroLimite.setMinutes(dataCadastro.getMinutes() + 2);
          let dataAtual = new Date();
          let tempoLimite = dataCadastroLimite > dataAtual;

          if (dados[key].idDestinatario == self.dadosDestinatario[0].id && dados[key].valor == self.valor
            && tempoLimite) {
            self.historicoTransferenciaService.deletar(dados[key].id);
            let msg = "Já foi realizada uma transferência para esta conta com este valor";
            msg += " e em menos de 2 minutos.\n";
            msg += " A transferência anterior será cancelada e a atual será mantida.";
            alert(msg);
          }
        });
      });
  }

  removeSaldoSolicitante() {
    let valorAtualizadoSolicitante = Number(this.saldoSolicitante) - Number(this.valor);
    this.model = new Saldo(null, valorAtualizadoSolicitante, this.usuarioService.buscaIdUsuario());
    this.saldoService.update(this.model);
  }

  salvaHistoricoTransferencia() {
    this.modelHistorico = new HistoricoTransferencia(
      null,
      this.usuarioService.buscaIdUsuario(),
      this.dadosContaDestinatario[0].idUsuario,
      null,
      this.valor,
      this.dadosDestinatario[0].nome,
      this.dadosContaDestinatario[0].numeroConta,
      this.numeroCartao
    );
    this.historicoTransferenciaService.criar(this.modelHistorico);
  }


  adicionaSaldoDestinatario() {
    let idDestinatario = this.dadosContaDestinatario[0].idUsuario;
    this.saldoService.listar(idDestinatario).subscribe(dados => {
      this.saldoDestinatario = dados;

      let saldoDestinatario = dados[0].saldo;
      let valorAtualizadoDestinatario = Number(saldoDestinatario) + Number(this.valor);
      this.model = new Saldo(null, valorAtualizadoDestinatario, idDestinatario);
      this.saldoService.update(this.model);
    });
  }
}
