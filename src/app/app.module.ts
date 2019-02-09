import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SaldosListagemComponent } from './saldos-listagem/saldos-listagem.component';
import { SaldoService } from './saldo.service';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    SaldosListagemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [SaldoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
