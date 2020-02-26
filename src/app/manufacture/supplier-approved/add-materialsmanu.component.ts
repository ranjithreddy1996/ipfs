import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Web3Service } from 'src/app/web3.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-add-materialsmanu',
  templateUrl: './add-materialsmanu.component.html',
  styleUrls: ['./add-materialsmanu.component.css']
})
export class AddMaterialsmanuComponent implements OnInit {
  appids: any;

  constructor(private modalService: NgbModal, private web3: Web3Service, private router: Router) { }
  modalReference: NgbModalRef;
  closeResult: string;
  addmaterial: Array<any> = [];
  matid: Array<any> = [];
  sname: any;
  matidg: any;
  data: Array<any> = [];
  time: string;
  display: string;
  casees: any;
  ngOnInit() {
    let getData = JSON.parse(localStorage.getItem('openmanufacture'));

    console.log(getData);
    this.loadStripe();


    this.web3._contract2.getPastEvents('request_to_suppliers', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
      .then((event) => {
        for (var i = 0; i < event.length; i++) {
          if (event[i].returnValues.manufactureid === getData) {
            this.addmaterial.push(event[i].returnValues.requestid);
            console.log(this.addmaterial);
          }
        }
        var matids = this.addmaterial
        for (var m = 0; m < matids.length; m++) {
          this.web3.req(matids[m]).then(result => {
            console.log("matids", result);
            if (result[6] == 5) {
              this.matid.push(result);
            }
          })
        }
      });
    return this.matid = [], this.addmaterial = []
  }

  ServiceData = {
    requestid: "",
  }
  clear(ServiceData) {
    ServiceData.requestid= ""
  }
  received(ServiceData) {

    this.web3.receivedmat(ServiceData.requestid).then(receipt => {
      console.log(receipt);
    })
    this.modalReference.close();
  }
  receivedside(event) {
    if (event.target) {

      var tr = $(event.currentTarget).closest('tr');
      this.appids = tr.find(".requestid").text();
      this.web3.receivedmat(this.appids).then(receipt => {

      });

      Swal.fire({
        text: 'Received ',
        icon: 'success'
      });
    }
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
      var nav = "caseatmanu";
      localStorage.setItem("trackatmanu", JSON.stringify(nav))
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


  get(event) {
    if (event.target) {
      var tr = $(event.currentTarget).closest('tr');
      this.matidg = tr.find(".requestid").text();
      console.log(this.matidg);

      this.web3.ginvoice(this.matidg).then(result => {
        console.log(result);
        this.data.push(result)

        this.time = new Date().toLocaleString();
        console.log(this.time);

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



  //   printComponent() {
  //     let printContents = document.getElementById('pdff2').innerHTML;
  //     let originalContents = document.body.innerHTML;

  //     document.body.innerHTML = printContents;
  //     window.print();


  //     document.body.innerHTML = originalContents;

  // }


  pay(event) {
    if (event.target) {
      var tr = $(event.currentTarget).closest('tr');
      this.matidg = tr.find(".requestid").text();

      this.web3.ginvoice(this.matidg).then(result => {
        console.log(result[7]);



        var handler = (<any>window).StripeCheckout.configure({

          key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Token Created!!');
          }
        });
        console.log(handler);

        handler.open({
          name: 'Payment',
          description: '2 widgets',
          amount: result[7] * 100

        });
      });
    }

  }

  handler: any = null;

  loadStripe() {

    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }

      window.document.body.appendChild(s);
    }
  }

}

