import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'bingo-frontend';
  username: string = '';
  password: string = '';

  onLogin() {
    if (!this.username || !this.password) {
      alert('Por favor, llena todos los campos');
      return;
    }
  }
}
