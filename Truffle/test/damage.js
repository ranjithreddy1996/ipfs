const damage = artifacts.require('./contracts/damage.sol')

const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');
const BN = require('bn.js');

    
contract('Supply Chain  Damage Contracts:', async (accounts) => {
    let DigitalcertTest
    const Deployer2 = accounts[2]




    const supplier_damage = {
        fromid: "dsh",
        toid: 'admin',
        materialid: 'Amoxil',
        typeofdamage: 'dant',
        quantity: 22,
        image:  "asdg",
        damageid:0
    }
    
   
    beforeEach('setup contract:', async () => {
        DigitalcertTest = await damage.deployed();
    });

it("It should supplier_damage , `supplier_damage()`", async() => {
    let tx= 
    await 
    DigitalcertTest.supplier_damage(
        supplier_damage.fromid, 
        supplier_damage.toid, 
        supplier_damage.materialid, 
            supplier_damage.typeofdamage, 
            supplier_damage.quantity, 
            supplier_damage.image,
            {from: Deployer2}
        )
     
        truffleAssert.eventEmitted(tx, 'supplier_form_damage', (ev) => {
            return ev.damageid == supplier_damage.damageid;
        }
        )

        let returnreg = await DigitalcertTest.formdamage.call(supplier_damage.damageid);
        assert.equal(returnreg.damageid,  supplier_damage.damageid)
});


    const receiveddamagesupplier = {
        damageid: 1,
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await damage.deployed();
    });

    it("It should receiveddamagesupplier  , `receiveddamagesupplier()`", async () => {
        let tx =
            await
                DigitalcertTest.receiveddamagesupplier(

                    receiveddamagesupplier.damageid,

                    { from: Deployer2 }
                )

    });


    const manufacture_at_damage = {
        fromid: "dsh",
        toid: 'admin',
        materialid: 'Amoxil',
        typeofdamage: 'dant',
        quantity: 22,
        image:  "asdg",
        damageid:1,
        status:1
    }
    
   
    beforeEach('setup contract:', async () => {
        DigitalcertTest = await damage.deployed();
    });

it("It should manufacture_at_damage , `manufacture_at_damage()`", async() => {
    let tx= 
    await 
    DigitalcertTest.manufacture_at_damage(
        manufacture_at_damage.fromid, 
        manufacture_at_damage.toid, 
        manufacture_at_damage.materialid, 
        manufacture_at_damage.typeofdamage, 
        manufacture_at_damage.quantity, 
        manufacture_at_damage.image,
        manufacture_at_damage.status,

            {from: Deployer2}
        )
     
        truffleAssert.eventEmitted(tx, 'manufacture_damage', (ev) => {
            return ev.damageid == manufacture_at_damage.damageid;
        }
        )

        let returnreg = await DigitalcertTest.manudamage.call(manufacture_at_damage.damageid);
        assert.equal(returnreg.damageid,  manufacture_at_damage.damageid)
});


const receiveddamagemanufacture = {
    damageid: 1,
}


beforeEach('setup contract:', async () => {
    DigitalcertTest = await damage.deployed();
});

it("It should receiveddamagemanufacture  , `receiveddamagemanufacture()`", async () => {
    let tx =
        await
            DigitalcertTest.receiveddamagemanufacture(

                receiveddamagemanufacture.damageid,

                { from: Deployer2 }
            )

});

const receiveddamagedistributer = {
    damageid: 1,
}


beforeEach('setup contract:', async () => {
    DigitalcertTest = await damage.deployed();
});

it("It should receiveddamagedistributer  , `receiveddamagedistributer()`", async () => {
    let tx =
        await
            DigitalcertTest.receiveddamagedistributer(

                receiveddamagedistributer.damageid,

                { from: Deployer2 }
            )

});
});

