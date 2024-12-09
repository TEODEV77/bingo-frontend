import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  private authService = inject(AuthService);
  private router = inject(Router);
  public currentUser = computed(() => this.authService.currentUserComputed());

  /**
   * Navigates the user to the game lobby.
   */
  navigateToLobby() {
    this.router.navigate(['/game/lobby']);
  }

  /**
   * Logs out the current user and navigates to the login page.
   */
  logoutUser() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
