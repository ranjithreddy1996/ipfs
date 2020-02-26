import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/web3.service';

@Component({
  selector: 'app-retailer-list',
  templateUrl: './retailer-list.component.html',
  styleUrls: ['./retailer-list.component.css']
})
export class RetailerListComponent implements OnInit {
  retailer:Array<any>=[]
  constructor(private web3:Web3Service) { }

  ngOnInit() {
    this.web3._contract.getPastEvents('Retailer', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
    .then((event) => {
      for (var i = 0; i < event.length; i++) {
        this.retailer.push(event[i])
      }
  });
  }

}
