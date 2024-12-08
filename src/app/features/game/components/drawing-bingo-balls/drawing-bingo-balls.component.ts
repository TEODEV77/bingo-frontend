import { Component, Input } from '@angular/core';

@Component({
  selector: 'bingo-balls',
  templateUrl: './drawing-bingo-balls.component.html',
  styleUrl: './drawing-bingo-balls.component.css',
})
export class DrawingBingoBallsComponent  {
  /**
   * Input property that holds an array of bingo balls.
   * Each bingo ball is represented by a tuple containing a string and a number.
   */
  @Input() bingoBalls: [string, number][] = [];


}
