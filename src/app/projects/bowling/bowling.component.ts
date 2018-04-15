import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { ATTEMPTS_PER_FRAME, STRIKE } from "./bowling.constants";
import { BowlingService } from "./bowling.service";
import { Frame } from './frame.model';
import { ActivePlayer, Player } from "./player.model";
import { Game } from "./game.model";


@Component({
  selector: 'app-bowling',
  templateUrl: './bowling.component.html',
  styleUrls: ['./bowling.component.css']
})
export class BowlingComponent implements OnInit {
  currentFrame = 0;
  currentAttempt = 0;
  currentPlayer = 0;
  game: Game;
  onExtendedFrame = false; // on e.g. 11th frame due to strike/spare on 10th
  gameOver = false;
  pinsDownForm: FormGroup;
  players: ActivePlayer[] = [];

  constructor(private bowlingService: BowlingService) {
  }

  ngOnInit(): void {
    this.initPlayers();
    this.initGame();
    this.initForms();
  }

  initPlayers() {
    // todo: player/game crud components and score fetching
    this.players.push(new ActivePlayer(
      new Player('f67c7105-3e89-492d-8a05-709e7fc1ac3a', 'Janelle'),
      this.bowlingService.getFrames())
    );
    this.players.push(new ActivePlayer(
      new Player('5ae07c03-f1a0-449b-a153-dd332dacf575', 'Ryan'),
      this.bowlingService.getFrames())
    );
  }

  initGame() {
    this.game = new Game('ab9cb6ea-2153-42d2-a9d9-6d85ad17573c');
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

  validateScore(component: BowlingComponent) {
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
