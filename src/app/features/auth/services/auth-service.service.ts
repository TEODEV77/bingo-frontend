import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { CheckTokenResponse, LoginResponse, User } from '../interfaces';
import { AuthStatus } from '../enums/auth-status.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Base URL for the API
  private readonly apiUrl: string = environment.apiUrl;
  private http = inject(HttpClient);

  // Signals to manage the current user and authentication status
  private _userSignal = signal<User | null>(null);
  private _authStatusSignal = signal<AuthStatus | null>(AuthStatus.checking);

  // Computed properties to expose the current user and authentication status
  public currentUserComputed = computed(() => this._userSignal());
  public authStatusComputed = computed(() => this._authStatusSignal());

  constructor() {
    this.verifyAuthStatus().subscribe();
  }

  /**
   * Updates the authentication state with the provided user and token.
   * @param user - The authenticated user.
   * @param token - The authentication token.
   */
  private updateAuthState(user: User, token: string): void {
    this._userSignal.set(user);
    this._authStatusSignal.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
  }

  /**
   * Verifies the authentication status of the user.
   * @returns An Observable that emits true if the user is authenticated, otherwise false.
   */
  verifyAuthStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenResponse>(`${this.apiUrl}/auth/check-token`, { headers }).pipe(
      map(({ user, token }) => {
        this.updateAuthState(user, token);
        return true;
      }),
      catchError((error) => {
        this._userSignal.set(null);
        this._authStatusSignal.set(AuthStatus.unauthenticated);
        localStorage.removeItem('token');
        return of(false);
      })
    );
  }

  /**
   * Registers a new user with the provided nickname and password.
   * @param nickname - The user's nickname.
   * @param password - The user's password.
   * @returns An Observable that emits true if the registration is successful.
   */
  register(nickname: string, password: string): Observable<boolean> {
    const body = { nickname, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/register`, body).pipe(
      map(() => true),
      catchError((error) => {
        return throwError(() => new Error('Registration failed. Please try again.'));
      })
    );
  }

  /**
   * Logs in the user with the provided nickname and password.
   * @param nickname - The user's nickname.
   * @param password - The user's password.
   * @returns An Observable that emits true if the login is successful.
   */
  login(nickname: string, password: string): Observable<boolean> {
    const body = { nickname, password };
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, body).pipe(
      tap(({ user, token }) => {
        this.updateAuthState(user, token);
      }),
      map(() => true),
      catchError((error) => {
        return throwError(() => new Error('Unauthorized. Please check your credentials.'));
      })
    );
  }

  /**
   * Logs out the current user.
   */
  logout(): void {
    this._userSignal.set(null);
    this._authStatusSignal.set(AuthStatus.unauthenticated);
    localStorage.removeItem('token');
  }
}
