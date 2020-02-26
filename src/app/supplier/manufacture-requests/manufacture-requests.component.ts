import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Web3Service } from 'src/app/web3.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manufacture-requests',
  templateUrl: './manufacture-requests.component.html',
  styleUrls: ['./manufacture-requests.component.css']
})
export class ManufactureRequestsComponent implements OnInit {
  
  reqmaterial:Array<any>=[];
  appids: any;
  app: any;
  dec: any;
  supid: any;
  manuid: string;
  matid: string;
  matname: any;
  qty: any;
  data:Array<any>=[];
  getapp:Array<any>=[];
  display: any;
  matidg:any;
  time:any;
  req: any;
  errObj: any;
  er: string;
  angular: any;
  constructor(private modalService : NgbModal, private web3: Web3Service) { }
  ngOnInit() {
    let getData = JSON.parse(localStorage.getItem('supplier'));

    this.web3._contract2.getPastEvents('request_to_suppliers', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
    .then((event) => {
      for (var i = 0; i < event.length; i++) {
        if(event[i].returnValues.supplierid ===  getData){

        this.reqmaterial.push(event[i].returnValues.requestid);
      }
      console.log(this.reqmaterial);
      
    }
    var matids = this.reqmaterial
    for (var m = matids.length - 1; m >= 0; m--) {
      this.web3.req(matids[m]).then(result=>{
       console.log("matids", result);
        console.log(result[6]);
        if((result[6]!=5 &&result[6]!=6)){
       this.getapp.push(result);
      //  console.log(this.matid[0]);
        }
      //  else if((result[5]!="6")){
      //     this.getapp.push(result);
      //    //  console.log(this.matid[0]);
      //      }
     })
   
   }
  });
  return this.getapp=[] ,this.reqmaterial=[]
  
  }
  approve(event){
    if(event.target){

    var tr = $(event.currentTarget).closest('tr');
  console.log(tr);
  
    this.appids = tr.find(".materialid").text(); 
    this.app = tr.find(".quantity").text(); 
    this.req = tr.find(".requestid").text(); 

    this.web3.approvestatus_sup(this.req,this.appids,this.app).then(result=>{      
      console.log(result);
      

      if(result==="error"){
        Swal.fire({
          text: 'Not Enough Quantity',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        localStorage.removeItem('error');

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
    this.web3.rejectstatus_sup(this.appids).then(receipt=>{      
      console.log(receipt);
      this.ngOnInit();

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
  //   this.appids = tr.find(".matid").text(); 
  //   this.dec = tr.find(".que").text();     
  //   this.web3.decreasesup(this.appids,this.dec).then(receipt=>{      
  //     console.log(receipt);
      
  //   });
   
  // }
  // }
  invoice(event){
    if (event.target){
      var tr =$(event.currentTarget).closest('tr');
      this.supid = tr.find(".requestid").text(); 
      this.manuid = tr.find(".manufactureid").text();  
      this.matid = tr.find(".materialid").text(); 
    this.matname = tr.find(".materialname").text();  
    this.qty = tr.find(".quantity").text(); 
    let getData = JSON.parse(localStorage.getItem('supplier'));

  this.web3.invoice( this.supid,getData,this.manuid,  this.matid,this.matname, this.qty).then(receipt=>{
    console.log(receipt);
    
  });
    }
  }
  get(event){
    if (event.target){
      var tr =$(event.currentTarget).closest('tr');
      this.matidg = tr.find(".requestid").text(); 
      console.log(this.matidg);
      
      this.web3.ginvoice(this.matidg).then(result=>{
        console.log(result);
        this.data.push(result)
        this.time=new Date().toLocaleString();
console.log(this.time);

      });
      this.openModal();
          
  }
  return this.data = []

  }
  
  onCloseHandled(){
    this.display='none'
  }

  openModal(){
    this.display='block';
  }


}