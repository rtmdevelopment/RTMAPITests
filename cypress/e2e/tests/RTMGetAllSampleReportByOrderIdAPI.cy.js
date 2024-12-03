/// <reference types ="Cypress" />
const { getFirstSampleReportByOrderId, getAllQuotes,login } = require('../../support/utils/apiutils.js');
const { fetchSampleReportIdDB, fetchCompanyEmailDB, fetchOrderCompanyIdDB,fetchSampleReportByOrderDB } = require('../../support/utils/dbUtils.js');
const { verifySampleReportByIdDetails } = require('../Verifier/OrderVerifier.js');
const HirerLogin = require('../../fixtures/HirerLogin.json');
const RenterLogin = require('../../fixtures/RenterLogin.json');

describe('Validate Get First Sample Report API ', () => {
    let orderID
    let userId
    let sampleId
    let userName
    let accessToken
  
    before(() => {
        // Fetch the Sample Report Id and Order Id from the database
      
        fetchSampleReportIdDB().then((response) => {
            orderID = response.orderID; // Assuming order_id is in the response
            sampleId = response.sampleId; // Assuming Sample Report_id is in the response
            cy.log('Fetched order ID:', orderID, 'and Sample Report Id:', sampleId);

            fetchOrderCompanyIdDB(orderID).then((response)=>{
             userId=response.companyId
             fetchCompanyEmailDB(userId).then((response) => {
                userName = response.userEmail;
                cy.log('user Email is', userName)

            });

            })

            
        });


    });

    it('Reterive Sample Report details by Order Id', () => {
        login(userName, `${HirerLogin.password}`).then((LoginResponse) => {
             accessToken = LoginResponse.token;
            
             getFirstSampleReportByOrderId(accessToken, orderID).then((response) => {
                expect(response.status).to.eq(200);
                cy.log('Sample Reort Id is', response.body.results[0].id)
                 const apiSReportDetailsArray = response.body.results;

                fetchSampleReportByOrderDB(orderID).then((dbResult) => {

                    expect(dbResult).to.have.length.greaterThan(0);
                    expect(apiSReportDetailsArray.length).to.equal(dbResult.length, 'API Response and DB Response matched in the number of records');
                

                    verifySampleReportByIdDetails(apiSReportDetailsArray, dbResult);
                    



                })


            })
        })
    });

   

});