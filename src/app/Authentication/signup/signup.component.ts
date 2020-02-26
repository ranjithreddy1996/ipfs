import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/web3.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MatOptionSelectionChange } from '@angular/material';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  modalReference: NgbModalRef;
  data:Array<any>=[];
  complete:Array<any>=[];
  myService: any;
  constructor(private web3:Web3Service,private modalService : NgbModal,private router:Router,private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {

    this.web3._contract.getPastEvents('distributer', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
      .then((event) => {
        for (var i = 0; i < event.length; i++) {
            this.data.push(event[i].returnValues.id);
          }
          console.log(this.data);
          this.complete = this.data; 
        })
     
  }
  public async selected(event: MatOptionSelectionChange, id: string): Promise<void> {
    this.myService.onCustomerSelect.next(id);
    console.log(this.myService);
    
}

  ServiceData = {
    compeny_name : "",
    id : "",
    mail : "",
    mobile_number : "",
    homeaddress:"",
    city : "",
    username:""
  }

 
clear(ServiceData){
  ServiceData.compeny_name = "",
  ServiceData.id = "",
  ServiceData.mail = "",
  ServiceData.mobile_number = "",
  ServiceData.homeaddress="",
  ServiceData.city = "",
  ServiceData.username=""
}

request(ServiceData){  
 
    this.web3.requestform(ServiceData.compeny_name,ServiceData.id,ServiceData.mail,ServiceData.mobile_number,ServiceData.homeaddress,ServiceData.city,ServiceData.username).then(receipt=>{
      console.log("addded supplier ", receipt);
      
      })
      Swal.fire({
        text: 'Successfully Submitted',
        icon: 'success',
        confirmButtonText: 'OK',
      });
  }

  goback() {
     {
      this.router.navigate(['login'], { replaceUrl: true });
    }
  }

}
