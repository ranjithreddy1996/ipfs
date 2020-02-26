import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/web3.service';

@Component({
  selector: 'app-manufacture-list',
  templateUrl: './manufacture-list.component.html',
  styleUrls: ['./manufacture-list.component.css']
})
export class ManufactureListComponent implements OnInit {
  manufacture:Array<any>=[]
  constructor(private web3: Web3Service) { }

  ngOnInit() {

    this.web3._contract.getPastEvents('Manufacture', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
    .then((event) => {
      for (var i = 0; i < event.length; i++) {
        this.manufacture.push(event[i])
      }
  });
  }

}
