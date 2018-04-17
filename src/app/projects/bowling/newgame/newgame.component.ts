import { Component, OnInit } from '@angular/core';
import { BowlingService } from "../bowling.service";
import { Player } from "../models/player.model";
import { Router } from "@angular/router";
import { Game } from "../models/game.model";


@Component({
  selector: 'app-newgame',
  templateUrl: './newgame.component.html',
  styleUrls: ['./newgame.component.css']
})
export class NewgameComponent implements OnInit {
  availablePlayers: Player[] = [];
  selectedPlayers: Player[] = [];

  constructor(private bowlingService: BowlingService, private router: Router) {
  }

  ngOnInit() {
    this.bowlingService.getPlayers()
      .subscribe(players => this.availablePlayers = players);
  }

  startNewGame(players: Player[]) {
    return this.bowlingService.newGame(players)
      .subscribe((game: Game) => this.router.navigate(['/projects/bowling/', game.id]));
  }

  selectPlayer(player: Player) {
    if (this.selectedPlayers.includes(player)) {
      this.selectedPlayers.splice(this.selectedPlayers.indexOf(player), 1);
    } else {
      this.selectedPlayers.push(player);
    }
  }

  addPlayer(name: string) {
    return this.bowlingService.newPlayer(name)
      .subscribe(player => {
        this.availablePlayers.push(player);
        this.selectedPlayers.push(player);
      });
  }
}
