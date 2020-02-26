import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Web3Service } from 'src/app/web3.service';

@Component({
  selector: 'app-dis-rej',
  templateUrl: './dis-rej.component.html',
  styleUrls: ['./dis-rej.component.css']
})
export class DisRejComponent implements OnInit {

  constructor(private modalService : NgbModal, private web3: Web3Service) { }
  modalReference: NgbModalRef;      
  closeResult: string;
  addmaterial:Array<any>=[];
  matid: Array<any>=[];
  sname:any;
  ngOnInit() {
    let getData = JSON.parse(localStorage.getItem('openretailer'));
      
      console.log(getData);
      
    
    this.web3._contract2.getPastEvents('retailer_to_distributer', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
    .then((event) => {
      for (var i = 0; i < event.length; i++) {
        if(event[i].returnValues.distributerID ===  getData){
        this.addmaterial.push(event[i].returnValues.requestid);
        
      }
    }
    var matids = this.addmaterial

 for(var m=0; m<matids.length; m++){

  console.log(matids[m]);
  this.web3.disreq(matids[m]).then(result=>{
    console.log("matids", result);
    if(result[6]==6)
{
    this.matid.push(result);
   console.log(this.matid[0]);
}  
  })
}

  });
  return this.matid = [],this.addmaterial=[]
  }
  ServiceData = {
    materialid : "",
    
  }
clear(ServiceData){
  ServiceData.materialid = ""

}
  received(ServiceData){
    
    this.web3.receivedmat(ServiceData.materialid).then(receipt=>{
      console.log(receipt);
      
          })
        }
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


