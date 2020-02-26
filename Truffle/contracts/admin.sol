pragma solidity ^0.6.1;
 pragma experimental ABIEncoderV2;

contract Admin{
    struct Registration{
        string compeny_name;
        string regby;
        string id;
        uint password;
        string mail;
        uint mobile_number;
        string homeaddress;
        string city;
        st status;
    }
    mapping(string=>Registration)public rr;
    enum st{supplier,manufacture,distributer,retailer,admin,approved,rejected,requested,at_supplier,at_manufacture,at_ditributer,at_retailer,received,a,canceled}
    st status;
    event Supplier(string compeny_name,string regby, string id,  string mail, uint mobile_number, string homeaddress, string city,st);
    event Manufacture(string compeny_name,string regby, string id,  string mail, uint mobile_number, string homeaddress, string city,st);
     event Distributer(string compeny_name, string regby,string id,  string mail, uint mobile_number, string homeaddress, string city,st);
     event Retailer(string compeny_name,string regby, string id, string mail, uint mobile_number, string homeaddress, string city,st);

    function register(string memory _compeny_name, string memory _regby,string memory _id,  string memory _mail, uint _mobile_number, string memory _homeaddress, string memory _city,uint _status)public{
    if(_status==0){

    Registration memory temp=Registration(_compeny_name,_regby,_id,uint16(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))+1000),_mail,_mobile_number,_homeaddress,_city,st.supplier);
    rr[_id]=temp;
            request[reqno].status=st.approved;

    emit Supplier(_compeny_name,_regby,_id,_mail,_mobile_number,_homeaddress,_city,st.supplier);    
    }
     if(_status==1){
    Registration memory temp=Registration(_compeny_name,_regby,_id,uint16(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))+1000),_mail,_mobile_number,_homeaddress,_city,st.manufacture);
    rr[_id]=temp;
            request[reqno].status=st.approved;

    emit Manufacture(_compeny_name,_regby,_id,_mail,_mobile_number,_homeaddress,_city,st.manufacture);
     }
       if(_status==2){
    Registration memory temp=Registration(_compeny_name,_regby,_id,uint16(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))+1000),_mail,_mobile_number,_homeaddress,_city,st.distributer);
    rr[_id]=temp;
            request[reqno].status=st.approved;

    emit Distributer(_compeny_name,_regby,_id,_mail,_mobile_number,_homeaddress,_city,st.distributer);
     }
      if(_status==3){
    Registration memory temp=Registration(_compeny_name,_regby,_id,uint16(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))+1000),_mail,_mobile_number,_homeaddress,_city,st.retailer);
    rr[_id]=temp;
            request[reqno].status=st.approved;

    emit Retailer(_compeny_name,_regby,_id,_mail,_mobile_number,_homeaddress,_city,st.retailer);
     }

}

  struct requestform{
        string compeny_name;
        uint reqno;
        string reqid;
        string mail;
        uint mobile_number;
        string haddress;
        string city;
        string username;
        st status;
    }
    uint reqno;
    event reqregistration(string compeny_name,uint reqno,string reqid,string mail,uint mobile_number,string haddress,string city,string username);
    mapping(uint=>requestform) public request;
    function reqform(string memory _compeny_name,string memory _reqid,string memory _mail, uint _mobile_number, string memory _haddress, string memory _city,string memory _username)public{
      uint reqno=reqno++;

      requestform memory temp=requestform(_compeny_name,reqno,_reqid,_mail,_mobile_number,_haddress,_city,_username,st.requested);
    request[reqno]=temp;  
        emit reqregistration(_compeny_name,reqno,_reqid,_mail,_mobile_number,_haddress,_city,_username);
    }
    function rejectreqform(uint reqno)public{
     request[reqno].status=st.rejected;

    }
    
//____________________________ADMIN_________________________________________________________

string  public admin;
    uint public apassword;
    uint public aphonenumber;
    
   
      constructor(string memory _Admin,uint _password,uint _Phoneno ) public {
         admin = _Admin;
         apassword=_password;
          aphonenumber=_Phoneno;
    }
 
 function login(string memory _id,uint _epassword)public view returns(st,uint){
     require(keccak256(abi.encodePacked(_id))!=(keccak256(abi.encodePacked(""))));
        if((keccak256(abi.encodePacked(_id)) == keccak256(abi.encodePacked(rr[_id].id)))&&(_epassword==rr[_id].password)){
            return(rr[_id].status,100);
    }
      if((keccak256(abi.encodePacked(_id))==keccak256(abi.encodePacked(admin))&&_epassword==apassword)){
        return(st.admin,200);
    }
    
   
  }
 
 function transferownership(string memory _eadmin,uint _epassword,string memory _newadmin,uint _ephoneno)public{
   require  ((keccak256(abi.encodePacked((_eadmin))) == keccak256(abi.encodePacked((admin))))&&(_epassword==apassword));
     admin=_newadmin;
     apassword=uint16(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))+1000);
    aphonenumber=_ephoneno;
 }

function deleteuser(string memory _id,string memory _eadmin,uint _epassword)public returns(bool){
     require  ((keccak256(abi.encodePacked((_eadmin))) == keccak256(abi.encodePacked((admin))))&&(_epassword==apassword));
            delete rr[_id];
            return(true);
  }
  function deletecandidates(string memory _id)public returns(bool){
        if(((keccak256(abi.encodePacked(_id)) == keccak256(abi.encodePacked(rr[_id].id))))){
            delete rr[_id];
            return(true);
        }
       else return(false);
   }
  
 function updatepassword(string memory _admin, uint _password,uint _newpassword) public {
        require((keccak256(abi.encodePacked((_admin))) == keccak256(abi.encodePacked((admin))))&&(_password==apassword));
         apassword=_newpassword;
        
   }
   function updatepasswordcandidate(string memory _id, uint _password,uint _newpassword) public {
        require((keccak256(abi.encodePacked((_id))) == keccak256(abi.encodePacked((rr[_id].id))))&&(rr[_id].password==_password));
         rr[_id].password=_newpassword;
        
   }
}