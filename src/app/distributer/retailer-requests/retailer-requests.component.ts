import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Web3Service } from 'src/app/web3.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-retailer-requests',
  templateUrl: './retailer-requests.component.html',
  styleUrls: ['./retailer-requests.component.css']
})
export class RetailerRequestsComponent implements OnInit {
  reqproduct: Array<any> = [];
  appids: any;
  app: string;
  dec: any;
  matid: Array<any> = [];
  ap: any;
  constructor(private modalService: NgbModal, private web3: Web3Service) { }

  ngOnInit() {
    let getData = JSON.parse(localStorage.getItem('opendistributer'));

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
            console.log(result[0]);
            if (result[6] == 7) {
              this.matid.push(result);
              //  console.log(this.matid[0]);
            }
          })

        }
      });
  }
  approve(event) {
    if (event.target) {

      var tr = $(event.currentTarget).closest('tr');
      this.appids = tr.find(".requestid").text();
      this.app = tr.find(".productid").text();
      this.ap = tr.find(".quantity").text();

      this.web3.approvestatus_dis(this.appids, this.app, this.ap).then(receipt => {
        console.log(receipt);

        let raw2 = JSON.parse(localStorage.getItem('erroratdistributer'));
        console.log(raw2)

        if (raw2 != null) {
          Swal.fire({
            text: 'Not Enough Quantity',
            icon: 'error',
            confirmButtonText: 'OK',
          });
          localStorage.removeItem('erroratdistributer');

        }
        else {
          Swal.fire({
            text: 'Successfully Approved',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        }
        this.ngOnInit();

      });


    }
  }
  reject(event) {
    if (event.target) {

      var tr = $(event.currentTarget).closest('tr');
      this.appids = tr.find(".requestid").text();
      this.web3.rejectstatus_dis(this.appids).then(receipt => {
        console.log(receipt);
        this.ngOnInit();

      });
      Swal.fire({
        text: 'Successfully Rejected',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }
  }



}
