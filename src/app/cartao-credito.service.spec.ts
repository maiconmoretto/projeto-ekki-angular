import { TestBed } from '@angular/core/testing';

import { CartaoCreditoService } from './cartao-credito.service';

describe('CartaoCreditoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartaoCreditoService = TestBed.get(CartaoCreditoService);
    expect(service).toBeTruthy();
  });
});
