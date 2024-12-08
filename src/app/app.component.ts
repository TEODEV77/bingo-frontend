import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './features/auth/services/auth-service.service';
import { AuthStatus } from './features/auth/enums/auth-status.enum';
import { Router } from '@angular/router';

/**
 * The main application component.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  /**
   * Computed property to check if the authentication status is not 'checking'.
   * @returns {boolean} - Returns true if the authentication status is not 'checking', otherwise false.
   */
  public isAuthChecked = computed<boolean>(() => {
    return this.authService.authStatusComputed() !== AuthStatus.checking;
  });

  /**
   * Effect to handle changes in authentication status.
   * Navigates to different routes based on the authentication status.
   */
  public handleAuthStatusChange = effect(() => {
    switch (this.authService.authStatusComputed()) {
      case AuthStatus.checking:
        return;

      case AuthStatus.authenticated:
        this.router.navigate(['/game/menu']);
        return;

      default:
        this.router.navigate(['/auth/login']);
        return;
    }
  });
}
