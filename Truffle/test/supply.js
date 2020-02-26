const finnal = artifacts.require('./contracts/admin.sol')

const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');
const BN = require('bn.js');


contract('Supply Chain Admin Contracts:', async (accounts) => {
    let DigitalcertTest
    const Deployer = accounts[0]




    const register = {
        compeny_name: "dsh",
        regby: 'admin',
        id: 'Amoxil',
        password: 45,
        mail: 'rhdt',
        mobile_number:  56781,
        homeaddress: 'sdfg',
        city: 'abc',
        status:0,
    }
    
   
    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

it("It should register user , `register()`", async() => {
    let tx= 
    await 
    DigitalcertTest.register(
        register.compeny_name, 
        register.regby, 
        register.id, 
            register.mail, 
            register.mobile_number, 
            register.homeaddress,
            register.city,   
            register. status,
            {from: Deployer}
        )
     
        truffleAssert.eventEmitted(tx, 'Supplier', (ev) => {
            return ev.id == register.id;
        }
        )

        let returnreg = await DigitalcertTest.rr.call(register.id);
        assert.equal(returnreg.id,  register.id)
});


const reqform = {
    compeny_name: "dsh",
    reqno: 0,
    reqid: 'Amoxil',
    mail: 'fng',
    mobile_number: 2,
    homeaddress: 'sdfg',
    city: 'abc',
    username:"fdj",
}


beforeEach('setup contract:', async () => {
    DigitalcertTest = await finnal.deployed();
});

it("It should register req form , `reqform()`", async() => {
let tx= 
await 
DigitalcertTest.reqform(
    reqform.compeny_name, 
    reqform.reqid, 
    reqform.mail, 
    reqform.mobile_number, 
    reqform.homeaddress,
    reqform.city,  
    reqform.username,
        {from: Deployer}
    )
 
    truffleAssert.eventEmitted(tx, 'reqregistration', (ev) => {
        return ev.reqno == reqform.reqno;
    }
    )

    let returnreg = await DigitalcertTest.request.call(reqform.reqno);
    assert.equal(returnreg.reqno,  reqform.reqno)
});


const login = {
    admin: "admin",
    apassword: 123,
   
}


beforeEach('setup contract:', async () => {
    DigitalcertTest = await finnal.deployed();
});

it("It should generate login , `login()`", async() => {
let tx= 
await 
DigitalcertTest.login(
    login.admin, 
    login.apassword, 
 
        {from: Deployer}
    )

});

const deleteuser = {
    id:'Amoxil',
    eadmin:'admin',
    eapassword:123,
}


beforeEach('setup contract:', async () => {
    DigitalcertTest = await finnal.deployed();
});

it("It should deleteuser , `deleteuser()`", async() => {
let tx= 
await 
DigitalcertTest.deleteuser(
    deleteuser.id,
    deleteuser.eadmin, 
    deleteuser.eapassword, 
 
        {from: Deployer}
    )

});


const deletecandidates = {
    id:'Amoxil',
   }


beforeEach('setup contract:', async () => {
    DigitalcertTest = await finnal.deployed();
});

it("It should deleteuser , `deletecandidates()`", async() => {
let tx= 
await 
DigitalcertTest.deletecandidates(
    deletecandidates.id,
        {from: Deployer}
    )

});

const updatepassword = {
    eadmin:'admin',
    eapassword:123,
    newpassword:321
}


beforeEach('setup contract:', async () => {
    DigitalcertTest = await finnal.deployed();
});

it("It should updatepassword , `updatepassword()`", async() => {
let tx= 
await 
DigitalcertTest.updatepassword(
    updatepassword.eadmin, 
    updatepassword.eapassword, 
    updatepassword.newpassword,

        {from: Deployer}
    )

});

const transferownership = {
    eadmin: "admin",
    eapassword: 321,
    newadmin:'admin',
    ephoneno:123,
}


beforeEach('setup contract:', async () => {
    DigitalcertTest = await finnal.deployed();
});

it("It should transfer ownership , `transferownership()`", async() => {
let tx= 
await 
DigitalcertTest.transferownership(
    transferownership.eadmin, 
    transferownership.eapassword, 
    transferownership.newadmin,
    transferownership.ephoneno,
 
        {from: Deployer}
    )

});

// const updatepasswordcandidate = {
//     id:'Amoxil',
//     password:45,
//     newpassword:321
// }


// beforeEach('setup contract:', async () => {
//     DigitalcertTest = await finnal.deployed();
// });

// it("It should updatepassword , `updatepasswordcandidate()`", async() => {
// let tx= 
// await 
// DigitalcertTest.updatepasswordcandidate(
//     updatepasswordcandidate.id, 
//     updatepasswordcandidate.password, 
//     updatepasswordcandidate.newpassword,

//         {from: Deployer}
//     )

// });


});

