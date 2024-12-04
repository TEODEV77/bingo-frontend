import { Component, Input } from '@angular/core';

@Component({
  selector: 'bingo-card',
  templateUrl: './bingo-card.component.html',
  styleUrl: './bingo-card.component.css',
})
export class BingoCardComponent {
  // Input property to receive the bingo card numbers as a 2D array
  @Input() cardNumbers: number[][] = [];

  // Input property to receive the set of selected numbers
  @Input() selectedNumbers: Set<number> = new Set();

  /**
   * Checks if a given number is selected.
   * @param num - The number to check.
   * @returns True if the number is selected, false otherwise.
   */
  isNumberSelected(num: number): boolean {
    return this.selectedNumbers.has(num);
  }

  /**
   * Toggles the selection of a given number.
   * If the number is 0, it is ignored as it represents the "FREE" space.
   * @param num - The number to toggle.
   */
  toggleNumber(num: number): void {
    if (num === 0) return; // Ignore the "FREE" space
    if (this.selectedNumbers.has(num)) {
      this.selectedNumbers.delete(num); // Unselect if already selected
    } else {
      this.selectedNumbers.add(num); // Select if not already selected
    }
  }

  bingo() {
    
  }

  /**
   * Converts the selected numbers into a boolean 2D array.
   * @returns A 2D array where each element is true if the number is selected, false otherwise.
   */
  getSelectedNumbersArray(): boolean[][] {
    return this.cardNumbers.map((row) =>
      row.map((num) => this.selectedNumbers.has(num))
    );
  }
}
