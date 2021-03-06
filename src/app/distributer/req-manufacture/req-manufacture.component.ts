import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Web3Service } from 'src/app/web3.service';
import Swal from 'sweetalert2';
import * as XLSX from 'ts-xlsx';

@Component({
  selector: 'app-req-manufacture',
  templateUrl: './req-manufacture.component.html',
  styleUrls: ['./req-manufacture.component.css']
})
export class ReqManufactureComponent implements OnInit {
  file: any;
  arrayBuffer: any;
  datas: any[];
  length: any;
  alldata: Array<any> = []
  table1: boolean;
  getapp: Array<any> = []
  appids: any;
  constructor(private modalService: NgbModal, private web3: Web3Service) { }
  reqmaterial: Array<any> = [];
  modalReference: NgbModalRef;       // modal popup refrence variable
  closeResult: string;
  ngOnInit() {
    let getData = JSON.parse(localStorage.getItem('opendistributer'));
    console.log(getData);

    this.web3._contract2.getPastEvents('distributer_to_manufacture', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
      .then((event) => {
        for (var i = 0; i < event.length; i++) {
          if (event[i].returnValues.distributerID === getData) {
            this.reqmaterial.push(event[i].returnValues.requestid);
          }
        }

        console.log(this.reqmaterial);

        var matids = this.reqmaterial
        for (var m = matids.length - 1; m >= 0; m--) {
          this.web3.disreq(matids[m]).then(result => {
            console.log("matids", result);
            console.log(result[6]);
            if(result[6]==7){
            this.getapp.push(result);

            }
          })
        }
      });
      return this.getapp = [], this.reqmaterial = []
  }
  ServiceData = {

    manufactureid: "",
    productID: "",
    productname: "",
    quantity: "",


  }

  clear(ServiceData) {

    ServiceData.manufactureid = "",
      ServiceData.productID = "",
      ServiceData.productname = "",
      ServiceData.quantity = ""

  }
  oreder(ServiceData) {
    console.log(ServiceData);
    let getData = JSON.parse(localStorage.getItem('opendistributer'));

    this.web3.request_to_manufacture(ServiceData.manufactureid, getData, ServiceData.productID, ServiceData.productname, ServiceData.quantity).then(receipt => {
      console.log("addded distributer ", receipt);
      this.ngOnInit();

    })
    this.modalReference.close();

    Swal.fire({
      text: 'Successfully Added',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }

  ServiceDat = {
    requestid: "",
    quantity: "",
  }

  dclear(ServiceDat) {

    ServiceDat.requestid = "",
      ServiceDat.quantity = ""

  }
  increaseinquantity(ServiceDat) {
    console.log(ServiceDat);
    let getData = JSON.parse(localStorage.getItem('opendistributer'));

    this.web3.addreqto_manufacture(ServiceDat.requestid, getData, ServiceDat.quantity).then(receipt => {
      console.log("addded quantity ", receipt);

    })
    this.modalReference.close();
    this.ngOnInit();

    Swal.fire({
      text: 'Successfully Added',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }

  incomingfile(event) {
    this.file = event.target.files[0];
    console.log(this.file);

  }
  Viewexcel() {

    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.datas = XLSX.utils.sheet_to_json(worksheet, { raw: true })
      this.length = this.datas.length
      console.log("lllllll", this.datas)
      console.log(this.length);

      var stulist = this.datas
      for (var a = 0; a < stulist.length; a++) {
        this.alldata.push(this.datas[a])

      }
      console.log("ddddd", this.alldata[0].manufactureid);
      console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
    }
    fileReader.readAsArrayBuffer(this.file);

  }
  viewtable() {
    this.Viewexcel();
    this.table1 = true;
  }
  verify() {
    var stulist = this.datas
    for (var a = 0; a < stulist.length; a++) {
      this.alldata.push(this.datas[a])

      this.web3.request_to_manufacture(this.alldata[a].manufactureid, this.alldata[a].distributerid, this.alldata[a].productid, this.alldata[a].productname, this.alldata[a].quantity).then(receipt => {
        console.log("addded requests ", receipt);

      })

    }
    this.modalReference.close();
    this.ngOnInit();

    Swal.fire({
      text: 'Successfully Added',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }



  cancel(event) {
    if (event.target) {

      var tr = $(event.currentTarget).closest('tr');
      this.appids = tr.find(".requestid").text();
      this.web3.cancelrequestatdistributer(this.appids).then(receipt => {
        console.log(receipt);
        this.ngOnInit();
      });

      Swal.fire({
        text: ' Canceled',
        icon: 'success',
        confirmButtonText: 'OK',
      });
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



