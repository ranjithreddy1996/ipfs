import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Web3Service } from 'src/app/web3.service';

@Component({
  selector: 'app-product-status',
  templateUrl: './product-status.component.html',
  styleUrls: ['./product-status.component.css']
})
export class ProductStatusComponent implements OnInit {
  matid: any;
  manufacture: boolean;
  distributer: boolean;
  retailer: boolean;
  supplier: boolean;
  productid: any;

  constructor(private modalService: NgbModal, private router: Router, private web3: Web3Service) { }

  ngOnInit() {
    this.matid = JSON.parse(localStorage.getItem('product'));

    this.web3.disreq(this.matid).then(result => {
      console.log("blockhash", result);
      this.productid=result[3]
      if (result[7] == 5) {
        this.manufacture = true
        this.distributer = false
        this.retailer = false

      }
      else if (result[7] == 11) {
        this.manufacture = false
        this.distributer = true
        this.retailer = false
      }
      // else if(result[7]==14){
      //   this.manufacture=false
      //   this.distributer=false
      //   this.retailer=true
      // }
    })
  }


  goback() {
   
  let data = JSON.parse(localStorage.getItem('trackdis'));
    if (data != null) {
      this.router.navigate(['Distributer/manu-approvals'], { replaceUrl: true });
      localStorage.removeItem('trackdis');
    }
    else {
      this.router.navigate(['Manufacture/manu-approval'], { replaceUrl: true });
    }
  }
}