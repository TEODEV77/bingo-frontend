import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public registrationForm: FormGroup;
  public registrationError: boolean = false;
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor(private formBuilder: FormBuilder) {
    this.registrationForm = this.formBuilder.group({
      nickname: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  /**
   * Handles the registration process by submitting the form data to the AuthService.
   * On successful registration, navigates to the login page.
   */
  public handleRegistration(): void {
    if (this.registrationForm.invalid) {
      return;
    }

    const { nickname, password } = this.registrationForm.value;
    this.authService.register(nickname, password).subscribe({
      next: () => this.router.navigate(['/auth/login']),
      error: (error) => {
        this.registrationError = true;
        setTimeout(() => {
          this.registrationError = false;
        }, 3000);
      },
    });
  }
}
