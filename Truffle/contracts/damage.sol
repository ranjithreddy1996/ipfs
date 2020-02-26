pragma solidity ^0.6.1;
 pragma experimental ABIEncoderV2;
 import "./chain.sol";

 contract Damage{
      struct damage{
     uint damageid;
     string fromid;
     string toid;
     string materialid;
     string typeofdamage;
     uint quantity;
     string image;
     st status;
 }
 enum st{supplier,manufacture,distributer,retailer,admin,approved,rejected,requested,at_supplier,at_manufacture,at_ditributer,at_retailer,received,a,canceled}
    st status;
      uint damageid;
  mapping (uint=>damage)public formdamage;
  event supplier_form_damage(uint damageid,string fromid,string toid,string materialid, string typeofdamage,uint quantity, string image,st);
  function supplier_damage(string memory _fromid,string memory _toid,string memory _materialid,string memory _typeofdamage,uint _quantity,string memory _image)public {
       uint damageid=damageid++;

      damage memory temp = damage(damageid,_fromid,_toid,_materialid,_typeofdamage,_quantity,_image,st.at_manufacture);
        formdamage[damageid] = temp; 
        emit supplier_form_damage(damageid,_fromid,_toid,_materialid,_typeofdamage,_quantity,_image,st.at_manufacture);
  }

function receiveddamagesupplier(uint damageid)public{
    formdamage[damageid].status=st.at_supplier;
}
 struct manufacturedamage{
     uint damageid;
     string fromid;
     string toid;
     string productid;
     string typeofdamage;
     uint quantity;
     string image;
     st status;
 }
  mapping (uint=>manufacturedamage)public manudamage;
  event manufacture_damage(uint damageid,string fromid,string toid,string productid, string typeofdamage,uint quantity, string image,st);
  function manufacture_at_damage(string memory _fromid,string memory _toid,string memory _productid,string memory _typeofdamage,uint _quantity,string memory _image,uint _status)public {
       uint damageid=damageid++;
if(_status==1){
      manufacturedamage memory temp = manufacturedamage(damageid,_fromid,_toid,_productid,_typeofdamage,_quantity,_image,st.at_manufacture);
        manudamage[damageid] = temp; 
  }
  else if(_status==2){
       manufacturedamage memory temp = manufacturedamage(damageid,_fromid,_toid,_productid,_typeofdamage,_quantity,_image,st.at_ditributer);
        manudamage[damageid] = temp; 
  }
  else if(_status==3){
       manufacturedamage memory temp = manufacturedamage(damageid,_fromid,_toid,_productid,_typeofdamage,_quantity,_image,st.at_retailer);
        manudamage[damageid] = temp; 
  }
          emit manufacture_damage(damageid,_fromid,_toid,_productid,_typeofdamage,_quantity,_image,status);

  }

function receiveddamagemanufacture(uint damageid)public{
    manudamage[damageid].status=st.at_manufacture;
}

function receiveddamagedistributer(uint damageid)public{
    manudamage[damageid].status=st.at_ditributer;
}
 }