import { Component, OnInit } from '@angular/core';
import { BowlingService } from "../bowling.service";
import { Player } from "../models/player.model";
import { ActivatedRoute, Router } from "@angular/router";
import { Game } from "../models/game.model";


@Component({
  selector: 'app-newgame',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {
  availablePlayers: Player[] = [];
  selectedPlayers: Player[] = [];
  newPlayerName: string;

  constructor(
    private bowlingService: BowlingService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe(data => {
        this.availablePlayers = data.players
      });
  }

  startNewGame(players: Player[]) {
    return this.bowlingService.newGame(players)
      .subscribe((game: Game) => {
        this.router.navigate(['/projects/bowling/', game.id]);
      });
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
