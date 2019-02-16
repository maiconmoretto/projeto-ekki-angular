import { Component, OnInit } from '@angular/core';
import { Saldo } from '../saldo';
import { SaldoService } from '../saldo.service';
import { ContaService } from '../conta.service';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { HistoricoTransferenciaService } from '../historico-transferencia.service';
import { HistoricoTransferencia } from '../historico-transferencia';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {


  model = new Saldo(1, 200, 1);
  submitted = false;

  /*  onSubmit() { this.submitted = true; } */
  //get diagnostic() { return JSON.stringify(this.model); }
  conta: string = '';
  valor: string = '';
  dadosContaDestinatario;
  dadosDestinatario;
  saldoDestinatario;
  saldoSolicitante;
  modelHistorico;
  constructor(private saldoService: SaldoService,
    private contaService: ContaService,
    private usuarioService: UsuarioService,
    private historicoTransferenciaService: HistoricoTransferenciaService
  ) { }

  ngOnInit() {
  }

  onContaKeyUp(event: any) {
    this.conta = event.target.value;
  }

  onValorKeyUp(event: any) {
    this.valor = event.target.value;
  }

  delete() {
    //console.log(document.getElementById("idUsuario").value);
  }
  value = '';
  update(value: string) { this.value = value; console.log('value ' + this.value) }


  buscaUsuarioPorConta() {
    /*    console.log(this.contaService.listarDadosPorNumeroConta(this.conta)); */
    this.contaService.listarDadosPorNumeroConta(this.conta).subscribe(dados => {
      this.dadosContaDestinatario = dados;
      console.log('data', dados);
      if (Object.keys(dados).length == 0) {
        alert('nao existe usuário com está conta!');
      } else {
        document.getElementById('confirmacao-dados').style.display = "block";
        this.usuarioService.listarUsuarioPorId(this.dadosContaDestinatario[0].idUsuario).subscribe(dados => {
          this.dadosDestinatario = dados;
          console.log('data', dados);
          if (Object.keys(dados).length == 0) {
            alert('nao existe usuário com este id!');
          }
        });
      }
    });

  }

  transferir() {
    if (!this.validaSaldoSuficiente()) {
      alert('saldo insuficiente');
      return false;
    }
    this.removeSaldoSolicitante();
    this.adicionaSaldoDestinatario();

    this.salvaHistoricoTransferencia();

    alert('transferencia efetuada!')
  }

  salvaHistoricoTransferencia() {
    this.modelHistorico = new HistoricoTransferencia(
      null,
      this.usuarioService.buscaIdUsuario(),
      this.dadosContaDestinatario[0].idUsuario,
      null,
      this.valor,
      this.dadosDestinatario[0].nome,
      this.dadosContaDestinatario[0].numeroConta
      );
    this.historicoTransferenciaService.criar(this.modelHistorico);
  }
  

  validaSaldoSuficiente() {
    if (Number(this.valor) > Number(this.usuarioService.buscaSaldoUsuario())) {
      return false;
    } else {
      return true;
    }
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

  removeSaldoSolicitante() {
    this.saldoService.listar(this.usuarioService.buscaIdUsuario()).subscribe(dados => {
      this.saldoSolicitante = dados;
      let saldoSolicitante = dados[0].saldo;
      if (Number(this.valor) > Number(saldoSolicitante)) {
        alert('saldo insuficiente');
        return false;
      }
      let valorAtualizadoSolicitante = Number(saldoSolicitante) - Number(this.valor);
      this.model = new Saldo(null, valorAtualizadoSolicitante, this.usuarioService.buscaIdUsuario());
      this.saldoService.update(this.model);
    })
  }


  /*  update() {
     this.model = new Saldo(null, 120.13, 1);
     this.saldoService.update(this.model);
     alert('transferencia efetuada!')
   } */

}
