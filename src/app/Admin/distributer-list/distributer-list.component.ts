import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/web3.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-distributer-list',
  templateUrl: './distributer-list.component.html',
  styleUrls: ['./distributer-list.component.css']
})
export class DistributerListComponent implements OnInit {
  distributer:Array<any>=[]
  constructor(private web3:Web3Service,private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.SpinnerService.show();  

    this.web3._contract.getPastEvents('Distributer', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
    .then((event) => {
      for (var i = 0; i < event.length; i++) {
        this.distributer.push(event[i])
  this.SpinnerService.hide();  

      }
  });

  }

}
