import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Web3Service } from 'src/app/web3.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-productsdis',
  templateUrl: './add-productsdis.component.html',
  styleUrls: ['./add-productsdis.component.css']
})
export class AddProductsdisComponent implements OnInit {

  constructor(private modalService: NgbModal, private web3: Web3Service) { }
  modalReference: NgbModalRef;
  closeResult: string;
  addproducts: Array<any> = [];
  matid: Array<any> = [];
  mfd: Array<any> = [];
  exp: Array<any> = [];
  ngOnInit() {
    let getData = JSON.parse(localStorage.getItem('opendistributer'));
    console.log(getData);

    this.web3._contract2.getPastEvents('Distributer_products', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
      .then((event) => {
        for (var i = 0; i < event.length; i++) {
          if (event[i].returnValues.distributerID === getData) {
            this.addproducts.push(event[i].returnValues.productID);
          }
        }
        var matids = this.addproducts

        for (var m = matids.length - 1; m >= 0; m--) {
          console.log(matids[m]);
          this.web3.distributer_product(matids[m]).then(result => {
            console.log("matids", result);
            this.mfd.push(new Date(result[3] * 1000).toLocaleString());
            console.log(this.mfd);
            this.exp.push(new Date(result[4] * 1000).toLocaleString());
            console.log(this.exp);
            this.matid.push(result);
          })
        }
      });
  }
  ServiceData = {
    productID: "",
    productname: "",
    quantity: "",
    cost: ""
  }


  clear(ServiceData) {
    ServiceData.productID = "",
      ServiceData.productname = "",
      ServiceData.quantity = "",
      ServiceData.cost = ""
  }

  add(ServiceData) {
    console.log(ServiceData);
    let getData = JSON.parse(localStorage.getItem('opendistributer'));


    this.web3.distributer_add_products(getData, ServiceData.productID, ServiceData.productname, ServiceData.quantity, ServiceData.cost).then(receipt => {
      console.log("addded materials", receipt);
      this.ngOnInit();

    })
    this.modalReference.close();
    Swal.fire({
      text: 'Successfully Added',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }

  newadd(ServiceData) {

    this.web3.increase_dis_product(ServiceData.productID, ServiceData.quantity).then(receipt => {
      console.log(receipt);
    })
    this.modalReference.close();
    this.ngOnInit();
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


