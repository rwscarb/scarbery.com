import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-bowling',
  templateUrl: './bowling.component.html',
  styleUrls: ['./bowling.component.css']
})
export class BowlingComponent implements OnInit {
  numOfFrames = 10;
  frames: [[number, number]];
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
      this.frames.push([0, 0]);
    }
  }

  get activeFrame() {return this.frames[this.currentFrame]; }
  get pinsDown() {return this.pinsDownForm.get('pinsDown'); }

  onScore(score: number) {
    this.activeFrame[this.attempt] = score;
    this.attempt = (this.attempt +  1) % 2;
    if (this.attempt === 0) {
      this.currentFrame++;
      if (this.currentFrame === this.numOfFrames) {
        this.gameOver = true;
      }
    }
    this.pinsDownForm.get('pinsDown').reset();
  }

  validateScore(component: BowlingComponent) {
    return (control: AbstractControl) => {
      const score = control.value;
      if (score !== null) {
        const sum = component.activeFrame[0] + score;

        if (sum > 10) {
          return {invalidSum: {value: sum}};
        }
      }
      return null;
    };
  }

}
