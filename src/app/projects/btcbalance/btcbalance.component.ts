import { Component, Input, OnInit } from '@angular/core';
import { BlockchainService } from './blockchain.service';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-btcbalance',
  templateUrl: './btcbalance.component.html',
  styleUrls: ['./btcbalance.component.css']
})
export class BtcbalanceComponent implements OnInit {
  btcBalance: number;
  btcPrice: number;
  usdBalance: number;
  dayOfMonth: number = (new Date()).getDate();
  electricBill = 1100;
  dailyProfit = 0;

  @Input() address: string;

  constructor(private blockchain: BlockchainService) { }

  ngOnInit() {
  }

  onClick() {
    const balance = this.blockchain.getBalance(this.address);
    const price = this.blockchain.getPrice();

    forkJoin<number>([balance, price]).subscribe(results => {
      this.btcBalance = results[0] / 100000000;  // convert from satoshi
      this.btcPrice = results[1];
      this.usdBalance = this.btcBalance * this.btcPrice;
      this.dailyProfit = this.usdBalance / this.dayOfMonth - this.electricBill / 30;
    });

  }


}
