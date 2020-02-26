import { Component, OnInit } from '@angular/core';
import { NgbModalOptions, ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Web3Service } from 'src/app/web3.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manufacture-registration',
  templateUrl: './manufacture-registration.component.html',
  styleUrls: ['./manufacture-registration.component.css']
})
export class ManufactureRegistrationComponent implements OnInit {
  value: number;
  request1: Array<any> = [];
  registration: Array<any> = [];
  requestno: any;

  constructor(private modalService: NgbModal, private web3: Web3Service) { }
  modalReference: NgbModalRef;
  closeResult: string;
  manufacture: Array<any> = [];
  appids: any;
  matid: Array<any> = [];

  ngOnInit() {
    // this.sendToservice()

    let getData = JSON.parse(localStorage.getItem('supplier'));

    this.web3._contract.getPastEvents('Manufacture', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
      .then((event) => {
        for (var i = 0; i < event.length; i++) {
          if (event[i].returnValues.regby === getData) {
            this.manufacture.push(event[i].returnValues.id);
          }
        }
        var matids = this.manufacture
        for (var m = matids.length - 1; m >= 0; m--) {
          this.web3.getsup(matids[m]).then(result => {
            console.log("matids", result);
            if (result[0] != "") {
              this.matid.push(result);

            }
             })

        }

      });
 this.web3._contract.getPastEvents('reqregistration', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
      .then((event) => {
        for (var i = 0; i < event.length; i++) {
          if (event[i].returnValues.reqid === getData) {
            this.request1.push(event[i].returnValues.reqno);
            console.log(this.request1);
            
          }
        }
        var ids = this.request1
        for (var m = ids.length - 1; m >= 0; m--) {
          this.web3.request(ids[m]).then(result => {
            console.log("matids", result);
            if(result[8]==7){
              this.registration.push(result);
console.log(this.registration);
            }
                })

        }

      });
    return this.matid = [], this.manufacture = []



  }

 
  ServiceData = {
    compeny_name: "",
    id: "",
    mail: "",
    mobile_number: "",
    homeaddress:"",
    city: "",

  }


  clear(ServiceData) {
    ServiceData.compeny_name = "",
      ServiceData.id = "",
      ServiceData.mail = "",
      ServiceData.mobile_number = "",
      ServiceData.homeaddress = "",

      ServiceData.city = ""
  }

  register(ServiceData) {
    let getData = JSON.parse(localStorage.getItem('supplier'));

console.log(ServiceData.mobile_number+"mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");

    this.web3.register(ServiceData.compeny_name, getData, ServiceData.id, ServiceData.mail, ServiceData.mobile_number, ServiceData.homeaddress, ServiceData.city, 1).then(receipt => {
      console.log("addded supplier ", receipt);
      this.ngOnInit();

    })
    this.modalReference.close();

    Swal.fire({
      text: 'Successfully Added',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }

  delete(event) {
    if (event.target) {

      var tr = $(event.currentTarget).closest('tr');
      this.appids = tr.find(".app").text();
      this.web3.deletecandidates(this.appids).then(receipt => {
        console.log(receipt);
        this.ngOnInit();

      });
      Swal.fire({
        text: 'Successfully Deleted',
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



  added(event) {
    let getData = JSON.parse(localStorage.getItem('supplier'));
    if (event.target) {

      var tr = $(event.currentTarget).closest('tr');
      this.requestno = tr.find(".reqno").text();
      console.log(this.requestno);
      
      this.web3.request(this.requestno).then(receipt => {
        console.log(receipt);
        this.web3.register(receipt[0],getData,receipt[7],receipt[3],receipt[4],receipt[5],receipt[6],1).then(receipt => {
            console.log("addded supplier ", receipt);
      });
      Swal.fire({
        text: 'Successfully Approved',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    });


    
  }

}
}
