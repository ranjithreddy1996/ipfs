import { Injectable } from '@angular/core';
import { Address } from 'cluster';
import { resolve } from 'url';


const Web3 = require('web3');
const contractAbi = require("./abi-contract.json");
const contractAbi2 = require("./abi-contract2.json");
const contractAbi3 = require("./abi-contract3.json");

const ethereum = window.ethereum;
const contractAddress = "0xf7a277c5b9bdc55fa79f09ac5930891a9d228b7a";
const contractAddress2 = "0x2a75981e85dbd36e503ec16546911d7210c95a5f";
const contractAddress3 = "0xf89a0aec51e806cee0f59336d7f56c6e3a793ecb";

declare let window: any
declare let require: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  data: any;
  _contract2: any;
  _contract3: any;


  _web3: any;
  _contract: any;
  account: string;
  _array: Array<any>;
  methods: any;
  isloggedin: boolean;

  constructor() {
    this.initializeWeb3()
  }

  async initializeWeb3() {
    if (typeof window.web3 === 'undefined') {

      this._web3 = new Web3(window.web3.currentProvider);
      this._contract = await new this._web3.eth.Contract(contractAbi, contractAddress);
      this._contract2 = await new this._web3.eth.Contract(contractAbi2, contractAddress2);
      this._contract3 = await new this._web3.eth.Contract(contractAbi3, contractAddress3);
      this._web3.eth.getAccounts((err, result) => {
        console.log(result[0]);
        this.account = result[0];
        console.log(this.account);
        console.log(this._contract.methods);


      });
      console.log('metamask found!!!!!!!!!!!!!!!!!!!!');
    }

    else if (typeof window.web3 !== 'undefined') {
      this._web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
      this._contract = await new this._web3.eth.Contract(contractAbi, contractAddress);
      this._contract2 = await new this._web3.eth.Contract(contractAbi2, contractAddress2);
      this._contract3 = await new this._web3.eth.Contract(contractAbi3, contractAddress3);


      this._web3.eth.getAccounts((err, result) => {
        //console.log(result[0]);
        this.account = result[0];
        console.log(this.account);
      });
      console.log('Connected on Ganache LocalHost');
    }

  }


  //===================ADMIN=============================



  public async register(compeny_name: string, regby: string, id: string, mail: string, mobile_number: string, homeaddress: string, city: string, status: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract.methods.register(compeny_name, regby, id, mail, mobile_number, homeaddress, city, status).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }

  public async requestform(compeny_name: string, reqid: string, mail: string, mobile_number: string, haddress: string, city: string, username: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract.methods.reqform(compeny_name, reqid, mail, mobile_number, haddress, city, username).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }

  public async rejectreqform(reqid: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract.methods.rejectreqform(reqid).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }
  public async request(reqno: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract.methods.request(reqno).call().then(function (result) {
        return resolve(result);
      });
    }) as Promise<any>;
  }


  public async deleteuser(_id: string, _eadmin: string, _epassword: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract.methods.deleteuser(_id, _eadmin, _epassword).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }

  public async updatepassword(_id: string, _eadmin: number, _epassword: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract.methods.updatepassword(_id, _eadmin, _epassword).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);

        localStorage.setItem("aperror", JSON.stringify(error))

        return resolve(error);

      })
    }) as Promise<any>;
  }

  public async transferownership(_eadmin: string, _epassword: number, _newadmin: string, _ephoneno: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract.methods.transferownership(_eadmin, _epassword, _newadmin, _ephoneno).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }
  public async getsup(_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract.methods.rr(_id).call().then(function (result) {
        return resolve(result);
      });
    }) as Promise<any>;
  }
  public async deletecandidates(_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract.methods.deletecandidates(_id).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }

  public async cancelorder(_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.cancelrequest(_id).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }


  public async updatepasswordcandidate(_id: string, _password: number, _newpassword: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract.methods.updatepasswordcandidate(_id, _password, _newpassword).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
        localStorage.setItem("cperror", JSON.stringify(error))

        return resolve(error);
      })
    }) as Promise<any>;
  }

  //-------------------scm----------------------
  public async login(_id: string, _epassword: number, ): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract.methods.login(_id, _epassword).call().then(function (result) {
        return resolve(result);
      });
    }) as Promise<any>;
  }
  public async invoice(requestid: number, _from1: string, _to: string, _id: string, _name: string, _quantity: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.addinvoice(requestid, _from1, _to, _id, _name, _quantity).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }
  public async ginvoice(requestid: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.ginvoice(requestid).call().then(function (result) {
        return resolve(result);

      });

    }) as Promise<any>;
  }
  //----------------------------SUPPLIER-----------------------------

  /// supplier add materials
  public async supplier_add_materils(_supplierid: string, _materialid: string, _materialname: string, _quantity: number, _cost: number, _image: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.supplier_add_materils(_supplierid, _materialid, _materialname, _quantity, _cost, _image).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }
  public async slist(_materialid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.slist(_materialid).call().then(function (result) {
        console.log(result);
        return resolve(result);
      });
    }) as Promise<any>;
  }
  public async incrementsup(_materialid: string, _quantity: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.incrementsup(_materialid, _quantity).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }
  public async approvestatus_sup(requestid: number, _materialid: string, _quantity: number): Promise<any> {
    return new Promise((resolve, error) => {
      this._contract2.methods.approvestatus_sup(requestid, _materialid, _quantity).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt, error) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(` ${error}`);
        var a = "error";

        return resolve(a);
      })
    }) as Promise<any>;
  }

  public async rejectstatus_sup(requestid: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.rejectstatus_sup(requestid).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }
  public async req(requestid: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.req(requestid).call().then(function (result) {
        return resolve(result);
      });
    }) as Promise<any>;
  }

  public async supplier_form_damage(fromid: string, toid: string, materialid: string, typeofdamage: string, quantity: number, _image: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract3.methods.supplier_damage(fromid, toid, materialid, typeofdamage, quantity, _image).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }
  public async formdamage(damageid: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract3.methods.formdamage(damageid).call().then(function (result) {
        console.log(result);

        return resolve(result);

      });
    }) as Promise<any>;
  }
  public async receiveddamagesupplier(damageid: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract3.methods.receiveddamagesupplier(damageid).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }
  //------------------------------MANUFACTURE--------------------------------
  //// Manufacture add products
  public async manufactureproducts(manufactureid: string, productID: string, productname: string,manufacturedate:number, expierydate: number, quantity: number, cost: number, image: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.manufacture_add_products(manufactureid, productID, productname,manufacturedate, expierydate, quantity, cost, image).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);

      })
    }) as Promise<any>;
  }
  public async prduct(productID: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.prduct(productID).call().then(function (result) {
        return resolve(result);
      });
    }) as Promise<any>;
  }

  public async request_to_supplier(_manufactureid: string, _supplierid: string, _materialid: string, _materialname: number, _quantity: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.request_to_supplier(_manufactureid, _supplierid, _materialid, _materialname, _quantity).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }

  

  public async inccreaseman_product(_productID: string, _quantity: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.inccreaseman_product(_productID, _quantity).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }
  public async approvestatus_mun(requestid: number, _productID: string, _quantity: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.approvestatus_mun(requestid, _productID, _quantity).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
        var b = "errormanu";
        localStorage.setItem("erroratmanufacture", JSON.stringify(b))
        return resolve(error)
      })
    }) as Promise<any>;
  }

  public async rejectstatus_man(requestid: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.rejectstatus_man(requestid).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }
  public async receivedmat(requestid: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.receivedmat(requestid).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }
  public async removeapp(requestid: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.disreq(requestid).call().then(function (result) {
        return resolve(result);
      });
    }) as Promise<any>;
  }

  public async add_insupreq(requestid: number, _manufactureid: string, _quantity: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.addreqto_suplier(requestid, _manufactureid, _quantity).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }

  public async addreqto_manufacture(requestid: number, _distributerID: string, _quantity: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.addreqto_manufacture(requestid, _distributerID, _quantity).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }

  public async sub_insaupreq(requestid: number, _quantity: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.subreqto_suplier(requestid, _quantity).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }
  public async manufactureinvoice(requestid: number, _from1: string, _to: string, _productID: string, _name: string, _quantity: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.manufacturinvoice(requestid, _from1, _to, _productID, _name, _quantity).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }
  public async manuinvoice(requestid: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract.methods.manuinvoice(requestid).call().then(function (result) {
        return resolve(result);
      });

    }) as Promise<any>;
  }
  public async manufacture_at_damage(fromid: string, toid: string, productid: string, typeofdamage: string, quantity: number, _image: string, status: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract3.methods.manufacture_at_damage(fromid, toid, productid, typeofdamage, quantity, _image, status).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }
  public async manudamage(damageid: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract3.methods.manudamage(damageid).call().then(function (result) {
        return resolve(result);
      });
    }) as Promise<any>;
  }
  public async receiveddamagemanufacture(damageid: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract3.methods.receiveddamagemanufacture(damageid).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }

  public async receivedatdistributer(requestid: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.receivedatdistributer(requestid).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }

  //------------------------DISTRIBUTER----------------------------------
  //distributer add products
  public async distributer_add_products(distributerID: string, productID: string, productname: string, quantity: number, cost: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.distributer_add_products(distributerID, productID, productname, quantity, cost).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }

  public async request_to_manufacture(_manufactureid: string, _distributerID: string, _productID: string, _productname: number, _quantity: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.request_to_manufacture(_manufactureid, _distributerID, _productID, _productname, _quantity).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }
  public async decrease_dis_product(_productID: string, _quantity: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.decrease_dis_product(_productID, _quantity).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }

  public async increase_dis_product(_productID: string, _quantity: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.increase_dis_product(_productID, _quantity).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }
  public async approvestatus_dis(requestid: number, _productID: string, _quantity: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.approvestatus_dis(requestid, _productID, _quantity).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
        var c = "errordist";
        localStorage.setItem("erroratdistributer", JSON.stringify(c))
        return resolve(error)
      })
    }) as Promise<any>;
  }

  public async rejectstatus_dis(requestid: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.rejectstatus_dis(requestid).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }


  public async distributer_product(productID: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.distributer_product(productID).call().then(function (result) {
        return resolve(result);
      });
    }) as Promise<any>;
  }
  public async disreq(_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract.methods.disreq(_id).call().then(function (result) {
        return resolve(result);
      });
    }) as Promise<any>;
  }

  public async distributerinvoice(requestid: number, _from1: string, _to: string, _productID: string, _name: string, _quantity: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.distinvoice(requestid, _from1, _to, _productID, _name, _quantity).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }
  public async disnvoice(requestid: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.disinvoice(requestid).call().then(function (result) {
        return resolve(result);

      });

    }) as Promise<any>;
  }

  public async cancelrequestatdistributer(_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.cancelrequestatdistributer(_id).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
        return resolve(error);

      })
    }) as Promise<any>;
  }

  public async receiveddamagedistributer(_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.receiveddamagedistributer(_id).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
        return resolve(error);

      })
    }) as Promise<any>;
  }
  //-----------------------------RETAILER--------------------------------------
  // retailer add products
  public async retailer_add_products(retailerid: string, productID: string, productname: string, quantity: number, cost: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.retailer_add_products(retailerid, productID, productname, quantity, cost).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }

  public async request_to_distributer(_distributerID: string, _retailerid: string, _productID: string, _productname: number, _quantity: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.request_to_distributer(_distributerID, _retailerid, _productID, _productname, _quantity).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }

  public async decrease_retailer_product(_productID: string, _quantity: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.decrease_retailer_product(_productID, _quantity).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }

  public async increase_retailer_product(_productID: string, _quantity: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.increase_retailer_product(_productID, _quantity).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
      })
    }) as Promise<any>;
  }
  public async retailerpro(productID: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.retailerpro(productID).call().then(function (result) {
        return resolve(result);
      });
    }) as Promise<any>;
  }
  public async retailerreq(requestid: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.retailerreq(requestid).call().then(function (result) {
        return resolve(result);
      });
    }) as Promise<any>;
  }

  public async cancelrequestatretailer(_id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._contract2.methods.cancelrequestatretailer(_id).send({ from: this.account, gas: 3000000 }).on('receipt', function (receipt) {
        console.log(receipt);
        return resolve(receipt);
      }).on('error', function (error) {
        console.log(error);
        return resolve(error);

      })
    }) as Promise<any>;
  }

  


  //getdata from manuf reg

  adminlogin() {
    this.isloggedin=true;
  }

  adminlogout() {
  this.isloggedin=false;
  }
}
