import { Component, Input } from '@angular/core';

@Component({
  selector: 'bingo-balls',
  templateUrl: './drawing-bingo-balls.component.html',
  styleUrl: './drawing-bingo-balls.component.css',
})
export class DrawingBingoBallsComponent {
  @Input() bingoBalls: number[] = [];
}
