import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LobbyWebSocketService } from '../../services/lobby-ws.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css',
})
export class LobbyComponent implements OnInit {
  public countdownTime: number = 0;

  constructor(private router: Router, private lobbyWebSocketService: LobbyWebSocketService) {}

  /**
   * Initializes the component and sets up WebSocket connections.
   */
  ngOnInit(): void {
    this.lobbyWebSocketService.connect();
    this.lobbyWebSocketService.onTimeUpdate().subscribe((time: number) => {
      this.updateCountdown(time);
    });
    this.handleLobbyClosure();
  }

  /**
   * Updates the countdown timer with the given time.
   * @param time - The time to set the countdown to.
   */
  updateCountdown(time: number) {
    this.countdownTime = time;
  }

  /**
   * Handles the event when the lobby is closed.
   * Navigates to the appropriate route based on the flag received.
   */
  handleLobbyClosure() {
    this.lobbyWebSocketService.onLobbyClosed().subscribe((isClosed: boolean) => {
      if (isClosed) {
        this.router.navigate(['/game/noroom']);
      } else {
        this.router.navigate(['/game/room']);
      }
    });
  }
}
