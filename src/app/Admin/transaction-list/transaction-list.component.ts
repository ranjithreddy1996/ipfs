import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Web3Service } from 'src/app/web3.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  constructor(private modalService : NgbModal, private web3: Web3Service) { }
  supplier: Array<any> = []

  ngOnInit() {
    this.web3._contract.getPastEvents('Supplier', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
    .then((event) => {
      for (var i = 0; i < event.length; i++) {
        this.supplier.push(event[i])
      }
  });
  
  

  }

}
