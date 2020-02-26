import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Web3Service } from 'src/app/web3.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manu-approvals',
  templateUrl: './manu-approvals.component.html',
  styleUrls: ['./manu-approvals.component.css']
})
export class ManuApprovalsComponent implements OnInit {
  casees: any;

  constructor(private modalService: NgbModal, private web3: Web3Service,private router:Router) { }
  modalReference: NgbModalRef;
  closeResult: string;
  addmaterial: Array<any> = [];
  matid: Array<any> = [];
  sname: any;
  ngOnInit() {
    let getData = JSON.parse(localStorage.getItem('opendistributer'));

    console.log(getData);


    this.web3._contract2.getPastEvents('distributer_to_manufacture', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
      .then((event) => {
        for (var i = 0; i < event.length; i++) {
          if (event[i].returnValues.distributerID === getData) {
            this.addmaterial.push(event[i].returnValues.requestid);

          }
        }
        var matids = this.addmaterial

        for (var m = matids.length - 1; m >= 0; m--) {

          console.log(matids[m]);
          this.web3.disreq(matids[m]).then(result => {
            console.log("matids", result);
            if (result[6] == 5) {
              this.matid.push(result);
              console.log(this.matid[0]);
            }
          })
        }

      });
    return this.matid = [], this.addmaterial = []
  }
  ServiceData = {
    materialid: "",

  }
  clear(ServiceData) {
    ServiceData.materialid = ""

  }
  receivedatdistributer(ServiceData) {

    this.web3.receivedatdistributer(ServiceData.materialid).then(receipt => {
      console.log(receipt);
      this.ngOnInit();

    })
    Swal.fire({
      text: 'Successfully Received',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }

  row(event){
    if(event.target){
    var tr = $(event.currentTarget).closest('tr')
        this.casees = tr.find(".requestid").text(); 
        let data={
          "casenum":this.casees
        }
        console.log("caseeeeeeeeeeee",data)
        localStorage.setItem("product",JSON.stringify(this.casees));
        this.router.navigate(['/Manufacture/product-status'])  
        var disnav="caseatdis";
        localStorage.setItem("trackdis",JSON.stringify(disnav))
    }
  }

  closing() {
    this.modalReference.close();
  }

  openLargeModalPopup(content) {
    this.modalReference = this.modalService.open(content, { size: 'lg' });
    this.modalReference.result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openMediumModalPopup(content) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
    };
    this.modalReference = this.modalService.open(content, ngbModalOptions);
    this.modalReference.result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    }
    else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}

