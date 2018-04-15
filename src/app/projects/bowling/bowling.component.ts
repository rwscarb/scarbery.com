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

  // getFrames() {
  //   this.bowlingService.getFrames(this.frames)
  //     .subscribe(() => {
  //       let {currentFrame, currentAttempt} = this.getCurrentAttempt(this.frames);
  //       this.currentFrame = currentFrame;
  //       this.currentAttempt = currentAttempt;
  //     });
  // }

  // getCurrentAttempt(frames: Frame[]): {currentFrame: number, currentAttempt: number} {
  //   let frame;
  //   for (frame of frames) {
  //     if (!frame.visited) {
  //       let prevFrame = frame.prevFrame;
  //       for (let i in prevFrame.attempts) { // check if previous frame was partially finished
  //         if (prevFrame.attempts[i] === null) {
  //           return {
  //             currentFrame: prevFrame.index,
  //             currentAttempt: +i
  //           };
  //         }
  //       }
  //     }
  //   }
  //   return {
  //     currentFrame: frame.index,
  //     currentAttempt: 0
  //   }
  // }

  get activePlayer(): ActivePlayer {
    return this.players[this.currentPlayer];
  }

  get activeFrame(): Frame {
    return this.activePlayer.frames[this.currentFrame];
  }

  get pinsDown() {
    return this.pinsDownForm.get('pinsDown');
  }

  incrementPlayerTurn() {
    this.currentAttempt = 0;
    this.currentPlayer++;
    if (this.currentPlayer === this.players.length) {
      this.currentPlayer = 0;
      this.currentFrame++;
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


    if (!this.activeFrame.isLastFrame && (score === STRIKE || this.currentAttempt === ATTEMPTS_PER_FRAME)) {
      this.incrementPlayerTurn();
    }

    if (this.activeFrame.isLastFrame) { // on the 11th frame
      const prevFrame = this.activeFrame.prevFrame;
      if (prevFrame.isStrike && this.currentAttempt === ATTEMPTS_PER_FRAME) {
        this.gameOver = true;
      } else if (prevFrame.isSpare && this.currentAttempt > 0) {
        this.gameOver = true;
      } else if (!(prevFrame.isStrike || prevFrame.isSpare)) {
        this.gameOver = true;
      }
    }
    this.pinsDownForm.get('pinsDown').reset();
  }

  validateScore(component: BowlingComponent) {
    return (control: AbstractControl) => {
      const score = control.value;
      if (score !== null) {

        if (component.activeFrame.isLastFrame) {
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
