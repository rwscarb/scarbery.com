import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BlockchainService {

  constructor(private http: HttpClient) { }

  getBalance() {
    return this.http.get('https://blockchain.info/q/addressbalance/352zCmfv2KXN6h2ihni1WMzHwDr4tmUgMt');
  }

  getPrice() {
    return this.http.get('https://blockchain.info/q/24hrprice?cors=true');
  }

}
