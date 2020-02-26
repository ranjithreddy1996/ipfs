import { Component, OnInit, Inject } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Web3Service } from 'src/app/web3.service';
import Swal from 'sweetalert2';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
import { IPFS } from 'src/app/ipfs';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  casees: string;
  total: number;
  resultt: Array<any> = [];
  t: any;
  matidg: any;
  data: any;
  date: number;
  format:any;
  constructor(@Inject(IPFS) private ipfs, private modalService: NgbModal, private web3: Web3Service, private router: Router) { }
  modalReference: NgbModalRef;
  closeResult: string;
  addproducts: Array<any> = [];
  matid: Array<any> = [];
  mfd: Array<any> = [];
  exd: Array<any> = [];
  ngOnInit() {
    let getData = JSON.parse(localStorage.getItem('openmanufacture'));

    this.web3._contract2.getPastEvents('manufactureproducts', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
      .then((event) => {
        for (var i = 0; i < event.length; i++) {
          if (event[i].returnValues.manufactureid === getData) {
            this.addproducts.push(event[i].returnValues.productID);
            this.resultt.push(event[i].returnValues.quantity);

            // this.mfd.push(event[i].returnValues.manufacturedate);
            // this.exd.push(event[i].returnValues.expierydate);
          }
        }

        // var manufact =this.mfd
        // for (var k=0;k<manufact.length;k++){

        // }
        var matids = this.addproducts
        for (var m = 0; m < matids.length; m++) {
          // console.log(matids[m]);
          this.web3.prduct(matids[m]).then(result => {
            // console.log("matids", result[5]);
            // this.resultt.push(result[5])
            // this.total += Number.parseInt(result[5].toString());    
            this.mfd.push(new Date(result[3] * 1000).toLocaleString());
            console.log(this.mfd);
            this.exd.push(new Date(result[4] * 1000).toLocaleString());
            console.log(this.exd);

            this.matid.push(result);
          })

        }
        // console.log(this.total);

        return this.matid = [], this.addproducts = []

      });



  }
  ServiceData = {
    productID: "",
    productname: "",
    manufacturedate: "",
    expierydate: "",
    quantity: "",
    cost: ""
  }


  clear(ServiceData) {

    ServiceData.productID = "",
      ServiceData.productname = "",
      ServiceData.manufacturedate = "",
      ServiceData.expierydate = "",
      ServiceData.quantity = "",
      ServiceData.cost = ""

  }
  readURL(event) {
    const file = event.target.files[0];
    console.log(file);

    const reader = new FileReader();
    reader.readAsArrayBuffer(file)
    reader.onload = () => {
      this.kite = reader.result;
      // console.log(this.kite);

    }

  }
  public hash: string;
  kite: any;


  public async add(ServiceData) {
    console.log(ServiceData);
    let getData = JSON.parse(localStorage.getItem('openmanufacture'));

    const content = Buffer.from(this.kite);
    const filesAdded = await this.ipfs.files.add({ content });
    this.hash = filesAdded[0].hash;
    console.log(this.hash);
    this.date = (new Date(ServiceData.manufacturedate).getTime() / 1000);
    console.log(this.date);

    this.web3.manufactureproducts(getData, ServiceData.productID, ServiceData.productname, this.date, ServiceData.expierydate, ServiceData.quantity, ServiceData.cost, this.hash).then(receipt => {
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

    this.web3.inccreaseman_product(ServiceData.productID, ServiceData.quantity).then(receipt => {
      console.log(receipt);

    })


    this.modalReference.close();
    this.ngOnInit();


  }

  row(event) {
    if (event.target) {
      var tr = $(event.currentTarget).closest('tr')
      this.casees = tr.find(".case").text();
      let data = {
        "casenum": this.casees
      }
      console.log("caseeeeeeeeeeee", data)
      localStorage.setItem("product", JSON.stringify(this.casees));
      this.router.navigate(['/Manufacture/product-status'])
    }
  }

  imageget(event) {
    if (event.target) {
      var tr = $(event.currentTarget).closest('tr');
      this.matidg = tr.find(".case").text();
      console.log(this.matidg);

      this.web3.prduct(this.matidg).then(result => {
        console.log(result[8]);
        this.data = (result[8])
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


