import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldosListagemComponent } from './saldos-listagem.component';

describe('SaldosListagemComponent', () => {
  let component: SaldosListagemComponent;
  let fixture: ComponentFixture<SaldosListagemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaldosListagemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaldosListagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
