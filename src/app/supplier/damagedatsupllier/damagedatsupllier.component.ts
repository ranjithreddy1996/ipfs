import { Component, OnInit, Inject } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Web3Service } from 'src/app/web3.service';
import Swal from 'sweetalert2';
import { IPFS } from 'src/app/ipfs';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-damagedatsupllier',
  templateUrl: './damagedatsupllier.component.html',
  styleUrls: ['./damagedatsupllier.component.css']
})
export class DamagedatsupllierComponent implements OnInit {
  reqproduct: Array<any>=[];
  getapp: Array<any>=[];
total:any;
modalReference: NgbModalRef;      
  closeResult: string;
  matidg: any;
  data: any;
  constructor(@Inject(IPFS) private ipfs,private modalService : NgbModal, private web3: Web3Service) { }

  ngOnInit() {


    let getData = JSON.parse(localStorage.getItem('supplier'));
console.log(getData);

    this.web3._contract.getPastEvents('supplier_form_damage', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
    .then((event) => {
      for (var i = 0; i < event.length; i++) {
        if(event[i].returnValues.fromid ===  getData&&event[i].returnValues.toid==="empty"){

        this.reqproduct.push(event[i]);
        
      }
    }
  
  });
  }



ServiceData = {
    materialid : "",
    damage : "",
    quantity : ""
  }

 
clear(ServiceData){
  ServiceData.materialid = "",
  ServiceData.damage = "",
  ServiceData.quantity = ""

}
readURL(event) {
  const file=event.target.files[0];
  // console.log(file);
  
  const reader = new FileReader();
   reader.readAsArrayBuffer(file)
   reader.onload = () => {
    this.kite=reader.result;
    // console.log(this.kite);
    
   }
  
}
public hash: string;
kite:any;


public async adddamagesup(ServiceData){  
  console.log(ServiceData);
      let getData = JSON.parse(localStorage.getItem('supplier'));
// console.log(getData);
console.log(this.kite);

const content = Buffer.from(this.kite);
const filesAdded = await this.ipfs.files.add({content});
this.hash = filesAdded[0].hash;
  console.log(this.hash );



    this.web3.supplier_form_damage(getData,"empty",ServiceData.materialid,ServiceData.damage,ServiceData.quantity,this.hash ).then(receipt=>{
      console.log("addded materials", receipt);
      this.ngOnInit();

      })
      this.modalReference.close();
      
      Swal.fire({
        text: 'Successfully Added',
        icon: 'success',
        confirmButtonText: 'OK',
        
      });

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
