import { Component, Input, OnInit } from '@angular/core';
import { Frame } from "../models/frame.model";
import { Player } from "../models/player.model";


@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  @Input() frames: Frame[];
  @Input() player: Player;

  constructor() {
  }

  ngOnInit(): void {
  }

}
