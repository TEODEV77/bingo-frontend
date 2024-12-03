import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './pages/room/room.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { NoRoomAvailableComponent } from './pages/no-room-available/no-room-available.component';
import { MenuComponent } from './pages/menu/menu.component';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'lobby',
    component: LobbyComponent,
  },
  {
    path: 'room',
    component: RoomComponent,
  },
  {
    path: 'noroom',
    component: NoRoomAvailableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
