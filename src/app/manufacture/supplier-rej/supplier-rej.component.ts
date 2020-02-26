import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Web3Service } from 'src/app/web3.service';

@Component({
  selector: 'app-supplier-rej',
  templateUrl: './supplier-rej.component.html',
  styleUrls: ['./supplier-rej.component.css']
})
export class SupplierRejComponent implements OnInit {

  constructor(private modalService : NgbModal, private web3: Web3Service) { }
  modalReference: NgbModalRef;      
  closeResult: string;
  addmaterial:Array<any>=[];
  matid: Array<any>=[];
  sname:any;
  ngOnInit() {
    let getData = JSON.parse(localStorage.getItem('openmanufacture'));
      
      console.log(getData);
      
    
    this.web3._contract2.getPastEvents('request_to_suppliers', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
    .then((event) => {
      for (var i = 0; i < event.length; i++) {
        if(event[i].returnValues.manufactureid ===  getData){
        this.addmaterial.push(event[i].returnValues.requestid);
        console.log(this.addmaterial);
        
      }
    }
    var matids = this.addmaterial

    for(var m=matids.length-1; m>=0; m--){

  console.log(matids[m]);
  this.web3.req(matids[m]).then(result=>{
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

