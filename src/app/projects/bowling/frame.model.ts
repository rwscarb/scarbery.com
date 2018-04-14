import { STRIKE } from "./bowling.constants";


export class Frame {
  visited = false;

  constructor(public index: number, private frames: Frame[], public attempts: number[]) {
  }

  get isLastFrame(): boolean {
    return this.index === this.frames.length - 1;
  }

  get nextFrame(): Frame {
    return this.frames[this.index + 1];
  }

  get prevFrame(): Frame {
    return this.frames[this.index - 1];
  }

  get isStrike(): boolean {
    let isStrike = false;
    this.attempts.forEach((score: number) => {
      if (score === STRIKE) {
        isStrike = true;
        return;
      }
    });
    return isStrike;
  }

  get isSpare(): boolean {
    if (this.isStrike) {
      return false;
    }
    return this.frameScore === STRIKE;
  }

  get frameScore(): number {
    let frameScore = 0;
    this.attempts.forEach((score: number) => {
      frameScore += score;
    });
    return frameScore;
  }

  get totalScore(): number {
    let totalScore = 0;
    if (this.nextFrame) {
      if (this.isStrike) {
        if (this.nextFrame.isStrike) {
          totalScore += this.nextFrame.frameScore;
          if (!this.nextFrame.isLastFrame) {
            totalScore += this.nextFrame.nextFrame.attempts[0];
          }
        } else {
          totalScore += this.nextFrame.frameScore;
        }
      } else if (this.isSpare) {
        totalScore += this.nextFrame.attempts[0];
      }
    }
    return this.frameScore + totalScore;
  }

  get cumulativeScore(): number {
    return this.prevFrame ? this.prevFrame.cumulativeScore + this.totalScore : this.totalScore;
  }
}
