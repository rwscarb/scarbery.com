import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { ATTEMPTS_PER_FRAME, NUM_OF_FRAMES, STRIKE } from "./bowling.constants";
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

  constructor() { }

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
      this.frames.push(new Frame(i, this.frames, new Array(ATTEMPTS_PER_FRAME).fill(0)));
    }
    this.frames.push(new Frame(i, this.frames, new Array(ATTEMPTS_PER_FRAME).fill(0))); // potential 11th frame
  }

  get activeFrame() {
    return this.frames[this.currentFrame];
  }

  get pinsDown() {
    return this.pinsDownForm.get('pinsDown');
  }

  onScore(score: number) {
    this.activeFrame.attempts[this.attempt] = score;

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
