import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Web3Service } from 'src/app/web3.service';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-sup-approvallist',
  templateUrl: './sup-approvallist.component.html',
  styleUrls: ['./sup-approvallist.component.css']
})
export class SupApprovallistComponent implements OnInit {

  reqproduct: Array<any> = [];
  getapp: Array<any> = [];
  casees: any;
  matidg: any;
  data: Array<any> = [];
  time: string;
  display: string;
  totalcost: any;
  cost: any;
  quantity: any;
  materialname: any;
  materialid: any;
  supplier: any;
  manufacture: any;
  constructor(private modalService: NgbModal, private web3: Web3Service, private router: Router) { }

  ngOnInit() {


    let getData = JSON.parse(localStorage.getItem('supplier'));
    console.log(getData);

    this.web3._contract2.getPastEvents('request_to_suppliers', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
      .then((event) => {
        for (var i = 0; i < event.length; i++) {
          if (event[i].returnValues.supplierid === getData) {

            this.reqproduct.push(event[i].returnValues.requestid);
            console.log(this.reqproduct);

          }
        }
        var matids = this.reqproduct
        for (var m = matids.length - 1; m >= 0; m--) {
          this.web3.req(matids[m]).then(result => {
            console.log("matids", result);
            if ((result[6] == 5)) {
              this.getapp.push(result);
              
            }
          })

        }
      });
    return this.getapp = []
  }

  row(event) {
    if (event.target) {
      var tr = $(event.currentTarget).closest('tr')
      this.casees = tr.find(".requestid").text();
      let data = {
        "casenum": this.casees
      }
      console.log("caseeeeeeeeeeee", data)
      localStorage.setItem("caseno", JSON.stringify(this.casees));
      this.router.navigate(['/Supplier/material-status'])
    }
  }
  get(event) {
    if (event.target) {
      var tr = $(event.currentTarget).closest('tr');
      this.matidg = tr.find(".requestid").text();
      this.web3.ginvoice(this.matidg).then(result => {
        console.log(result);
        this.totalcost=result[7]
        this.cost=result[6]
        this.quantity=result[5]
        this.materialname=result[4]
        this.materialid=result[3]
        this.supplier=result[1]
        this.manufacture=result[2]
        this.data.push(result)
        this.time = new Date().toLocaleString();
      });
      this.openModal();
    }
    return this.data = []
  }

  onCloseHandled() {
    this.display = 'none'
  }

  openModal() {
    this.display = 'block';
  }
  // print(){
  //   window.print();
  // }

  pdf2() {
    var data = document.getElementById('pdff2');
    html2canvas(data).then(canvas => {
      var imgWidth = 180;
      var pageHeight = 180;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4');

      pdf.addImage(contentDataURL, 'JPEG', 10, 10, 180, 180)
      pdf.save('UPS.pdf')
    });
  }


}
