import { Component, OnInit, Inject } from '@angular/core';
import { IPFS } from 'src/app/ipfs';
import { NgbModal, NgbModalRef, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Web3Service } from 'src/app/web3.service';

@Component({
  selector: 'app-distributer-damaged-by-retailer',
  templateUrl: './distributer-damaged-by-retailer.component.html',
  styleUrls: ['./distributer-damaged-by-retailer.component.css']
})
export class DistributerDamagedByRetailerComponent implements OnInit {


  matidg: any;
  data: any;

  constructor(@Inject(IPFS) private ipfs, private modalService: NgbModal, private web3: Web3Service) { }
  return: Array<any> = []
  modalReference: NgbModalRef;
  closeResult: string;


  ngOnInit() {

    let getData = JSON.parse(localStorage.getItem('opendistributer'));
    console.log(getData);

    this.web3._contract3.getPastEvents('manufacture_damage', { fromBlock: 0, toBlock: 'latest' }, (error, event) => { console.log(event); })
      .then((event) => {
        for (var i = 0; i < event.length; i++) {
          if (event[i].returnValues.toid === getData) {
            this.return.push(event[i]);
          }
        }
      });
  }
  // ServiceData = {
  //   productid: "",
  // }

  // clear(ServiceData) {
  //   ServiceData.productid = ""
  // }

  // received(ServiceData) {
  //   this.web3.receiveddamagemanufacture(ServiceData.materialid).then(receipt => {
  //     console.log(receipt);
  //   })
  //   this.modalReference.close();
  //   this.ngOnInit();
  // }

  imageget(event) {
    if (event.target) {
      var tr = $(event.currentTarget).closest('tr');
      this.matidg = tr.find(".case").text();
      console.log(this.matidg);

      this.web3.manudamage(this.matidg).then(result => {
        console.log(result[6]);
        this.data = (result[6])
      });
    }
  }

  ServiceData1 = {
    damageid: "",
  }
  rclear(ServiceData1) {
    ServiceData1.damageid = ""
  }

  receiveddamagedistributer(ServiceData1){

    this.web3.receiveddamagedistributer(ServiceData1.damageid).then(receipt => {
      console.log(receipt);
    })
    this.modalReference.close();
    this.ngOnInit();
  }

  closing() {
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
