import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';
import { Web3Service } from 'src/app/web3.service';
import { NgbModal, NgbModalRef, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  supplierlogin: any;
  manufacturelogin: any;
  adminlogin: any;
  distributerlogin: any;
  retailerlogin: any;
  today: number = Date.now();
  isCollapsed: boolean;
  isCollapse: boolean;
  isCollapsedsupplier:boolean;
  isCollapsemanu:boolean;
  isCollapsedistributer:boolean;
  isCollapsemanuproducts:boolean;
  dropdown: false;
  admin: any;
  supplier: any;
  manufacture: any;
  distributer: any;
  retailer: any;
  data: number;
  noti: boolean;
  constructor(private router: Router, private web3: Web3Service, private modalService: NgbModal) {
    setInterval(() => {this.today = Date.now()}, 1);

   }

   

  ngOnInit(){
    this.noti = true;
this.data=25;
    this.admin = JSON.parse(localStorage.getItem('admin'));
    this.supplier = JSON.parse(localStorage.getItem('supplier'));
    this.manufacture = JSON.parse(localStorage.getItem('openmanufacture'));
    this.distributer = JSON.parse(localStorage.getItem('opendistributer'));
    this.retailer = JSON.parse(localStorage.getItem('openretailer'));
    

    this.adminlogin=localStorage.getItem("openadmin");
    this.supplierlogin = localStorage.getItem("opensupplier");
    this.manufacturelogin = localStorage.getItem("openmanufacture");
    this.distributerlogin = localStorage.getItem("opendistributer");
    this.retailerlogin = localStorage.getItem("openretailer");
     this.isCollapsed = true;
     this.isCollapse = true;
this.isCollapsedsupplier=true;
this.isCollapsemanu=true;
this.isCollapsedistributer=true;
this.isCollapsemanuproducts=true;
    // this.adminlogin=true;
    // this.officerlogin = true;
    // this.parentlogin = true;
    // this.guardianlogin = true;
  }


  routetoapproved(){
    this.router.navigateByUrl('/Manufacture/manu-approval');
  }
  routetorejected(){
    this.router.navigateByUrl('/Manufacture/manu-rejected');

  }
  routetosupapproved(){
    this.router.navigateByUrl('/Manufacture/add-materialsmanu');
  }
  routetosuprejected(){
    this.router.navigateByUrl('/Manufacture/supplier-rej');

  }
  damagedatform(){
    this.router.navigateByUrl('/Supplier/damagedatsupllier');
  }
  returndamages(){
    this.router.navigateByUrl('/Supplier/returndamagedatsupllie');

  }

  manufacturedamageform(){
    this.router.navigateByUrl('/Manufacture/manu-damaged-in-form');

  }
  manufacturereturntosupplier(){
    this.router.navigateByUrl('/Manufacture/manu-damaged-to-supllier');
  }
  manufacturereturnedbydistributer(){
    this.router.navigateByUrl('/Manufacture/distributer-damaged-to-manu');

  }

  distributerdamageform(){
    this.router.navigateByUrl('/Distributer/distributer-damaged-foam');

  }
  distributerreturntomanufacture(){
    this.router.navigateByUrl('/Distributer/distributer-damaged-to-manufacture');
  }
  distributerreturnbyretailer(){
    this.router.navigateByUrl('/Distributer/distributer-damaged-by-retailer');

  }
  manufactureapproved(){
    this.router.navigateByUrl('/Distributer/manu-approvals');
  }
  manufacturerejected(){
    this.router.navigateByUrl('/Distributer/manu-rej');

  }
  approvedbydistributer(){
    this.router.navigateByUrl('/Distributer/dis-approvallist');
  }
  rejectedbdistributer(){
    this.router.navigateByUrl('/Distributer/dis-rejected');

  }
  // routetoOD(){
  //   this.router.navigateByUrl('/University/generate-od');

  // }
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }


  
  
  ServiceData = {
    eid: "",
   
    epassword: "",
    newpassword: ""
   }
   clear(ServiceData) {
      ServiceData.eid = "",
      ServiceData.epassword = "",
      ServiceData.newpassword = ""
   }
  update_admin_password(Servicedata){
this.web3.updatepassword(Servicedata.eid,Servicedata.epassword,Servicedata.newpassword).then(receipt=>{
  console.log(receipt);
  
  let raw = JSON.parse(localStorage.getItem('aperror'));
  console.log(raw);
  
        if(raw!=null){
          Swal.fire({
            text: 'Invalid Credentials',
            icon: 'error',
            confirmButtonText: 'OK',
          });
          localStorage.removeItem('aperror');
  
        }
        else{
          Swal.fire({
            text: 'Successfully Updated',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        }
})
  }

  ServiceDat = {
    id: "",
   
    password: "",
    newpassword: ""
   }
   uclear(ServiceDat) {
    ServiceDat.id = "",
    ServiceDat.epassword = "",
    ServiceDat.newpassword = ""
   }
  update_user_password(ServiceDat){
    this.web3.updatepasswordcandidate(ServiceDat.id,ServiceDat.password,ServiceDat.newpassword).then(receipt=>{
      console.log(receipt);
      let candidate = JSON.parse(localStorage.getItem('cperror'));
  console.log(candidate);
  
        if(candidate!=null){
          Swal.fire({
            text: 'Invalid Credentials',
            icon: 'error',
            confirmButtonText: 'OK',
          });
          localStorage.removeItem('cperror');
  
        }
        else{
          Swal.fire({
            text: 'Successfully Updated',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        }
      
    })
      }



      closing(){
        this.modalReference.close();
       }
       
       
         modalReference: NgbModalRef;    
         closeResult: string;        
         openLargeModalPopup(content) {
           this.modalReference = this.modalService.open(content, { size: 'xl' });
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

notification(){
  if(this.noti == false){
    this.noti = true;
  }
  else{
    this.noti = false;
  }
}
}
