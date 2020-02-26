import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/web3.service';

@Component({
  selector: 'app-manufacture-dashboard',
  templateUrl: './manufacture-dashboard.component.html',
  styleUrls: ['./manufacture-dashboard.component.css']
})
export class ManufactureDashboardComponent implements OnInit {
  distributer: number;
  supplierid: any;
  mproduct: number;
  mrequests: number;
  mapporved: number;
  mrejected: number;
  reqproduct: Array<any> = [];
  dist: Array<any> = [];

  constructor(private web3: Web3Service) {

  }

  ngOnInit() {
    let getData = JSON.parse(localStorage.getItem('openmanufacture'));
    this.supplierid = getData;
    var distributer = 1;
    var mproduct = 1;
    var mrequests = 1;
    var mapporved = 1;
    var mrejected = 1;
    this.web3._contract.getPastEvents('Distributer', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
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
              this.distributer = distributer++
            }
          })
        }
      });

    this.web3._contract2.getPastEvents('manufactureproducts', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
      .then((event) => {
        for (var i = 0; i < event.length; i++) {
          if (event[i].returnValues.manufactureid == getData) {
            this.mproduct = mproduct++
          }
        }
      });
    this.web3._contract2.getPastEvents('distributer_to_manufacture', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
      .then((event) => {
        for (var i = 0; i < event.length; i++) {
          if (event[i].returnValues.manufactureid === getData) {

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
    this.web3._contract2.getPastEvents('distributer_to_manufacture', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
      .then((event) => {
        for (var i = 0; i < event.length; i++) {
          if (event[i].returnValues.manufactureid === getData) {
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

    this.web3._contract2.getPastEvents('distributer_to_manufacture', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
      .then((event) => {
        for (var i = 0; i < event.length; i++) {
          if (event[i].returnValues.manufactureid === getData) {

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
