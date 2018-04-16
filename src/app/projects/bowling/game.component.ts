import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { ATTEMPTS_PER_FRAME, STRIKE } from "./bowling.constants";
import { BowlingService } from "./bowling.service";
import { Frame } from './models/frame.model';
import { ActivePlayer, Player } from "./models/player.model";
import { Game } from "./models/game.model";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-bowling',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  currentFrame = 0;
  currentAttempt = 0;
  currentPlayer = 0;
  game: Game;
  onExtendedFrame = false; // on e.g. 11th frame due to strike/spare on 10th
  gameOver = false;
  pinsDownForm: FormGroup;
  players: ActivePlayer[] = [];

  constructor(private route: ActivatedRoute, private bowlingService: BowlingService) {
  }

  ngOnInit(): void {
    this.route.data
      .subscribe((data) => {
        let gameData = data.game;
        // xxx: yuck, learn ng/ts generic typing system
        this.initGame(gameData);
        this.initPlayers(gameData);
        this.initForms();
      });
  }

  initPlayers(gameData) {
    let playerFrames = {};

    for (let playerData of gameData.players) {
      playerFrames[playerData.id] = this.bowlingService.initEmptyFrames();
    }

    for (let score of gameData.score_set) {
      let frame = playerFrames[score.player][score.frame - 1];
      frame.visited = true;
      frame.attempts[score.attempt - 1] = score.value;
    }

    for (let playerData of gameData.players) {
      this.players.push(new ActivePlayer(new Player(playerData.id, playerData.name), this.game, playerFrames[playerData.id]));
    }
  }

  initGame(gameData) {
    this.game = new Game(gameData.id);
  }

  initForms() {
    this.pinsDownForm = new FormGroup({
      'pinsDown': new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(STRIKE),
        this.validateScore(this) // xxx: there must be a better way
      ])
    });
  }

  get activePlayer(): ActivePlayer {
    return this.players[this.currentPlayer];
  }

  get lastPlayer(): ActivePlayer {
    return this.players[this.players.length - 1];
  }

  get activeFrame(): Frame {
    return this.activePlayer.frames[this.currentFrame];
  }

  get pinsDown() {
    return this.pinsDownForm.get('pinsDown');
  }

  endPlayerTurn() {
    if (this.isGameOver()) {
      this.gameOver = true;
    } else {
      this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
      this.currentAttempt = 0;

      if (this.onExtendedFrame) {
        this.currentFrame--;
        this.onExtendedFrame = false;
      } else if (this.currentPlayer === 0) {
        this.currentFrame++;
      }
    }
  }

  isGameOver(): boolean {
    return this.activeFrame.isExtendedFrame && this.activePlayer === this.lastPlayer;
  }

  navigateBoard(score: number) {
    if (this.activeFrame.isExtendedFrame) {
      if (this.activeFrame.prevFrame.isStrike && this.currentAttempt === ATTEMPTS_PER_FRAME) {
        this.endPlayerTurn();
      } else if (this.activeFrame.prevFrame.isSpare && this.currentAttempt === 1) {
        this.endPlayerTurn();
      }
    } else if (this.activeFrame.nextFrame.isExtendedFrame) {
      if (this.activeFrame.isSpare || this.activeFrame.isStrike) {
        this.onExtendedFrame = true;
        this.currentAttempt = 0;
        this.currentFrame++;
      }
    } else if (score === STRIKE || this.currentAttempt === ATTEMPTS_PER_FRAME) {
      this.endPlayerTurn();
    }
  }

  onScore(score: number) {
    this.bowlingService.score(
      this.game,
      this.activePlayer.player,
      this.activeFrame.index + 1,
      this.currentAttempt + 1,
      score).subscribe();

    this.activeFrame.attempts[this.currentAttempt] = score;
    this.activeFrame.visited = true;
    this.currentAttempt++;

    this.navigateBoard(score);

    this.pinsDownForm.get('pinsDown').reset();
  }

  validateScore(component: GameComponent) {
    return (control: AbstractControl) => {
      const score = control.value;
      if (score !== null) {

        if (component.activeFrame.isExtendedFrame) {
          if (score > STRIKE) {
            return {invalidSum: true};
          } else if (!component.activeFrame.isStrike && component.activeFrame.frameScore + score > STRIKE) {
            return {invalidSum: true};
          }
        } else if (component.activeFrame.frameScore + score > STRIKE) {
          return {invalidSum: true};
        }
      }
      return null;
    };
  }

}
