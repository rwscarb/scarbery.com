import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Frame } from './frame.model';


@Component({
  selector: 'app-bowling',
  templateUrl: './bowling.component.html',
  styleUrls: ['./bowling.component.css']
})
export class BowlingComponent implements OnInit {
  numOfFrames = 10;
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
        Validators.max(10),
        this.validateScore(this) // xxx: there must be a better way
        ])
    });
  }

  private initFrames() {
    this.frames = [];
    for (let i = 0; i < this.numOfFrames; i++) {
      this.frames.push(new Frame(i, [0, 0]));
    }
  }

  get activeFrame() {return this.frames[this.currentFrame]; }
  get pinsDown() {return this.pinsDownForm.get('pinsDown'); }

  onScore(score: number) {
    this.activeFrame.attempts[this.attempt] = score;
    this.attempt = (this.attempt +  1) % 2;
    if (score === 10) {// if bowled a strike move to next frame
      this.attempt = 0;
    }
    if (this.attempt === 0) {
      this.currentFrame++;
      if (this.currentFrame === this.numOfFrames) {
        // todo: allow for strike and spare in 10th frame
        this.gameOver = true;
      }
    }
    this.pinsDownForm.get('pinsDown').reset();
  }

  validateScore(component: BowlingComponent) {
    return (control: AbstractControl) => {
      const score = control.value;
      if (score !== null) {

        if (component.activeFrame.totalScore + score > 10) {
          return {invalidSum: true};
        }
      }
      return null;
    };
  }

}
