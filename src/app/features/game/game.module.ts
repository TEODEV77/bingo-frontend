import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { LayoutComponent } from './layout/layout/layout.component';
import { RoomComponent } from './pages/room/room.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { NoRoomAvailableComponent } from './pages/no-room-available/no-room-available.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './pages/menu/menu.component';
import { BingoCardComponent } from './components/bingo-card/bingo-card.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { DrawingBingoBallsComponent } from './components/drawing-bingo-balls/drawing-bingo-balls.component';

@NgModule({
  declarations: [
    LayoutComponent,
    RoomComponent,
    LobbyComponent,
    NoRoomAvailableComponent,
    HeaderComponent,
    MenuComponent,
    BingoCardComponent,
    PlayerListComponent,
    DrawingBingoBallsComponent,
  ],
  imports: [CommonModule, GameRoutingModule],
})
export class GameModule {}
