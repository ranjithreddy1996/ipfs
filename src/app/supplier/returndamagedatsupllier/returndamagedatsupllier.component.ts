import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Web3Service } from 'src/app/web3.service';

@Component({
  selector: 'app-returndamagedatsupllier',
  templateUrl: './returndamagedatsupllier.component.html',
  styleUrls: ['./returndamagedatsupllier.component.css']
})
export class ReturndamagedatsupllierComponent implements OnInit {
  matidg: any;
  data: any;

  constructor(private modalService : NgbModal, private web3: Web3Service) { }
  return : Array<any>=[]
  modalReference: NgbModalRef; 
  closeResult: string;
     

  ngOnInit() {
    
    let getData = JSON.parse(localStorage.getItem('supplier'));
console.log(getData);

    this.web3._contract.getPastEvents('supplier_form_damage', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
    .then((event) => {
      for (var i = 0; i < event.length; i++) {
        if(event[i].returnValues.fromid ===  getData&&event[i].returnValues.toid!="empty"){

        this.return.push(event[i]);
        
      }
    }
  
  });
  }
  ServiceData = {
    materialid : ""
  }

  clear(ServiceData){
    ServiceData.materialid = ""
  
  }
  

  received(ServiceData){  
     
    this.web3.receiveddamagesupplier(ServiceData.materialid).then(receipt=>{
console.log(receipt);

    })
        
        
        this.modalReference.close();
        this.ngOnInit();
        
      
    }


    imageget(event){
      if (event.target){
        var tr =$(event.currentTarget).closest('tr');
        this.matidg = tr.find(".case").text(); 
        console.log(this.matidg);
        
        this.web3.formdamage(this.matidg).then(result=>{
          console.log(result[6]);
           this.data=(result[6])
  
  
        });
            
    }
  
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
