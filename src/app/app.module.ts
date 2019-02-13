import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SaldosListagemComponent } from './saldos-listagem/saldos-listagem.component';
import { SaldoService } from './saldo.service';
import { from } from 'rxjs';
import { TransferenciaComponent } from './transferencia/transferencia.component';




const appRoutes: Routes = [
  { path: 'transferencia', component: TransferenciaComponent },
 ];


@NgModule({
  declarations: [
    AppComponent,
    SaldosListagemComponent,
    TransferenciaComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
    /*   { enableTracing: true } // <-- debugging purposes only */
    ),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [SaldoService],
  bootstrap: [AppComponent]
})










export class AppModule { }
