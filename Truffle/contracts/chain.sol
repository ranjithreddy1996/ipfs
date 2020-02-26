pragma solidity ^0.6.1;
 pragma experimental ABIEncoderV2;
 import "./admin.sol";

 contract chain {
     
    enum st{supplier,manufacture,distributer,retailer,admin,approved,rejected,requested,at_supplier,at_manufacture,at_ditributer,at_retailer,received,a,canceled}
    st status;

     struct materialdetails{
    string supplierid;
    string materialid;
    string materialname;
    uint quantity;
    uint cost;
    string image;
}
event SupplierAdditems(string supplierid, string  materialid,string materialname,uint quantity, uint cost,string image);
    mapping(string=>materialdetails)public  slist;

function supplier_add_materils(string memory _supplierid,string memory _materialid,string memory _materialname,uint _quantity,uint _cost,string memory _image) public{
     materialdetails memory temp = materialdetails(_supplierid,_materialid,_materialname,_quantity,_cost,_image);
        slist[_materialid] = temp;
        emit SupplierAdditems(_supplierid,_materialid,_materialname,_quantity,_cost,_image);
}
  function incrementsup(string memory _materialid,uint _quantity) public{
   slist[_materialid].quantity=    slist[_materialid].quantity+_quantity;
 }
 function approvestatus_sup(uint requestid,string memory _materialid,uint _quantity)public returns(uint){
require( slist[_materialid].quantity> req[requestid].quantity,"not enough quantity ");
      req[requestid].status=st.approved;
      req[requestid].status1=st.at_supplier;
     slist[_materialid].quantity=    slist[_materialid].quantity-_quantity;
     
     return 1;
    }
   
  function rejectstatus_sup(uint requestid)public{
      req[requestid].status=st.rejected;
 }

 struct invoice{
     uint requestid;
     string from1;
     string to;
     string materialid;
     string name;
     uint quantity;
     uint cost;
     uint totalcost;
 }
 mapping (uint=>invoice)public ginvoice;
 function addinvoice(uint _requestid,string memory _from1, string memory _to, string memory _materialid, string memory _name, uint _quantity)public{
  uint totalcost=slist[_materialid].cost*_quantity;
   invoice memory temp  =invoice(_requestid,_from1,_to,_materialid,_name,_quantity,slist[_materialid].cost,totalcost);
   ginvoice[_requestid]=temp;
 }
 
struct products{
     string manufactureid;
     string productID;
     string productname;
     uint manufacturedate;
     uint expierydate;
     uint quantity;
     uint cost;
     st status;
     string image;
  }
  mapping(string => products) public prduct  ;
 event manufactureproducts(string manufactureid, string  productID,string productname,uint manufacturedate, uint expierydate,uint quantity,uint cost,string image);
 function manufacture_add_products(string memory _manufactureid,string memory _productID,string memory _productname,uint _manufacturedate,uint _expierydate ,uint _quantity,uint _cost,string memory _image) public{
     products memory temp = products(_manufactureid,_productID,_productname,_manufacturedate,_manufacturedate+_expierydate * 4 weeks,_quantity,_cost,st.at_manufacture,_image);
     prduct[_productID] = temp;
     emit manufactureproducts(_manufactureid,_productID,_productname,_manufacturedate,prduct[_productID].expierydate,_quantity,_cost,_image);
   }
  function receivedmat(uint requestid) public{
     req[requestid].status1=st. at_manufacture;
 }
 
 function inccreaseman_product(string memory _productID,uint _quantity) public{
     prduct[_productID].quantity=prduct[_productID].quantity+_quantity;
 }
   struct manufactureinvoice{
     uint requestid;
     string from1;
     string to;
     string productID;
     string name;
     uint quantity;
     uint cost;
     uint totalcost;
 }
 mapping (uint=>manufactureinvoice)public manuinvoice;
 function manufacturinvoice(uint _requestid,string memory _from1, string memory _to, string memory _productID, string memory _name, uint _quantity)public{
  uint totalcost=prduct[_productID].cost*_quantity;
   manufactureinvoice memory temp  =manufactureinvoice(_requestid,_from1,_to,_productID,_name,_quantity,prduct[_productID].cost,totalcost);
   manuinvoice[_requestid]=temp;
 }
 function cancelrequest(uint requestid)public{
      req[requestid].status=st.canceled;
 }
  struct reqsup{
      uint requestid;
      string manufactureid;
      string supplierid;
      string materialid;
      string materialname;
      uint quantity;
      st status;
       st status1;
  } 
 uint requestid;
  mapping (uint=>reqsup) public req;
event request_to_suppliers(uint requestid,string manufactureid, string supplierid, string materialid, string materialname, uint quantity);
function request_to_supplier(string memory _manufactureid,string memory _supplierid,string memory _materialid,string memory _materialname,uint _quantity)public{
 uint requestid=requestid++;
    reqsup memory temp=reqsup(requestid,_manufactureid,_supplierid,_materialid,_materialname,_quantity,st.requested,st.a);
    req[requestid]=temp;
    emit request_to_suppliers(requestid,_manufactureid,_supplierid,_materialid,_materialname,_quantity);
}


function addreqto_suplier(uint requestid,string memory _manufactureid,uint _quantity)public{
    require(req[requestid].requestid==requestid&& req[requestid].status==st.requested&&keccak256(abi.encodePacked(req[requestid].manufactureid))==keccak256(abi.encodePacked(_manufactureid))); 
    req[requestid].quantity=_quantity;
}

 function approvestatus_mun(uint requestid,string memory _productID,uint _quantity)public{
     require(prduct[_productID].quantity>=disreq[requestid].quantity);
      disreq[requestid].status=st.approved;
      disreq[requestid].status1=st.at_manufacture;

     prduct[_productID].quantity=prduct[_productID].quantity-_quantity;

 }
  function rejectstatus_man(uint requestid)public{
      disreq[requestid].status=st.rejected;
 }
 
//====================DISTRIBUTER==================
struct dis_products{
     string distributerID;
     string productID;
     string productname;
     uint manufacturedate;
     uint expierydate;
     uint quantity;
     uint cost;
     st status;
     string image;
 }
 
 mapping(string => dis_products) public distributer_product; 
 event Distributer_products(string distributerID, string  productID,string productname,uint manufacturedate, uint expierydate,uint quantity,uint cost,string image);
 function distributer_add_products(string memory _distributerID,string memory _productID,string memory _productname,uint _quantity, uint _cost,string memory _image) public{

     dis_products memory temp = dis_products(_distributerID,_productID,_productname,prduct[_productID].manufacturedate,prduct[_productID].expierydate,_quantity,_cost,st.at_ditributer,_image);
        distributer_product[_productID] = temp;
        emit Distributer_products(_distributerID,_productID,_productname,prduct[_productID].manufacturedate,prduct[_productID].expierydate,_quantity,_cost,_image);
}
   function increase_dis_product(string memory _productID,uint _quantity) public{
     distributer_product[_productID].quantity=distributer_product[_productID].quantity+_quantity;
 }
   struct distributerinvoice{
     uint requestid;
     string from1;
     string to;
     string productID;
     string name;
     uint quantity;
     uint cost;
     uint totalcost;
 }
 mapping (uint=>distributerinvoice)public disinvoice;
 function distinvoice(uint _requestid,string memory _from1, string memory _to, string memory _productID, string memory _name, uint _quantity)public{
  uint totalcost=distributer_product[_productID].cost*_quantity;
   distributerinvoice memory temp  =distributerinvoice(_requestid,_from1,_to,_productID,_name,_quantity,distributer_product[_productID].cost,totalcost);
   disinvoice[_requestid]=temp;
 }


  struct reqmanu{
      uint requestid;
      string manufactureid;
      string distributerID;
      string productID;
      string productname;
      uint quantity;
      st status;
      st status1;
  }
  mapping (uint=>reqmanu) public disreq;
event distributer_to_manufacture(uint requestid,string manufactureid, string distributerID, string productID, string productname, uint quantity);
function request_to_manufacture(string memory _manufactureid,string memory _distributerID,string memory _productID,string memory _productname,uint _quantity)public{
 uint requestid=requestid++;

    reqmanu memory temp=reqmanu(requestid,_manufactureid,_distributerID,_productID,_productname,_quantity,st.requested,st.a);
    disreq[requestid]=temp;
   emit distributer_to_manufacture(requestid,_manufactureid,_distributerID,_productID,_productname,_quantity);
}

function addreqto_manufacture(uint requestid,string memory _distributerID,uint _quantity)public{
        require(disreq[requestid].requestid==requestid&& disreq[requestid].status==st.requested&&keccak256(abi.encodePacked(disreq[requestid].distributerID))==keccak256(abi.encodePacked(_distributerID))); 

  disreq[requestid].quantity=_quantity;
}
 function cancelrequestatdistributer(uint requestid)public{
      disreq[requestid].status=st.canceled;
 }
 function approvestatus_dis(uint requestid,string memory _productID,uint _quantity)public{
     require(distributer_product[_productID].quantity>=retailerreq[requestid].quantity);
      retailerreq[requestid].status=st.approved;
    distributer_product[_productID].quantity=distributer_product[_productID].quantity-_quantity;

 }
  function rejectstatus_dis(uint requestid)public{
      retailerreq[requestid].status=st.rejected;
 }

function receivedatdistributer(uint requestid)public{
      disreq[requestid].status=st.at_ditributer;

}

//=========================RETAILER================================

struct retaileraddproducts{
      string retailerid;
     string productID;
     string productname;
     uint manufacturedate;
     uint expierydate;
     uint quantity;
     uint cost;
     st status;
     string image;
    }
mapping (string =>retaileraddproducts) public retailerpro;
 event retailer_add_productss(string retailerid, string  productID,string productname,uint manufacturedate, uint expierydate,uint quantity,uint cost,string image);
 function retailer_add_products(string memory _retailerid,string memory _productID,string memory _productname,uint _quantity,uint _cost,string memory _image) public{
     retaileraddproducts memory temp = retaileraddproducts(_retailerid,_productID,_productname,prduct[_productID].manufacturedate,prduct[_productID].expierydate,_quantity,_cost,st.at_retailer,_image);
        retailerpro[_productID] = temp;
        emit retailer_add_productss(_retailerid,_productID,_productname,prduct[_productID].manufacturedate,prduct[_productID].expierydate,_quantity,_cost,_image);
}
  function decrease_retailer_product(string memory _productID,uint _quantity) public{
       retailerpro[_productID].quantity=retailerpro[_productID].quantity-_quantity;
 }
  function increase_retailer_product(string memory _productID,uint _quantity) public{
      retailerpro[_productID].quantity=retailerpro[_productID].quantity+_quantity;
 }

struct reqdistributer{
    uint requestid;
      string distributerID;
      string retailerid;
      string productID;
      string productname;
      uint quantity;
      st status;
  }
  mapping (uint=>reqdistributer) public retailerreq;
event retailer_to_distributer(uint requestid,string distributerID, string retailerid, string productID, string productname, uint quantity);
function request_to_distributer(string memory _distributerID,string memory _retailerid,string memory _productID,string memory _productname,uint _quantity)public{
 uint requestid=requestid++;
    reqdistributer memory temp=reqdistributer(requestid,_distributerID,_retailerid,_productID,_productname,_quantity,st.requested);
    retailerreq[requestid]=temp;
   emit retailer_to_distributer(requestid,_distributerID,_retailerid,_productID,_productname,_quantity);
}
function addreqto_distributer(uint requestid,uint _quantity)public{
    require( retailerreq[requestid].status==st.requested);
  retailerreq[requestid].quantity=_quantity;
}
function cancelrequestatretailer(uint requestid)public{
      retailerreq[requestid].status=st.canceled;
 }
 }