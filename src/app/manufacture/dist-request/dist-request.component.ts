import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Web3Service } from 'src/app/web3.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dist-request',
  templateUrl: './dist-request.component.html',
  styleUrls: ['./dist-request.component.css']
})
export class DistRequestComponent implements OnInit {
  reqproduct: Array<any>=[];
  appids: any;
  app: string;
  dec: any;
  getapp: Array<any>=[];
  apps: any;
  supid: any;
  manuid: any;
  matid: any;
  matname: any;
  qty: any;
  constructor(private modalService : NgbModal, private web3: Web3Service) { }

  ngOnInit() {
    let getData = JSON.parse(localStorage.getItem('openmanufacture'));

    this.web3._contract2.getPastEvents('distributer_to_manufacture', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
    .then((event) => {
      for (var i = 0; i < event.length; i++) {
        if(event[i].returnValues.manufactureid ===  getData){

        this.reqproduct.push(event[i].returnValues.requestid);
        console.log(this.reqproduct);
        
      }
    }
    var matids = this.reqproduct
    for(var m=0; m<matids.length; m++){
     this.web3.removeapp(matids[m]).then(result=>{
       console.log("matids", result);
        console.log(result[5]);
        if((result[6]==7) ){
       this.getapp.push(result);
      //  console.log(this.matid[0]);
        }
     })
   
   }
  });
  return this.getapp=[]
  }
  approve(event){
    if(event.target){

    var tr = $(event.currentTarget).closest('tr');
    this.appids = tr.find(".requestid").text(); 
    this.app = tr.find(".productid").text(); 
    this.apps = tr.find(".quantity").text(); 

    this.web3.approvestatus_mun(this.appids,this.app,this.apps).then(receipt=>{      
      console.log(receipt);
      
    let raw1 = JSON.parse(localStorage.getItem('erroratmanufacture'));
    console.log(raw1);
    
        if(raw1!=null){
          Swal.fire({ 
            text: 'Not Enough Quantity OR Product Not Available',
            icon: 'error',
            confirmButtonText: 'OK',
          });
          localStorage.removeItem('erroratmanufacture');
    
        }
        else{
          Swal.fire({
            text: 'Successfully Approved',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        }
        this.ngOnInit();

      });

      }
      
  }
  reject(event){
    if(event.target){

    var tr = $(event.currentTarget).closest('tr');
    this.appids = tr.find(".requestid").text(); 
    this.web3.rejectstatus_man(this.appids).then(receipt=>{      
      console.log(receipt);
      
    });

    Swal.fire({
      text: 'Successfully Rejected',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }
  }
  // decrement(event){
  //   if(event.target){

  //   var tr = $(event.currentTarget).closest('tr');
  //   this.appids = tr.find(".appid").text(); 
  //   this.dec = tr.find(".qdec").text(); 
  //   console.log(this.dec);
    
  //   this.web3.decreasesup(this.appids,this.dec).then(receipt=>{      
  //     console.log(receipt);
      
  //   });
   
  // }
  // }

  invoice(event){
    if (event.target){
      var tr =$(event.currentTarget).closest('tr');
      this.supid = tr.find(".requestid").text(); 
      this.manuid = tr.find(".distributerid").text();  
      this.matid = tr.find(".productid").text(); 
    this.matname = tr.find(".productname").text();  
    this.qty = tr.find(".quantity").text(); 
    let getData = JSON.parse(localStorage.getItem('openmanufacture'));

  this.web3.manufactureinvoice( this.supid,getData,this.manuid,  this.matid,this.matname, this.qty).then(receipt=>{
    console.log(receipt);
    
  });
    }
  }
}
