import { Component, OnInit, Inject } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Web3Service } from 'src/app/web3.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { IPFS } from 'src/app/ipfs';
import { Buffer } from 'buffer';


@Component({
  selector: 'app-add-materials',
  templateUrl: './add-materials.component.html',
  styleUrls: ['./add-materials.component.css']
})
export class AddMaterialsComponent implements OnInit {
  casees: string;
  matidg: string;
  data: any;
 

  constructor(@Inject(IPFS) private ipfs,private modalService : NgbModal, private web3: Web3Service,private router:Router) { }
  modalReference: NgbModalRef;      
  closeResult: string;
  addmaterial:Array<any>=[];
  matid: Array<any>=[];
  sname:any;
  ngOnInit() {
    let getData = JSON.parse(localStorage.getItem('supplier'));
      
      console.log(getData);
      
    
    this.web3._contract2.getPastEvents('SupplierAdditems', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
    .then((event) => {
      for (var i = 0; i < event.length; i++) {
        if(event[i].returnValues.supplierid ===  getData){
        this.addmaterial.push(event[i].returnValues.materialid);
        // console.log(this.addmaterial);
        
      }
    }
    var matids = this.addmaterial

 for(var m=0; m<matids.length; m++){

  // console.log(matids[m]);
  this.web3.slist(matids[m]).then(result=>{
    // console.log("matids", result);
    this.matid.push(result);
  //  console.log(this.matid[0]);
   
  })
}

  });
  return this.matid=[],this.addmaterial=[]
  }
  ServiceData = {
    supplierid : "",
    materialid : "",
    materialname : "",
    quantity : "",
    cost : ""
  }

 
clear(ServiceData){
  ServiceData.supplierid = "",
  ServiceData.materialid = "",
  ServiceData.materialname = "",
  ServiceData.quantity = "",
  ServiceData.cost = ""

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


public async add(ServiceData){  
  console.log(ServiceData);
      let getData = JSON.parse(localStorage.getItem('supplier'));
// console.log(getData);
console.log(this.kite);

const content = Buffer.from(this.kite);
const filesAdded = await this.ipfs.files.add({content});
this.hash = filesAdded[0].hash;
  console.log(this.hash );


    this.web3.supplier_add_materils(getData,ServiceData.materialid,ServiceData.materialname,ServiceData.quantity,ServiceData.cost,this.hash ).then(receipt=>{
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
  newadd(ServiceData){  
     
    this.web3.incrementsup(ServiceData.materialid,ServiceData.quantity).then(receipt=>{
console.log(receipt);

    })
        
        
        this.modalReference.close();
        this.ngOnInit();
        
      
    }
    row(event){
      if(event.target){
      var tr = $(event.currentTarget).closest('tr')
          this.casees = tr.find(".case").text(); 
          let data={
            "casenum":this.casees
          }
          console.log("caseeeeeeeeeeee",data)
          localStorage.setItem("caseno",JSON.stringify(this.casees));
          this.router.navigate(['/Supplier/material-status'])  
      }
    }
    imageget(event){
      if (event.target){
        var tr =$(event.currentTarget).closest('tr');
        this.matidg = tr.find(".case").text(); 
        console.log(this.matidg);
        
        this.web3.slist(this.matidg).then(result=>{
          console.log(result[5]);
           this.data=(result[5])
  
  
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