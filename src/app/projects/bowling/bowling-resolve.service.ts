import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { BowlingService } from "./bowling.service";
import { Observable } from "rxjs/Observable";


@Injectable()
export class BowlingResolveService implements Resolve {

  constructor(private bowlingService: BowlingService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable {
    let gameID = route.paramMap.get('gameID');

    return this.bowlingService.getGame(gameID);
  }

}
