import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Frame } from "./frame.model";
import { Player } from "./player.model";
import { ATTEMPTS_PER_FRAME, NUM_OF_FRAMES } from "./bowling.constants";
import { Game } from "./game.model";


const SERVER = 'http://127.0.0.1:8000';


@Injectable()
export class BowlingService {

  constructor(public http: HttpClient) { }

  initEmptyFrames(): Frame[] {
    let frames: Frame[] = [];
    let i = 0;
    for (; i < NUM_OF_FRAMES; i++) {
      frames.push(new Frame(i, frames, new Array(ATTEMPTS_PER_FRAME).fill(null)));
    }
    frames.push(new Frame(i, frames, new Array(ATTEMPTS_PER_FRAME).fill(null))); // potential 11th frame

    return frames;
  }

  getGame(gameID: string) {
    return this.http.get(SERVER + '/v1/bowling/games/' + gameID);
  }

  score(game: Game, player: Player, frame: number, attempt: number, score: number) {
    return this.http.post(SERVER + '/v1/bowling/scores', {
      game: game.id,
      player: player.id,
      frame: frame,
      attempt: attempt,
      value: score
    });
  }
}
