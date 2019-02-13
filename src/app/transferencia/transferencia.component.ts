import { Component, OnInit } from '@angular/core';
import { Saldo } from '../saldo';
import { SaldoService } from '../saldo.service';
import { ContaService } from '../conta.service';
import { $ } from 'protractor';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {


  model = new Saldo(1, 200, 1);
  submitted = false;

  onSubmit() { this.submitted = true; }
  //get diagnostic() { return JSON.stringify(this.model); }
  conta: string = '';
  valor: string = '';
  res;
  constructor(private saldoService: SaldoService,
    private contaService: ContaService) { }

  ngOnInit() {
  }

  onContaKeyUp(event: any) {
    this.conta = event.target.value;
  }

  onValorKeyUp(event: any) {
    this.valor = event.target.value;
  }

  delete() {
    console.log(document.getElementById("idUsuario").value);
  }
  value = '';
  update(value: string) { this.value = value; console.log('value '+ this.value)}


  trasnferir() {
    console.log('conta :' + this.conta);
    console.log('valor :' + this.valor);
    /*    console.log(this.contaService.listarDadosPorNumeroConta(this.conta)); */
    this.contaService.listarDadosPorNumeroConta(this.conta).subscribe(dados =>
      { 
        this.res = dados;
   /*      console.log('data', dados); */
        if (Object.keys(dados).length == 0) {
          alert('nao existe usuário com está conta!');
        }
      }
  
    );
    /*     this.model = new Saldo(null, 120.13, 1);
        this.saldoService.update(this.model);
        alert('transferencia efetuada!') */
  }

 /*  update() {
    this.model = new Saldo(null, 120.13, 1);
    this.saldoService.update(this.model);
    alert('transferencia efetuada!')
  } */

}
