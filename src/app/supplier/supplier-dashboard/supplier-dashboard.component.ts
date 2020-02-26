import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { Web3Service } from 'src/app/web3.service';

@Component({
  selector: 'app-supplier-dashboard',
  templateUrl: './supplier-dashboard.component.html',
  styleUrls: ['./supplier-dashboard.component.css']
})
export class SupplierDashboardComponent implements OnInit {

  doughnutChartLabels: Label[] = ['Rejected', 'Approved'];
  doughnutChartData: MultiDataSet = [
    [15, 85]
  ];
  doughnutChartType: ChartType = 'doughnut';
  newData: any;
  manufacture: number;
  supplierid: any;
  smaterial: number;
  srequests: number;
  sapporved: number;
  srejected: number;
  reqproduct: Array<any> = [];
  reqmaterial:Array<any> = [];
  rejected:Array<any> = [];

  constructor(private web3: Web3Service) {

  }

  ngOnInit() {
    let getData = JSON.parse(localStorage.getItem('supplier'));
    this.supplierid = getData;
    var manufacture = 1;
    var smaterial = 1;
    var srequests = 1;
    var sapporved = 1;
    var srejected = 1;
    this.web3._contract.getPastEvents('Manufacture', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
      .then((event) => {
        for (var i = 0; i < event.length; i++) {
          if (event[i].returnValues.regby == getData) {
            this.manufacture = manufacture++
          }
        }
      });
    this.web3._contract2.getPastEvents('SupplierAdditems', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
      .then((event) => {
        for (var i = 0; i < event.length; i++) {
          if (event[i].returnValues.supplierid == getData) {
            this.smaterial = smaterial++
          }
        }
      });
    this.web3._contract2.getPastEvents('request_to_suppliers', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
      .then((event) => {
        for (var i = 0; i < event.length; i++) {
          if (event[i].returnValues.supplierid === getData) {

            this.reqproduct.push(event[i].returnValues.requestid);

          }
        }
        var matids = this.reqproduct
        for (var m = matids.length - 1; m >= 0; m--) {
          this.web3.req(matids[m]).then(result => {
            if ((result[6] == 5)) {
              this.sapporved = sapporved++
            }
          })

        }
      });
    this.web3._contract2.getPastEvents('request_to_suppliers', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
      .then((event) => {
        for (var i = 0; i < event.length; i++) {
          if (event[i].returnValues.supplierid === getData) {

            this.reqmaterial.push(event[i].returnValues.requestid);
console.log("Id", this.reqmaterial);

          }
        }
        var matids = this.reqmaterial
        console.log(matids);
        
        for (var m = matids.length - 1; m >= 0; m--) {
          this.web3.req(matids[m]).then(result => {
            if ((result[6] == 7)) {
              this.srequests = srequests++
            }
            // console.log(this.srequests);
            
          })
        }
      });

    this.web3._contract2.getPastEvents('request_to_suppliers', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
      .then((event) => {
        for (var i = 0; i < event.length; i++) {
          if (event[i].returnValues.supplierid === getData) {

            this.rejected.push(event[i].returnValues.requestid);

          }
        }
        var matids = this.rejected
        for (var m = matids.length - 1; m >= 0; m--) {
          this.web3.req(matids[m]).then(result => {
            // console.log("matids", result);
            if ((result[6] == 6)) {
              this.srejected = srejected++
            }
          })

        }
      });
  }


}