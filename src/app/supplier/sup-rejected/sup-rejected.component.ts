import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Web3Service } from 'src/app/web3.service';

@Component({
  selector: 'app-sup-rejected',
  templateUrl: './sup-rejected.component.html',
  styleUrls: ['./sup-rejected.component.css']
})
export class SupRejectedComponent implements OnInit {

  reqproduct: Array<any>=[];
  getapp: Array<any>=[];

  constructor(private modalService : NgbModal, private web3: Web3Service) { }

  ngOnInit() {


    let getData = JSON.parse(localStorage.getItem('supplier'));
console.log(getData);

    this.web3._contract2.getPastEvents('request_to_suppliers', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
    .then((event) => {
      for (var i = 0; i < event.length; i++) {
        if(event[i].returnValues.supplierid ===  getData){

        this.reqproduct.push(event[i].returnValues.requestid);
        console.log(this.reqproduct);
        
      }
    }
    var matids = this.reqproduct
    for(var m=matids.length-1; m>=0; m--){
      this.web3.req(matids[m]).then(result=>{
       console.log("matids", result);
        console.log(result[5]);
        if((result[6]==6) ){
       this.getapp.push(result);
      //  console.log(this.matid[0]);
        }
     })
   
   }
  });
  return this.getapp=[]
  }
  }