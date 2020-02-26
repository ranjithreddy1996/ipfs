import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/web3.service';

@Component({
  selector: 'app-distributer-dashboard',
  templateUrl: './distributer-dashboard.component.html',
  styleUrls: ['./distributer-dashboard.component.css']
})
export class DistributerDashboardComponent implements OnInit {

  retailer: number;
  distributerid: any;
  dproduct: number;
  mrequests: number;
  mapporved: number;
  mrejected: number;
  reqproduct: Array<any> = [];
  dist: Array<any> = [];

  constructor(private web3: Web3Service) {

  }

  ngOnInit() {
    let getData = JSON.parse(localStorage.getItem('opendistributer'));
    this.distributerid = getData;
    var retailer = 1;
    var dproduct = 1;
    var mrequests = 1;
    var mapporved = 1;
    var mrejected = 1;
    this.web3._contract.getPastEvents('Retailer', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
      .then((event) => {
        for (var i = 0; i < event.length; i++) {
          if (event[i].returnValues.regby === getData) {
            this.dist.push(event[i].returnValues.id);
          }
        }
        var matids = this.dist
        for (var m = matids.length - 1; m >= 0; m--) {
          this.web3.getsup(matids[m]).then(result => {
            if (result[0] != "") {
              this.retailer = retailer++
            }
          })
        }
      });

    this.web3._contract2.getPastEvents('Distributer_products', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
      .then((event) => {
        for (var i = 0; i < event.length; i++) {
          if (event[i].returnValues.distributerID == getData) {
            this.dproduct = dproduct++
          }
        }
      });
    this.web3._contract2.getPastEvents('retailer_to_distributer', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
      .then((event) => {
        for (var i = 0; i < event.length; i++) {
          if (event[i].returnValues.distributerID === getData) {

            this.reqproduct.push(event[i].returnValues.requestid);

          }
        }
        var matids = this.reqproduct
        for (var m = matids.length - 1; m >= 0; m--) {
          this.web3.disreq(matids[m]).then(result => {
            if ((result[6] == 5)) {
              this.mapporved = mapporved++
            }
          })

        }
      });
    this.web3._contract2.getPastEvents('retailer_to_distributer', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
      .then((event) => {
        for (var i = 0; i < event.length; i++) {
          if (event[i].returnValues.distributerID === getData) {

            this.reqproduct.push(event[i].returnValues.requestid);

          }
        }
        var matids = this.reqproduct
        for (var m = matids.length - 1; m >= 0; m--) {
          this.web3.disreq(matids[m]).then(result => {
            if ((result[6] == 7)) {
              this.mrequests = mrequests++
            }
          })

        }
      });

    this.web3._contract2.getPastEvents('retailer_to_distributer', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
      .then((event) => {
        for (var i = 0; i < event.length; i++) {
          if (event[i].returnValues.distributerID === getData) {

            this.reqproduct.push(event[i].returnValues.requestid);

          }
        }
        var matids = this.reqproduct
        for (var m = matids.length - 1; m >= 0; m--) {
          this.web3.disreq(matids[m]).then(result => {
            console.log("matids", result);
            if ((result[6] == 6)) {
              this.mrejected = mrejected++
            }
          })

        }
      });
  }

}

