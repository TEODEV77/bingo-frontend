import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public loginForm: FormGroup;
  public isLoginError: boolean = false;
  public loginErrorMessage: string = "Credentials are not valid";
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      nickname: ['Sofka', Validators.required],
      password: ['1234', [Validators.required, Validators.minLength(4)]],
    });
  }

  /**
   * Handles the login process by submitting the form data to the AuthService.
   * On successful login, navigates to the game menu page.
   * If login fails, displays an error message for 3 seconds.
   */
  public handleLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { nickname, password } = this.loginForm.value;
    this.authService.login(nickname, password).subscribe({
      next: () => this.router.navigate(['/game/menu']),
      error: (error) => {
        this.isLoginError = true;
        setTimeout(() => {
          this.isLoginError = false;
        }, 3000);
      },
    });
  }
}
