import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
import { io, ManagerOptions, Socket, SocketOptions } from 'socket.io-client';
import { environment } from '../../../../environments/environment.development';
import { AuthService } from '../../auth/services/auth-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoomWebSocketService {
  private readonly apiUrl: string = environment.apiUrl;
  private readonly roomServerUrl: string = environment.roomServerUrl;
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private playerNickname: string = '';
  private socket: Socket;
  private ballUpdateSubject = new Subject<[string, number]>();
  private winnerSubject = new Subject<string>();
  private disqualifiedSubject = new Subject<string>();
  private clientsListSubject = new Subject<string[]>();

  constructor(private http: HttpClient) {
    this.playerNickname = this.authService.currentUserComputed()?.nickname as string;
    const options: Partial<ManagerOptions & SocketOptions> = {
      extraHeaders: {
        player: this.playerNickname,
      }
    };
    this.socket = io(this.roomServerUrl, options);
    this.initializeEventListeners();
  }

  /**
   * Connects the WebSocket to the room server.
   */
  connect(): void {
    this.socket.connect();
  }

  /**
   * Initializes event listeners for WebSocket events.
   */
  private initializeEventListeners(): void {
    this.socket.on('ballUpdate', (bingoBall: [string, number]) => {
      this.ballUpdateSubject.next(bingoBall);
    });
    this.socket.on('clientsList', (clientsList: string[]) => {
      this.clientsListSubject.next(clientsList);
    });
    this.socket.on('winnerAnnouncement', (winner: string) => {
      this.winnerSubject.next(winner);
    });
    this.socket.on('disqualifiedAnnouncement', (disqualifiedPlayer: string) => {
      this.disqualifiedSubject.next(disqualifiedPlayer);
    });
  }

  /**
   * Returns an observable that emits disqualified player announcements.
   * @returns {Observable<string>} Observable emitting disqualified player announcements.
   */
  onDisqualifiedAnnouncement(): Observable<string> {
    return this.disqualifiedSubject.asObservable();
  }

  /**
   * Returns an observable that emits ball updates.
   * @returns {Observable<[string, number]>} Observable emitting ball updates.
   */
  onBallUpdate(): Observable<[string, number]> {
    return this.ballUpdateSubject.asObservable();
  }

  /**
   * Returns an observable that emits the clients list.
   * @returns {Observable<string[]>} Observable emitting the clients list.
   */
  onClientsList(): Observable<string[]> {
    return this.clientsListSubject.asObservable();
  }

  /**
   * Returns an observable that emits winner announcements.
   * @returns {Observable<string>} Observable emitting winner announcements.
   */
  onWinnerAnnouncement(): Observable<string> {
    return this.winnerSubject.asObservable();
  }

  /**
   * Generates a bingo card by making an HTTP request.
   * @returns {Observable<number[][]>} Observable emitting the generated bingo card.
   */
  public generateBingoCard(): Observable<number[][]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<number[][]>(`${this.apiUrl}/bingo/generate`, { headers }).pipe(
      map((card) => card),
      catchError((error) => {
        console.error('Error generating bingo card:', error);
        return throwError(() => new Error('Error generating bingo card'));
      })
    );
  }

  /**
   * Checks if the marked numbers form a winning combination by making an HTTP request.
   * @param {boolean[][]} marked - The marked numbers on the bingo card.
   * @returns {Observable<boolean>} Observable emitting the result of the winner check.
   */
  public checkWinner(marked: boolean[][]): Observable<boolean> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = { marked };
    return this.http.post<boolean>(`${this.apiUrl}/bingo/check-winner`, body, { headers }).pipe(
      catchError((error) => {
        return throwError(() => new Error('Error checking winner'));
      })
    );
  }

  /**
   * Emits a winner event to the server.
   */
  public announceWinner(): void {
    this.socket.emit('winner', this.playerNickname);
  }

  /**
   * Emits a disqualified event to the server and navigates to the menu.
   */
  public announceDisqualified(): void {
    this.socket.emit('disqualified', this.playerNickname);
    this.router.navigate(['/game/menu']);
  }
}
