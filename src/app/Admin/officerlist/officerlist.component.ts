import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../web3.service';

@Component({
  selector: 'app-officerlist',
  templateUrl: './officerlist.component.html',
  styleUrls: ['./officerlist.component.css']
})
export class OfficerlistComponent implements OnInit {
  officers: Array<any>=[];

  constructor(private web3: Web3Service) { }

  ngOnInit() {
  //   this.web3._contract.getPastEvents('useradded', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
  //   .then((event) => {
  //     for (var i = 0; i < event.length; i++) {
  //       this.officers.push(event[i]);
  //     }
  // });
  }

}
