export class Frame {
  constructor(public index: number, public attempts: number[]) {
  }

  get isStrike(): boolean {
    this.attempts.forEach((score: number) => {
      if (score === 10) {
        return true;
      }
    });
    return false;
  }

  get isSpare(): boolean {
    if (this.isStrike) {
      return false;
    }
    return this.totalScore === 10;
  }

  get totalScore(): number {
    let totalScore = 0;
    this.attempts.forEach((score: number) => {
      totalScore += score;
    });
    return totalScore;
  }
}
