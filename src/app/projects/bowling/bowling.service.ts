import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Frame } from "./frame.model";
import { Player } from "./player.model";
import { ATTEMPTS_PER_FRAME, NUM_OF_FRAMES } from "./bowling.constants";
import { Game } from "./game.model";


@Injectable()
export class BowlingService {

  constructor(public http: HttpClient) { }

  private initFrames(): Frame[] {
    let frames: Frame[] = [];
    let i = 0;
    for (; i < NUM_OF_FRAMES; i++) {
      frames.push(new Frame(i, frames, new Array(ATTEMPTS_PER_FRAME).fill(null)));
    }
    frames.push(new Frame(i, frames, new Array(ATTEMPTS_PER_FRAME).fill(null))); // potential 11th frame

    return frames;
  }

  getFrames(player?: Player, game?: string): Frame[] {
    let frames = this.initFrames();
    return frames;
    // return this.http.get('http://127.0.0.1:8000/v1/bowling/games/ab9cb6ea-2153-42d2-a9d9-6d85ad17573c')
    //   .map((res : any) => {
    //     // populate the frames
    //     for (let score of res.score_set) {
    //       let frame = frames[score.frame - 1];
    //       frame.visited = true;
    //       frame.attempts[score.attempt - 1] = score.value;
    //     }
    //     return frames;
    //   });
  }

  score(game: Game, player: Player, frame: number, attempt: number, score: number) {
    return this.http.post('http://127.0.0.1:8000/v1/bowling/scores', {
      game: game.id,
      player: player.id,
      frame: frame,
      attempt: attempt,
      value: score
    });
  }
}
