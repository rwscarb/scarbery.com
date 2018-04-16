import { Component, OnInit } from '@angular/core';
import { BowlingService } from "../bowling.service";
import { Player } from "../models/player.model";


@Component({
  selector: 'app-newgame',
  templateUrl: './newgame.component.html',
  styleUrls: ['./newgame.component.css']
})
export class NewgameComponent implements OnInit {
  players: Player[] = [];

  constructor(private bowlingService: BowlingService) { }

  ngOnInit() {
    this.bowlingService.getPlayers()
      .subscribe(players => this.players = players);
  }

  startNewGame() {

  }
}
