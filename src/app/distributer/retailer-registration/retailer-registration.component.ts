import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Web3Service } from 'src/app/web3.service';
import Swal from 'sweetalert2';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-retailer-registration',
  templateUrl: './retailer-registration.component.html',
  styleUrls: ['./retailer-registration.component.css']
})
export class RetailerRegistrationComponent implements OnInit {
  requestno: any;
  Id: any;
  request: Array<any> = [];
  registration: Array<any> = [];

  constructor(private modalService: NgbModal, private web3: Web3Service,private http: HttpService) { }
  modalReference: NgbModalRef;
  closeResult: string;
  rlist: Array<any> = [];
  matid: Array<any> = [];
  appids: any;
  ngOnInit() {
    let getData = JSON.parse(localStorage.getItem('opendistributer'));

    this.web3._contract.getPastEvents('Retailer', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
      .then((event) => {

        for (var i = 0; i < event.length; i++) {
          if (event[i].returnValues.regby === getData) {

            this.rlist.push(event[i].returnValues.id);
          }
        }
        var matids = this.rlist
        for (var m = matids.length - 1; m >= 0; m--) {
          this.web3.getsup(matids[m]).then(result => {
            console.log("matids", result);
            console.log(result[0]);
            if (result[0] != "") {
              this.matid.push(result);
              console.log(this.matid[0]);
            }
          })

        }
      });
      this.web3._contract.getPastEvents('reqregistration', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
      .then((event) => {
        for (var i = 0; i < event.length; i++) {
          if (event[i].returnValues.reqid ===   getData) {
            this.request.push(event[i].returnValues.reqno);
            console.log(this.request);
            
          }
        }
        var ids = this.request
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

    return this.matid = [], this.rlist = []
  }
  ServiceData = {
    compeny_name: "",
    id: "",
    password: "",
    mail: "",
    mobile_number: "",
    homeaddress: "",
    city: "",
    status: "",

  }

  clear(ServiceData) {
    ServiceData.compeny_name = "",
      ServiceData.id = "",
      ServiceData.password = "",
      ServiceData.mail = "",
      ServiceData.mobile_number = "",
      ServiceData.homeaddress = "",
      ServiceData.city = ""
  }

  register(ServiceData) {
    console.log(ServiceData);
    let getData = JSON.parse(localStorage.getItem('opendistributer'));

    this.web3.register(ServiceData.compeny_name, getData, ServiceData.id, ServiceData.mail, ServiceData.mobile_number, ServiceData.homeaddress, ServiceData.city, 3).then(receipt => {
      console.log("addded distributer ", receipt);

      this.web3.getsup(ServiceData.id).then(result => {
        let user = {
          email: result[4],
          id: ServiceData.id,
          pass: result[3],
        }

        this.http.sendEmail("http://localhost:3000/sendmail", user).subscribe(
          data => {
            let res: any = data;
            console.log(
              `👏 > 👏 > 👏 > 👏 ${user.id} is successfully register and mail has been sent and the message id is ${res.messageId}`
            );
          },
          err => {
            console.log(err);
          }, () => {
          }
        );
        //     let sms = {
        //       number: ServiceData.mobile_number, 
        //   id: ServiceData.id,
        //  pass: result[3],

        //   }
        //   this.http.sendSmss("http://localhost:4000/sendsms", sms).subscribe(
        //   smsdata => {
        //     let res:any = smsdata; 
        //     console.log('successfully registered and sms has been sent');
        //   },
        //   err => {
        //     console.log(err);
        //   },() => {
        //   }
        //   );
        this.ngOnInit();

      })

    this.modalReference.close();

    Swal.fire({
      text: 'Successfully Added',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  })

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

  added(event) {
    let getData = JSON.parse(localStorage.getItem('opendistributer'));
    if (event.target) {

      var tr = $(event.currentTarget).closest('tr');
      this.requestno = tr.find(".reqno").text();
      console.log(this.requestno);

      this.web3.request(this.requestno).then(receipt => {
        console.log(receipt);
        this.web3.register(receipt[0], getData, receipt[7], receipt[3], receipt[4], receipt[5], receipt[6], 1).then(receipt => {
          console.log("addded  ", receipt);
        });
        Swal.fire({
          text: 'Successfully Approved',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      });
    }
  }

  reject(event) {
    if (event.target) {

      var tr = $(event.currentTarget).closest('tr');
      this.requestno = tr.find(".reqno").text();
      console.log(this.requestno);

      this.web3.rejectreqform(this.requestno).then(receipt => {
        console.log(receipt);

        Swal.fire({
          text: 'Successfully Rejected',
          icon: 'success',
          confirmButtonText: 'OK',
        });
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
