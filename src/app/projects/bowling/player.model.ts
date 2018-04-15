import { Frame } from "./frame.model";
import { Game } from "./game.model";


export class Player {
  constructor(public id: string, public name: string) {
  }
}

export class ActivePlayer {
  constructor(public player: Player, public game: Game, private _frames: Frame[] = []) {
  }

  get frames() {
    return this._frames;
  }

  set frames(frames) {
    this._frames = frames;
  }

}
