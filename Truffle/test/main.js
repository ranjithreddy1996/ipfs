const finnal = artifacts.require('./contracts/chain.sol')

const assert = require("chai").assert;
const truffleAssert = require('truffle-assertions');
const BN = require('bn.js');


contract('Supply Chain Main Contracts:', async (accounts) => {
    let DigitalcertTest
    const Deployer = accounts[1]


    const supplier_add_materils = {
        supplierid: "dsh",
        materialid: 'admin',
        materialname: 'Amoxil',
        quantity: 45,
        cost: 56781,
        image: "fasgj",
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

    it("It should supplier_add_materils  , `supplier_add_materils()`", async () => {
        let tx =
            await
                DigitalcertTest.supplier_add_materils(
                    supplier_add_materils.supplierid,
                    supplier_add_materils.materialid,
                    supplier_add_materils.materialname,
                    supplier_add_materils.quantity,
                    supplier_add_materils.cost,
                    supplier_add_materils.image,
                    { from: Deployer }
                )

        truffleAssert.eventEmitted(tx, 'SupplierAdditems', (ev) => {
            return ev.materialid == supplier_add_materils.materialid;
        }
        )

        let returnreg = await DigitalcertTest.slist.call(supplier_add_materils.materialid);
        assert.equal(returnreg.materialid, supplier_add_materils.materialid)
    });



    const incrementsup = {
        materialid: 'admin',
        quantity: 45,
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

    it("It should incrementsup  , `incrementsup()`", async () => {
        let tx =
            await
                DigitalcertTest.incrementsup(
                    incrementsup.materialid,
                    incrementsup.quantity,
                    { from: Deployer }
                )

    });

    const approvestatus_sup = {
        materialid: 'admin',
        quantity: 5,
        requestid: 0,
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

    it("It should approvestatus_sup  , `approvestatus_sup()`", async () => {
        let tx =
            await
                DigitalcertTest.approvestatus_sup(
                    approvestatus_sup.requestid,

                    approvestatus_sup.materialid,
                    approvestatus_sup.quantity,
                    { from: Deployer }
                )

    });

    const rejectstatus_sup = {
        requestid: 45,
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

    it("It should rejectstatus_sup  , `rejectstatus_sup()`", async () => {
        let tx =
            await
                DigitalcertTest.rejectstatus_sup(
                    rejectstatus_sup.requestid,
                    { from: Deployer }
                )

    });

    const addinvoice = {
        requestid: 0,
        from1: 'admin',
        to: 'Amoxil',
        materialid: "mat",
        name: 'admin',
        quantity: 4,
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

    it("It should addinvoice  , `addinvoice()`", async () => {
        let tx =
            await
                DigitalcertTest.addinvoice(
                    addinvoice.requestid,
                    addinvoice.from1,
                    addinvoice.to,
                    addinvoice.materialid,
                    addinvoice.name,
                    addinvoice.quantity,
                    { from: Deployer }
                )



        let returnreg = await DigitalcertTest.ginvoice.call(addinvoice.requestid);
        assert.equal(returnreg.requestid, addinvoice.requestid)
    });


    const manufacture_add_products = {
        manufactureid: "m1",
        productID: 'p1',
        productname: 'pro',
        manufacturedate: 1,
        expierydate: 5,
        quantity: 34,
        cost: 3,
        image: 'asd'
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

    it("It should manufacture_add_products  , `manufacture_add_products()`", async () => {
        let tx =
            await
                DigitalcertTest.manufacture_add_products(
                    manufacture_add_products.manufactureid,
                    manufacture_add_products.productID,
                    manufacture_add_products.productname,
                    manufacture_add_products.manufacturedate,
                    manufacture_add_products.expierydate,
                    manufacture_add_products.quantity,
                    manufacture_add_products.cost,
                    manufacture_add_products.image,
                    { from: Deployer }
                )

        truffleAssert.eventEmitted(tx, 'manufactureproducts', (ev) => {
            return ev.productID == manufacture_add_products.productID;
        }
        )

        let returnreg = await DigitalcertTest.prduct.call(manufacture_add_products.productID);
        assert.equal(returnreg.productID, manufacture_add_products.productID)
    });

    const receivedmat = {
        requestid: 1,
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

    it("It should receivedmat  , `receivedmat()`", async () => {
        let tx =
            await
                DigitalcertTest.receivedmat(
                    receivedmat.requestid,
                    { from: Deployer }
                )

    });

    const inccreaseman_product = {
        productID: 'pro',
        quantity: 5,
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

    it("It should inccreaseman_product  , `inccreaseman_product()`", async () => {
        let tx =
            await
                DigitalcertTest.inccreaseman_product(
                    inccreaseman_product.productID,

                    inccreaseman_product.quantity,
                    { from: Deployer }
                )

    });


    const manufacturinvoice = {
        requestid: 0,
        from1: 'admin',
        to: 'Amoxil',
        productID: "pro",
        name: 'admin',
        quantity: 4,
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

    it("It should manufacturinvoice  , `manufacturinvoice()`", async () => {
        let tx =
            await
                DigitalcertTest.manufacturinvoice(
                    manufacturinvoice.requestid,
                    manufacturinvoice.from1,
                    manufacturinvoice.to,
                    manufacturinvoice.productID,
                    manufacturinvoice.name,
                    manufacturinvoice.quantity,
                    { from: Deployer }
                )


        let returnreg = await DigitalcertTest.manuinvoice.call(manufacturinvoice.requestid);
        assert.equal(returnreg.requestid, manufacturinvoice.requestid)
    });

    const cancelrequest = {
        requestid: 1,
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

    it("It should cancelrequest  , `cancelrequest()`", async () => {
        let tx =
            await
                DigitalcertTest.cancelrequest(
                    cancelrequest.requestid,
                    { from: Deployer }
                )

    });


    const request_to_supplier = {
        manufactureid: 'm1',
        supplierid: 'admin',
        materialid: 'Amoxil',
        materialname: "mat",
        quantity: 4,
        requestid: 0,
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

    it("It should request_to_supplier  , `request_to_supplier()`", async () => {
        let tx =
            await
                DigitalcertTest.request_to_supplier(
                    request_to_supplier.manufactureid,
                    request_to_supplier.supplierid,
                    request_to_supplier.materialid,
                    request_to_supplier.materialname,
                    request_to_supplier.quantity,
                    { from: Deployer }
                )
        truffleAssert.eventEmitted(tx, 'request_to_suppliers', (ev) => {
            return ev.requestid == request_to_supplier.requestid;
        }
        )

        let returnreg = await DigitalcertTest.req.call(request_to_supplier.requestid);
        assert.equal(returnreg.requestid, request_to_supplier.requestid)
    });


    const addreqto_suplier = {
        manufactureid: 'm1',
        quantity: 5,
        requestid: 0,
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

    it("It should addreqto_suplier  , `addreqto_suplier()`", async () => {
        let tx =
            await
                DigitalcertTest.addreqto_suplier(
                    addreqto_suplier.requestid,

                    addreqto_suplier.manufactureid,
                    addreqto_suplier.quantity,
                    { from: Deployer }
                )

    });


    const approvestatus_mun = {
        productID: 'admin',
        quantity: 5,
        requestid: 3,
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

    it("It should approvestatus_mun  , `approvestatus_mun()`", async () => {
        let tx =
            await
                DigitalcertTest.approvestatus_mun(
                    approvestatus_mun.requestid,

                    approvestatus_mun.productID,
                    approvestatus_mun.quantity,
                    { from: Deployer }
                )

    });





    const rejectstatus_man = {

        requestid: 0,
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

    it("It should rejectstatus_man  , `rejectstatus_man()`", async () => {
        let tx =
            await
                DigitalcertTest.rejectstatus_man(
                    rejectstatus_man.requestid,
                    { from: Deployer }
                )

    });




    const distributer_add_products = {
        distributerID: "d1",
        productID: 'p1',
        productname: 'pro',
        manufacturedate: 1,
        expierydate: 5,
        quantity: 34,
        cost: 3,
        image: 'asd'
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

    it("It should distributer_add_products  , `distributer_add_products()`", async () => {
        let tx =
            await
                DigitalcertTest.distributer_add_products(
                    distributer_add_products.distributerID,
                    distributer_add_products.productID,
                    distributer_add_products.productname,
                    distributer_add_products.quantity,
                    distributer_add_products.cost,
                    distributer_add_products.image,
                    { from: Deployer }
                )

        truffleAssert.eventEmitted(tx, 'Distributer_products', (ev) => {
            return ev.productID == distributer_add_products.productID;
        }
        )

        let returnreg = await DigitalcertTest.distributer_product.call(distributer_add_products.productID);
        assert.equal(returnreg.productID, distributer_add_products.productID)
    });




    const distinvoice = {
        requestid: 0,
        from1: 'admin',
        to: 'Amoxil',
        productID: "pro",
        name: 'admin',
        quantity: 4,
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

    it("It should distinvoice  , `distinvoice()`", async () => {
        let tx =
            await
                DigitalcertTest.distinvoice(
                    distinvoice.requestid,
                    distinvoice.from1,
                    distinvoice.to,
                    distinvoice.productID,
                    distinvoice.name,
                    distinvoice.quantity,
                    { from: Deployer }
                )


        let returnreg = await DigitalcertTest.disinvoice.call(distinvoice.requestid);
        assert.equal(returnreg.requestid, distinvoice.requestid)
    });


    const request_to_manufacture = {
        manufactureid: 'm1',
        distributerID: 'admin',
        productID: 'Amoxil',
        productname: "mat",
        quantity: 4,
        requestid: 1,
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

    it("It should request_to_manufacture  , `request_to_manufacture()`", async () => {
        let tx =
            await
                DigitalcertTest.request_to_manufacture(
                    request_to_manufacture.manufactureid,
                    request_to_manufacture.distributerID,
                    request_to_manufacture.productID,
                    request_to_manufacture.productname,
                    request_to_manufacture.quantity,
                    { from: Deployer }
                )
        truffleAssert.eventEmitted(tx, 'distributer_to_manufacture', (ev) => {
            return ev.requestid == request_to_manufacture.requestid;
        }
        )

        let returnreg = await DigitalcertTest.disreq.call(request_to_manufacture.requestid);
        assert.equal(returnreg.requestid, request_to_manufacture.requestid)
    });

    const addreqto_manufacture = {
        distributerID: 'admin',
        quantity: 5,
        requestid: 1,
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

    it("It should addreqto_manufacture  , `addreqto_manufacture()`", async () => {
        let tx =
            await
                DigitalcertTest.addreqto_manufacture(
                    addreqto_manufacture.requestid,

                    addreqto_manufacture.distributerID,
                    addreqto_manufacture.quantity,
                    { from: Deployer }
                )

    });

    
    const cancelrequestatdistributer = {

        requestid: 2,
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

    it("It should cancelrequestatdistributer  , `cancelrequestatdistributer()`", async () => {
        let tx =
            await
                DigitalcertTest.cancelrequestatdistributer(
                    cancelrequestatdistributer.requestid,
                    { from: Deployer }
                )

    });

    const approvestatus_dis = {
        productID: 'pro',
        quantity: 5,
        requestid: 1,
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

    it("It should approvestatus_dis  , `approvestatus_dis()`", async () => {
        let tx =
            await
                DigitalcertTest.approvestatus_dis(
                    approvestatus_dis.requestid,

                    approvestatus_dis.productID,
                    approvestatus_dis.quantity,
                    { from: Deployer }
                )

    });

    const rejectstatus_dis = {

        requestid: 2,
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

    it("It should rejectstatus_dis  , `rejectstatus_dis()`", async () => {
        let tx =
            await
                DigitalcertTest.rejectstatus_dis(
                    rejectstatus_dis.requestid,
                    { from: Deployer }
                )

    });

    const receivedatdistributer = {

        requestid: 2,
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

    it("It should receivedatdistributer  , `receivedatdistributer()`", async () => {
        let tx =
            await
                DigitalcertTest.receivedatdistributer(
                    receivedatdistributer.requestid,
                    { from: Deployer }
                )

    });

    const retailer_add_products = {
        retailerid: "r1",
        productID: 'p1',
        productname: 'pro',
        manufacturedate: 1,
        expierydate: 5,
        quantity: 34,
        cost: 3,
        image: 'asd'
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

    it("It should retailer_add_products  , `retailer_add_products()`", async () => {
        let tx =
            await
                DigitalcertTest.retailer_add_products(
                    retailer_add_products.retailerid,
                    retailer_add_products.productID,
                    retailer_add_products.productname,
                    retailer_add_products.quantity,
                    retailer_add_products.cost,
                    retailer_add_products.image,
                    { from: Deployer }
                )

        truffleAssert.eventEmitted(tx, 'retailer_add_productss', (ev) => {
            return ev.productID == retailer_add_products.productID;
        }
        )

        let returnreg = await DigitalcertTest.distributer_product.call(retailer_add_products.productID);
        assert.equal(returnreg.productID, retailer_add_products.productID)
    });

    const decrease_retailer_product = {
        productID: 'pro',
        quantity: 1,
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

    it("It should decrease_retailer_product  , `decrease_retailer_product()`", async () => {
        let tx =
            await
                DigitalcertTest.decrease_retailer_product(

                    decrease_retailer_product.productID,
                    decrease_retailer_product.quantity,

                    { from: Deployer }
                )

    });


    const increase_retailer_product = {
        productID: 'pro',
        quantity: 1,
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

    it("It should increase_retailer_product  , `increase_retailer_product()`", async () => {
        let tx =
            await
                DigitalcertTest.increase_retailer_product(

                    increase_retailer_product.productID,
                    increase_retailer_product.quantity,

                    { from: Deployer }
                )

    });

    const request_to_distributer = {
        retailerid: 'm1',
        distributerID: 'admin',
        productID: 'Amoxil',
        productname: "mat",
        quantity: 4,
        requestid: 2,
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

    it("It should request_to_distributer  , `request_to_distributer()`", async () => {
        let tx =
            await
                DigitalcertTest.request_to_distributer(
                    request_to_distributer.retailerid,
                    request_to_distributer.distributerID,
                    request_to_distributer.productID,
                    request_to_distributer.productname,
                    request_to_distributer.quantity,
                    { from: Deployer }
                )
        truffleAssert.eventEmitted(tx, 'retailer_to_distributer', (ev) => {
            return ev.requestid == request_to_distributer.requestid;
        }
        )

        let returnreg = await DigitalcertTest.retailerreq.call(request_to_distributer.requestid);
        assert.equal(returnreg.requestid, request_to_distributer.requestid)
    });
    


    const addreqto_distributer = {
        requestid: 2,
        quantity: 3,
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

    it("It should addreqto_distributer  , `addreqto_distributer()`", async () => {
        let tx =
            await
                DigitalcertTest.addreqto_distributer(

                    addreqto_distributer.requestid,
                    addreqto_distributer.quantity,

                    { from: Deployer }
                )

    });
    
    const cancelrequestatretailer = {
        requestid: 2,
    }


    beforeEach('setup contract:', async () => {
        DigitalcertTest = await finnal.deployed();
    });

    it("It should cancelrequestatretailer  , `cancelrequestatretailer()`", async () => {
        let tx =
            await
                DigitalcertTest.cancelrequestatretailer(

                    cancelrequestatretailer.requestid,

                    { from: Deployer }
                )

    });

});