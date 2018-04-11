import { Component, Input, OnInit } from '@angular/core';
import { BlockchainService } from './blockchain.service';

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
    this.blockchain.getBalance(this.address)
      .subscribe( (balance: number) => {
        this.blockchain.getPrice()
          .subscribe((price: number) => {
            this.btcBalance = balance / 100000000;  // convert from satoshi
            this.btcPrice = price;
            this.usdBalance = this.btcBalance * this.btcPrice;
            this.dailyProfit = this.usdBalance / this.dayOfMonth - this.electricBill / 30;
          });
      });
  }


}
