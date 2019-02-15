import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoTransferenciaComponent } from './historico-transferencia.component';

describe('HistoricoTransferenciaComponent', () => {
  let component: HistoricoTransferenciaComponent;
  let fixture: ComponentFixture<HistoricoTransferenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoTransferenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoTransferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
