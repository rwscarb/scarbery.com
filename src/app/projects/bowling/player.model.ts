import { Frame } from "./frame.model";


export class Player {
  constructor(public id: string, public name: string) {
  }
}

export class ActivePlayer {
  constructor(public player: Player, public frames: Frame[]) {
  }
}
