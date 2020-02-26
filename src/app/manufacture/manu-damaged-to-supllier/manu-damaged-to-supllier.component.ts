import { Component, OnInit, Inject } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Web3Service } from 'src/app/web3.service';
import { IPFS } from 'src/app/ipfs';
import Swal from 'sweetalert2';
import { Buffer } from 'buffer';


@Component({
  selector: 'app-manu-damaged-to-supllier',
  templateUrl: './manu-damaged-to-supllier.component.html',
  styleUrls: ['./manu-damaged-to-supllier.component.css']
})
export class ManuDamagedToSupllierComponent implements OnInit {

  matidg: any;
  data: any;

  constructor(@Inject(IPFS) private ipfs,private modalService : NgbModal, private web3: Web3Service) { }
  return : Array<any>=[]
  modalReference: NgbModalRef; 
  closeResult: string;
     

  ngOnInit() {
    
    let getData = JSON.parse(localStorage.getItem('openmanufacture'));
console.log(getData);

    this.web3._contract3.getPastEvents('supplier_form_damage', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
    .then((event) => {
      for (var i = 0; i < event.length; i++) {
        if(event[i].returnValues.toid ===  getData){

        this.return.push(event[i]);
        
      }
    }
  
  });
  }
  ServiceData = {
    supplierid : "",
    materialid : "",
    damage : "",
    quantity : ""
  }

  clear(ServiceData){
    ServiceData.supplierid = "",
    ServiceData.materialid = "",
    ServiceData.damage = "",
    ServiceData.quantity = ""
  
  }
  

  readURL(event) {
    const file=event.target.files[0];
    console.log(file);
    
    const reader = new FileReader();
     reader.readAsArrayBuffer(file)
     reader.onload = () => {
      this.kite=reader.result;
      // console.log(this.kite);
      
     }
    
  }
  public hash: string;
  kite:any;
  
  
  public async send_damage_to_supplier(ServiceData){  
    console.log(ServiceData);
        let getData = JSON.parse(localStorage.getItem('openmanufacture'));
  // console.log(getData);
  console.log(this.kite);
  
  const content = Buffer.from(this.kite);
  const filesAdded = await this.ipfs.files.add({content});
  this.hash = filesAdded[0].hash;
    console.log(this.hash );
  
  
  
      this.web3.supplier_form_damage(ServiceData.supplierid,getData,ServiceData.materialid,ServiceData.damage,ServiceData.quantity,this.hash ).then(receipt=>{
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
