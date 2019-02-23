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
    this.valor = event.target.value;
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
            alert('nao existe usuário com este id!');
          }
        });
      }
    });
  }

  transferir() {
    this.saldoService.listar(this.usuarioService.buscaIdUsuario()).subscribe(dados => {
      this.saldoSolicitante = dados;
      this.saldoSolicitante = dados[0].saldo;
      if (Number(this.valor) > Number(this.saldoSolicitante)) {
        let msg = "saldo insuficiente! \n saldo= " + this.saldoSolicitante + ", valor a ser transferido= " + this.valor;
        this.cartaoCreditoService.listar(this.usuarioService.buscaIdUsuario())
          .subscribe(
            dados => {
              this.cartoes = dados;
              console.log(this.cartoes);
              if (Object.keys(dados).length == 0) {
                alert("não existe cartão! \n É necessário cadastrar um cartão!");
                window.location = '/cartaoCredito';
              } else {
                msg += "\n Será utilizado o cartão de crédito."
                alert(msg);

                this.numeroCartao = this.cartoes[0].numeroCartao;
                this.adicionaSaldoDestinatario();
                this.salvaHistoricoTransferencia();
                alert('transferencia efetuada!');
              }
            });

      } else if (Number(this.valor) > 1000) {
        let senha = prompt("Por favor digite a senha");
        if (senha == null) {
          alert('digite a senha!');
          return;
        }
        if (senha != 123) {
          alert('senha errada!');
          return;
        }
        this.removeSaldoSolicitante();
        this.adicionaSaldoDestinatario();
        this.salvaHistoricoTransferencia();
        alert('transferencia efetuada!');
      }
    })

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
