import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LobbyWebSocketService {
  private readonly lobbyServerUrl: string = environment.lobbyServerUrl;
  private socket: Socket;
  private timeUpdateSubject = new Subject<number>();
  private lobbyClosedSubject = new Subject<boolean>();
  private lobbyResetSubject = new Subject<boolean>();

  constructor() {
    this.socket = io(this.lobbyServerUrl);
    this.initializeEventListeners();
  }

  /**
   * Connects the WebSocket to the lobby server.
   */
  connect(): void {
    this.socket.connect();
  }

  /**
   * Initializes event listeners for WebSocket events.
   */
  private initializeEventListeners(): void {
    this.socket.on('timeUpdate', (time: number) => {
      this.timeUpdateSubject.next(time);
    });

    this.socket.on('lobbyClosed', (isClosed: boolean) => {
      this.lobbyClosedSubject.next(isClosed);
    });

    this.socket.on('lobbyReset', () => {
      this.lobbyResetSubject.next(true);
    });
  }

  /**
   * Returns an observable that emits time updates.
   * @returns {Observable<number>} Observable emitting time updates.
   */
  onTimeUpdate(): Observable<number> {
    return this.timeUpdateSubject.asObservable();
  }

  /**
   * Returns an observable that emits when the lobby is closed.
   * @returns {Observable<boolean>} Observable emitting lobby closed status.
   */
  onLobbyClosed(): Observable<boolean> {
    return this.lobbyClosedSubject.asObservable();
  }

  /**
   * Returns an observable that emits when the lobby is reset.
   * @returns {Observable<boolean>} Observable emitting lobby reset status.
   */
  onLobbyReset(): Observable<boolean> {
    return this.lobbyResetSubject.asObservable();
  }
}
