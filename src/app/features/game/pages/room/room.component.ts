import { Component, inject } from '@angular/core';
import { ServerService } from '../../../../services/server.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent {
  markedNumbers = new Set<number>(); // Números marcados

  playerNames: string[] = ['TEO', 'CARLOS'];

  bingoNumbers = [
    [5, 18, 34, 49, 70],
    [12, 20, 38, 55, 66],
    [3, 21, 0, 58, 74], // El 0 representa el espacio "FREE"
    [6, 24, 37, 50, 63],
    [8, 19, 35, 47, 65],
  ];

  players = [
    { name: 'Player 1', score: 10 },
    { name: 'Player 2', score: 20 },
    { name: 'Player 3', score: 15 },
  ];

  // Bolas de bingo que han salido
  bingoBalls: number[] = [12, 24, 36, 48, 15, 49, 50, 70]; // Puedes actualizar dinámicamente.

  // Tarjeta de Bingo del jugador
  bingoCard = [
    { number: 5, marked: false },
    { number: 18, marked: true },
    { number: 24, marked: false },
    { number: 32, marked: true },
    { number: 48, marked: false },
    { number: 5, marked: false },
    { number: 18, marked: true },
    { number: 24, marked: false },
    { number: 32, marked: true },
    { number: 48, marked: false },
    // Rellena con los números necesarios (5x5)
  ];

  // serverSocket = inject(ServerService);
}
