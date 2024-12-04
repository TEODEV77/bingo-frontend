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

@NgModule({
  declarations: [
    LayoutComponent,
    RoomComponent,
    LobbyComponent,
    NoRoomAvailableComponent,
    HeaderComponent,
    MenuComponent,
    BingoCardComponent,
  ],
  imports: [CommonModule, GameRoutingModule],
})
export class GameModule {}
