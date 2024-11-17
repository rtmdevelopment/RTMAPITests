/// <reference types = "Cypress"/>

const { getAllOrders, login } = require('../../support/utils/apiutils');
const { getOrderDB } = require('../../support/utils/dbUtils');
const { validateOrderDetails } = require('../../e2e/Verifier/OrderVerifier');
const HirerLogin = require('../../fixtures/HirerLogin.json');
const RenterLogin = require('../../fixtures/RenterLogin.json');

describe('Verify GetAllOrders', () => {

    it('Reterive all the Orders', () => {

        login(`${HirerLogin.username}`, `${HirerLogin.password}`).then((loginResult) => {
            const accessToken = loginResult.token;
            const CompanyId = loginResult.userId;
            cy.log("Company Id is", CompanyId)

            getAllOrders(accessToken).then((apiResponse) => {
                expect(apiResponse.status).to.be.eq(200);

                const apiOrdersArray = apiResponse.body.results;
                console.log('API Response Length:', apiOrdersArray);
                getOrderDB(CompanyId).then((dbResults) => {

                    console.log('DB Results Length:', dbResults.length);

                    // Make sure the arrays are the same length
                    expect(apiOrdersArray.length).to.equal(dbResults.length, 'API Response and DB Response matched in the number of records');

                          // Validate API and DB fields
                    validateOrderDetails (apiOrdersArray, dbResults); 


                })

            })


        })
    })




})