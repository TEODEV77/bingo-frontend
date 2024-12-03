import { TestBed } from '@angular/core/testing';

import { RoomWsService } from './room-ws.service';

describe('RoomWsService', () => {
  let service: RoomWsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomWsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
