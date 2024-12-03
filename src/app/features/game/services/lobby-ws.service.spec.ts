import { TestBed } from '@angular/core/testing';

import { LobbyWsService } from './lobby-ws.service';

describe('LobbyWsService', () => {
  let service: LobbyWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LobbyWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
