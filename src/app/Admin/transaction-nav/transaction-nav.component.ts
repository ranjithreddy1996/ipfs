import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-nav',
  templateUrl: './transaction-nav.component.html',
  styleUrls: ['./transaction-nav.component.css']
})
export class TransactionNavComponent implements OnInit {
  coinwallet=["Supplier List","Manufacture List","Distributer List","Retailer list"]
  selectedwallet =this.coinwallet[0];

  constructor() { }

  ngOnInit() {
  }

}
