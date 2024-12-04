import { Component } from '@angular/core';

@Component({
  selector: 'players',
  templateUrl: './player-list.component.html',
  styleUrl: './player-list.component.css'
})
export class PlayerListComponent {

  playerNames: string[] = ['TEO', 'CARLOS'];

}
