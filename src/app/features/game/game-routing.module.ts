import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './pages/room/room.component';
import { LobbyComponent } from './pages/lobby/lobby.component';

const routes: Routes = [
  {
    path: 'lobby',
    component: LobbyComponent,
  },
  {
    path: 'room',
    component: RoomComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
