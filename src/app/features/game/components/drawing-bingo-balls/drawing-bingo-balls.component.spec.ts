import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingBingoBallsComponent } from './drawing-bingo-balls.component';

describe('DrawingBingoBallsComponent', () => {
  let component: DrawingBingoBallsComponent;
  let fixture: ComponentFixture<DrawingBingoBallsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DrawingBingoBallsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawingBingoBallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
