import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Web3Service } from 'src/app/web3.service';

@Component({
  selector: 'app-dis-rejected',
  templateUrl: './dis-rejected.component.html',
  styleUrls: ['./dis-rejected.component.css']
})
export class DisRejectedComponent implements OnInit {


  reqproduct: Array<any> = [];
  getapp: Array<any> = [];

  constructor(private modalService: NgbModal, private web3: Web3Service) { }

  ngOnInit() {


    let getData = JSON.parse(localStorage.getItem('opendistributer'));
    console.log(getData);

    this.web3._contract2.getPastEvents('retailer_to_distributer', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
      .then((event) => {
        for (var i = 0; i < event.length; i++) {
          if (event[i].returnValues.distributerID === getData) {
            this.reqproduct.push(event[i].returnValues.requestid);
            console.log(this.reqproduct);
          }
        }
        var matids = this.reqproduct
        for (var m = matids.length - 1; m >= 0; m--) {
          this.web3.retailerreq(matids[m]).then(result => {
            console.log("matids", result);
            console.log(result[5]);
            if ((result[6] == 6)) {
              this.getapp.push(result);
            }
          })

        }
      });
    return this.getapp = []
  }
}



