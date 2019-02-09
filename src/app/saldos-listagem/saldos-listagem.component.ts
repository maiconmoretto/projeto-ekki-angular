import { Component, OnInit } from '@angular/core';
import { SaldoService } from '../saldo.service';

@Component({
  selector: 'app-saldos-listagem',
  templateUrl: './saldos-listagem.component.html',
  styleUrls: ['./saldos-listagem.component.css']
})
export class SaldosListagemComponent implements OnInit {


  saldos ;
  hoje ;
  constructor(private saldoService:   SaldoService) { 
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    
    this.hoje = day + "/" + month + "/" + year ;
  }
 
  ngOnInit() {
    this.listar();
  }


  listar() {
    this.saldoService.listar().subscribe(dados => this.saldos = dados );
  }
}
