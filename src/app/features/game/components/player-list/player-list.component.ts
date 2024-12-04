import { Component, Input } from '@angular/core';

@Component({
  selector: 'players',
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.css',
})
export class PlayerListComponent {
  @Input() players: string[] = [];
}
