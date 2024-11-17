/// <reference types ="Cypress" />
const { getShipmentById,getShipmentByOrderId,login } = require('../../support/utils/apiutils.js');
const { fetchShipmentIdDB,fetchShipmentByIdDB,fetchOrderCompanyIdDB,fetchCompanyEmailDB,getAllShipmentByOrderDB } = require('../../support/utils/dbUtils.js');
const { verifyShipmentByIdDetails ,validateShipmentDetails} = require('../Verifier/OrderVerifier.js');
const HirerLogin = require('../../fixtures/HirerLogin.json');
const RenterLogin = require('../../fixtures/RenterLogin.json');

describe('Validate Get Shipment API Calls ', () => {
    let orderID
    let userId
    let userName
    let accessToken
    let shipmentId
    before(() => {
        // Fetch the latest quote_id and hirer_company_id from the database
        fetchShipmentIdDB().then((response) => {
            orderID = response.orderID; // Assuming quote_id is in the response
            shipmentId=response.shipmentId;
            cy.log('Fetched orderID:', orderID);
            fetchOrderCompanyIdDB(orderID).then((response)=>{
             userId=response.companyId
cy.log('userId is',userId)

fetchCompanyEmailDB(userId).then((response) => {
    userName = response.userEmail;
    cy.log('user Email is', userName)

});
            })

           
        });


    });

    it('Reterive Shipment details by Shipment Id', () => {
        login(userName, `${HirerLogin.password}`).then((LoginResponse) => {
             accessToken = LoginResponse.token;

             getShipmentById(accessToken,shipmentId).then((shipmentResponse) => {

                expect(shipmentResponse.status).to.eq(200);

                
                const apiResponse = shipmentResponse.body.result;
                
                cy.log('shipemntID DB is',shipmentId);
                fetchShipmentByIdDB(shipmentId).then((dbResult) => {

                    expect(dbResult).to.have.length.greaterThan(0);
                    const dbResponse = dbResult[0];

                    verifyShipmentByIdDetails(apiResponse, dbResponse);



                })


            })
        })
    });

    it('Reterive All Shipment details by order Id',()=>{
        login(userName, `${HirerLogin.password}`).then((LoginResponse) => {
             accessToken = LoginResponse.token;
        
             getShipmentByOrderId(accessToken,orderID).then((response)=>{
expect(response.status).to.eq(200);
 const apiShipmentDetailsArray=response.body.result;
 
cy.log('API Response Length:', apiShipmentDetailsArray);
const CompanyId=userId
getAllShipmentByOrderDB(orderID).then((dbResults) => {

    expect(dbResults).to.have.length.greaterThan(0);
    expect(apiShipmentDetailsArray.length).to.equal(dbResults.length, 'API Response and DB Response matched in the number of records');

    validateShipmentDetails (apiShipmentDetailsArray, dbResults) ;



})

        })
        
        
        })



    })

});