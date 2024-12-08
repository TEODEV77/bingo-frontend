import { Component, computed, inject, OnInit } from '@angular/core';
import { RoomWebSocketService } from '../../services/room-ws.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.css',
})
export class RoomComponent implements OnInit {
  private readonly router = inject(Router);
  public markedNumbers = new Set<number>();
  public bingoCard: number[][] = [];
  public bingoBallsHistory: [string, number][] = [];
  public disqualifiedPlayer: string | null = null;
  public winnerPlayer: string | null = null;
  public connectedClients: string[] = [];
  public currentBingoBalls = computed<[string, number][]>(() => this.bingoBallsHistory);

  constructor(private readonly roomWebSocketService: RoomWebSocketService) {}

  /**
   * Initializes the component by setting up WebSocket connections and subscriptions.
   */
  ngOnInit(): void {
    this.roomWebSocketService.connect();
    this.roomWebSocketService.onDisqualifiedAnnouncement().subscribe((player: string) => {
      this.disqualifiedPlayer = player;
      setTimeout(() => {
        this.disqualifiedPlayer = null;
      }, 4000);
    });
    this.roomWebSocketService.onClientsList().subscribe((clients: string[]) => {
      this.connectedClients = clients;
    });
    this.roomWebSocketService.onBallUpdate().subscribe((bingoBall: [string, number]) => {
      this.bingoBallsHistory.unshift(bingoBall);
    });
    this.roomWebSocketService.generateBingoCard().subscribe({
      next: (card) => {
        this.bingoCard = card;
      },
      error: (error) => {
        console.error('Error generating bingo card:', error);
      },
    });
    this.roomWebSocketService.onWinnerAnnouncement().subscribe((player: string) => {
      this.winnerPlayer = player;
      this.bingoBallsHistory = [];
      setTimeout(() => {
        this.winnerPlayer = null;
        this.router.navigate(['/game/menu']);
      }, 4000);
    });
  }



  /**
   * Generates a new bingo card with random numbers.
   * @returns A 2D array representing the bingo card.
   */
  public generateBingoCard(): number[][] {
    const COLUMNS = 5;
    const ROWS = 5;
    const ranges = [
      [1, 15], // B
      [16, 30], // I
      [31, 45], // N
      [46, 60], // G
      [61, 75], // O
    ];

    const card = Array.from({ length: COLUMNS }, (_, colIndex) => {
      const [min, max] = ranges[colIndex];
      const columnNumbers = new Set<number>();

      while (columnNumbers.size < ROWS) {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        columnNumbers.add(num);
      }

      return Array.from(columnNumbers);
    });

    // Set free space
    card[2][2] = 0;

    return this.transposeBingoCard(card);
  }

  /**
   * Transposes the given bingo card.
   * @param card A 2D array representing the bingo card.
   * @returns A transposed 2D array.
   */
  public transposeBingoCard(card: number[][]): number[][] {
    return card[0].map((_, rowIndex) => card.map((column) => column[rowIndex]));
  }
}
