import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { BowlingService } from "./bowling.service";
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";
import "rxjs/add/observable/empty";

@Injectable()
export class BowlingResolveService implements Resolve<any> {

  constructor(
    private router: Router,
    private bowlingService: BowlingService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let gameID = route.paramMap.get('gameID');

    return this.bowlingService.getGame(gameID)
      .pipe(
        catchError(() => {
          this.router.navigate(['/projects/bowling/new']);
          return Observable.empty();
        })
      );
  }

}
