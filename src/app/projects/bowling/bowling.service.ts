import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Frame } from "./models/frame.model";
import { ActivePlayer, Player } from "./models/player.model";
import { API_SERVER, ATTEMPTS_PER_FRAME, NUM_OF_FRAMES } from "./bowling.constants";
import { Game } from "./models/game.model";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";


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

  newGame(players: Player[]) {
    let playerIDs = players.map(player => player.id);
    return this.http.post(API_SERVER + '/v1/bowling/games', {
      players: playerIDs
    });
  }

  getGame(gameID: string) {
    return this.http.get(API_SERVER + '/v1/bowling/games/' + gameID)
      .pipe(
        map(gameData => {
            let ret = {players: [], game: new Game(gameData['id'])};

            let _playerMap = {};
            for (let player of gameData['players']) {
              _playerMap[player['id']] = this.initEmptyFrames();
              player = new Player(player.id, player.name);
              ret.players.push(new ActivePlayer(player, ret.game, _playerMap[player.id]));
            }

            for (let score of gameData['score_set']) {
              let frame = _playerMap[score.player][score.frame - 1];
              frame.visited = true;
              frame.attempts[score.attempt - 1] = score.value;
            }

            return ret;
        })
      );
  }

  newPlayer(name: string): Observable<Player> {
    return this.http.post(API_SERVER + '/v1/bowling/players', {name})
      .pipe(
        map(data => new Player(data['id'], data['name']))
      );
  }

  getPlayers(): Observable<Player[]> {
    return this.http.get(API_SERVER + '/v1/bowling/players')
      .pipe(
        map((dataArray:{}[]) => dataArray.map(data => new Player(data['id'], data['name'])))
      );
  }

  score(game: Game, player: Player, frame: number, attempt: number, score: number) {
    return this.http.post(API_SERVER + '/v1/bowling/scores', {
      game: game.id,
      player: player.id,
      frame: frame,
      attempt: attempt,
      value: score
    });
  }
}
