import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { LayoutComponent } from './layout/layout/layout.component';
import { RoomComponent } from './pages/room/room.component';
import { LobbyComponent } from './pages/lobby/lobby.component';


@NgModule({
  declarations: [
    LayoutComponent,
    RoomComponent,
    LobbyComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule
  ]
})
export class GameModule { }
