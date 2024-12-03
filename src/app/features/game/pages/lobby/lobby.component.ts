import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LobbyWsService } from '../../services/lobby-ws.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css',
})
export class LobbyComponent implements OnInit {
  public countdown: number = 25;
  private lobbyStatus: boolean = true;

  constructor(private router: Router, private lobbyWsService: LobbyWsService) {}

  ngOnInit(): void {
    if (this.lobbyStatus) {
      this.startCountdown();
      this.lobbyWsService.connect();
      this.lobbyWsService.onTimeUpdate((time: number) => {
        this.countdown = time;
      });
      this.lobbyWsService.joinLobby();
    } else {
      this.router.navigate(['/auth/login']);
    }
    this.lobbyWsService.onLobbyClosed(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  startCountdown() {
    const interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(interval);
        this.onCountdownEnd();
      }
    }, 1000);
  }

  onCountdownEnd() {
    this.lobbyWsService.emitLobbyClosed();
    this.router.navigate(['/game/room']);
    this.lobbyStatus = false;
  }
}
