import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Frame } from "./frame.model";


@Injectable()
export class BowlingService {

  constructor(public http: HttpClient) { }

  getFrames(frames: Frame[]) {
    return this.http.get('http://127.0.0.1:8000/v1/bowling/games/ab9cb6ea-2153-42d2-a9d9-6d85ad17573c')
      .map((res : any) => {
        // populate the frames
        for (let score of res.score_set) {
          let frame = frames[score.frame - 1];
          frame.visited = true;
          frame.attempts[score.attempt - 1] = score.value;
        }
        return frames;
      });
  }

  score(frame: number, attempt: number, score: number) {
    return this.http.post('http://127.0.0.1:8000/v1/bowling/scores', {
      game: 'ab9cb6ea-2153-42d2-a9d9-6d85ad17573c',
      player: 'f67c7105-3e89-492d-8a05-709e7fc1ac3a',
      frame: frame + 1,
      attempt: attempt + 1,
      value: score
    });
  }
}
