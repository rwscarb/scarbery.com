import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { ATTEMPTS_PER_FRAME, STRIKE } from "./bowling.constants";
import { BowlingService } from "./bowling.service";
import { Frame } from './models/frame.model';
import { ActivePlayer } from "./models/player.model";
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
  onExtendedFrame = false; // on e.g. 11th frame due to strike/spare on 10th
  gameOver = false;
  game: Game;
  players: ActivePlayer[] = [];
  pinsDownForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private bowlingService: BowlingService
  ) { }

  ngOnInit(): void {
    this.route.data
      .subscribe(data => {
        let {game, players} = data['data'];
        this.players = players;
        this.game = game;
        this.fastForward();
        this.initForms();
      });
  }

  get activePlayer(): ActivePlayer {
    return this.players[this.currentPlayer];
  }

  get lastPlayer(): ActivePlayer {
    return this.players[this.players.length - 1];
  }

  private nextPlayer() {
    this.currentPlayer = (this.currentPlayer + 1) % this.players.length;
  }

  get activeFrame(): Frame {
    return this.activePlayer.frames[this.currentFrame];
  }

  /**
   * In case game already exists, start at appropriate frame/attempt
   */
  // todo: handle extendedFrame frame appropriately
  fastForward() {
    while (this.activeFrame.finished && !this.gameOver) {
      this.endPlayerTurn();
    }
    this.currentAttempt = this.activeFrame.attempts.indexOf(null);
  }

  endPlayerTurn() {
    this.currentAttempt = 0;
    if (this.isGameOver()) {
      this.gameOver = true;
    } else {
      this.nextPlayer();
      if (this.onExtendedFrame) {
        this.currentFrame--;
        this.onExtendedFrame = false;
      } else if (this.currentPlayer === 0) {
        this.currentFrame++;
      }
    }
  }

  isGameOver(): boolean {
    return (this.activeFrame.isExtendedFrame || this.activeFrame.isLastFrame) && this.activePlayer === this.lastPlayer;
  }

  /**
   * Handle the special cases of the last frame.
   * If strike, player immediately gets 2 more attempts
   * If spare, player immediately gets 1 ore attempt
   * @param {number} score
   */
  navigateBoard(score: number) {
    // finish prematurely in extended frame if not a strike or spare
    if (this.activeFrame.isExtendedFrame) {
      if (this.activeFrame.prevFrame.isStrike && this.currentAttempt === ATTEMPTS_PER_FRAME) {
        this.endPlayerTurn();
      } else if (this.activeFrame.prevFrame.isSpare && this.currentAttempt === 1) {
        this.endPlayerTurn();
      }
      // don't change players if player qualifies for extended frame
    } else if (this.activeFrame.nextFrame.isExtendedFrame) {
      if (this.activeFrame.isSpare || this.activeFrame.isStrike) {
        this.onExtendedFrame = true;
        this.currentAttempt = 0;
        this.currentFrame++;
      } else if (this.activeFrame.finished) {
        this.endPlayerTurn();
      }
    } else if (this.activeFrame.finished) {
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

  get pinsDown() {
    return this.pinsDownForm.get('pinsDown');
  }

  validateScore(component: GameComponent) {
    return (control: AbstractControl) => {
      const score = control.value;
      if (typeof score === "number") {

        if (!Number.isInteger(score)) {
          return {invalidType: true};
        }

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
