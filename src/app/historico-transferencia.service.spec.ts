import { TestBed } from '@angular/core/testing';

import { HistoricoTransferenciaService } from './historico-transferencia.service';

describe('HistoricoTransferenciaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HistoricoTransferenciaService = TestBed.get(HistoricoTransferenciaService);
    expect(service).toBeTruthy();
  });
});
