/// <reference types ="Cypress" />
const { getQuotebyId, getAllQuotes,login } = require('../../support/utils/apiutils.js');
const { fetchQuoteIdDB, fetchCompanyEmailDB, fetchQuoteByIdDB,getAllQuoteDB } = require('../../support/utils/dbUtils.js');
const { verifyQuoteByIdDetails ,verifyAllQuoteDetails} = require('../Verifier/OrderVerifier.js');
const HirerLogin = require('../../fixtures/HirerLogin.json');
const RenterLogin = require('../../fixtures/RenterLogin.json');

describe('Validate GetQuote API ', () => {
    let quoteId
    let userId
    let userName
    let accessToken
    let apiOrdersArray
    before(() => {
        // Fetch the latest quote_id and hirer_company_id from the database
        fetchQuoteIdDB().then((response) => {
            quoteId = response.quoteId; // Assuming quote_id is in the response
            userId = response.hirerCompanyId; // Assuming hirer_company_id is in the response
            cy.log('Fetched quoteId:', quoteId, 'and userId:', userId);

            fetchCompanyEmailDB(userId).then((response) => {
                userName = response.userEmail;
                cy.log('user Email is', userName)

            });
        });


    });

    it('Reterive Quote details by Quote Id', () => {
        login(userName, `${HirerLogin.password}`).then((LoginResponse) => {
             accessToken = LoginResponse.token;

            getQuotebyId(accessToken, quoteId).then((apiQuoteDetails) => {
                expect(apiQuoteDetails.status).to.eq(200);
                cy.log('quote Id is', apiQuoteDetails.body.result.quote_id)
                const apiResponse = apiQuoteDetails.body.result;
                fetchQuoteByIdDB(quoteId).then((dbResults) => {

                    expect(dbResults).to.have.length.greaterThan(0);
                    const dbRecord = dbResults[0];

                    verifyQuoteByIdDetails(apiResponse, dbRecord);



                })


            })
        })
    });

    it('Reterive All Quote details',()=>{
        login(userName, `${HirerLogin.password}`).then((LoginResponse) => {
             accessToken = LoginResponse.token;
        
        getAllQuotes(accessToken).then((response)=>{
expect(response.status).to.eq(200);
 apiOrdersArray=response.body.result;
 
console.log('API Response Length:', apiOrdersArray);
const CompanyId=userId
getAllQuoteDB(CompanyId).then((dbResults) => {

    expect(dbResults).to.have.length.greaterThan(0);
    expect(apiOrdersArray.length).to.equal(dbResults.length, 'API Response and DB Response matched in the number of records');

    const dbRecord = dbResults;

    verifyAllQuoteDetails(apiOrdersArray, dbRecord);



})

        })
        
        
        })



    })

});