import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { ATTEMPTS_PER_FRAME, NUM_OF_FRAMES, STRIKE } from "./bowling.constants";
import { BowlingService } from "./bowling.service";
import { Frame } from './frame.model';


@Component({
  selector: 'app-bowling',
  templateUrl: './bowling.component.html',
  styleUrls: ['./bowling.component.css']
})
export class BowlingComponent implements OnInit {
  numOfFrames = NUM_OF_FRAMES;
  frames: Frame[];
  currentFrame = 0;
  attempt = 0;
  gameOver = false;
  pinsDownForm: FormGroup;

  constructor(private bowlingService: BowlingService) { }

  ngOnInit(): void {
    this.initFrames();
    this.pinsDownForm = new FormGroup({
      'pinsDown': new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(STRIKE),
        this.validateScore(this) // xxx: there must be a better way
      ])
    });
  }

  private initFrames() {
    this.frames = [];
    let i = 0;
    for (; i < this.numOfFrames; i++) {
      this.frames.push(new Frame(i, this.frames, new Array(ATTEMPTS_PER_FRAME).fill(null)));
    }
    this.frames.push(new Frame(i, this.frames, new Array(ATTEMPTS_PER_FRAME).fill(null))); // potential 11th frame
  }

  getFrames() {
    this.bowlingService.getFrames(this.frames)
      .subscribe(frames => {
        this.currentFrame = 1;
        this.attempt = 1;
      });
  }

  get activeFrame(): Frame {
    return this.frames[this.currentFrame];
  }

  get pinsDown() {
    return this.pinsDownForm.get('pinsDown');
  }

  onScore(score: number) {
    this.activeFrame.attempts[this.attempt] = score;

    this.bowlingService.score(this.currentFrame, this.attempt, score).subscribe();

    this.attempt++;
    this.activeFrame.visited = true;

    if (!this.activeFrame.isLastFrame && (score === STRIKE || this.attempt === ATTEMPTS_PER_FRAME)) {
      this.attempt = 0;
      this.currentFrame++;
    }

    if (this.currentFrame === this.numOfFrames) { // on the 11th frame
      const prevFrame = this.activeFrame.prevFrame;
      if (prevFrame.isStrike && this.attempt === ATTEMPTS_PER_FRAME) {
        this.gameOver = true;
      } else if (prevFrame.isSpare && this.attempt > 0) {
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
