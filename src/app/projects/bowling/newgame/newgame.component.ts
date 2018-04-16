import { Component, OnInit } from '@angular/core';
import { BowlingService } from "../bowling.service";

@Component({
  selector: 'app-newgame',
  templateUrl: './newgame.component.html',
  styleUrls: ['./newgame.component.css']
})
export class NewgameComponent implements OnInit {

  constructor(private bowlingService: BowlingService) { }

  ngOnInit() {
  }

  startNewGame() {

  }
}
