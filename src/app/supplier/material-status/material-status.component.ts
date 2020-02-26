import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Web3Service } from 'src/app/web3.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-material-status',
  templateUrl: './material-status.component.html',
  styleUrls: ['./material-status.component.css']
})
export class MaterialStatusComponent implements OnInit {
  matid: any;
  supplier: boolean;
  manufacture: boolean;
  id: any;
  mcompany: any;
  manuid: any;
  mobno: any;
  mcity: any;
  scompany: any;
  sid: any;
  smobno: any;
  scity: any;

  constructor(private modalService: NgbModal, private router: Router, private web3: Web3Service) { }

  ngOnInit() {
    this.matid = JSON.parse(localStorage.getItem('caseno'));
    this.web3.req(this.matid).then(result => {
      console.log("blockhash", result);
      this.id = result[3];
      this.web3.getsup(result[2]).then(result1 =>{
        console.log(result1);
        this.scompany=result1[0]
                this.sid=result1[2]
                this.smobno=result1[5]
                this.scity=result1[7]
              })
              this.web3.getsup(result[1]).then(result2 =>{
                console.log(result2);
                this.mcompany=result2[0]
                this.manuid=result2[2]
                this.mobno=result2[5]
                this.mcity=result2[7]
                      })
      if (result[7] == 8) {
        this.supplier = true
        this.manufacture = false
      }
      else if (result[7] == 9) {
        this.supplier = true
        this.manufacture = true
      }
    })
  }



  goback() {
    let data = JSON.parse(localStorage.getItem('trackatmanu'));
    if (data != null) {
      this.router.navigate(['Manufacture/add-materialsmanu'], { replaceUrl: true });
      localStorage.removeItem('trackatmanu');
    }
    else {
      this.router.navigate(['Supplier/sup-approvallist'], { replaceUrl: true });
    }
  }
}
