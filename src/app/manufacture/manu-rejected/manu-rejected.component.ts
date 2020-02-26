import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Web3Service } from 'src/app/web3.service';

@Component({
  selector: 'app-manu-rejected',
  templateUrl: './manu-rejected.component.html',
  styleUrls: ['./manu-rejected.component.css']
})
export class ManuRejectedComponent implements OnInit {
  reqproduct: Array<any>=[];
  getapp: Array<any>=[];
total:any;
  constructor(private modalService : NgbModal, private web3: Web3Service) { }

  ngOnInit() {


    let getData = JSON.parse(localStorage.getItem('openmanufacture'));
console.log(getData);

    this.web3._contract2.getPastEvents('distributer_to_manufacture', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
    .then((event) => {
      this.total=0;
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
        if((result[6]==6) ){
           this.total=this.total+result[4]
          console.log(this.total);
          
       this.getapp.push(result);
      //  console.log(this.matid[0]);
        }
     })
   
   }
  });
  return this.getapp=[]
  }
  }
