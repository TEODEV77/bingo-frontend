import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoRoomAvailableComponent } from './no-room-available.component';

describe('NoRoomAvailableComponent', () => {
  let component: NoRoomAvailableComponent;
  let fixture: ComponentFixture<NoRoomAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoRoomAvailableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoRoomAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
