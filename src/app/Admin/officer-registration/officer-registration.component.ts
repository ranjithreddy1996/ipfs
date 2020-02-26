import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModalOptions, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Web3Service } from 'src/app/web3.service';
import Swal from 'sweetalert2'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
//import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-officer-registration',
  templateUrl: './officer-registration.component.html',
  styleUrls: ['./officer-registration.component.css']
})
export class OfficerRegistrationComponent implements OnInit {
  modalReference: NgbModalRef;       // modal popup refrence variable
  closeResult: string; 
  officers:Array<any>=[];
  constructor( private modalService : NgbModal, private web3: Web3Service) { }


  ngOnInit() {
    this.web3._contract.getPastEvents('useradded', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
    .then((event) => {
      for (var i = 0; i < event.length; i++) {
        this.officers.push(event[i]);
      }
  });
  }
  ServiceData = {
    issuer : "",
    universityName : "",
    username : "",
    password : "",
    email : "",
    
  }
clear(ServiceData){
  ServiceData.issuer = "",
  ServiceData.universityName = "",
  ServiceData.username = "",
  ServiceData.email = "",
  ServiceData.password = ""
}

  // addingUniversity(ServiceData){  
  //   this.web3.login(ServiceData.issuer,ServiceData.departmentname,ServiceData.email,ServiceData.officername,ServiceData.phonenumber).then(receipt=>{
  //     console.log("addded university ", receipt);
  //     // this.web3.loginis(ServiceData.username).then(result=>{
  //     //   console.log("password",result[1]);
      
  //     // }
  //     //  );
  //     })
  //     this.modalReference.close();
  //     this.ngOnInit();
      
  //     Swal.fire({
  //       text: 'Successfully Added',
  //       icon: 'success',
  //       confirmButtonText: 'OK',
  //     });
  // //  });
  // }





  closing(){
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



