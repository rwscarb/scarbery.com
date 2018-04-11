import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    this.initFrames();
  }

  private initFrames() {
    this.frames = [];
    for (let i = 0; i < this.numOfFrames; i++) {
      this.frames.push([0, 0]);
    }
  }

  onScore(score: number) {
    this.frames[this.currentFrame][this.attempt] = score;
    this.attempt = (this.attempt +  1) % 2;
    if (this.attempt === 0) {
      this.currentFrame++;
      if (this.currentFrame === this.numOfFrames) {
        this.gameOver = true;
      }
    }
  }

}
