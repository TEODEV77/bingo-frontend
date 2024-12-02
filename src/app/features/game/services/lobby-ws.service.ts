import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class LobbyWsService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  connect() {
    this.socket.connect();
  }

  onTimeUpdate(callback: (time: number) => void) {
    this.socket.on('timeUpdate', callback);
  }

  joinLobby() {
    this.socket.emit('joinLobby');
  }

  onLobbyClosed(): void {
    this.socket.on('lobbyClosed', () => {});
  }
}
