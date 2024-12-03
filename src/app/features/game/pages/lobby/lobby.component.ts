import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LobbyWsService } from '../../services/lobby-ws.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.css',
})
export class LobbyComponent implements OnInit {
  public countdown: number = 0;
  //http://localhost:4200/game/lobby
  constructor(private router: Router, private lobbyWsService: LobbyWsService) {}

  ngOnInit(): void {
    this.lobbyWsService.connect();
    this.lobbyWsService.onTimeUpdate((time: number) => {
      this.startCountdown(time);
    });
    this.onCountdownEnd();
  }

  startCountdown(time: number) {
    this.countdown = time;
  }

  onCountdownEnd() {
    this.lobbyWsService.onLobbyClosed((flag: boolean) => {
      if (flag) {
        this.router.navigate(['/game/noroom']);
      } else {
        this.router.navigate(['/game/room']);
      }
    });
  }
}
