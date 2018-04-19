import { HttpClient } from "protractor-http-client"
import { environment } from "../src/environments/environment";


export class BowlingCommon {
  http: HttpClient;

  constructor() {
    this.http = new HttpClient(environment.bowling.API_SERVER);
  }

  clearDB() {
    return this.http.delete('/v1/bowling/nuke');
  }
}
