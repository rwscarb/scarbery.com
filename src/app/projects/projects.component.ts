import { Component, OnInit } from '@angular/core';
import { BlockchainService } from './blockchain.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  btcBalance: number;
  btcPrice: number;
  usdBalance: number;
  dayOfMonth: number = (new Date()).getDate();
  electricBill = 1100;
  dailyProfit: number;

  constructor(private blockchain: BlockchainService) { }

  ngOnInit() {
    this.blockchain.getBalance()
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
