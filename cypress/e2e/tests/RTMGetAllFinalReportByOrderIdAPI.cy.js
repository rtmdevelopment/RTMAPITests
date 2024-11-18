/// <reference types ="Cypress" />
const { getFinalReportByOrderId,login } = require('../../support/utils/apiutils.js');
const { fetchFinalReportIdDB,fetchFinalReportByOrderDB, fetchCompanyEmailDB, fetchOrderCompanyIdDB } = require('../../support/utils/dbUtils.js');
const { verifyFinalReportByIdDetails } = require('../Verifier/OrderVerifier.js');
const HirerLogin = require('../../fixtures/HirerLogin.json');
const RenterLogin = require('../../fixtures/RenterLogin.json');

describe('Validate Get Final  Report API ', () => {
    let orderID
    let userId
    let finalId
    let userName
    let accessToken
  
    before(() => {
        // Fetch the latest Sample Report and Order Id from the database
        
        fetchFinalReportIdDB().then((response) => {
            orderID = response.orderID; // Assuming order_id is in the response
            finalId = response.finalId; // Assuming Final Report_id is in the response
            cy.log('Fetched order ID:', orderID, 'and Final Report Id:', finalId);

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
            
             getFinalReportByOrderId(accessToken, orderID).then((response) => {
                expect(response.status).to.eq(200);
                cy.log('Final Reort Id is', response.body.results[0].id)
                 const apiFReportDetailsArray = response.body.results;

                 fetchFinalReportByOrderDB(orderID).then((dbResult) => {

                    expect(dbResult).to.have.length.greaterThan(0);
                    expect(apiFReportDetailsArray.length).to.equal(dbResult.length, 'API Response and DB Response matched in the number of records');
                

                    verifyFinalReportByIdDetails(apiFReportDetailsArray, dbResult);
                    



                })


            })
        })
    });

   

});