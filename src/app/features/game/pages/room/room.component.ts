import { Component, inject } from '@angular/core';
import { ServerService } from '../../../../services/server.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {

  serverSocket = inject(ServerService);
}
