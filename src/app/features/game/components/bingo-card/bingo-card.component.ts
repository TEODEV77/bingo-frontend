import { Component, inject, Input } from '@angular/core';
import { RoomWebSocketService } from '../../services/room-ws.service';

@Component({
  selector: 'bingo-card',
  templateUrl: './bingo-card.component.html',
  styleUrl: './bingo-card.component.css',
})
export class BingoCardComponent {

  private readonly roomWebSocketService = inject(RoomWebSocketService);

  // Input property to receive the bingo card numbers as a 2D array
  @Input() cardNumbers: number[][] = [];

  // Input property to receive the set of selected numbers
  @Input() selectedNumbers: Set<number> = new Set();

  // Input property to receive the current bingo balls
  @Input() currentBingoBalls: [string, number][] = [];

  /**
   * Checks if a given number is selected.
   * @param number - The number to check.
   * @returns True if the number is selected, false otherwise.
   */
  isNumberSelected(number: number): boolean {
    return this.selectedNumbers.has(number);
  }

  /**
   * Toggles the selection of a given number.
   * If the number is 0, it is ignored as it represents the "FREE" space.
   * @param number - The number to toggle.
   */
  toggleNumberSelection(number: number): void {
    if (number === 0) return; // Ignore the "FREE" space
    if (this.selectedNumbers.has(number)) {
      this.selectedNumbers.delete(number); // Unselect if already selected
    } else {
      this.selectedNumbers.add(number); // Select if not already selected
    }
  }

  /**
   * Checks if the selected numbers form a winning combination and emits the appropriate event.
   */
  checkBingo(): void {
    if (!this.areAllSelectedNumbersInBingoBalls()) {
      this.roomWebSocketService.announceDisqualified();
      return;
    }

    this.roomWebSocketService.checkWinner(this.getSelectedNumbersAsBooleanArray()).subscribe({
      next: (isWinner) => {
        if (isWinner) {
          this.roomWebSocketService.announceWinner();
        } else {
          this.roomWebSocketService.announceDisqualified();
        }
      },
      error: (error) => {
        console.error('Error checking winner', error);
      },
    });
  }

  /**
   * Converts the selected numbers into a boolean 2D array.
   * @returns A 2D array where each element is true if the number is selected, false otherwise.
   */
  getSelectedNumbersAsBooleanArray(): boolean[][] {
    const selectedNumbersArray = this.cardNumbers.map((row) =>
      row.map((number) => this.selectedNumbers.has(number))
    );
    selectedNumbersArray[2][2] = true; // The center space is always selected (FREE space)
    return selectedNumbersArray;
  }

  /**
   * Checks if all selected numbers are in the current bingo balls.
   * @returns True if all selected numbers are in the current bingo balls, false otherwise.
   */
  areAllSelectedNumbersInBingoBalls(): boolean {
    const bingoBallNumbers = new Set(this.currentBingoBalls.map(([_, number]) => number));
    for (const number of this.selectedNumbers) {
      if (!bingoBallNumbers.has(number)) {
        return false;
      }
    }
    return true;
  }
}
