import { Component, OnInit } from '@angular/core';
import { CartaoCredito  } from '../cartao-credito';
import { CartaoCreditoService } from '../cartao-credito.service';

@Component({
  selector: 'app-cartao-credito',
  templateUrl: './cartao-credito.component.html',
  styleUrls: ['./cartao-credito.component.css']
})
export class CartaoCreditoComponent implements OnInit {

  constructor(private cartaoCreditoService: CartaoCreditoService) { }
  validadeCartao;
  cartoes = [{
    "codigoSeguranca": 123,
    "numeroCartao": 321,
    "nomeUsuario": "maicon moretto",
    "validade": "01/01/2018"
  }]; 
  ngOnInit() {
  }


  onValidadeCartaoKeyUp(event: any) {
    this.validadeCartao = event.target.value;
    console.log(this.validadeCartao);
  }

  salvar() {
    
  }

}
