import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/web3.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manu-approval',
  templateUrl: './manu-approval.component.html',
  styleUrls: ['./manu-approval.component.css']
})
export class ManuApprovalComponent implements OnInit {
  reqproduct: Array<any>=[];
  getapp: Array<any>=[];
  casees: string;
  matidg: any;
  data: Array<any>=[];
  time: string;
  display: string;

  constructor(private modalService : NgbModal, private web3: Web3Service,private router:Router) { }

  ngOnInit() {


    let getData = JSON.parse(localStorage.getItem('openmanufacture'));
console.log(getData);

    this.web3._contract2.getPastEvents('distributer_to_manufacture', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
    .then((event) => {
      for (var i = 0; i < event.length; i++) {
        if(event[i].returnValues.manufactureid ===  getData){

        this.reqproduct.push(event[i].returnValues.requestid);
        console.log(this.reqproduct);
        
      }
    }
    var matids = this.reqproduct
    for(var m=matids.length-1; m>=0; m--){
      this.web3.removeapp(matids[m]).then(result=>{
       console.log("matids", result);
        console.log(result[6]);
        if((result[6]==5) ){
       this.getapp.push(result);
      //  console.log(this.matid[0]);
        }
     })
   
   }
  });
  return this.getapp=[]
  }
  
  row(event){
    if(event.target){
    var tr = $(event.currentTarget).closest('tr')
        this.casees = tr.find(".requestid").text(); 
        let data={
          "casenum":this.casees
        }
        console.log("caseeeeeeeeeeee",data)
        localStorage.setItem("product",JSON.stringify(this.casees));
        this.router.navigate(['/Manufacture/product-status'])  
    }
  }
  
  get(event){
    if (event.target){
      var tr =$(event.currentTarget).closest('tr');
      this.matidg = tr.find(".requestid").text(); 
      console.log(this.matidg);
      
      this.web3.manuinvoice(this.matidg).then(result=>{
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


