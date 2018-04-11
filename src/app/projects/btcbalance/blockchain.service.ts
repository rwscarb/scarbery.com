import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BlockchainService {

  constructor(private http: HttpClient) { }

  getBalance(address: string) {
    return this.http.get('https://blockchain.info/q/addressbalance/' + address);
  }

  getPrice() {
    return this.http.get('https://blockchain.info/q/24hrprice?cors=true');
  }

}
