import { STRIKE } from "../bowling.constants";


export class Frame {
  visited = false;

  constructor(public index: number, private frames: Frame[], public attempts: number[]) { }

  get isExtendedFrame(): boolean {
    return this.index === this.frames.length - 1;
  }

  get nextFrame(): Frame {
    return this.frames[this.index + 1];
  }

  get prevFrame(): Frame {
    return this.frames[this.index - 1];
  }

  get isStrike(): boolean {
    return this.attempts.some((score: number) => score === STRIKE);
  }

  get isSpare(): boolean {
    if (this.isStrike) {
      return false;
    }
    return this.frameScore === STRIKE;
  }

  get finished(): boolean {
    if (this.isStrike || this.isSpare) {
      return true;
    }
    return this.attempts.every((value => value !== null));
  }

  get frameScore(): number {
    return this.attempts.reduce((n, x) => n + x);
  }

  get totalScore(): number {
    let totalScore = 0;
    if (this.nextFrame) {
      if (this.isStrike) {
        if (this.nextFrame.isStrike) {
          totalScore += this.nextFrame.frameScore;
          if (!this.nextFrame.isExtendedFrame) {
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
