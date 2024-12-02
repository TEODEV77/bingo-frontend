import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { io, Socket } from 'socket.io-client';
import { LobbyWsService } from '../../services/lobby-ws.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css',
})
export class LobbyComponent implements OnInit {
  public countdown: number = 30;

  constructor(private router: Router, private lobbyWsService: LobbyWsService) {}

  ngOnInit(): void {
    this.startCountdown();
    this.lobbyWsService.connect();
    this.lobbyWsService.onTimeUpdate((time: number) => {
      this.countdown = time;
    });
    this.lobbyWsService.joinLobby();
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
    this.lobbyWsService.onLobbyClosed();
    this.router.navigate(['/game/room']);
  }
}
